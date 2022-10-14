const Sauce = require('../models/sauce.js');

exports.allSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.createPost = (req, res, next) => {
//   console.log('req.body', req.body);
  res.status(201).json({test:'test'});
};


exports.createPost = (req, res, next) => {
  
  const sauceObject = JSON.parse(req.body.sauce);
  // console.log(sauceObject);
  

  // delete sauceObject._id; // pas besoin ici

  // créer un objet sauce qu'on va enregistrer en base ayant pour valeurs les éléments
  // envoyés par le front contenu dans ma constante sauceObject.

    const sauce = new Sauce({
      ...sauceObject,
      userId: req.body.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.filename}`
    
    });

    sauceObject.save()
    .then(() => {res.status(201).json({message: 'Objet enregistrée'})})
    .catch(error => { res.status(400).json( { error})}) 
    res.status(201).json({});
    
  };

  // Grace aux infos envoyé par le Front stocké dans req, enregistrer ses infos en base
  // Faire un console.log de req pour les infos