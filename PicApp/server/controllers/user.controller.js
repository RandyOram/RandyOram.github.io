
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/User.js');

/* Create a user */
exports.create = function(req, res) {

  /* Instantiate a user */
  var user = new User(req.body);

  /* Then save the user */
  user.save(function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Show the current user */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  User.find({ 'username' : req.params.username }).exec(function(err, docs) {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
  
};

/* Update a user */
exports.updateAddPhoto = function(req, res) {
  // Send the user you want to update and the photo you want to append 
  let user;
  let photo = {
               "url": req.query.url,
               "coordinates" : 
                {
                  "latitude": parseFloat(req.query.lat),
                  "longitude": parseFloat(req.query.lon)
                }
              }
 
  if(req.body != null) {
    user = req.body[0];
    user.updated_at = new Date();
      
    //Get user photos
    let photos = req.body[0].photos;
    photos.push(photo);

    //Add the photo to the end of the photos array
    user.photos = photos;
    console.log(user.photos);

    User.findOneAndUpdate({ "username" : req.params.username }, user, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
  });
  }
  else {
    res.status(400).send();
  }

};

/* Delete a user */
exports.delete = function(req, res) {

 var user = req.user;
 
  // find the user with code identifier
  User.findOneAndRemove({ _id: user._id }, function(err) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.json(user);
      res.status(200).send();
    }

  });

};

/* Retreive all the users */
exports.list = function(req, res) {
  /** TODO **/

  mongoose.model("User").find({}, function(err, docs) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(docs);
  });

};

/* 
  Middleware: find a user by its ID, then pass it to the next request handler. 

  Find the user using a mongoose query, 
        bind it to the request object as the property 'user', 
        then finally call next
 */
exports.userByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};

exports.userByUser = function(req, res, next, user) {
  console.log(req.query);
    User.find({ 'username' : user }).exec(function(err, user) {
      if(err) {
        res.status(400).send(err);
      } else {
        req.body = user;
        next();
      }
    });
  };