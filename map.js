console.log("▶️ map.js loaded");

// 1 tile = 256x256 pixels
const tileSize = 256;
const bounds = [[0, 0], [tileSize, tileSize]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0
}).fitBounds(bounds);

console.log("🗺️ map initialized");

// Flip Y axis manually for zoom 0
L.tileLayer('', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: 0,
  noWrap: true,
  getTileUrl: function (coords) {
    const flippedY = 0; // Since zoom 0 has only one tile: 0/0/0
    const url = `tiles/${coords.z}/${coords.x}/${flippedY}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));