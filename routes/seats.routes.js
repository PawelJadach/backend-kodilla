const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4 } = require('uuid');




router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const seat = db.seats.find(seat => seat.id === Number(req.params.id))
  res.json(seat);
});

router.route('/seats').post((req, res) => {
  if(req.body.day !== undefined && req.body.seat !== undefined && req.body.client !== undefined && req.body.email !== undefined) {
    const seat = { 
      id: v4(), 
      day: req.body.day, 
      seat: req.body.seat, 
      client: req.body.client, 
      email: req.body.email, 
    };
    if(db.seats.some(seat => seat.day === Number(req.body.day) && seat.seat === Number(req.body.seat))) res.status(404).json({ message: "The slot is already taken..." })
    else {
      db.seats.push(seat)
      res.json({message: 'OK', seat});
      req.io.emit('seatsUpdated', db.seats);
    }
  } else res.status(404).json({message: 'Error'});
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(db.seats.findIndex(seat => seat.id === Number(req.params.id)), 1);
  res.json({message: 'OK' });
});


router.route('/seats/:id').put((req, res) => {
  if (req.body.day) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].day = req.body.day
  if (req.body.seat) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].seat = req.body.seat
  if (req.body.client) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].client = req.body.client
  if (req.body.email) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].email = req.body.email
  res.json({message: 'OK' });
})


module.exports = router;