const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: { String, required: true, ref: 'Performer'},
  price: { Number, required: true },
  day: { Number, required: true },
  image: { String, required: true}
})


module.exports = mongoose.model('Concert', concertSchema);