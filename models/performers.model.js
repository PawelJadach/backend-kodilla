const mongoose = require('mongoose');

const performerSchema = new mongoose.Schema({
  name: { String, required: true},
  genre: { String, required: true},
})


module.exports = mongoose.model('Performer', performerSchema);