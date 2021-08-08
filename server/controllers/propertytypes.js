const Model = require('../models')

module.exports = {
  // This IS A Drop Down API
    list(req, res) {
      let sql = 'SELECT * FROM "PropertyType"'
      return Model.sequelize.query(sql, {
        replacements: {},
        type: Model.sequelize.QueryTypes.SELECT
      })
      .then(propertytypes => { 
        res.status(200).json({
          status: 'Success',
          message: 'propertytypes',
          data: propertytypes,
          totalCount : propertytypes.length
        })
      })
      .catch(error => res.status(400).json({
        status: 'Failed',
        message: error.errors[0].message
      }));
    },

  // This api for search by property and drop down.
  searchList(req, res) {

    if(req.query.name){
      var sql = `SELECT * from "PropertyType" as p where p."name" iLIKE '%${req.query.name}%'`
    }
    else{
      sql = `SELECT * from "PropertyType"`
    }
    return Model.sequelize.query(sql, {
      replacements: {},
      type: Model.sequelize.QueryTypes.SELECT
    })
    .then(propertytypes => { 
      res.status(200).json({
        status: 'Success',
        message: 'propertytypes',
        data: propertytypes,
        totalCount : propertytypes.length
      })
    })
    .catch(error => res.status(400).json({
      status: 'Failed',
      message: error.errors[0].message
    }));
  }
};