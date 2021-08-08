'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyType = sequelize.define('PropertyTypes', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    }, 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentmarketprices: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    marketcap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stockpe: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dividendyield: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    rocepr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },  
    roepreviousannum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    debttoequity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reserves: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    debt: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  PropertyType.associate = (models) => {
  };

  return PropertyType;
};