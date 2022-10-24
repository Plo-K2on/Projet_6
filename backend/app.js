const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.js');
const sauceRoutes = require('./routes/sauce.js');
const path = require('path');
const dotenv = require("dotenv")
const cors = require('cors');
// const formData = require('express-form-data');
dotenv.config();
const app = express();




mongoose.connect(process.env.BDD_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// app.use(formData.parse());
app.use(cors());
// app.use(express.json());
app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });


//app.use(bodyParser.json()); // Commande qui bloque la connexion au site


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

