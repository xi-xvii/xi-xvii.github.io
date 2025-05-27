console.log("▶️ map.js loaded");

// 1) One tile at zoom 0 is 256 x 256 px
const tileSize = 256;
const bounds = [[0, 0], [tileSize, tileSize]];

// 2) Init map locked to zoom level 0
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0
}).fitBounds(bounds);

console.log("🗺️ map initialized and fit to one-tile bounds");

// 3) Force load tile 0/0/0
L.tileLayer('', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: 0,
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