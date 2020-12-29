
const express = require('express');

const records = require('./records');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - ACTIVE'
  });
});

router.use('/', records);


module.exports = router;