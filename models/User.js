const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model { 
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
    },
    {
      hooks: {
        beforeCreate: async (newUserAccountData) => {
          newUserAccountData.password = await bcrypt.hash(newUserAccountData.password, 10);
          return newUserAccountData;
        },
        beforeBulkCreate: async (newUserAccountData) => {
          for (const data of newUserAccountData) {
            data.password = await bcrypt.hash(data.password, 10);
          }
          return newUserAccountData;
        } 
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "User",
    }
  );
  
  module.exports = User;