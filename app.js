// 1) Quick debug
console.log("▶️ app.js loaded");

// 2) Your image’s dimensions & zoom range
const imgW  = 11000;
const imgH  = 11000;
const maxZ  = 6;

// 3) Center of the image (lat=y, lng=x)
const center = [imgH/2, imgW/2];

// 4) Make the map in flat CRS, set its initial view
const map = L.map('map', {
  crs:       L.CRS.Simple,
  minZoom:   0,
  maxZoom:   maxZ
}).setView(center, 0);

console.log("🗺 map initialized at", center);

// 5) Add your XYZ tiles (no TMS!)
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  minZoom:       0,
  maxZoom:       maxZ,
  noWrap:        true,
  continuousWorld:false,
  errorTileUrl:  ''   // blank instead of 404
}).addTo(map);

console.log("🖼 tileLayer added");

// 6) Lock panning to the bounds of the image
const sw = map.unproject([  0, imgH ], maxZ);
const ne = map.unproject([imgW,   0 ], maxZ);
map.setMaxBounds([sw, ne]);

console.log("🔒 panning locked");