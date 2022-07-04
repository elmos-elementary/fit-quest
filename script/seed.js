'use strict';

const {
  db,
  models: { User, Character, Exercise, Routine, Session, SessionExercise },
} = require('../server/db');
const userSeed = require('./userSeed');
const characterSeed = require('./characterSeed');
const exerciseSeed = require('./exerciseSeed');
const routineSeed = require('./routineSeed')
const sessionSeed = require('./sessionSeed')

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all(
    userSeed.map((user) => {
      return User.create(user);
    })
  );

  // Creating Characters
  const characters = await Promise.all(
    characterSeed.map((character) => {
      return Character.create(character);
    })
  );

  // Creating Exercises
  const exercise = await Promise.all(
    exerciseSeed.map((exercise) => {
      return Exercise.create(exercise);
    })
  );

  // Creating Routines
  const [chest, back, bicep, tricep, shoulder, lowerBody, cardio, flexability] = await Promise.all(
    routineSeed.map((routine) => {
      return Routine.create(routine)
    })
  );

  // Creating Sessions
  const sessions = await Promise.all(
    sessionSeed.map((session) => {
      return Session.create(session)
    })
  )

  // Creating Session Exercises
  const sessionExercises = await Promise.all([
    // bench press cody
    SessionExercise.create({
      reps: 12,
      sets: 5,
      weight: 225,
      cardioTime: null,
    }),
    // squats cody
    SessionExercise.create({
      reps: 12,
      sets: 5,
      weight: 315,
      cardioTime: null,
    }),
    // treadmill murphy
    SessionExercise.create({
      reps: null,
      sets: null,
      weight: null,
      cardioTime: 30,
    }),
    // downward dog murphy
    SessionExercise.create({
      reps: null,
      sets: null,
      weight: null,
      cardioTime: 15,
    }),
  ]);

  // Associations
  for (let i = 0; i < 10; i++) {
    await users[i].setCharacter(characters[i])
  }

  // Routine Exercises
  await chest.addExercise(exercise[4]) // Incline Dumbbell Bench Press
  await chest.addExercise(exercise[5]) // Low-cable Cross-over
  await chest.addExercise(exercise[3]) // Dumbbell Flys
  await back.addExercise(exercise[7]) // Seated Cable Row
  await back.addExercise(exercise[8]) // Reverse-grip Bent-over Row
  await back.addExercise(exercise[9]) // Lat Pull-down
  await bicep.addExercise(exercise[11]) // Dumbbell Bicep Curl
  await bicep.addExercise(exercise[14]) // Hammer Curl
  await bicep.addExercise(exercise[16]) // Overhead Cable Curl
  await tricep.addExercise(exercise[12]) // Tricep Dumbbell Kickback
  await tricep.addExercise(exercise[13]) // Cable V-bar Push-down
  await shoulder.addExercise(exercise[23]) // Overhead Dumbbell Front Raise
  await shoulder.addExercise(exercise[25]) // Military Press
  await shoulder.addExercise(exercise[24]) // Seated Dumbbell Press
  await lowerBody.addExercise(exercise[17]) // Bodyweight Squat
  await lowerBody.addExercise(exercise[19]) // Leg Press
  await lowerBody.addExercise(exercise[21]) // Seated Calf Raise
  await lowerBody.addExercise(exercise[22]) // Single-leg Glute Bridge
  await cardio.addExercise(exercise[35]) // Treadmill
  await cardio.addExercise(exercise[36]) // Jump Rope
  await cardio.addExercise(exercise[37]) // Stair Climber
  await cardio.addExercise(exercise[40]) // Burpee
  await flexability.addExercise(exercise[43]) // Windmill
  await flexability.addExercise(exercise[45]) // Lower Back Curl
  await flexability.addExercise(exercise[44]) // Leg-up Hamstring Stretch

  // Sessions
  await sessions[0].setRoutine(chest);
  await sessions[1].setRoutine(back);
  await sessions[2].setRoutine(lowerBody);
  await sessions[3].setRoutine(chest);
  await sessions[4].setRoutine(back);
  await sessions[5].setRoutine(lowerBody);
  await sessions[6].setRoutine(cardio);
  await sessions[7].setRoutine(cardio);
  await sessions[8].setRoutine(flexability);
  await sessions[9].setRoutine(bicep);
  await sessions[10].setRoutine(tricep);
  await sessions[11].setRoutine(shoulder);

  await users[0].addSessions(sessions[0]);
  await users[0].addSessions(sessions[1]);
  await users[0].addSessions(sessions[2]);
  await users[0].addSessions(sessions[3]);
  await users[0].addSessions(sessions[4]);
  await users[0].addSessions(sessions[5]);
  await users[1].addSessions(sessions[6]);
  await users[1].addSessions(sessions[7]);
  await users[9].addSessions(sessions[8]);
  await users[9].addSessions(sessions[9]);
  await users[9].addSessions(sessions[10]);
  await users[9].addSessions(sessions[11]);

  await sessionExercises[0].setExercise(exercise[0]);
  await sessionExercises[1].setExercise(exercise[1]);
  await sessionExercises[2].setExercise(exercise[2]);
  await sessionExercises[3].setExercise(exercise[3]);
  await sessionExercises[0].setSession(sessions[0]);
  await sessionExercises[1].setSession(sessions[0]);
  await sessionExercises[2].setSession(sessions[1]);
  await sessionExercises[3].setSession(sessions[1]);
  await sessionExercises[0].setUser(users[0]);
  await sessionExercises[1].setUser(users[0]);
  await sessionExercises[2].setUser(users[1]);
  await sessionExercises[3].setUser(users[1]);

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
