// map.js

// 1) Your highest-res zoom and full image dimensions
const nativeZoom = 8;
const imgW = 11008;
const imgH = 11008;

// 2) Initialize a CRS.Simple map zoomable from 0…8
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// 3) Compute the image’s LatLng bounds at zoom = 8
const sw = map.unproject([0,    imgH], nativeZoom); // bottom-left
const ne = map.unproject([imgW, 0   ], nativeZoom); // top-right
const bounds = L.latLngBounds(sw, ne);

// 4) Fit the map to show the full image on load
map.fitBounds(bounds);

// 5) Create a lower‐zIndex pane for your low-res image
map.createPane('lowresPane');
map.getPane('lowresPane').style.zIndex = 50;             // beneath the tiles
map.getPane('lowresPane').style.pointerEvents = 'none';  // clicks go through

// 6) Add the single low-res PNG underneath
L.imageOverlay('/lowres/map-lowres.png', bounds, {
  pane:    'lowresPane',
  opacity: 1
}).addTo(map);

// 7) Finally add your tile layer on top
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom // never request z > 8
}).addTo(map);