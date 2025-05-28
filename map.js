// 1) The zoom level your tiles live at
const nativeZoom = 8;

// 2) How many tiles wide/tall you have at that zoom
//    (e.g. if x runs 0–9 you have 10 columns; same for y)
const tileCountX = 10;
const tileCountY = 10;

// 3) Bounds in "tile‐coords" [southWest, northEast]:
//    y goes downward (so we invert it with a minus)
const bounds = L.latLngBounds(
  [ -tileCountY,  0 ],   // SW corner: y = -tileCountY
  [      0,      tileCountX ]  // NE corner: y = 0, x = tileCountX
);

const map = L.map('map', {
  crs:             L.CRS.Simple,
  minZoom:         nativeZoom,
  maxZoom:         nativeZoom,
  zoomControl:     false,       // remove the +/- UI
  scrollWheelZoom: false,       // disable wheel zoom
  doubleClickZoom: false
})
// center on the middle tile
.setView([ -tileCountY/2, tileCountX/2 ], nativeZoom);

L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:        bounds,
  minZoom:       nativeZoom,
  maxZoom:       nativeZoom,
  noWrap:        true,
  errorTileUrl:  ''            // hide broken‐image icons
}).addTo(map);