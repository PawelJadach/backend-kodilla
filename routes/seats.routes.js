const express = require('express');
const router = express.Router();
const { getAll, getById, post, updateById, deleteById } = require('../controllers/seats.controller');

router.get('/seats', getAll);
router.get('/seats/:id', getById);
router.post('/seats', post);
router.delete('/seats/:id', deleteById);
router.put('/seats/:id', updateById);

module.exports = router;