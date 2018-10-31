# Documentation
## How to run:
### Server
- Navigate to server file in console
    - type in ```npm start```
    - wait for it to load and go to localhost:3000 on whatever client you want to run your api calls
### Client
- To run the client navigate to the client folder
    - Type in the command `npm run dev` or `npm start`
    - wait for it to compile and go to localhost:8080

## Functionality:
- currently, by clicking on a location on the map, it stores the coordinates of where you click, then by clicking add files, you can add a marker with the image of what you select by clicking on an image after clicking the map (Do not click select file before)
- Persistent storage
- Google sign in api integrated
- Mapbox api implemented


## Things that might break: 
- No heroku testing has been done, so its unknown if Google sign in works as intended
- Since Express and Vue are on different ports, its unknown if on heroku they will work as intended
- After adding about 20 locations, something random error occured when trying to add another photo, deleting the user fixed the problem


## Features to implement
### Front end:
- UI for adding photos (they need a place to get location like a button, a submit button, a search bar and a place to enter coordinates if they have to (optional))
- Some UI for deleting photos
- change navbar based on state of sign in
- Get location data using browser location access
- UI to list friends (and display that list), add a friend, remove a friend
- 
### Back end:
- Create a create user (by either a local signin or by google signin)
- Add an about/account page
- Develop schema to include things like image tags
- Filter images by tag, location/distance?, whether or not signed in or out (show only your tags by default?)
- Make api requests for deleting user, deleting photo, and creating user, and getting filtered search results, editing existing photos (add tag, change location)

