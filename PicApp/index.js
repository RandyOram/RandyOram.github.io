async function loadmap()
{
  let result = await fetch('https://api.myjson.com/bins/1do25w');
  let geojson = await(result.json());
  return geojson;
}

var geojson;

L.mapbox.accessToken = 'pk.eyJ1Ijoic21pdHR5dyIsImEiOiJjam1xamowNnkxcW43M3FueXdya3lmeWM1In0.FLBJa6hbAK1_9T-xgusgBQ';
var map = L.mapbox.map('map', 'mapbox.dark');
//L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9').addTo(map);



// map.on('load', () => {
//   loadmap().then(result => {
//     geojson = result;
//     geojson.users.forEach(function(user)
//     {
//       user.photos.forEach(function(photo)
//       {
//         L.marker(photo.coordinates).bindPopup(`<img src=${photo.url} alt="" height="84" width="84">`).addTo(map);

//       });
//     });
//   });
// });