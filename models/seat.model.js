const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: { Number, required: true },
  seat: { Number, required: true },
  client: { String, required: true},
  email: { String, required: true}
})


module.exports = mongoose.model('Seat', seatSchema);