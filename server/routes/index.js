
const propertytypesController = require('../controllers').propertytypes;
const usersController = require('../controllers').users;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/api/createUser', usersController.create);
  app.post('/api/SignInUser', usersController.sign_in);

  app.use((req, res, next) => {

    const token = req.body.token || req.param('token') || req.headers.authorization && req.headers.authorization.split('Bearer')[1].trim();
    if (token) {
      jwt.verify(token, 'sds_api', (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  app.get('/api/LisStocktProperty', propertytypesController.list);
  app.get('/api/StockSearchtProperty', propertytypesController.searchList);
};