// Copies the game from ../duck (or ./duck) into ./game, leaving out extension-only files.
const fs = require('fs'), path = require('path');
const src = ['../duck', './duck'].map(p => path.resolve(__dirname, '..', p)).find(p => fs.existsSync(p));
if (!src) { console.log('No ../duck source folder found; keeping existing ./game'); process.exit(0); }
const dst = path.resolve(__dirname, '..', 'game');
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true, filter: f => !/node_modules|tools|ARCHITECTURE|manifest\.json|background\.js/.test(f) });
fs.mkdirSync(path.resolve(__dirname, '..', 'build'), { recursive: true });
fs.copyFileSync(path.join(src, 'icons', 'icon128.png'), path.resolve(__dirname, '..', 'build', 'icon.png'));
console.log('synced game from', src);
