console.log("▶️ map.js loaded");

const tileSize = 256;
const maxZoom = 8;

// Snap to full tiles: 43 tiles at zoom 8 = 11008px
const pixelWidth = 43 * tileSize;
const pixelHeight = 43 * tileSize;

const bounds = [[0, 0], [pixelHeight, pixelWidth]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

L.tileLayer('https://xi-xvii.github.io/tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  tms: true,
  noWrap: true,
  minZoom: 0,
  maxZoom: maxZoom,
  bounds: bounds,
  attribution: 'GTA VI Fan Map'
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));
