'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email.')
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword'],
        },
      },
      loginUser: {
        attributes: {}
      }
    },
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};