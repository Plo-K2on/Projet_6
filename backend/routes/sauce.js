const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
router.get('/', sauceCtrl.allSauces);

module.exports = router;