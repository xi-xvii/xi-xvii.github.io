// Debug
console.log("▶️ app.js running");

// 1) Initialize the map at a *known* tile coordinate.
//    We want to load exactly tile Z=0, X=0, Y=0 from your tiles folder.
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0,  // LOCK to zoom level 0 for this test
}).setView([0, 0], 0);

console.log("🗺️ map initialized at [0,0], zoom 0");

// 2) Add a single-tile layer pointing at 0/0/0.png
L.tileLayer('tiles/0/0/0.png', {
  tileSize: 256,
  noWrap:   true,
  bounds:   [[0,0], [256,256]],  // make a tiny bounds so Leaflet thinks the map is just this tile
  minZoom:  0,
  maxZoom:  0,
  errorTileUrl: ''  // blank if missing
}).addTo(map);

console.log("🖼️ tileLayer added for tiles/0/0/0.png");

// 3) Watch for tile requests and errors
map.on('tileerror', (e) => {
  console.error("❌ tileerror loading:", e.tile.src);
});
map.on('tileload', (e) => {
  console.log("✅ tileload:", e.tile.src);
});