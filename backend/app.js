const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.js');
const sauceRoutes = require('./routes/sauce.js');
const path = require('path');
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const app = express();
const rateLimit = require('express-rate-limit');

mongoose.connect(process.env.BDD_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })


app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', apiLimiter, userRoutes);
app.use(rateLimit)

module.exports = app;

