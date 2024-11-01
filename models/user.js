const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
   email:{
    type:String,
    required:true
   }
});

userSchema.plugin(passportLocalMongoose); //auto maticaly username,Hasing,salting,password impliment

module.exports = mongoose.model('User', userSchema);