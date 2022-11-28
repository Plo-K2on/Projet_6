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
  const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      userId: sauceObject.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
    .then(() => {
      res.status(201).json({message: 'Objet enregistrée'})
    })
    .catch(error => {
      res.status(400).json( { error})
    }) 
  };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
console.log('modify', req.params.id)
  // delete sauceObject._userId;
  Sauce.findOne({
    _id: req.params.id
  })
  .then((sauce) => {
    console.log('sauce', sauce)
    if (sauce.userId !== req.auth.userId) {
      res.status(401).json({ message: 'non autorisée'});
    } else {
      Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({message : 'Objet modifié!'}))
      .catch(error => res.status(401).json({ error }));
    }
  })
  .catch((error) => {
    res.status(400).json({ error })
  })
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

 // Recuperer les parametres, (dans req)
  // Récupérer l'objet sauce appoprié grace à l'ID en paramètre
  // En fonction du parametre like (1, 0, -1)
  // si like = 1
  // alors
    // on enregistre dans le tableau sauce.usersliked
    // on incrément le compteur sauce.likes

  // renvoyer un message  et un status 200 si tout est ok sinon status 400

exports.likeSauce = (req, res, next) => {
  // console.log('id', req.params.id)
  // console.log('id', req.params)
  Sauce.findOne({_id: req.params.id}).then(
    () => {
      if (req.body.like === 1) {
        console.log('utilisareur aime')
        // on enregistre l'userId dans le tableau usersliked de l'objet Sauce
        // on incrémente le compteur likes de l'objet Sauce
        } else if(req.body.like === -1){
          console.log('user aime pas')
          // on enregistre l'userId dans le tableau usersDisLiked de l'objet Sauce
        // on incrémente le compteur dislikes de l'objet Sauce
        } else if (req.body.like === 0){
          console.log('user annule son like/dislike')
        }
      res.status(200).json({
        message: 'Like'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );

  // res.status(400).json({
  //   error: error
  // });
};

