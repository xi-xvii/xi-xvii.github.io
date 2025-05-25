// 1) Configuration: your image size and tile size
const imgWidth   = 11000;
const imgHeight  = 11000;
const tileSize   = 256;
const maxZoom    = 6;

// 2) Compute how many tiles in X/Y
const maxTileX = Math.ceil(imgWidth  / tileSize) - 1;
const maxTileY = Math.ceil(imgHeight / tileSize) - 1;

// 3) Define the map’s coordinate bounds (in “pixel” units)
const bounds = L.latLngBounds([0, 0], [imgHeight, imgWidth]);

// 4) Initialize the map
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

// 5) GridLayer that only requests valid tiles
L.gridLayer({
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZoom,
  noWrap: true,
  bounds: bounds,

  createTile: function(coords, done) {
    const { x, y, z } = coords;

    // Only load if within [0..maxTileX] and [0..maxTileY]
    if (z > maxZoom || x < 0 || x > maxTileX || y < 0 || y > maxTileY) {
      const empty = document.createElement('div');
      done(null, empty);
      return empty;
    }

    // Otherwise, build an <img> pointing to your real tile file
    const img = document.createElement('img');
    img.src    = `tiles/${z}/${x}/${y}.png`;
    img.alt    = '';
    img.onload  = () => done(null, img);
    img.onerror = () => done(null, img);
    return img;
  }
}).addTo(map);

// 6) Zoom/pan to cover the full image
map.fitBounds(bounds);

// 7) (Re-)add your markers
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
