//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Character = require('./models/Character');
const Exercise = require('./models/Exercise');
const Routine = require('./models/Routine');
const Session = require('./models/Session');
const SessionExercise = require('./models/SessionExercise');

//associations could go here!
User.hasOne(Character)
Character.belongsTo(User)
User.hasMany(Session)
Session.belongsTo(User)
Routine.hasMany(Session)
Session.belongsTo(Routine)
Routine.belongsToMany(Exercise, { through: 'RoutineExercise' })
Exercise.belongsToMany(Routine, { through: 'RoutineExercise' })
Exercise.hasMany(SessionExercise)
SessionExercise.belongsTo(Exercise)
Session.hasMany(SessionExercise)
SessionExercise.belongsTo(Session)
// Maybe
User.hasMany(SessionExercise)
SessionExercise.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Character,
    Exercise,
    Routine,
    Session,
    SessionExercise
  },
};
