console.log("▶️ map.js loaded");

const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 8;

const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).setView([imgH / 2, imgW / 2], 5);

console.log("🗺️ map initialized");

L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZ,
  noWrap: true,
  bounds: bounds,
  errorTileUrl: '',
  getTileUrl: function (coords) {
  const url = `tiles/${coords.z}/${coords.x}/${coords.y}.png`;
  console.log("✅ USING POSITIVE Y TILE URL:", url); // Unique log
  return url;
}
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));
