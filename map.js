console.log("▶️ map.js loaded");

const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZoom = 8;

// Set bounds to match image dimensions (in pixels)
const bounds = [[0, 0], [imgH, imgW]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

// ✅ Use full GitHub Pages URL for tiles
L.tileLayer('https://xi-xvii.github.io/tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  noWrap: true,
  minZoom: 0,
  maxZoom: maxZoom,
  bounds: bounds,
  attribution: 'GTA VI Fan Map'
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));