const fs = require('fs');
const path = require('path');

// Get version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// Create object version information
const versionInfo = {
  version,
  buildTime: new Date().getTime(),
};

// Write to file public/version.json
const filePath = path.join(__dirname, '../public/version.json');
fs.writeFileSync(filePath, JSON.stringify(versionInfo, null, 2));

console.log('✅ Generated version.json:', versionInfo);
