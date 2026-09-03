const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

// Sub-path routing mapping for all 10 Electronics Learning Apps
const ROUTE_MAP = [
  { prefix: '/resistor', dir: 'resistor-sheet-app', defaultFile: 'index.html' },
  { prefix: '/multimeter', dir: 'multimeter_app', defaultFile: 'multimeter.html' },
  { prefix: '/oscilloscope', dir: 'osc_apps', defaultFile: 'oscilloscope.html' },
  { prefix: '/diode-app', dir: 'diode_application', defaultFile: 'index.html' },
  { prefix: '/diode', dir: 'diode_app', defaultFile: 'index.html' },
  { prefix: '/bjt-ac', dir: 'bjt_small_signal_app', defaultFile: 'index.html' },
  { prefix: '/bjt', dir: 'bjt_app', defaultFile: 'index.html' },
  { prefix: '/fet-ac', dir: 'fet_small_signal', defaultFile: 'index.html' },
  { prefix: '/fet', dir: 'fet_apps', defaultFile: 'index.html' },
  { prefix: '/opamp', dir: 'opamp', defaultFile: 'index.html' }
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(urlObj.pathname);

  // 1. Root Dashboard
  if (pathname === '/' || pathname === '/index.html' || pathname === '/dashboard') {
    serveStaticFile(path.join(__dirname, 'index.html'), res);
    return;
  }

  // 2. Check for App Sub-paths
  for (const route of ROUTE_MAP) {
    if (pathname === route.prefix) {
      // Redirect to trailing slash for proper relative asset loading
      res.writeHead(302, { 'Location': route.prefix + '/' });
      res.end();
      return;
    }

    if (pathname.startsWith(route.prefix + '/')) {
      let subPath = pathname.substring(route.prefix.length);
      if (subPath === '/' || subPath === '') {
        subPath = '/' + route.defaultFile;
      }
      const targetFile = path.join(__dirname, route.dir, subPath);
      serveStaticFile(targetFile, res);
      return;
    }
  }

  // 3. Fallback to Root Directory Static File
  const rootTargetFile = path.join(__dirname, pathname);
  serveStaticFile(rootTargetFile, res);
});

function serveStaticFile(filePath, res) {
  // Security check: ensure path is within __dirname
  const safePath = path.resolve(filePath);
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden: Access Denied');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
          <meta charset="UTF-8">
          <title>404 Not Found — Electronics Portal</title>
          <style>
            body { background: #050b14; color: #f8fafc; font-family: 'Segoe UI', system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { text-align: center; background: rgba(15, 23, 42, 0.8); padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.2); box-shadow: 0 12px 36px rgba(0,0,0,0.5); }
            h1 { font-size: 3rem; color: #fb7185; margin: 0 0 1rem; }
            p { color: #94a3b8; margin-bottom: 1.5rem; font-size: 1.1rem; }
            a { display: inline-block; background: #38bdf8; color: #020617; font-weight: 700; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 8px; transition: all 0.2s; }
            a:hover { background: #7dd3fc; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>404</h1>
            <p>ไม่พบหน้าที่คุณค้นหา (Page Not Found)</p>
            <a href="/">← กลับสู่หน้า Master Dashboard</a>
          </div>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
  });
}

server.listen(PORT, () => {
  console.log('================================================================');
  console.log('  🚀 Electronics Web Learning Lab — Unified Master Portal');
  console.log(`  🌐 Master Dashboard URL : http://localhost:${PORT}/`);
  console.log('================================================================');
  console.log('  📚 Available Apps (Sub-paths & Dedicated Ports):');
  console.log(`  1.  Resistor & DC Circuits   -> http://localhost:${PORT}/resistor/     (Port 3001)`);
  console.log(`  2.  Multimeter Simulator     -> http://localhost:${PORT}/multimeter/   (Port 3002)`);
  console.log(`  3.  Oscilloscope Simulator   -> http://localhost:${PORT}/oscilloscope/ (Port 3000)`);
  console.log(`  4.  Diode Basics & Rectifier -> http://localhost:${PORT}/diode/        (Port 3003)`);
  console.log(`  5.  BJT Transistor & DC Bias -> http://localhost:${PORT}/bjt/          (Port 3004)`);
  console.log(`  6.  FET & MOSFET Learning    -> http://localhost:${PORT}/fet/          (Port 3007)`);
  console.log(`  7.  BJT Small-Signal AC      -> http://localhost:${PORT}/bjt-ac/       (Port 3006)`);
  console.log(`  8.  FET Small-Signal AC      -> http://localhost:${PORT}/fet-ac/       (Port 3005)`);
  console.log(`  9.  Diode Applications       -> http://localhost:${PORT}/diode-app/    (Port 3008)`);
  console.log(`  10. Op-Amp Interactive Lab   -> http://localhost:${PORT}/opamp/        (Port 3009)`);
  console.log('================================================================\n');
});
