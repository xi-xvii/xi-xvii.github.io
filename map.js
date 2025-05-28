// map.js

// ▪︎ Your highest-res zoom level and full image pixels
const nativeZoom = 8;
const imgW       = 11008;
const imgH       = 11008;

// ▪︎ Initialize the map (CRS.Simple, zoom 0…8)
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// ▪︎ Compute LatLng bounds of the full image at z = nativeZoom
const sw     = map.unproject([0,    imgH], nativeZoom); // bottom-left
const ne     = map.unproject([imgW, 0   ], nativeZoom); // top-right
const bounds = L.latLngBounds(sw, ne);

// ▪︎ Fit the map to show the whole image on load
map.fitBounds(bounds);

// ▪︎ Create a pane for the low-res overlay (beneath tiles)
map.createPane('lowresPane');
map.getPane('lowresPane').style.zIndex        = 100;  // below tilePane (200)
map.getPane('lowresPane').style.pointerEvents = 'none';

// ▪︎ Add the 2048×2048 PNG, stretched to the full 11 008×11 008 bounds
const lowresLayer = L.imageOverlay('lowres/map-lowres.png', bounds, {
  pane:    'lowresPane',
  opacity: 1
}).addTo(map);
lowresLayer.bringToBack(); // ensure it’s at the very back

// ▪︎ Finally, add your tile layer on top (fading in via CSS)
const tiles = L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom  // never request z > 8
}).addTo(map);
tiles.bringToFront(); // ensure tiles are above everything

