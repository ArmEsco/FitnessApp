const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserExercise', {
    WorkoutExerciseID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    WorkoutID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'WorkoutSession',
        key: 'WorkoutID'
      }
    },
    ExerciseID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Exercises',
        key: 'ExerciseID'
      }
    },
    Reps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Weight: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    SetNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserExercise',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "WorkoutExerciseID" },
        ]
      },
      {
        name: "WorkoutID",
        using: "BTREE",
        fields: [
          { name: "WorkoutID" },
        ]
      },
      {
        name: "ExerciseID",
        using: "BTREE",
        fields: [
          { name: "ExerciseID" },
        ]
      },
    ]
  });
};
