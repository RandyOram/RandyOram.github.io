<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">PicMap</a>
      </div>
      <ul class="nav navbar-nav navbar-right">
          <li>
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              Sign in
            </g-signin-button>
          </li>
          <li><a href="#" @click="myFunction"><span class="glyphicon glyphicon-user"></span> Sign Out</a></li>
          <li><a>
              <div class="custom-file">
                  <input type="file" class="custom-file-input" id="inputGroupFile02" style="display: none;" @change="inputHandler($event)">
                  <label class="custom-file-label" for="inputGroupFile02"><span class="glyphicon glyphicon-upload"></span> Choose file </label>
              </div>
          </a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'HomePage',
  props: ['lon', 'lat'],
  data () {
    return {
      file: undefined,
      user:'dog',
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '1069940581127-a38qeig8qq49angii20uif9nfqb5sfc1.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.

      // Here we would check if the user exists, if not, create the user, if they do, sign them in


      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile() // etc etc

      // The ID token you need to pass to your backend:
      // var idToken = googleUser.getAuthResponse().id_token
      // console.log('ID Token: ' + idToken)
      //Set the username here
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    myFunction () {
      // Sign out function,

      /* console.log('in myfunction')
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      }) */
    },

  async requestImage(file) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == 4 && req.status == 200) {
       this.processRequest(req.responseText);
      }
    }
    var request_url = 'https://api.imgur.com/3/image';
    var api_key = 'bf6ae890fb73e6b';
    req.open("POST", request_url, true); // true for asynchronous
    req.setRequestHeader('Authorization', 'Client-ID ' + api_key);
    req.send(file);
  },

  processRequest(response_text) {
    if (response_text == "Not found") {
      console.log("Imgur album not found.");
    } else {
      //Response is here
      var json = JSON.parse(response_text);
      let imageLink = json.data.link;
      console.log(imageLink);

      //update user schema with new photo sub doc by passing in url parameters
      let url = 'http://localhost:3000/users/' + this.user + `?url=${imageLink}&lon=${this.lon}&lat=${this.lat}`;
      console.log(url);
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.responseType = 'text';
      console.log("Request about to onload")
      xhr.onload = () => {
        console.log("in onload for update image xmlhttpr")
          if (xhr.readyState === xhr.DONE) {
              if (xhr.status === 200) {
                  console.log('trying to add marker to map after image upload')
                 /*  this.users = xhr.response;
                  let photo = this.users.photos[this.users.photos.length-1];
                  var el = document.createElement('div').classList.add('marker');
                  new mapboxgl.Marker(el).setLngLat([photo.coordinates.longitude, photo.coordinates.latitude]).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<img src=${photo.url} alt="" height="84" width="84">`)).addTo(map); */
                //Emit event to reload map
                this.$emit('addedmarker');
              }
          }
      };
      xhr.send(null);
    }
  },

  inputHandler(event) {
      //Handle image upload here
      this.file = event.target.files[0];
      console.log("File has been changed")
      this.requestImage(this.file);
    }

  },


  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
</style>
