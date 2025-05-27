// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Define tile size and bounds of tile 0/0/0 manually
const tileSize = 256;
const bounds = L.latLngBounds([0, 0], [tileSize, tileSize]);

// 2) Init map to view just this tile
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0,
  zoomSnap: 1,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & zoom fixed");

// 3) Add tile layer hardcoded to serve 0/0/0.png
L.tileLayer('', {
  tileSize: tileSize,
  noWrap: true,
  minZoom: 0,
  maxZoom: 0,
  getTileUrl: function () {
    const url = `tiles/0/0/0.png`;
    console.log("🧭 forcing tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 forced tileLayer added");

// 4) Debug events
map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));