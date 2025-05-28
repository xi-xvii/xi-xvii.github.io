console.log("▶️ map.js loaded");

const tileSize = 256;
const maxZoom = 8;
const mapSize = tileSize * Math.pow(2, maxZoom); // 65536

// Define exact bounds to restrict tile fetching
const bounds = [[0, 0], [mapSize, mapSize]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

// DO NOT use `tms: true` unless Y=0 is BOTTOM of image
L.tileLayer('https://xi-xvii.github.io/tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  noWrap: true,
  bounds: bounds,
  minZoom: 0,
  maxZoom: maxZoom,
  attribution: 'GTA VI Fan Map'
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));
