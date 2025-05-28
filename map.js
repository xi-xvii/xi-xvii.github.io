// 1) Highest‐res zoom and image size
const nativeZoom = 8;
const imgW = 11008;
const imgH = 11008;

// 2) Init the map
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// 3) Compute the full‐image bounds at z = 8
const sw = map.unproject([0,    imgH], nativeZoom);
const ne = map.unproject([imgW, 0   ], nativeZoom);
const bounds = L.latLngBounds(sw, ne);

// 4) Show everything on load
map.fitBounds(bounds);

// 5) Create a pane for the low‐res base
map.createPane('lowresPane');
map.getPane('lowresPane').style.zIndex = 50;            // below tilePane
map.getPane('lowresPane').style.pointerEvents = 'none'; // clicks ignore it

// 6) Add your 2048×2048 PNG as an ImageOverlay, stretched to full bounds
const lowres = L.imageOverlay('lowres/map-lowres.png', bounds, {
  pane:    'lowresPane',
  opacity: 1
}).addTo(map);

//  debug events to confirm it loads
lowres.on('load',  () => console.log('✅ low-res image loaded'));
lowres.on('error', () => console.error('❌ low-res failed to load'));


// 7) Finally, your tiles on top
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);