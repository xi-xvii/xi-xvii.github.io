// 1) Image dimensions and bounds
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = L.latLngBounds([0, 0], [imgHeight, imgWidth]);

// 2) Initialize the map, clamped to those bounds
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 6,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// 3) Use a GridLayer instead of TileLayer
L.gridLayer({
  tileSize: 256,
  minZoom: 0,
  maxZoom: 6,
  noWrap:  true,
  bounds:  bounds,

  createTile: function(coords, done) {
    // coords = { x, y, z }
    const { x, y, z } = coords;
    // if outside your computed grid, return an empty div
    const maxX = Math.ceil(imgWidth  / 256) - 1;
    const maxY = Math.ceil(imgHeight / 256) - 1;
    if (x < 0 || x > maxX || y < 0 || y > maxY) {
      const empty = document.createElement('div');
      done(null, empty);
      return empty;
    }
    // otherwise return an <img> pointing at the real tile
    const img = document.createElement('img');
    img.src = `tiles/${z}/${x}/${y}.png`;
    img.alt = '';
    img.onload  = () => done(null, img);
    img.onerror = () => done(null, img);
    return img;
  }
}).addTo(map);

// 4) Fit the full map in view
map.fitBounds(bounds);

// 5) Re-add your markers
L.marker([600, 800])
 .addTo(map)
 .bindPopup(`
   <h3>Location Alpha</h3>
   <img src="photos/alpha.jpg" width="200"><br>
   <video width="240" controls>
     <source src="videos/alpha.mp4" type="video/mp4">
   </video>
 `);
