const path = require('path');

const filePath = 'folder/../folder/file.txt';
const normalizedPath = path.normalize(filePath);
console.log('Normalized path:', normalizedPath);

const extension = path.extname('example.txt');
console.log('File extension:', extension);