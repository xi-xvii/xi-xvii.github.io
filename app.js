// ========== CONFIGURATION ==========
const imgWidth    = 11000;            // your image width in px
const imgHeight   = 11000;            // your image height in px
const tileSize    = 256;              // standard tile size
const maxNativeZ  = 6;                // the max zoom level you generated

// compute how many tiles span the image at each axis
const tileCountX  = Math.ceil(imgWidth  / tileSize);
const tileCountY  = Math.ceil(imgHeight / tileSize);

// define the full image bounds in map coordinates ([lat, lng] = [y, x])
const imageBounds = L.latLngBounds([0,      0     ], 
                                   [imgHeight, imgWidth]);

// ========== INITIALIZE MAP ==========
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxNativeZ,
  zoomControl: true,
  zoomSnap:    1,      // restrict to integer zooms
  zoomDelta:   1,
  maxBounds:     imageBounds,
  maxBoundsViscosity: 1.0,  // “stick” to the image
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// ========== TILE LAYER ==========
L.tileLayer(undefined, {
  tileSize: tileSize,
  noWrap:   true,
  bounds:   imageBounds,
  minZoom:  0,
  maxZoom:  maxNativeZ,

  // custom createTile: skip any tile coords outside [0..tileCount-1]
  createTile: function(coords, done) {
    const { x, y, z } = coords;
    // if x or y is negative or beyond your computed counts, return empty
    if (
      z > maxNativeZ ||
      x < 0      || x >= tileCountX ||
      y < 0      || y >= tileCountY
    ) {
      const empty = document.createElement('div');
      done(null, empty);
      return empty;
    }
    // else create an <img> pointing at your real tile
    const img = document.createElement('img');
    img.src = `tiles/${z}/${x}/${y}.png`;
    img.alt = '';
    img.onload  = () => done(null, img);
    img.onerror = () => done(null, img);
    return img;
  }
}).addTo(map);

// ========== FIT BOUNDS ==========
map.fitBounds(imageBounds);

// ========== YOUR MARKERS ==========
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
