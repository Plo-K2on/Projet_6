const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const bodyParser = require('body-parser')


const sauceCtrl = require('../controllers/sauce.js');
router.post('/', multer, sauceCtrl.createSauce);
router.get('/', sauceCtrl.allSauces);

module.exports = router;