const express = require('express');
const router = express.Router();
const Performer = require('../models/performers.model');
const { getAll, getById, post, updateById, deleteById, getConcertsByPerformerId, getConcertsByGenre, getConcertsByPrice, getConcertsByDay } = require('../controllers/concerts.controller');

router.get('/concerts', getAll);
router.get('/concerts/:id', getById);
router.post('/concerts', post);
router.delete('/concerts/:id', deleteById);
router.put('/concerts/:id', updateById);

router.get('/concerts/performer/:performer', getConcertsByPerformerId);
router.get('/concerts/genre/:genre', getConcertsByGenre);
router.get('/concerts/price/:price_min/:price_max', getConcertsByPrice);
router.get('/concerts/day/:day', getConcertsByDay);

module.exports = router;