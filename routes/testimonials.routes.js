const express = require('express');
const router = express.Router();
const { getAll, getRandom, getById, post, updateById, deleteById } = require('../controllers/testimonials.controller');

router.get('/testimonials', getAll);
router.get('/testimonials/random', getRandom);
router.get('/testimonials/:id', getById);
router.post('/testimonials', post);
router.put('/testimonials/:id', updateById);
router.delete('/testimonials/:id', deleteById);

module.exports = router;