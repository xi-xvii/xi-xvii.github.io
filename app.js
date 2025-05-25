// 🍃 0) Debug log to confirm app.js loaded
console.log("🍃 app.js loaded");

// 1) Image & tile config
const imgWidth  = 11000;
const imgHeight = 11000;
const tileSize  = 256;
const maxZoom   = 6;

// 2) Compute our “world” bounds ([southWest, northEast])
const bounds = L.latLngBounds([0, 0], [imgHeight, imgWidth]);
console.log("📐 bounds:", bounds);

// 3) Initialize the map (flat CRS)
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  zoomAnimation: false,
  fadeAnimation: false,
  markerZoomAnimation: false,
  inertia: false
});
console.log("🗺️ map initialized");

// 4) Create & add the GridLayer *before* fitting bounds
const grid = L.gridLayer({
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZoom,
  noWrap: true,
  createTile: function(coords, done) {
    const { x, y, z } = coords;
    // log every createTile call
    console.log("⚙️ createTile called for", coords);

    // how many tiles wide/tall at this zoom?
    const scale = Math.pow(2, z);
    const cols  = Math.ceil((imgWidth  * scale) / tileSize);
    const rows  = Math.ceil((imgHeight * scale) / tileSize);

    // skip out-of-range
    if (x < 0 || x >= cols || y < 0 || y >= rows) {
      console.log("   🚫 skipping tile", coords);
      const empty = document.createElement('div');
      done(null, empty);
      return empty;
    }

    // otherwise create an <img>
    const img = document.createElement('img');
    img.src = `tiles/${z}/${x}/${y}.png`;
    console.log("   🖼️ loading", img.src);
    img.onload  = () => done(null, img);
    img.onerror = () => {
      console.error("   ❌ failed to load", img.src);
      done(null, img);
    };
    return img;
  }
});
grid.addTo(map);
console.log("📋 grid layer added");

// 5) Now fit the map to our image bounds
map.fitBounds(bounds);
console.log("🔍 fitBounds called");

// 6) (Optional) add a test marker at origin
L.marker([0, 0]).addTo(map).bindPopup("origin");
console.log("📍 test marker added");

// 7) Finally, move the view to center+zoom 1 (ensures tile loading starts)
const center = bounds.getCenter();
map.setView(center, 1);
console.log("🔧 setView to", center, "zoom 1");