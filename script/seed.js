'use strict';

const {
  db,
  models: { User, Exercise, Routine, Session, SessionExercise, Opponent },
} = require('../server/db');
const userSeed = require('./userSeed');
// const characterSeed = require('./characterSeed');
const exerciseSeed = require('./exerciseSeed');
const routineSeed = require('./routineSeed')
const sessionSeed = require('./sessionSeed')
const sessionExerciseSeed = require('./sessionExerciseSeed')
const opponentSeed = require('./opponentSeed')

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all(
    userSeed.map((user) => {
      return User.create(user);
    })
  );

  // Creating Exercises
  const exercise = await Promise.all(
    exerciseSeed.map((exercise) => {
      return Exercise.create(exercise);
    })
  );

  // Creating Routines
  const routines = await Promise.all(
    routineSeed.map((routine) => {
      return Routine.create(routine)
    })
  );

  const [chest, back, bicep, tricep, shoulder, lowerBody, cardio, flexability] = routines

  // Creating Sessions
  const sessions = await Promise.all(
    sessionSeed.map((session) => {
      return Session.create(session)
    })
  )

  // Creating Session Exercises
  const sessionExercises = await Promise.all(
    sessionExerciseSeed.map((sessionExercise) => {
      return SessionExercise.create(sessionExercise)
    })
  )

  // Creating Opponents
  const opponents = await Promise.all(
    opponentSeed.map((opponent) => {
      return Opponent.create(opponent)
    })
  )

  // Associations
  for (let i = 0; i < 2; i++) {
    await opponents[i].setUser(users[i])
  }

  // Routine Exercises
  await chest.addExercise(exercise[3]) // Incline Dumbbell Bench Press
  await chest.addExercise(exercise[4]) // Low-cable Cross-over
  await chest.addExercise(exercise[2]) // Dumbbell Flys
  await back.addExercise(exercise[6]) // Seated Cable Row
  await back.addExercise(exercise[7]) // Reverse-grip Bent-over Row
  await back.addExercise(exercise[8]) // Lat Pull-down
  await bicep.addExercise(exercise[10]) // Dumbbell Bicep Curl
  await bicep.addExercise(exercise[13]) // Hammer Curl
  await bicep.addExercise(exercise[15]) // Overhead Cable Curl
  await tricep.addExercise(exercise[11]) // Tricep Dumbbell Kickback
  await tricep.addExercise(exercise[12]) // Cable V-bar Push-down
  await tricep.addExercise(exercise[46]) // Seated Triceps Press
  await shoulder.addExercise(exercise[22]) // Overhead Dumbbell Front Raise
  await shoulder.addExercise(exercise[24]) // Military Press
  await shoulder.addExercise(exercise[23]) // Seated Dumbbell Press
  await lowerBody.addExercise(exercise[16]) // Bodyweight Squat
  await lowerBody.addExercise(exercise[18]) // Leg Press
  await lowerBody.addExercise(exercise[20]) // Seated Calf Raise
  await lowerBody.addExercise(exercise[21]) // Single-leg Glute Bridge
  await cardio.addExercise(exercise[34]) // Treadmill
  await cardio.addExercise(exercise[35]) // Jump Rope
  await cardio.addExercise(exercise[36]) // Stair Climber
  await cardio.addExercise(exercise[39]) // Burpee
  await flexability.addExercise(exercise[42]) // Windmill
  await flexability.addExercise(exercise[44]) // Lower Back Curl
  await flexability.addExercise(exercise[43]) // Leg-up Hamstring Stretch

  // Sessions
  await sessions[0].setRoutine(chest);
  await sessions[1].setRoutine(back);
  await sessions[2].setRoutine(lowerBody);
  await sessions[3].setRoutine(chest);
  await sessions[4].setRoutine(back);
  await sessions[5].setRoutine(lowerBody);
  await sessions[6].setRoutine(cardio);
  await sessions[7].setRoutine(cardio);

  await users[0].addSessions(sessions[0]);
  await users[0].addSessions(sessions[1]);
  await users[0].addSessions(sessions[2]);
  await users[0].addSessions(sessions[3]);
  await users[0].addSessions(sessions[4]);
  await users[0].addSessions(sessions[5]);
  await users[1].addSessions(sessions[6]);
  await users[1].addSessions(sessions[7]);

  // Cody Session Exercises
  await sessionExercises[0].setExercise(exercise[3])
  await sessionExercises[0].setSession(sessions[0])
  await sessionExercises[0].setUser(users[0])
  await sessionExercises[1].setExercise(exercise[4])
  await sessionExercises[1].setSession(sessions[0])
  await sessionExercises[1].setUser(users[0])
  await sessionExercises[2].setExercise(exercise[2])
  await sessionExercises[2].setSession(sessions[0])
  await sessionExercises[2].setUser(users[0])
  await sessionExercises[3].setExercise(exercise[6])
  await sessionExercises[3].setSession(sessions[1])
  await sessionExercises[3].setUser(users[0])
  await sessionExercises[4].setExercise(exercise[7])
  await sessionExercises[4].setSession(sessions[1])
  await sessionExercises[4].setUser(users[0])
  await sessionExercises[5].setExercise(exercise[8])
  await sessionExercises[5].setSession(sessions[1])
  await sessionExercises[5].setUser(users[0])
  await sessionExercises[6].setExercise(exercise[16])
  await sessionExercises[6].setSession(sessions[2])
  await sessionExercises[6].setUser(users[0])
  await sessionExercises[7].setExercise(exercise[18])
  await sessionExercises[7].setSession(sessions[2])
  await sessionExercises[7].setUser(users[0])
  await sessionExercises[8].setExercise(exercise[20])
  await sessionExercises[8].setSession(sessions[2])
  await sessionExercises[8].setUser(users[0])
  await sessionExercises[9].setExercise(exercise[21])
  await sessionExercises[9].setSession(sessions[2])
  await sessionExercises[9].setUser(users[0])
  await sessionExercises[10].setExercise(exercise[3])
  await sessionExercises[10].setSession(sessions[3])
  await sessionExercises[10].setUser(users[0])
  await sessionExercises[11].setExercise(exercise[4])
  await sessionExercises[11].setSession(sessions[3])
  await sessionExercises[11].setUser(users[0])
  await sessionExercises[12].setExercise(exercise[2])
  await sessionExercises[12].setSession(sessions[3])
  await sessionExercises[12].setUser(users[0])
  await sessionExercises[13].setExercise(exercise[6])
  await sessionExercises[13].setSession(sessions[4])
  await sessionExercises[13].setUser(users[0])
  await sessionExercises[14].setExercise(exercise[7])
  await sessionExercises[14].setSession(sessions[4])
  await sessionExercises[14].setUser(users[0])
  await sessionExercises[15].setExercise(exercise[8])
  await sessionExercises[15].setSession(sessions[4])
  await sessionExercises[15].setUser(users[0])
  await sessionExercises[16].setExercise(exercise[16])
  await sessionExercises[16].setSession(sessions[5])
  await sessionExercises[16].setUser(users[0])
  await sessionExercises[17].setExercise(exercise[18])
  await sessionExercises[17].setSession(sessions[5])
  await sessionExercises[17].setUser(users[0])
  await sessionExercises[18].setExercise(exercise[20])
  await sessionExercises[18].setSession(sessions[5])
  await sessionExercises[18].setUser(users[0])
  await sessionExercises[19].setExercise(exercise[21])
  await sessionExercises[19].setSession(sessions[5])
  await sessionExercises[19].setUser(users[0])

  // Murphy Session Exercises
  await sessionExercises[20].setExercise(exercise[34])
  await sessionExercises[20].setSession(sessions[6])
  await sessionExercises[20].setUser(users[1])
  await sessionExercises[21].setExercise(exercise[35])
  await sessionExercises[21].setSession(sessions[6])
  await sessionExercises[21].setUser(users[1])
  await sessionExercises[22].setExercise(exercise[36])
  await sessionExercises[22].setSession(sessions[6])
  await sessionExercises[22].setUser(users[1])
  await sessionExercises[23].setExercise(exercise[39])
  await sessionExercises[23].setSession(sessions[6])
  await sessionExercises[23].setUser(users[1])
  await sessionExercises[24].setExercise(exercise[34])
  await sessionExercises[24].setSession(sessions[7])
  await sessionExercises[24].setUser(users[1])
  await sessionExercises[25].setExercise(exercise[35])
  await sessionExercises[25].setSession(sessions[7])
  await sessionExercises[25].setUser(users[1])
  await sessionExercises[26].setExercise(exercise[36])
  await sessionExercises[26].setSession(sessions[7])
  await sessionExercises[26].setUser(users[1])
  await sessionExercises[27].setExercise(exercise[39])
  await sessionExercises[27].setSession(sessions[7])
  await sessionExercises[27].setUser(users[1])

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
