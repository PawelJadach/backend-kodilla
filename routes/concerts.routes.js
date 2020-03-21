const express = require('express');
const router = express.Router();
const Performer = require('../models/performers.model');
const { getAll, getById, post, updateById, deleteById } = require('../controllers/concerts.controller');

router.get('/concerts', getAll);
router.get('/concerts/:id', getById);
router.post('/concerts', post);
router.delete('/concerts/:id', deleteById);
router.put('/concerts/:id', updateById);

module.exports = router;