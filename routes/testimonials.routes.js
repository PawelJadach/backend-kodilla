const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * 2)]);
});

router.route('/testimonials/:id').get((req, res) => {
  const testimonial = db.testimonials.find(testimonial => testimonial.id === Number(req.params.id))
  res.json(testimonial);
})

router.route('/testimonials').post((req, res) => {
  if(req.body.author !== undefined && req.body.text !== undefined){
    const testimonial = {
      id: v4(),
      author: req.body.author,
      text: req.body.text,
    };
    res.json({message: 'OK', testimonial});
  } else res.status(404).json({message: 'Error'});
})

router.route('/testimonials/:id').put((req, res) => {
  if(req.body.author) db.testimonials[db.testimonials.findIndex(testimonial => testimonial.id === Number(req.params.id))].author = req.body.author
  if (req.body.text) db.testimonials[db.testimonials.findIndex(testimonial => testimonial.id === Number(req.params.id))].text = req.body.text
  res.json({message: 'OK' });
})

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(db.testimonials.findIndex(testimonial => testimonial.id === Number(req.params.id)), 1);
  res.json({message: 'OK' });
});

module.exports = router;