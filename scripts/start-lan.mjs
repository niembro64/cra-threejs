#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { networkInterfaces } from 'node:os';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const args = new Set(process.argv.slice(2));
const urlsOnly = args.has('--urls-only');
const showAllUrls = args.has('--all') || process.env.SHOW_ALL_URLS === '1';
const verboseLogs = process.env.START_LAN_VERBOSE === '1';
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

function isVirtualInterface(name) {
  return /\b(default switch|docker|tailscale|virtualbox|vethernet|vmware|wsl)\b/i.test(name);
}

function isPrivateAddress(address) {
  return (
    /^10\./.test(address) ||
    /^192\.168\./.test(address) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(address)
  );
}

function getPreferredAddress(addresses) {
  return (
    addresses.find(({ address, name }) => isPrivateAddress(address) && !isVirtualInterface(name)) ||
    addresses.find(({ address }) => isPrivateAddress(address)) ||
    addresses[0]
  );
}

function formatUrl(address) {
  return `http://${address}:${PORT}`;
}

function printUrls(title = 'Available URLs') {
  const addresses = getNetworkAddresses();
  const preferred = getPreferredAddress(addresses);

  console.log(title);
  console.log(`  Local: ${formatUrl('localhost')}`);

  if (preferred) {
    console.log(`  Phone: ${formatUrl(preferred.address)} (${preferred.name})`);
  } else {
    console.log('  Phone: no network address found');
  }

  if (showAllUrls) {
    for (const { name, address } of addresses) {
      if (address !== preferred?.address) {
        console.log(`  Other: ${formatUrl(address)} (${name})`);
      }
    }
  } else if (addresses.length > 1) {
    console.log('  More:  npm run urls:lan');
  }
}

function createLineFilter() {
  let buffer = '';
  let errorMode = false;
  let lastStatus = '';
  let lastStatusAt = 0;

  const printStatus = (message) => {
    const now = Date.now();

    if (message === lastStatus && now - lastStatusAt < 1500) {
      return;
    }

    lastStatus = message;
    lastStatusAt = now;
    console.log(message);
    printUrls();
  };

  const printLine = (line) => {
    if (verboseLogs) {
      console.log(line);
      return;
    }

    if (/Failed to compile|ERROR in|Module not found|Syntax error|Type error/i.test(line)) {
      errorMode = true;
    }

    if (/Starting the development server/i.test(line)) {
      console.log('Starting development server...');
      return;
    }

    if (/Compiled successfully/i.test(line)) {
      errorMode = false;
      printStatus('Compiled successfully.');
      return;
    }

    if (/Compiled with warnings|webpack compiled with \d+ warnings?/i.test(line)) {
      errorMode = false;
      printStatus('Compiled with warnings. Warning details are hidden here; run npm run start:local to see them.');
      return;
    }

    if (errorMode) {
      console.log(line);
      return;
    }

    if (/Something is already running on port|Would you like to run the app on another port/i.test(line)) {
      console.log(line);
    }
  };

  return (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';

    for (const line of lines) {
      printLine(line);
    }
  };
}

if (urlsOnly) {
  printUrls(`Available URLs for port ${PORT}`);
  process.exit(0);
}

console.log(`Starting CRA dev server on ${HOST}:${PORT}`);
printUrls();
console.log('');

const child = spawn(process.execPath, [reactScriptsBin, 'start'], {
  env: {
    ...process.env,
    BROWSER: process.env.BROWSER || 'none',
    DISABLE_ESLINT_PLUGIN: process.env.DISABLE_ESLINT_PLUGIN || 'true',
    HOST,
    PORT,
  },
  stdio: ['inherit', verboseLogs ? 'inherit' : 'pipe', verboseLogs ? 'inherit' : 'pipe'],
});

if (!verboseLogs) {
  const filterOutput = createLineFilter();
  child.stdout.on('data', filterOutput);
  child.stderr.on('data', filterOutput);
}

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
