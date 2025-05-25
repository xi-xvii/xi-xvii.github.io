console.log("▶️ app.js running");

// 1) Map dimensions & zoom range
const W = 11000, H = 11000, maxZ = 6;
// center of the image in [lat, lng]
const center = [H/2, W/2];

// 2) Create the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ
}).setView(center, 0);
console.log("🗺️ map initialized at", center);

// 3) Add a simple XYZ tile layer
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         maxZ,
  errorTileUrl:    ''  // blank instead of 404
}).addTo(map);
console.log("🖼️ tileLayer added");

// 4) Lock panning to the image bounds
const southWest = map.unproject([0,  H], maxZ);
const northEast = map.unproject([W,  0], maxZ);
map.setMaxBounds([southWest, northEast]);
console.log("🔒 panning locked");