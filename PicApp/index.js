async function loadmap()
{
  let result = await fetch('https://api.myjson.com/bins/hjwbs');
  let geojson = await(result.json());
  return geojson;
}

var geojson;

L.mapbox.accessToken = 'pk.eyJ1Ijoic21pdHR5dyIsImEiOiJjam1xamowNnkxcW43M3FueXdya3lmeWM1In0.FLBJa6hbAK1_9T-xgusgBQ';
var map = L.mapbox.map('map', 'mapbox.dark');




map.on('load', () => {
  loadmap().then(result => {
      geojson = result;
      geojson.users.forEach(function(user)
      {
        user.photos.forEach(function(photo)
      {
        let marker = L.marker([photo.coordinates[0], photo.coordinates[1]]).bindPopup(`<img src=${photo.url} alt="" height="84" width="84">`);
        marker.addTo(map);
      });
     });
   });
 });
