// 1) Map + tile configuration
const imgWidth   = 11000;       // your original PNG’s width
const imgHeight  = 11000;       // your original PNG’s height
const tileSize   = 256;         // standard tile size
const maxZoom    = 6;           // you generated levels 0–6

// 2) Figure out how many tiles cover the image at full resolution
//    (we’ll re-calc per-zoom below, but these give us a sanity check)
const maxTilesX  = Math.ceil(imgWidth  / tileSize);
const maxTilesY  = Math.ceil(imgHeight / tileSize);

// 3) Define the world‐coordinates bounds of your map (y first, then x)
const bounds = L.latLngBounds(
  [0,       0      ],  // top-left in “map units”
  [imgHeight, imgWidth] // bottom-right
);

// 4) Initialize the Leaflet map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true,

  // clamp panning so you can’t drag outside your map’s edges
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,

  // turn off animations for snappier performance
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// 5) A GridLayer that *only* ever loads valid tiles
L.gridLayer({
  tileSize: tileSize,
  minZoom:  0,
  maxZoom:  maxZoom,
  noWrap:   true,

  // This gets called for every tile Leaflet *would* load.
  createTile: function(coords, done) {
    const { x, y, z } = coords;

    // Compute how many tiles your image spans at this zoom:
    // at zoom z, each “world unit” (pixel) is scaled by 2^z
    const scale = Math.pow(2, z);
    const tilesXAtZ = Math.ceil((imgWidth  * scale) / tileSize);
    const tilesYAtZ = Math.ceil((imgHeight * scale) / tileSize);

    // If this tile x/y is outside [0..tilesXAtZ-1] or [0..tilesYAtZ-1], return an empty div
    if (x < 0 || x >= tilesXAtZ || y < 0 || y >= tilesYAtZ) {
      const empty = document.createElement('div');
      // signal we’re done, but with no image
      done(null, empty);
      return empty;
    }

    // Otherwise build an <img> pointing at your actual tile file
    const img = document.createElement('img');
    img.src    = `tiles/${z}/${x}/${y}.png`;
    img.alt    = '';
    img.onload  = () => done(null, img);
    img.onerror = () => done(null, img);
    return img;
  }
}).addTo(map);

// 6) Zoom/pan so the full map is visible
map.fitBounds(bounds);

// 7) (Optional) Re-add your markers/popups
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn’t support video.
  </video>
`);