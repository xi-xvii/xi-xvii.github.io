// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image dimensions
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 6;

// 2) Define map bounds (pixel coordinates)
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 3) Initialize map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 4) Add flipped-Y tile layer
L.tileLayer('', {
  noWrap: true,
  minZoom: 0,
  maxZoom: maxZ,
  tileSize: tileSize,
  bounds: bounds,
  errorTileUrl: '',

  // Flip Y since L.CRS.Simple starts at bottom-left
  getTileUrl: function (coords) {
    const yFlipped = Math.pow(2, coords.z) - coords.y - 1;
    return `tiles/${coords.z}/${coords.x}/${yFlipped}.png`;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

// 5) Debugging
map.on('tileload', e => console.log("✅", e.tile.src));
map.on('tileerror', e => console.warn("❌", e.tile.src));
