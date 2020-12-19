// server.js
const https = require('https');

const fs = require('fs');



// Redirect from http port 80 to https
const http = require('http');
http.createServer(function (req, res) {

  res.writeHead(200,{'Content-Type':'text/html'});
  res.write('<html><body>This is Home Page.</body></html>');
  res.end();

}).listen(80, () => console.log('http start well'));
