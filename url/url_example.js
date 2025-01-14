const { URL } = require('url');

const urlString = 'https://example.com/path?name=Node.js';
const urlObject = new URL(urlString);

console.log('Protocol:', urlObject.protocol);
console.log('Pathname:', urlObject.pathname);
console.log('Query parameter (name):', urlObject.searchParams.get('name'));