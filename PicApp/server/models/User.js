/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

    
/* Create your schema */
var photoSchema = new Schema({
    url: {
        type: String, 
    }, 
    coordinates: {
        latitude: Number, 
        longitude: Number
    },
});

var userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    }, 
    photos: [photoSchema], 
    created_at: Date,
    updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);
var Photo = mongoose.model('Photo', photoSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
