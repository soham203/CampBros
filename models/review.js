const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const schema = mongoose.Schema;

const revieSchema = new Schema({
      body: String,
      rating: Number
});

module.exports = mongoose.model('Campground', campgroundSchema);