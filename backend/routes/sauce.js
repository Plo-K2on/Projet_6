const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const bodyParser = require('body-parser')


const sauceCtrl = require('../controllers/sauce.js');
router.post('/', multer, sauceCtrl.createSauce);
// créer route pour modifier une sauce en fonction d'un ID
// créer route pour avoir une sauce en fonction d'un ID
router.get('/', sauceCtrl.allSauces);

module.exports = router;