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


exports.createSauce = (req, res, next) => {
  console.log('test controlleur')
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  // console.log('req.body.sauce', req.body.sauce);
  // console.log('sauceObject', sauceObject);
  // console.log('req image', req.files.image.name);

  // delete sauceObject._id; // pas besoin ici

  // créer un objet sauce qu'on va enregistrer en base ayant pour valeurs les éléments
  // envoyés par le front contenu dans ma constante sauceObject.

    const sauce = new Sauce({
      ...sauceObject,
      userId: sauceObject.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.files.image.name}`
    });

    sauce.save()
    .then(() => {
      res.status(201).json({message: 'Objet enregistrée'})
    })
    .catch(error => {
      res.status(400).json( { error})
    }) 
    
  };

  // Grace aux infos envoyé par le Front stocké dans req, enregistrer ses infos en base
  // Faire un console.log de req pour les infos