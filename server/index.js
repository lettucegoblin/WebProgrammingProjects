// vanilla node server
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.end('Hello World');
});

console.log("1. Trying to start server.");
server.listen(PORT, () => {
  console.log(`2. Server listening on port http://localhost:${PORT}`);
});
console.log("3. end of file.");