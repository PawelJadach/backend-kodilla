const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  performer: { type: String, required: true, ref: 'Performer'},
  text: { type: String, required: true}
})


module.exports = mongoose.model('Testimonial', testimonialSchema);