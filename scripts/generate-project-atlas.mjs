import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const mediaDirectory = join(projectRoot, 'public', 'project_media');
const atlasFilename = 'project-atlas.mp4';
const posterFilename = 'project-atlas.jpg';
const configPath = join(projectRoot, 'src', 'config', 'projectAtlas.json');
const assetsConfigPath = join(projectRoot, 'src', 'config', 'projectAtlasAssets.json');
const atlasConfig = JSON.parse(readFileSync(configPath, 'utf8'));

const { columns, rows, tileWidth, tileHeight, framesPerSecond, durationSeconds, blur, temporalSmear } = atlasConfig;

if (
  ![columns, rows, tileWidth, tileHeight, framesPerSecond, durationSeconds].every(
    (value) => Number.isInteger(value) && value > 0
  ) ||
  typeof blur !== 'boolean'
) {
  throw new Error(`Invalid project atlas configuration in ${configPath}.`);
}

if (
  typeof temporalSmear?.enabled !== 'boolean' ||
  !Number.isInteger(temporalSmear?.radiusFrames) ||
  temporalSmear.radiusFrames < 1 ||
  temporalSmear.radiusFrames >= framesPerSecond * durationSeconds * 0.5 ||
  typeof temporalSmear?.decay !== 'number' ||
  temporalSmear.decay <= 0 ||
  temporalSmear.decay > 1
) {
  throw new Error(`Invalid temporal smear configuration in ${configPath}.`);
}

const sources = readdirSync(mediaDirectory)
  .filter((filename) => filename.endsWith('.mp4') && filename !== atlasFilename)
  .sort((left, right) => left.localeCompare(right));

if (sources.length !== 21) {
  throw new Error(
    `Expected 21 project MP4 files, found ${sources.length}. Update the ${columns}x${rows} atlas layout before continuing.`
  );
}

const inputArguments = sources.flatMap((filename) => ['-stream_loop', '-1', '-i', join(mediaDirectory, filename)]);

const tileFilters = sources.map(
  (_, index) =>
    `[${index}:v]fps=${framesPerSecond},` +
    `scale=${tileWidth}:${tileHeight}:force_original_aspect_ratio=decrease,` +
    `pad=${tileWidth}:${tileHeight}:-1:-1:black,setsar=1,setpts=PTS-STARTPTS[tile${index}]`
);
const tileInputs = sources.map((_, index) => `[tile${index}]`).join('');
const layout = sources
  .map((_, index) => `${(index % columns) * tileWidth}_${Math.floor(index / columns) * tileHeight}`)
  .join('|');
const totalFrames = framesPerSecond * durationSeconds;
const appearanceFilters = ['eq=contrast=1:brightness=0.03:saturation=0.9'];
if (blur) appearanceFilters.push('gblur=sigma=0.8');
appearanceFilters.push('format=yuv420p');

const filterGraph = [
  ...tileFilters,
  `${tileInputs}xstack=inputs=${sources.length}:layout=${layout}:fill=black[stacked]`,
];

if (temporalSmear.enabled) {
  const radius = temporalSmear.radiusFrames;
  const smearFrameCount = radius * 2 + 1;
  const weights = Array.from({ length: smearFrameCount }, (_, index) =>
    Math.pow(temporalSmear.decay, Math.abs(index - radius))
  );
  const weightScale = 1 / weights.reduce((sum, weight) => sum + weight, 0);

  filterGraph.push(
    `[stacked]trim=start_frame=0:end_frame=${totalFrames},setpts=PTS-STARTPTS,split=3[ringTailSource][ringBody][ringHeadSource]`,
    `[ringTailSource]trim=start_frame=${totalFrames - radius}:end_frame=${totalFrames},setpts=PTS-STARTPTS[ringTail]`,
    `[ringHeadSource]trim=start_frame=0:end_frame=${radius},setpts=PTS-STARTPTS[ringHead]`,
    `[ringTail][ringBody][ringHead]concat=n=3:v=1:a=0[ringExtended]`,
    `[ringExtended]tmix=frames=${smearFrameCount}:weights='${weights.map((weight) => weight.toFixed(6)).join(' ')}':scale=${weightScale.toFixed(8)}[ringMixed]`,
    `[ringMixed]trim=start_frame=${radius * 2}:end_frame=${radius * 2 + totalFrames},setpts=PTS-STARTPTS[smeared]`,
    // Retain color and contrast while taking just enough saturation off for
    // the project footage to sit behind the foreground content.
    `[smeared]${appearanceFilters.join(',')}[atlas]`
  );
} else {
  filterGraph.push(
    `[stacked]trim=start_frame=0:end_frame=${totalFrames},setpts=PTS-STARTPTS,${appearanceFilters.join(',')}[atlas]`
  );
}

const atlasPath = join(mediaDirectory, atlasFilename);
const atlasResult = spawnSync(
  'ffmpeg',
  [
    '-hide_banner',
    '-loglevel',
    'warning',
    ...inputArguments,
    '-filter_complex',
    filterGraph.join(';'),
    '-map',
    '[atlas]',
    '-frames:v',
    String(totalFrames),
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '20',
    '-profile:v',
    'main',
    '-tag:v',
    'avc1',
    '-g',
    String(framesPerSecond * 2),
    '-movflags',
    '+faststart',
    '-y',
    atlasPath,
  ],
  { stdio: 'inherit' }
);

if (atlasResult.status !== 0) {
  process.exit(atlasResult.status ?? 1);
}

const posterPath = join(mediaDirectory, posterFilename);
const posterResult = spawnSync(
  'ffmpeg',
  [
    '-hide_banner',
    '-loglevel',
    'warning',
    '-ss',
    '1',
    '-i',
    atlasPath,
    '-frames:v',
    '1',
    '-update',
    '1',
    '-q:v',
    '3',
    '-y',
    posterPath,
  ],
  { stdio: 'inherit' }
);

if (posterResult.status !== 0) {
  process.exit(posterResult.status ?? 1);
}

const assetVersion = createHash('sha256')
  .update(readFileSync(atlasPath))
  .update(readFileSync(posterPath))
  .digest('hex')
  .slice(0, 12);
writeFileSync(assetsConfigPath, `${JSON.stringify({ version: assetVersion }, null, 2)}\n`);

console.log(
  `Generated ${atlasFilename} and ${posterFilename} from ${sources.length} project videos ` +
    `(${columns * tileWidth}x${rows * tileHeight} at ${framesPerSecond} fps, blur ${blur ? 'on' : 'off'}, ` +
    `ring smear ${temporalSmear.enabled ? `±${temporalSmear.radiusFrames} frames` : 'off'}, version ${assetVersion}).`
);
