// 1) Debug
console.log("▶️ app.js loaded");

// 2) Image dimensions & zoom
const imgW = 11000, imgH = 11000, maxZ = 6;

// 3) Define the world‐coordinate bounds (pixel units)
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 4) Initialize the map and immediately fit to those bounds
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZ,
  zoomControl:true,
  noWrap:     true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 5) Add your XYZ tile layer
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  minZoom:        0,
  maxZoom:        maxZ,
  continuousWorld:false,
  errorTileUrl:   ''
}).addTo(map);

console.log("🖼️ tileLayer added");

// 6) (Optional) if you still want to start zoomed in two levels:
map.setView(bounds.getCenter(), 2);
console.log("🔍 zoomed in to level 2");

// 7) Debug events
map.on('tileload',   e => console.log("✅ tileload",   e.tile.src));
map.on('tileerror',  e => console.warn("❌ tileerror",  e.tile.src));
map.on('zoomend',    ()  => console.log("🔄 zoom →",     map.getZoom()));
map.on('moveend',    ()  => console.log("📍 center →",   map.getCenter()));
