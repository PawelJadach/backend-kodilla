const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  performer: { String, required: true, ref: 'Performer'},
  text: { String, required: true}
})


module.exports = mongoose.model('Testimonial', testimonialSchema);