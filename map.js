console.log("▶️ map.js loaded");

const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 8;
const nativeZ = 6; // max zoom level your image realistically covers

const bounds = [[0, 0], [imgH, imgW]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1
}).fitBounds(bounds);

console.log("🗺️ map initialized and fit to bounds");

L.tileLayer('', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZ,
  maxNativeZoom: nativeZ,
  noWrap: true,
  bounds: bounds,
  errorTileUrl: '',
  getTileUrl: function (coords) {
    const url = `tiles/${coords.z}/${coords.x}/${coords.y}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileload', e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror', e => console.warn("❌ error:", e.tile.src));