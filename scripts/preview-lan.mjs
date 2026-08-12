#!/usr/bin/env node

import { spawn, spawnSync } from 'node:child_process';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { networkInterfaces, platform } from 'node:os';
import { extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_PORT = 4173;
const HOST = process.env.HOST || '0.0.0.0';
const requestedPort = Number.parseInt(process.env.PORT || String(DEFAULT_PORT), 10);
const buildDir = resolve(process.env.BUILD_DIR || 'build');
const indexFile = join(buildDir, 'index.html');

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.wasm', 'application/wasm'],
  ['.webm', 'video/webm'],
  ['.webp', 'image/webp'],
]);

function isWsl() {
  if (platform() !== 'linux') {
    return false;
  }

  if (process.env.WSL_DISTRO_NAME) {
    return true;
  }

  try {
    return readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft');
  } catch {
    return false;
  }
}

function toWindowsPath(path) {
  const result = spawnSync('wslpath', ['-w', path], { encoding: 'utf8' });

  if (result.status !== 0) {
    throw new Error(result.stderr || `Unable to convert path for Windows: ${path}`);
  }

  return result.stdout.trim();
}

function findWindowsNode() {
  const result = spawnSync('cmd.exe', ['/d', '/s', '/c', 'where node'], {
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    return '';
  }

  const windowsPath = result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  if (!windowsPath) {
    return '';
  }

  const wslPath = spawnSync('wslpath', ['-u', windowsPath], { encoding: 'utf8' });

  if (wslPath.status !== 0) {
    return '';
  }

  return wslPath.stdout.trim();
}

function startWithWindowsNodeFromWsl() {
  const nodePath = findWindowsNode();

  if (!nodePath) {
    return false;
  }

  const scriptPath = toWindowsPath(fileURLToPath(import.meta.url));

  console.log('Starting LAN preview with Windows Node for direct phone access.');

  const child = spawn(nodePath, [scriptPath], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      BUILD_DIR: toWindowsPath(buildDir),
      PREVIEW_LAN_NATIVE: '1',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (chunk) => process.stdout.write(chunk));
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));
  process.on('SIGINT', () => child.kill('SIGINT'));
  process.on('SIGTERM', () => child.kill('SIGTERM'));
  child.on('exit', (code) => process.exit(code ?? 0));
  child.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });

  return true;
}

function isInsideBuildDir(filePath) {
  const diff = relative(buildDir, filePath);
  return diff === '' || (!diff.startsWith('..') && !isAbsolute(diff));
}

function getExistingFile(filePath) {
  try {
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      return getExistingFile(join(filePath, 'index.html'));
    }

    return stats.isFile() ? filePath : '';
  } catch {
    return '';
  }
}

function findTargetFile(request) {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const decodedPath = decodeURIComponent(requestUrl.pathname);
  const requestedPath = resolve(buildDir, `.${decodedPath}`);

  if (!isInsideBuildDir(requestedPath)) {
    return { status: 403, filePath: '' };
  }

  const existingFile = getExistingFile(requestedPath);

  if (existingFile) {
    return { status: 200, filePath: existingFile };
  }

  const acceptsHtml = request.headers.accept?.includes('text/html');

  if (acceptsHtml || !extname(decodedPath)) {
    return { status: 200, filePath: indexFile };
  }

  return { status: 404, filePath: '' };
}

function parseRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader || '');

  if (!match) {
    return null;
  }

  const startText = match[1];
  const endText = match[2];
  let start = startText ? Number.parseInt(startText, 10) : 0;
  let end = endText ? Number.parseInt(endText, 10) : size - 1;

  if (!startText && endText) {
    const suffixLength = Number.parseInt(endText, 10);
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  }

  if (!Number.isInteger(start) || !Number.isInteger(end) || start > end || start >= size) {
    return null;
  }

  return {
    start,
    end: Math.min(end, size - 1),
  };
}

function sendFile(request, response, filePath) {
  const stats = statSync(filePath);
  const contentType = contentTypes.get(extname(filePath).toLowerCase()) || 'application/octet-stream';
  const range = parseRange(request.headers.range, stats.size);

  if (request.headers.range && !range) {
    response.writeHead(416, {
      'Content-Range': `bytes */${stats.size}`,
    });
    response.end();
    return;
  }

  if (range) {
    response.writeHead(206, {
      'Accept-Ranges': 'bytes',
      'Content-Length': range.end - range.start + 1,
      'Content-Range': `bytes ${range.start}-${range.end}/${stats.size}`,
      'Content-Type': contentType,
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath, range).pipe(response);
    return;
  }

  response.writeHead(200, {
    'Accept-Ranges': 'bytes',
    'Content-Length': stats.size,
    'Content-Type': contentType,
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

function getNetworkAddresses() {
  return Object.entries(networkInterfaces())
    .flatMap(([name, values = []]) =>
      values.map((value) => ({
        name,
        address: value.address,
        family: value.family,
        internal: value.internal,
      }))
    )
    .filter(({ address, family, internal }) => {
      const isIpv4 = family === 'IPv4' || family === 4;
      return isIpv4 && !internal && !address.startsWith('169.254.');
    });
}

function printUrls(port) {
  console.log(`Serving build from ${buildDir}`);
  console.log(`Local:   http://localhost:${port}`);

  for (const { name, address } of getNetworkAddresses()) {
    console.log(`Network: http://${address}:${port} (${name})`);
  }
}

function requestHandler(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  try {
    const { status, filePath } = findTargetFile(request);

    if (status === 403) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    if (status === 404) {
      response.writeHead(404);
      response.end('Not Found');
      return;
    }

    sendFile(request, response, filePath);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end('Internal Server Error');
  }
}

function startServer(port) {
  if (!existsSync(indexFile)) {
    console.error(`Missing ${indexFile}. Run npm run build first.`);
    process.exit(1);
  }

  const server = createServer(requestHandler);

  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && !process.env.PORT && port < DEFAULT_PORT + 10) {
      console.log(`Port ${port} is in use; trying ${port + 1}.`);
      startServer(port + 1);
      return;
    }

    console.error(error);
    process.exit(1);
  });

  server.listen(port, HOST, () => printUrls(port));
}

if (isWsl() && process.env.PREVIEW_LAN_NATIVE !== '1' && startWithWindowsNodeFromWsl()) {
  // The Windows process now owns the preview server.
} else {
  startServer(requestedPort);
}
