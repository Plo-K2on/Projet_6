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
  const thingObject = JSON.parse(req.body.thing);
  // delete thingObject._id;
  // delete thingObject._userId;
    const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
    .then(() => {res.status(201).json({message: 'Objet enregistrée'})})
    .catch(error => { res.status(400).json( { error})}) 

  };

  // Grace aux infos envoyé par le Front stocké dans req, enregistrer ses infos en base
  // Faire un console.log de req pour les infos