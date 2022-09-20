const sauce = require('../routes/sauce');

exports.sauceCtrl = (req, res, next) => {
    sauce.find().then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
