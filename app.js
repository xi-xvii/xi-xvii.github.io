// 🍃 Debug
console.log("🍃 app.js loaded");

// 1) Your map image’s pixel dimensions
const imgWidth  = 11000;
const imgHeight = 11000;
const maxZoom   = 6;

// 2) Define the “world” bounds in Leaflet lat/lng space
//    (since CRS.Simple is used, lat=y and lng=x in pixel units)
const bounds = L.latLngBounds(
  [0,         0        ],  // southwest corner (y=0, x=0)
  [imgHeight, imgWidth]   // northeast corner (y=11000, x=11000)
);
console.log("📐 bounds:", bounds);

// 3) Initialize the map and fit to those bounds
const map = L.map('map', {
  crs:       L.CRS.Simple,
  minZoom:   0,
  maxZoom:   maxZoom,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds");

// 4) Add your TMS tiles
//    - `tms: true` flips Y to match your raster’s bottom-left origin
//    - `bounds` ensures Leaflet never requests tiles outside this box
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:          true,
  noWrap:       true,
  bounds:       bounds,
  minZoom:      0,
  maxZoom:      maxZoom,
  errorTileUrl: ''    // blank instead of 404
}).addTo(map);

console.log("🖼️ tileLayer added");

// 5) (Optional) Lock panning to the image
map.setMaxBounds(bounds);
console.log("🔒 panning locked to bounds");

// 6) Debug tile‐load events
map.on('tileload',  e => console.log("✅ tileload:",  e.tile.src));
map.on('tileerror', e => console.warn("❌ tileerror:", e.tile.src));