console.log("▶️ map.js loaded");

const tileSize = 256;
const maxZoom = 8;
const mapSize = tileSize * Math.pow(2, maxZoom);
const bounds = [[0, 0], [mapSize, mapSize]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

// ✅ Standard tileLayer with TMS Y-axis flip
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  noWrap: true,
  tms: true,  // Flip y-axis for bottom-left origin tiles
  minZoom: 0,
  maxZoom: maxZoom,
  bounds: bounds,
  attribution: 'GTA VI Fan Map'
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileload', e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));