// Copy leaflet images to public folder
const fs = require('fs-extra');
const path = require('path');

const source = path.join(process.cwd(), 'node_modules', 'leaflet', 'dist', 'images');
const destination = path.join(process.cwd(), 'public', 'leaflet', 'images');

fs.ensureDirSync(destination);
fs.copySync(source, destination);

console.log('Leaflet images copied to public folder');