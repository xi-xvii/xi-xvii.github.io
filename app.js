// 1) Core config: image size, tile size, max zoom
const imgWidth  = 11000;
const imgHeight = 11000;
const tileSize  = 256;
const maxZoom   = 6;

// 2) World bounds in “pixel” coords
const bounds = L.latLngBounds([0, 0], [imgHeight, imgWidth]);

// 3) Initialize the map
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

// 4) Fit the map to your full image
map.fitBounds(bounds);

// 5) GridLayer that *only* ever asks for real tiles
L.gridLayer({
  tileSize: tileSize,
  minZoom:  0,
  maxZoom:  maxZoom,
  noWrap:   true,
  
  // We're *not* passing a `bounds` here – Leaflet will compute a grid
  // over the visible area and call createTile for each one.
  createTile: function(coords, done) {
    const { x, y, z } = coords;
    
    // At zoom z, your image spans (imgWidth * 2^z) pixels horizontally,
    // so it covers this many tiles:
    const factor = Math.pow(2, z);
    const cols   = Math.ceil((imgWidth  * factor) / tileSize);
    const rows   = Math.ceil((imgHeight * factor) / tileSize);
    
    // If this x/y is outside that range, return an empty div:
    if (x < 0 || x >= cols || y < 0 || y >= rows) {
      const empty = document.createElement('div');
      done(null, empty);
      return empty;
    }
    
    // Otherwise build an <img> pointing at your tile file:
    const img = document.createElement('img');
    img.src    = `tiles/${z}/${x}/${y}.png`;
    img.alt    = '';
    img.onload  = () => done(null, img);
    img.onerror = () => done(null, img);
    return img;
  }
}).addTo(map);

// 6) (Optional) Re-add your markers/popups
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
  </video>
`);