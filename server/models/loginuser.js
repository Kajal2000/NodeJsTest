module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('bcrypt');
  const LoginUser = sequelize.define('LoginUser', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    hooks: {
      beforeCreate: (loginuser) => {
        const salt = bcrypt.genSaltSync(10);
        loginuser.password = bcrypt.hashSync(loginuser.password, salt);
      }
    },
    instanceMethods: {
        validPassword: (password) => {
        bcrypt.compareSync(password, this.password);
      },
      comparePassword: (password) => {
        bcrypt.compareSync(password, this.password);
      },
    }    
});


  LoginUser.associate = (models) => {
    // associations can be defined here
  };

  return LoginUser;
};
