const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const bodyParser = require('body-parser')
const auth = require('../middleware/auth');


const sauceCtrl = require('../controllers/sauce.js');
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/:id', auth, multer, sauceCtrl.getOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// créer route pour modifier une sauce en fonction d'un ID
// créer route pour avoir une sauce en fonction d'un ID
router.get('/', sauceCtrl.allSauces);

module.exports = router;