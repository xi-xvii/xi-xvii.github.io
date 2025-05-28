// map.js

// 1) Image size in pixels and maximum zoom level
const imgW = 11000;
const imgH = 11000;
const maxZoom = 6;

// 2) Define bounds so that lat=0 is top, lat=–imgH is bottom
const bounds = L.latLngBounds(
  [ -imgH,  0 ],  // SW corner: lat = –11000 → pixelY = +11000 (bottom)
  [     0, imgW ] // NE corner: lat = 0     → pixelY = 0     (top)
);

// 3) Initialize the map with Simple CRS and fit to those bounds
const map = L.map('map', {
  crs:            L.CRS.Simple,
  minZoom:        0,
  maxZoom:        maxZoom,
  zoomSnap:       1,
  zoomDelta:      1,
  zoomControl:    true,
  attributionControl: false
}).fitBounds(bounds);

// 4) Point Leaflet at your tile folder (z/x/y) and lock to those bounds
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:          bounds,
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         maxZoom,
  errorTileUrl:    ''    // avoid broken‐image icon
}).addTo(map);