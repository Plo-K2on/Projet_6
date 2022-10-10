const express = require('express');
const router = express.Router();


const sauceCtrl = require('../controllers/sauce.js');
router.post('/', sauceCtrl.createPost);
router.get('/', sauceCtrl.allSauces);

module.exports = router;