// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Full image dimensions
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 7;

// 2) Define bounds of the full image
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 3) Init map, center at middle, start at zoom 0
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).setView([imgH / 2, imgW / 2], 0);

console.log("🗺️ map initialized & centered");

// 4) Add red rectangle overlay at zoom 0 tile bounds
const tileGrid = L.rectangle([[0, 0], [tileSize, tileSize]], {
  color: 'red',
  weight: 2
}).addTo(map);

console.log("📏 overlay tile 0/0/0 bounds:", [[0, 0], [tileSize, tileSize]]);

// 5) Tile layer with Y-flip + debug
L.tileLayer('', {
  noWrap: true,
  minZoom: 0,
  maxZoom: maxZ,
  tileSize: tileSize,
  bounds: bounds,
  errorTileUrl: '',

  getTileUrl: function (coords) {
    const yFlipped = Math.pow(2, coords.z) - coords.y - 1;
    const url = `tiles/${coords.z}/${coords.x}/${yFlipped}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

// 6) Tile load debug
map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));
