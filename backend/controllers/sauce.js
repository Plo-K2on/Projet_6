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
      Sauce.updateOne(
          {_id: req.params.id},
          { ...sauceObject, 
            _id: req.params.id
          }
        )
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
  const sauceId = req.params.id;
  const userId = req.body.userId;
  const likeAction = req.body.like;
  const isInArray = [+1, -1, 0]

  // $push = syntaxe de mongoose, voir doc
  // $inc = syntaxe de mongoose, voir doc
  console.log('likeAction', likeAction)

  if (likeAction === 1){
    Sauce.updateOne({_id: sauceId}, {
      $push: {usersLiked: userId}, 
      $inc: {likes: +1}
    })
    .then(() => res.status(200).json({message: "J'aime"}))
    .catch((error)=>res.status(400).json({error}))

  } else if (likeAction === -1) {
    // on enregistre l'userId dans le tableau usersDisLiked de l'objet Sauce
    // on incrémente le compteur dislikes de l'objet Sauce
    Sauce.updateOne({_id: sauceId}, {
      $push: {usersDisliked: userId}, 
      $inc: {dislikes: +1}
    })
    .then(() => res.status(200).json({message: "J'aime pas"}))
    .catch((error)=>res.status(400).json({error}))


  } else if (likeAction === 0) {
    // récupérer le tableau userDislike
    // créeer une variable nommé isUserDislike
    // vérifier si l'userId est présent dans le tableau usersDisliked et l'affecter a la variable isUserDislike
    // si isUserDislike est vrai
      // alors
      // on supprime l'userId du tableau usersDisliked
      // on décrémente le tableau disliked
      // on (sauvegarde) et on met a jour
      // renvoyer une réponse au front (vérifier le brief si il faut une réponse normalisé ou pas)

      ///////////////////////////////////////////
  } 
  
  // if (usersLiked.includes[isInArray]) {
  //   Sauce.updateOne({_id: sauceId}, {
  //     $push: {usersLiked: userId}, 
  //     $inc: {likes: -1},
  // })
    // si c'est dans usersLiked
      // alors j'enleve l'userId du tableau usersLiked
      // et je décrémente le compteur likes
      // je met a jour ensuite l'objet en base
 };

  // if (usersDisliked.includes[isInArray]) {
  //   Sauce.updateOne({_id: sauceId}, {
  //     $push: {usersDisliked: userId},
  //     $inc: {likes: -1},
  //   })
    // sinon si c'est dans usersDislked
      // alors j'enleve l'userId du tableau usersDisliked
      // et je décrémente le compteur dislikes
      // je met a jour ensuite l'objet en base
  //}};







  // Sauce.findOne({_id: req.params.id}).then(
  //   () => {
  //     if (req.body.like === 1){
  //       //  console.log('user aime')
        
  //       // on enregistre l'userId dans le tableau usersliked de l'objet Sauce
  //       // on incrémente le compteur likes de l'objet Sauce
  //       } else if(req.body.like === -1){
  //         // console.log('user aime pas')
        
  //       // on enregistre l'userId dans le tableau usersDisLiked de l'objet Sauce
  //       // on incrémente le compteur dislikes de l'objet Sauce
  //       } else if (req.body.like === 0){
  //         // console.log('user annule son like/dislike')
  //       }

  //       // Sauce.updateOne({_id: req.body.like}, { ...sauceObject, _id: req.body.like})
  //       // .then(() => res.status(200).json({message : 'like/dislike enregistrée'}))
  //       // .catch(error => res.status(401).json({ error }));
  //       // res.status(200).json({
  //       //   message: 'Like'
  //       // });
        
  //   }
  // ).catch(
  //   (error) => {
  //     res.status(400).json({
  //       error: error
  //     });
  //   }
  // );

  // res.status(400).json({
  //   error: error
  // });
