// map.js

// 1) Your “native” zoom level and how many 256×256 tiles you have at that zoom:
const tileCountX  = 10;
const tileCountY  = 10;
const tileSize    = 256;

// 2) Compute the full image’s pixel size:
const imgW = tileCountX * tileSize; // e.g. 10 × 256 = 2560
const imgH = tileCountY * tileSize; // same in Y

// 3) Initialize the map in CRS.Simple, allow zoom all the way out to 0 and in to nativeZoom:
const map = L.map('map', {
  crs:             L.CRS.Simple,
  minZoom:         0,
  maxZoom:         nativeZoom,
  zoomSnap:        1,
  zoomDelta:       1,
  zoomControl:     true,
  attributionControl: false
});

// 4) Turn your pixel-coords into real LatLngs at that native zoom:
const southWest = map.unproject([0,    imgH], nativeZoom);
const northEast = map.unproject([imgW, 0   ], nativeZoom);
const bounds     = L.latLngBounds(southWest, northEast);

// 5) Fit the map to show the entire image at load:
map.fitBounds(bounds);

// 6) Add your tiles, telling Leaflet “if you’re below nativeZoom, fetch tiles at nativeZoom and scale ’em”:
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:         bounds,
  noWrap:         true,
  minNativeZoom:  nativeZoom,   // ↪️ scale tiles when zoom < nativeZoom
  // (we don’t set maxNativeZoom, so above nativeZoom it will still fetch nativeZoom if you ever allow >8)
}).addTo(map);