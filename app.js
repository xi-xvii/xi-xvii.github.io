// 🍃 Debug
console.log("app.js running");

// 1) Your image’s size
const imgW = 11000;
const imgH = 11000;
const maxZ = 6;

// 2) Define the map “world” in pixel-units (lat=y, lng=x)
const bounds = L.latLngBounds(
  [0,    0   ],   // SW corner: bottom-left of image
  [imgH, imgW]    // NE corner: top-right of image
);
console.log("📐 bounds set to", bounds);

// 3) Initialize the map & fit to bounds
const map = L.map('map', {
  crs:       L.CRS.Simple,
  minZoom:   0,
  maxZoom:   maxZ,
  zoomControl: true
}).fitBounds(bounds);
console.log("🗺 map initialized");

// 4) Add your tiles with the default numbering (tms: false)
//    Leaflet will request only 0 ≤ x ≤ ceil(imgW/256)-1
//                       and 0 ≤ y ≤ ceil(imgH/256)-1
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  // no tms:true here!
  noWrap:       true,
  continuousWorld: false,
  bounds:       bounds,
  tileSize:     256,
  minZoom:      0,
  maxZoom:      maxZ,
  errorTileUrl: ''   // blank instead of 404
}).addTo(map);
console.log("🖼 tileLayer added");

// 5) Optional: lock panning to those bounds
map.setMaxBounds(bounds);
console.log("🔒 panning locked");

// 6) Debug loading events
map.on('tileload',  e => console.log("✅ tileload",  e.tile.src));
map.on('tileerror', e => console.warn("❌ tileerror", e.tile.src));
map.on('zoomend',   ()  => console.log("🔍 zoom to", map.getZoom()));
map.on('moveend',   ()  => console.log("📍 center at", map.getCenter()));
