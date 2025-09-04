const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// Get commit hash from Git
let commitHash = 'unknown';
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.error('Cannot get the commit hash:', e);
}

// Create object version information
const versionInfo = {
  version,
  commit: commitHash,
  buildTime: new Date().getTime(),
};

// Write to file public/version.json
const filePath = path.join(__dirname, '../public/version.json');
fs.writeFileSync(filePath, JSON.stringify(versionInfo, null, 2));

console.log('✅ Generated version.json:', versionInfo);
