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

// ▪︎ CALCULATE BOUNDS of your giant image at z = nativeZoom
const sw     = map.unproject([0,    imgH], nativeZoom); // bottom-left
const ne     = map.unproject([imgW, 0   ], nativeZoom); // top-right
const bounds = L.latLngBounds(sw, ne);

// ▪︎ FIT MAP to show the entire image on load
map.fitBounds(bounds);

// ▪︎ CREATE CUSTOM PANE for low-res underlay
map.createPane('underlayPane');
map.getPane('underlayPane').style.zIndex        = 100;  // below the default tilePane (200)
map.getPane('underlayPane').style.pointerEvents = 'none';

// ▪︎ ADD LOW-RES IMAGE OVERLAY (no CSS sizing, Leaflet will stretch it)
const lowres = L.imageOverlay('lowres/map-lowres.png', bounds, {
  pane:    'underlayPane',
  opacity: 1
}).addTo(map);

// ▪︎ PIXELATE it directly in JS so no width/height clash
lowres.getElement().style.imageRendering = 'pixelated';

// ▪︎ ADD HIGH-RES TILE LAYER (default pane = tilePane, zIndex 200)
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);