// map.js

// ▪︎ Your highest‐res zoom & full‐image dims
const nativeZoom = 8;
const imgW       = 11008;
const imgH       = 11008;

// ▪︎ Init the map (CRS.Simple, zoom 0…8)
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// ▪︎ Compute the exact LatLng‐bounds of your 11 008×11 008 image at z = 8
const sw     = map.unproject([0,    imgH], nativeZoom); // bottom-left
const ne     = map.unproject([imgW, 0   ], nativeZoom); // top-right
const bounds = L.latLngBounds(sw, ne);

// ▪︎ Fit to show the entire image on load
map.fitBounds(bounds);

// ▪︎ Create a custom pane above the tiles (optional, but keeps things tidy)
map.createPane('overlayPane');
map.getPane('overlayPane').style.zIndex        = 300;
map.getPane('overlayPane').style.pointerEvents = 'none';

// ▪︎ Add your low-res PNG on top, with our force-stretch class
const overlay = L.imageOverlay('lowres/map-lowres.png', bounds, {
  setBounds: 'bounds'
  pane:      'overlayPane',
  className: 'lowres-overlay',
  opacity:   1
}).addTo(map);
overlay.bringToFront();

// ▪︎ Finally, add your tile layer beneath it
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);