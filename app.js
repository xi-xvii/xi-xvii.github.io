// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image & tile settings
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 7;

// 2) Define full bounds in image pixel units
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 3) Custom CRS that matches pixel units directly
const myCRS = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(1, 0, -1, 0), // flip Y to top-left origin
  scale: function (zoom) {
    return Math.pow(2, zoom);
  }
});

// 4) Init map with pixel-accurate CRS
const map = L.map('map', {
  crs: myCRS,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).setView([imgH / 2, imgW / 2], 5); // Start at zoom 5

console.log("🗺️ map initialized & centered");

// 5) Add tile layer with flipped Y axis
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

// 6) Debug tile loads
map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));
