// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image & tile config
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 7;

// 2) Leaflet scales CRS.Simple from zoom 0 upward. So:
// At zoom 7: 256 * 2^7 = 32768px → we want our image (11000px) to fit inside that space
// We'll scale the image accordingly
const scale = Math.pow(2, maxZ); // 128 for zoom 7
const scaledW = imgW / scale;
const scaledH = imgH / scale;

// 3) Define bounds at zoom level 0
const bounds = L.latLngBounds([0, 0], [scaledH, scaledW]);

// 4) Init map, center at image center in scaled units
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).setView([scaledH / 2, scaledW / 2], maxZ); // start fully zoomed in

console.log("🗺️ map initialized & centered");

// 5) Tile layer with flipped Y
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
