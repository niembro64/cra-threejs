import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const mediaDirectory = join(projectRoot, 'public', 'project_media');
const atlasFilename = 'project-atlas.mp4';
const posterFilename = 'project-atlas.jpg';

const columns = 5;
const rows = 5;
const tileWidth = 192;
const tileHeight = 108;
const framesPerSecond = 10;
const durationSeconds = 12;

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

const filterGraph = [
  ...tileFilters,
  `${tileInputs}xstack=inputs=${sources.length}:layout=${layout}:fill=black[stacked]`,
  // Retain color and contrast while taking just enough saturation off for the
  // project footage to sit behind the foreground content.
  `[stacked]eq=contrast=1:brightness=0.03:saturation=0.9,format=yuv420p[atlas]`,
].join(';');

const atlasPath = join(mediaDirectory, atlasFilename);
const atlasResult = spawnSync(
  'ffmpeg',
  [
    '-hide_banner',
    '-loglevel',
    'warning',
    ...inputArguments,
    '-filter_complex',
    filterGraph,
    '-map',
    '[atlas]',
    '-t',
    String(durationSeconds),
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '25',
    '-profile:v',
    'main',
    '-level',
    '3.1',
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
    join(mediaDirectory, posterFilename),
  ],
  { stdio: 'inherit' }
);

if (posterResult.status !== 0) {
  process.exit(posterResult.status ?? 1);
}

console.log(`Generated ${atlasFilename} and ${posterFilename} from ${sources.length} project videos.`);
