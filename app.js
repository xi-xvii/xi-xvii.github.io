// 1) Image dims & bounds
console.log('▶️ app.js loaded');
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = L.latLngBounds([0, 0], [imgHeight, imgWidth]);

// 2) Init map
console.log('▶️ Initializing map with bounds', bounds);
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 6,
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

// 3) Add a simple marker so we know the map’s there
L.marker([0, 0]).addTo(map).bindPopup('Test marker at [0,0]');

// 4) Your grid layer
console.log('▶️ Adding gridLayer');
L.gridLayer({
  tileSize: 256,
  minZoom: 0,
  maxZoom: 6,
  noWrap: true,
  // remove "bounds" here for now
  createTile(coords, done) {
    console.log('   ⚙️ createTile coords=', coords);
    const { x, y, z } = coords;
    // quick bounds check (no scaling)
    const maxX = Math.ceil(imgWidth / 256) - 1;
    const maxY = Math.ceil(imgHeight / 256) - 1;
    if (x < 0 || x > maxX || y < 0 || y > maxY) {
      console.log(`   ⚠️ skipping out-of-range tile ${z}/${x}/${y}`);
      const d = document.createElement('div');
      done(null, d);
      return d;
    }
    const img = document.createElement('img');
    img.src = `tiles/${z}/${x}/${y}.png`;
    console.log(`   🖼️ loading tile ${z}/${x}/${y}.png`);
    img.onload  = () => done(null, img);
    img.onerror = () => {
      console.log(`   ❌ failed tile ${z}/${x}/${y}.png`);
      done(null, img);
    };
    return img;
  }
}).addTo(map);

// 5) Fit bounds
map.fitBounds(bounds);
console.log('▶️ map.fitBounds done');