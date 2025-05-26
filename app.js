// 1) Debug
console.log("▶️ app.js loaded");

// 2) Your image’s dimensions & zoom range
const imgW  = 11000;
const imgH  = 11000;
const maxZ  = 8;           // assuming you bumped to level 8
const center = [imgH/2, imgW/2];

// 3) Make the map in flat CRS and set initial view
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZ,
  zoomControl:true
}).setView(center, 2);      // start zoomed in two levels

console.log("🗺️ map initialized at", center);

// 4) Add your XYZ tiles
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  minZoom:         0,
  maxZoom:         maxZ,
  noWrap:          true,
  continuousWorld: false,
  errorTileUrl:    ''
}).addTo(map);

console.log("🖼️ tileLayer added");

// 5) (Removed) pan lock so you can move freely
// map.setMaxBounds(L.latLngBounds([0, 0], [imgH, imgW]));

console.log("🔓 pan lock removed — you can now pan anywhere");

// 6) Optional debug events
map.on('tileload',   e => console.log("✅ tileload",   e.tile.src));
map.on('tileerror',  e => console.warn("❌ tileerror",  e.tile.src));
map.on('zoomend',    ()  => console.log("🔍 zoom →",     map.getZoom()));
map.on('moveend',    ()  => console.log("📍 center →",   map.getCenter()));
