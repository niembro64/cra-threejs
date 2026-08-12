#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { networkInterfaces } from 'node:os';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const require = createRequire(import.meta.url);
const reactScriptsBin = require.resolve('react-scripts/bin/react-scripts.js');

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

console.log(`Starting CRA dev server on ${HOST}:${PORT}`);
console.log(`Local:   http://localhost:${PORT}`);

for (const { name, address } of getNetworkAddresses()) {
  console.log(`Network: http://${address}:${PORT} (${name})`);
}

console.log('');

const child = spawn(process.execPath, [reactScriptsBin, 'start'], {
  env: {
    ...process.env,
    HOST,
    PORT,
  },
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
