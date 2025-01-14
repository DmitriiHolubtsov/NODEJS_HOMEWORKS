const os = require('os');

console.log('Platform:', os.platform());
console.log('Total memory:', os.totalmem());
console.log('Free memory:', os.freemem());
console.log('Uptime (seconds):', os.uptime());