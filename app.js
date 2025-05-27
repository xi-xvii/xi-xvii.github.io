// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image dimensions
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 8;

// 2) Define map bounds (pixel coordinates)
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 3) Initialize map with manual zoom and center
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
});

// Set zoom and center to force tile requests
const initialZoom = 0;
map.setView([imgH / 2, imgW / 2], initialZoom);

console.log("🗺️ map initialized & centered at", [imgH / 2, imgW / 2]);

// 4) Add tile layer with Y flip and debug logging
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

// 5) Debug events
map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));