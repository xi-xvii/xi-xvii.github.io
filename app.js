// 1) Confirm script is running
console.log("▶️ app.js loaded");

// 2) Initialize a map in CRS.Simple, zoom locked to 0
const map = L.map('map', {
  crs:     L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0,
  zoomControl: false
}).setView([0, 0], 0);

console.log("🗺️ map initialized at [0,0], zoom 0");

// 3) Add a single-tile layer pointing at 0/0/0.png
L.tileLayer('tiles/0/0/0.png', {
  tileSize:     256,
  noWrap:       true,
  continuousWorld: false,
  errorTileUrl: ''  // blank instead of 404
}).addTo(map);

console.log("🖼️ tileLayer added for tiles/0/0/0.png");

// 4) Watch for load/fail events
map.on('tileload',  e => console.log("✅ tileload:",  e.tile.src));
map.on('tileerror', e => console.error("❌ tileerror:", e.tile.src));
