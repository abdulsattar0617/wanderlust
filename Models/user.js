const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// 1. Define schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// 2. Use passport local mongoose plugin
userSchema.plugin(passportLocalMongoose);

// 3. export schema as module
module.exports = mongoose.model("User", userSchema);
