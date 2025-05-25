// 🍃 Quick log so we know this file is live
console.log("▶️ app.js loaded");

// 1) Your image and tile config
const imgWidth   = 11000;
const imgHeight  = 11000;
const tileSize   = 256;
const maxZoom    = 6;

// 2) Bounds in “pixel” (flat) coords and center point
const bounds = L.latLngBounds([0, 0], [imgHeight, imgWidth]);
const center = [imgHeight/2, imgWidth/2];

// 3) Initialize Leaflet map (CRS.Simple = flat, no lat/long)
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZoom,
  zoomControl:true
}).setView(center, 0);

console.log("🗺️ map initialized at", center);

// 4) Add a custom‐URL tileLayer that flips Y correctly for every zoom
L.tileLayer('', {
  tileSize:       tileSize,
  minZoom:        0,
  maxZoom:        maxZoom,
  noWrap:         true,
  continuousWorld:false,
  bounds:         bounds,
  errorTileUrl:   '',

  // Here’s the magic: compute rows at this zoom, then invert y
  getTileUrl(coords) {
    const { x, y, z } = coords;
    // how many tiles tall/wide at this zoom?
    const scale = Math.pow(2, z);
    const cols  = Math.ceil((imgWidth  * scale) / tileSize);
    const rows  = Math.ceil((imgHeight * scale) / tileSize);
    // invert y so 0 at bottom becomes 0 at top, etc.
    const tmsY = rows - y - 1;
    // build the actual URL
    return `tiles/${z}/${x}/${tmsY}.png`;
  }
}).addTo(map);

console.log("🖼️ custom tileLayer added");

// 5) Fit & lock the view to your image bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);

console.log("🔒 panning locked to image bounds");

// 6) (Optional) watch successes/fails
map.on('tileload',  e => console.log("✅ tileload",  e.tile.src));
map.on('tileerror', e => console.warn("❌ tileerror", e.tile.src));
map.on('zoomend',   ()  => console.log("🔍 zoom →", map.getZoom()));
map.on('moveend',   ()  => console.log("📍 center →", map.getCenter()));