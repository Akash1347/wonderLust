mapboxgl.accessToken = mapToken;

const mapDiv = document.getElementById('map');
const coordinates = JSON.parse(mapDiv.dataset.coordinates);

console.log('Map Token:', mapToken);
console.log('Coordinates:', coordinates);

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: coordinates,
  zoom: 9,
});

// Add zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker({ color: 'red' })
  .setLngLat(coordinates)
  .setPopup(new mapboxgl.Popup().setHTML('<p>Exact Location provided after booking </p>')) 
  .addTo(map);
console.log(listing);