const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3003;

http.createServer((req, res) => {
  // Normalize path and remove query parameters
  const urlPath = req.url.split('?')[0];
  
  // Default to index.html
  let targetFile = urlPath;
  if (urlPath === '/' || urlPath === '/diode.html') {
    targetFile = '/index.html';
  }
  
  let filePath = path.join(__dirname, targetFile);
  
  // Basic security check: make sure we don't read outside our root directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden: Access Denied');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('File not found / ไม่พบไฟล์ที่ค้นหา');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Server Error: ' + err.code);
      }
    } else {
      let ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'text/javascript; charset=utf-8';
      else if (ext === '.css') contentType = 'text/css; charset=utf-8';
      else if (ext === '.json') contentType = 'application/json; charset=utf-8';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.ico') contentType = 'image/x-icon';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Diode Learning Lab & Simulator Web App is running!`);
  console.log(`  Local URL: http://localhost:${PORT}/`);
  console.log(`======================================================\n`);
});
