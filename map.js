console.log("▶️ map.js loaded");

// 256x256 pixel map for one tile at zoom 0
const tileSize = 256;
const bounds = [[0, 0], [tileSize, tileSize]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0
}).fitBounds(bounds);

console.log("🗺️ map initialized");

L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  noWrap: true,
  bounds: bounds
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));