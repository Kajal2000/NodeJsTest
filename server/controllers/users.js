const Model = require('../models'),
  User = require('../models').LoginUser,
  bcrypt = require('bcrypt'),
  path = require('path'),
  crypto = require('crypto'),
  hbs = require('nodemailer-express-handlebars'),
  env = process.env.NODE_ENV || 'development',
  ResponseHandler = require('../lib/response-handler');

const jwt = require('jsonwebtoken');

const Constants = Model.constants;

module.exports = {
  create(req, res) {
    return User
      .create({
        id:req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id,
      })
      .then(user => {
        res.status(200).json({
          status: 'Success',
          message: 'User Created',
          data: {
            data:user,
            count: user.length
          }
        });
      })
      .catch(error => res.status(400).json({
        status: 'Failed',
        message: error
      }));
  },

  sign_in(req, res) {
    let lang = req.headers["accept-language"] || "en";
    User.findOne({
      where: {
        email: req.body.email,
      }
    })
      .then(user => {
        if ((user.role_id == 3 || user.role_id == 5 || user.role == 2 || user.role == 7) && req.device.type == 'desktop') {
          var error = {
            success: true,
            error: [{
              code: 401,
              message: "Unauthorized."
            }]
          };
          res.status(400).json(ResponseHandler.errorResponse(error));
        }
        if ((user.role_id == 6) && req.device.type == 'phone') {
          var error = {
            success: true,
            error: [{
              code: 401,
              message: "Unauthorized."
            }]
          };
          return res.status(400).json(ResponseHandler.errorResponse(error));
        }
        bcrypt.compare(req.body.password, user.password).then((check) => {
          if (check === true) {
            const payload = {
              user_id: user.id
            };
            const token = jwt.sign(payload, 'sds_api', {});
            var today = new Date().toISOString().slice(0, 10);

            if (user.role_id == 2 || user.role_id == 3) {
              Model.Sludge.findOne({
                where: {
                  operator_id: user.id
                },
                order: [
                  ['id', 'DESC']
                ]
              })
                .then(sludge => {
                  if (sludge)
                    user = {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      role_id: user.role_id,
                      token: token,
                    };
                  else
                    user = {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      role_id: user.role_id,
                      token: token,
                      last_activity_id: null
                    }
                  response = {
                    success: true,
                    data: {
                      user: user
                    },
                    count: user.length
                  };
                  res.status(200).json(ResponseHandler.createResponse(response));
                })
                .catch(error => res.status(400).json({
                  status: 'Failed',
                  message: error
                }))
            }
            else {
              user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                token: token
              };

              response = {
                status: true,
                data: {
                  user: user
                },
                count: user.length
              };

              res.status(200).json(ResponseHandler.createResponse(response));
            }
          }
          else {
            var error = {
              success: true,
              error: [{
                code: 102,
                message : "Wrong password."
              }]
            };
            res.status(400).json(ResponseHandler.errorResponse(error));
          }

        }).catch(error => {
          var error = {
            status: true,
            error: error
          };
          res.status(400).json(ResponseHandler.errorResponse(error));
        })

      })
      .catch(error => {
        var error = {
          status: true,
          error: [{
            code: 101,
            message : "Email not found."

          }]
        };
        res.status(400).json(ResponseHandler.errorResponse(error));
      })
  }
};