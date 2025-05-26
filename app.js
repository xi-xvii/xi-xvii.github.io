// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Your image’s pixel size and max zoom
const imgW = 11000;
const imgH = 11000;
const maxZ = 6;

// 2) Define the map bounds in “pixel” coords: [southWest, northEast]
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 3) Init the map, snap zooms to integers, and fit to those bounds
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZ,
  zoomSnap:   1,
  zoomDelta:  1,
  zoomControl:true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 4) Add your XYZ tiles (no TMS, only positive indices)
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         maxZ,
  errorTileUrl:    ''    // blank instead of 404s
}).addTo(map);

console.log("🖼️ tileLayer added");

// 5) (Optional) debug tile loads
map.on('tileload',  e => console.log("✅", e.tile.src));
map.on('tileerror', e => console.warn("❌", e.tile.src));
