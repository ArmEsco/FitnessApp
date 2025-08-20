var DataTypes = require("sequelize").DataTypes;
var _Badges = require("./Badges");
var _Exercises = require("./Exercises");
var _Goals = require("./Goals");
var _Habits = require("./Habits");
var _Roles = require("./Roles");
var _Tasks = require("./Tasks");
var _Teams = require("./Teams");
var _UserExercise = require("./UserExercise");
var _Users = require("./Users");
var _WorkoutSession = require("./WorkoutSession");

function initModels(sequelize) {
  var Badges = _Badges(sequelize, DataTypes);
  var Exercises = _Exercises(sequelize, DataTypes);
  var Goals = _Goals(sequelize, DataTypes);
  var Habits = _Habits(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var Tasks = _Tasks(sequelize, DataTypes);
  var Teams = _Teams(sequelize, DataTypes);
  var UserExercise = _UserExercise(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var WorkoutSession = _WorkoutSession(sequelize, DataTypes);

  UserExercise.belongsTo(Exercises, { as: "Exercise", foreignKey: "ExerciseID"});
  Exercises.hasMany(UserExercise, { as: "UserExercises", foreignKey: "ExerciseID"});
  Users.belongsTo(Roles, { as: "Role", foreignKey: "RoleID"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "RoleID"});
  Badges.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Badges, { as: "Badges", foreignKey: "UserID"});
  Goals.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Goals, { as: "Goals", foreignKey: "UserID"});
  Habits.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Habits, { as: "Habits", foreignKey: "UserID"});
  WorkoutSession.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(WorkoutSession, { as: "WorkoutSessions", foreignKey: "UserID"});
  UserExercise.belongsTo(WorkoutSession, { as: "Workout", foreignKey: "WorkoutID"});
  WorkoutSession.hasMany(UserExercise, { as: "UserExercises", foreignKey: "WorkoutID"});

  return {
    Badges,
    Exercises,
    Goals,
    Habits,
    Roles,
    Tasks,
    Teams,
    UserExercise,
    Users,
    WorkoutSession,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
