const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "Username"
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "Email"
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Height: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    Weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Roles',
        key: 'RoleID'
      }
    }
  }, {
    sequelize,
    tableName: 'Users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "Username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Username" },
        ]
      },
      {
        name: "Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
      {
        name: "RoleID",
        using: "BTREE",
        fields: [
          { name: "RoleID" },
        ]
      },
    ]
  });
};
