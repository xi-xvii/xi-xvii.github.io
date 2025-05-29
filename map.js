// map.js

// ▪︎ CONFIG: native zoom & full-image dimensions
const nativeZoom = 8;
const imgW       = 11008;
const imgH       = 11008;

// ▪︎ INIT MAP (CRS.Simple, zoom 0…8)
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// ▪︎ CALCULATE BOUNDS of your full-res image at z = nativeZoom
const sw     = map.unproject([0,    imgH], nativeZoom); // bottom-left
const ne     = map.unproject([imgW, 0   ], nativeZoom); // top-right
const bounds = L.latLngBounds(sw, ne);

// ▪︎ FIT MAP to show entire image on load
map.fitBounds(bounds);

// ▪︎ CREATE OVERLAY PANE for low-res underlay
map.createPane('overlayPane');
map.getPane('overlayPane').style.zIndex        = 300;
map.getPane('overlayPane').style.pointerEvents = 'none';

// ▪︎ ADD LOW-RES IMAGE OVERLAY (will be auto-stretched)
L.imageOverlay('lowres/map-lowres.png', bounds, {
  pane:      'overlayPane',
  className: 'lowres-overlay',
  opacity:   1
}).addTo(map);

// ▪︎ ADD HIGH-RES TILE LAYER beneath the overlay
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);