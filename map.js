// map.js

// 1) The zoom level your tiles were generated at
const nativeZoom = 8;

// 2) How many tiles you have in X and Y at that zoom
const tileCountX = 10;
const tileCountY = 10;

// 3) Build bounds in “tile‐coords” (y goes downward)
const bounds = L.latLngBounds(
  [ -tileCountY,  0 ], // SW: lat = –tileCountY → bottom
  [      0,      tileCountX ]  // NE: lat = 0,       x = tileCountX → top/right
);

// 4) Init map with a zoom range from 0 up to your native zoom
const map = L.map('map', {
  crs:            L.CRS.Simple,
  minZoom:        0,
  maxZoom:        nativeZoom,
  zoomControl:    true,   // show +/- buttons
  scrollWheelZoom:true,   // allow wheel zoom
  doubleClickZoom:true    // allow dblclick zoom
})
  // 5) On load, scale & pan so the whole map is in view
  .fitBounds(bounds);

// 6) Point at your tile folder, but force Leaflet to only ever _request_ z=nativeZoom
//    and to _scale_ those tiles at all other zoom levels.
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:           bounds,
  noWrap:           true,
  minNativeZoom:    nativeZoom,
  maxNativeZoom:    nativeZoom,
}).addTo(map);