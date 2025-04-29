const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  monthlyIncome: { type: Number }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);