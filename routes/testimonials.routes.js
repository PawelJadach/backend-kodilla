const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4 } = require('uuid');
const Testimonial = require('../models/testimonials.model');

router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find().populate('performer'));
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/testimonials/random', async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const testimonial = await Testimonial.findOne().skip(rand).populate('performer');
      if(testimonial) res.json({ message:'OK', testimonial })
      else res.status(404).json({ message: 'Not found '}) 
    } catch (err) {
      res.status(500).json({ message: err });
    }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).populate('performer');
    if(testimonial) res.json({ message: 'OK', testimonial });
    else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: 'OK' });
  }
})

router.post('/testimonials', async (req, res) => {
  try {
    const { performer, text } = req.body;
    const testimonial = new Testimonial({ performer: performer, text: text });
    const savedTestimonial = await testimonial.save().populate('performer');
    res.json({ message: 'OK', savedTestimonial})
  } catch (err) {
    res.status(500).json({ message: err});
  }
})

router.put('/testimonials/:id', async (req, res) => {
  const newData = req.body;
  try {
    const testimonial = Testimonial.findById(req.params.id);
    if(testimonial){
      newData.performer ? testimonial.performer = newData.performer : null
      newData.text ? testimonial.text = newData.text : null
      const newTestimonial = await testimonial.save().populate('performer');
      res.json({ message: 'OK', newTestimonial });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err});
  }
})

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const testimonial = Testimonial.findById(req.params.id);
    if(testimonial){
      const deletedTestimonial = Testimonial.findByIdAndDelete(req.params.id);
      res.json({ message: 'OK', deletedTestimonial });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err});
  }
});

module.exports = router;