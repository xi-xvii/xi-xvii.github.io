// 1) Configuration
const imgWidth  = 11000;
const imgHeight = 11000;
const tileSize  = 256;
const maxZoom   = 6;

// 2) Bounds for Leaflet’s CRS.Simple
const bounds = L.latLngBounds(
  [0,       0      ],  // top-left
  [imgHeight, imgWidth] // bottom-right
);

// 3) Initialize map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom,
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

// 4) Fit to your full image
map.fitBounds(bounds);

// 5) GridLayer with Y‐flip for TMS
L.gridLayer({
  tileSize: tileSize,
  minZoom:  0,
  maxZoom:  maxZoom,
  noWrap:   true,
  
  createTile: function(coords, done) {
    const { x, y, z } = coords;
    
    // how many tiles across/down at this zoom?
    const factor = Math.pow(2, z);
    const cols   = Math.ceil((imgWidth  * factor) / tileSize);
    const rows   = Math.ceil((imgHeight * factor) / tileSize);

    // flip Y for TMS origin
    const tmsY = (rows - 1) - y;

    // out-of-range check
    if (x < 0 || x >= cols || tmsY < 0 || tmsY >= rows) {
      const empty = document.createElement('div');
      done(null, empty);
      return empty;
    }

    // otherwise load the tile
    const img = document.createElement('img');
    img.src    = `tiles/${z}/${x}/${tmsY}.png`;
    img.alt    = '';
    img.onload  = () => done(null, img);
    img.onerror = () => done(null, img);
    return img;
  }
}).addTo(map);

// 6) Re-add your markers/popups
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
  </video>
`);