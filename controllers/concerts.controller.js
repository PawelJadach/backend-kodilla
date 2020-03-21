const Concert = require('../models/concert.model');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Concert.find().populate('performer'))
  } catch(err){
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id).populate('performer');
    if(concert) res.json({ concert });
    else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, price: price, day: day, image: image });
    const concert = await newConcert.save();
    res.json({ message: 'OK', concert});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      const deleteConcert = (await Concert.findByIdAndDelete(req.params.id)).populated('performer');
      res.json({ message: 'OK', deleteConcert});
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const newData = req.body;
  try {
    const concert = Concert.findById(req.params.id);
    if(concert){
      newData.performer ? concert.performer = newData.performer : null
      newData.price ? concert.price = newData.price : null
      newData.image ? concert.image = newData.image : null
      newData.day ? concert.day = newData.day : null
      const newConcert = await concert.save();
      res.json({ message: 'OK', newConcert });
    } else res.status(404).json({ message: 'Not found'});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};