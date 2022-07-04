'use strict';

const {
  db,
  models: { User, Character, Exercise, Routine, Session, SessionExercise },
} = require('../server/db');
const userSeed = require('./userSeed');
const characterSeed = require('./characterSeed');
const exerciseSeed = require('./exerciseSeed');

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
    exerciseSeed.map((item) => {
      return Exercise.create(item);
    })
  );

  // Creating Routines
  const routines = await Promise.all([
    Routine.create({
      name: 'Upper Body',
    }),
    Routine.create({
      name: 'Cardio',
    }),
  ]);

  // Creating Sessions
  const sessions = await Promise.all([
    // Cody
    Session.create({
      date: new Date(),
    }),
    // Murphy
    Session.create({
      date: new Date(),
    }),
  ]);

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
  await routines[0].addExercise(exercise[0]);
  await routines[0].addExercise(exercise[1]);
  await routines[1].addExercise(exercise[2]);
  await routines[1].addExercise(exercise[3]);
  await sessions[0].setRoutine(routines[0]);
  await sessions[1].setRoutine(routines[1]);
  await users[0].setSessions(sessions[0]);
  await users[1].setSessions(sessions[1]);
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
