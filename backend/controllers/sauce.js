const Sauce = require('../models/sauce.js');
const jwt = require('jsonwebtoken');

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
  const sauceId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, decodedUserId);
  const decodedUserId = decodedToken.userId;

  Sauce.findOne({_id: sauceId})
  .then((sauce) => {
      const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } :
      { ...req.body };
      if (sauce.userId !== decodedUserId) {
        res.status(401).json({ message: 'non autorisée'});
      } else {

        if (decodedUserId === sauce.userId){
          Sauce.updateOne({_id: req.params.id},
            { ...sauceObject, 
              _id: req.params.id
            })
            .then(() => {
              res.status(200).json({message : 'Objet modifié!'})
            })
            .catch(error => res.status(401).json({ error }));
        } else {
          res.status(401).json({ message : 'Vous ne pouvez pas modifier cette sauce' });
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.deleteSauce = (req, res, next) => {
  const sauceId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, decodedUserId);
  const decodedUserId = decodedToken.userId;

  // on recherche la sauce a supprimer
  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      // on vérifie que l'userID dans l'enregistrement correspond a l'userID du token
      if(sauce.userId === decodedUserId){
        // si c'est le cas on fait l'opération de suppression de l'enregistrement
        Sauce.deleteOne({_id: req.params.id})
        .then(() => { res.status(200).json({message: 'Deleted!'})})
        .catch((error) => { res.status(400).json({error: error})});
      } else {
        // sinon on envoi un message d'erreur
        res.status(401).json({message: 'Suppression non autorisé'});
      }
  })
  .catch((error) => {
    res.status(400).json({ error })
  }
)}

exports.likeSauce = (req, res, next) => {
  const sauceId = req.params.id;
  const userId = req.body.userId;
  const likeAction = req.body.like;

  if (likeAction === 1){
    Sauce.updateOne({_id: sauceId}, {
      $push: {usersLiked: userId}, 
      $inc: {likes: +1}
    })
    .then(() => res.status(200).json({message: "J'aime"}))
    .catch((error)=>res.status(400).json({error}))

  } else if (likeAction === -1) {
    Sauce.updateOne({_id: sauceId}, {
      $push: {usersDisliked: userId}, 
      $inc: {dislikes: +1}
    })
    .then(() => res.status(200).json({message: "J'aime pas"}))
    .catch((error) => res.status(400).json({error}))


  } else if (likeAction === 0) {
    Sauce.findOne({
      _id: sauceId
    }).then(
      (sauce) => {
        console.log('usesDisliked', sauce.usersDisliked)
        const isUserIdIsInDisliked = sauce.usersDisliked.includes(userId);
        const isUserIdIsInLiked = sauce.usersLiked.includes(userId);

        if (isUserIdIsInDisliked === true) { 
          Sauce.updateOne({_id: sauceId}, {
            $pull: {usersDisliked: userId}, 
            $inc: {dislikes: -1}
          }).then(()=> res.status(200).json({message: "annulation du dislike"}))
            .catch((error)=> res.status(400).json({error}))

        } else if (isUserIdIsInLiked === true) {
          Sauce.updateOne({_id: sauceId}, {
            $pull: {usersLiked: userId}, 
            $inc: {likes: -1}
          }).then(()=> res.status(200).json({message: "annulation du like"}))
            .catch((error)=> res.status(400).json({error}))
        }
      }
    )
  }
}