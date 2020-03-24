const Concert = require('../models/concert.model');
const Performer = require('../models/performers.model');

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

exports.getConcertsByPerformerId = async (req, res) => {
  const id = req.params.performer;
  try {
    const performer = await Performer.findById(id);
    if(!performer) res.status(400).json({ message: 'Bad request' });
    const concerts = await Concert.find({ performer: id})
    if(!concerts) res.status(400).json({ message: 'Not found' });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertsByGenre = async (req, res) => {
  const genre = req.params.genre;
  try {
    const concerts = await Concert.find().populate('performer');
    const filteredByGenreConcerts = concerts.filter(concert => concert.performer.genre === genre);
    if(!filteredByGenreConcerts) res.status(400).json({ message: 'Not found' });
    res.json(filteredByGenreConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertsByPrice = async (req, res) => {
  const max = Number(req.params.price_max);
  const min = Number(req.params.price_min);
  try {
    if(typeof min !== 'number' || typeof max !== 'number') res.status(400).json({ message: 'Bad request' });
    else {
      const concerts = await Concert.find();
      const filteredByPriceConcerts = concerts.filter(concert => concert['price'] >= min && concert['price'] <= max);
      if(filteredByPriceConcerts.length < 1) res.status(400).json({ message: 'Not found' });
      else res.json(filteredByPriceConcerts);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertsByDay = async (req, res) => {
  const day = Number(req.params.day);
  try {
    if(typeof day !== 'number') res.status(400).json({ message: 'Bad request' });
    else {
      const concerts = await Concert.find();
      const filteredByPriceDay = concerts.filter(concert => concert['day'] === day);
      if(filteredByPriceDay.length < 1) res.status(400).json({ message: 'Not found' });
      else res.json(filteredByPriceDay);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

