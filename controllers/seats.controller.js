const Seat = require('../models/seat.model');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById =  async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) res.json({ message: 'OK', seat })
    else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { day, seat, email, client } = req.body;
  try {
    const seatResered = await Seat.findOne({ day: day, seat: seat});
    if(seatResered) res.json({ message: 'Slot is already reserved...'})
    else {
      const newReserv = new Seat({day: day, seat: seat, email: email, client: client });
      const newSeat = await newReserv.save();
      res.json({ message: 'OK', newSeat });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  } 
};

exports.deleteById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat){
      const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
      res.json({ message: 'OK', deletedSeat });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById =  async (req, res) => {
  const newData = req.body;
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat){
      newData.day ? seat.day = newData.day : null
      newData.seat ? seat.seat = newData.seat : null
      newData.client ? seat.client = newData.client : null
      newData.email ? seat.email = newData.email : null
      const newSeat = await seat.save();
      res.json({ message: 'OK', newSeat });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  if (req.body.day) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].day = req.body.day
  if (req.body.seat) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].seat = req.body.seat
  if (req.body.client) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].client = req.body.client
  if (req.body.email) db.seats[db.seats.findIndex(concert => concert.id === Number(req.params.id))].email = req.body.email
  res.json({message: 'OK' });
};