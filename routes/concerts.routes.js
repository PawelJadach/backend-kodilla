const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const concert = db.concerts.find(concert => concert.id === Number(req.params.id))
  res.json(concert);
});

router.route('/concerts').post((req, res) => {
  if(req.body.performer !== undefined && req.body.genre !== undefined && req.body.price !== undefined && req.body.day !== undefined && req.body.image !== undefined){
    const concert = { 
      id: v4(), 
      performer: req.body.performer, 
      genre: req.body.genre, 
      price: req.body.price, 
      day: req.body.day, 
      image: req.body.image, 
    };
    res.json({message: 'OK', concert});
  } else res.status(404).json({message: 'Error'}); 
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(db.concerts.findIndex(concert => concert.id === Number(req.params.id)), 1);
  res.json({message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  if (req.body.performer) db.concerts[db.concerts.findIndex(concert => concert.id === Number(req.params.id))].performer = req.body.performer
  if (req.body.genre) db.concerts[db.concerts.findIndex(concert => concert.id === Number(req.params.id))].genre = req.body.genre
  if (req.body.price) db.concerts[db.concerts.findIndex(concert => concert.id === Number(req.params.id))].price = req.body.price
  if (req.body.day) db.concerts[db.concerts.findIndex(concert => concert.id === Number(req.params.id))].day = req.body.day
  if (req.body.image) db.concerts[db.concerts.findIndex(concert => concert.id === Number(req.params.id))].image = req.body.image
  res.json({message: 'OK' });
})



module.exports = router;