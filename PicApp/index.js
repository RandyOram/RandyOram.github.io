async function loadmap()
{
  let result = await fetch('https://api.myjson.com/bins/hjwbs');
  let geojson = await(result.json());
  return geojson;
}

async function requestImage(file) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() { 
     if (req.readyState == 4 && req.status == 200) {
       processRequest(req.responseText);
     }
  }
  
  var request_url = 'https://api.imgur.com/3/image';
  var api_key = 'bf6ae890fb73e6b';
  req.open("POST", request_url, true); // true for asynchronous     
  req.setRequestHeader('Authorization', 'Client-ID ' + api_key);
  req.send(file);
}

function processRequest(response_text) {
  if (response_text == "Not found") {
    console.log("Imgur album not found.");
  } else { 
    //Response is here
    var json = JSON.parse(response_text);
    console.log(json);
    imageLink = json.data.link;
    console.log(imageLink);
    
    
  }
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

 $('input[type=file]').on("change", function() 
      {
      var $files = $(this).get(0).files;
      if ($files.length) {
          // Begin file upload
          console.log("Uploading file to Imgur..");
          var file = $files[0];
          requestImage(file);

      }
  });
