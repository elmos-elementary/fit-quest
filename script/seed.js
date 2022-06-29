'use strict'

const {
  db,
  models: { User, Character, Exercise, Routine, Session, SessionExercise },
} = require('../server/db')

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Smith',
      email: 'codythecoder@gmail.com',
      password: '123',
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Benson',
      email: 'murphywonder@gmail.com',
      password: '456',
    }),
  ])

  // Creating Characters
  const characters = await Promise.all([
    Character.create({
      name: 'Codyman',
      level: 40,
      experience: 200,
      lives: 2,
      image: 'cody.png',
    }),
    Character.create({
      name: 'Murphy the Great',
      level: 12,
      experience: 55,
      lives: 1,
      image: 'murphy.png',
    }),
  ])

  // Creating Exercises
  const exercise = await Promise.all([
    Exercise.create({
      name: 'Bench Press',
      exerciseType: 'strength',
      bodyPart: 'chest',
      description:
        'Start in the press-up position with your hands underneath your shoulders, your core tight, and your toes together so your body forms a straight line from head to heels. Bend your elbows to lower your chest down to the floor, pause for a second at the bottom position, then press back powerfully to the start (but don’t lock out your arms at the top). Recommended number of reps: 3 sets of 10.',
      image:
        'https://cdn.mos.cms.futurecdn.net/ZeMWrqrhEKKQLkJCjC8CyZ-970-80.jpg.webp',
      video: 'https://www.youtube.com/watch?v=rxD321l2svE',
    }),
    Exercise.create({
      name: 'Squat',
      exerciseType: 'strength',
      bodyPart: 'legs',
      description:
        'With grip and hands in place, walk under the bar and place it just below the spine of the scapula, on the meat of the rear deltoids muscles. Remember, we use the low bar position to allow us to bend over and use the posterior chain to stand up. With the bar in position, take a deep breath, and stand up with the bar on the back. Step out of the rack and take the same shoulder width stance as the stretch without the bar. Take a big deep breath with a closed glottis – the Valsalva Maneuver – to increase the intra abdominal pressure of our gut and provide stability for our back. As you prepare to squat down, remember two things: 1) you have to push your thighs apart – your elbows won’t do it for you and 2) don’t stop at the bottom; squat down to depth and come right back up. Perform a set of 5 repetitions and reset your breath at the top of each rep. Recommended number of reps: 3 sets of 10.',
      image: 'https://i.ytimg.com/vi/65Y2FfrwtvQ/maxresdefault.jpg',
      video: 'https://youtu.be/3PRwtVpyslo',
    }),
    Exercise.create({
      name: 'Treadmill',
      exerciseType: 'cardio',
      bodyPart: 'other',
      description:
        'Beginning runners should start with a walk/run approach. Warm-up for a few minutes, then jog for one minute and walk for one minute on the treadmill. Repeat about 10 times–more if you are feeling good and fewer times if you’re gasping for air after five repeats. Everyone has a different starting level. As a rule of thumb, don’t increase your mileage by more than 10 percent each week to avoid burning out and to reduce your risk of injury. Recommended duration: 30 minutes.',
      image: 'https://athleticmuscle.net/wp-content/uploads/2019/05/Threadmill-Workout.png',
      video: 'https://www.youtube.com/watch?v=8i3Vrd95o2k',
    }),
    Exercise.create({
      name: 'Downward Dog',
      exerciseType: 'yoga',
      bodyPart: 'other',
      description:
        'Start off on all fours and make sure your knees are slightly behind your hips. Your hands should be shoulder-width apart and spread your fingers out wide. Press your hands into the mat and gently tuck your toes under and take a deep inhale, then keeping your hands pressed into the mat exhale deeply, lifting your knees off the floor and straightening your legs as much as you can. Recommended duration: 30 seconds x 3 times.',
      image: 'https://destinationyoga.co.uk/wp-content/uploads/2017/07/DownwardDog.jpg',
      video: 'https://www.youtube.com/watch?v=YqOqM79McYY',
    }),
  ])

  // Creating Routines
  const routines = await Promise.all([
    Routine.create({
      name: 'Upper Body'
    }),
    Routine.create({
      name: 'Cardio'
    })
  ])

  // Creating Sessions
  const sessions = await Promise.all([
    // Cody
    Session.create({
      date: new Date()
    }),
    // Murphy
    Session.create({
      date: new Date()
    })
  ])

  // Creating Session Exercises
  const sessionExercises = await Promise.all([
    // bench press cody
    SessionExercise.create({
      reps: 12,
      sets: 5,
      weight: 225,
      cardioTime: null
    }),
    // squats cody
    SessionExercise.create({
      reps: 12,
      sets: 5,
      weight: 315,
      cardioTime: null
    }),
    // treadmill murphy
    SessionExercise.create({
      reps: null,
      sets: null,
      weight: null,
      cardioTime: 30
    }),
    // downward dog murphy
    SessionExercise.create({
      reps: null,
      sets: null,
      weight: null,
      cardioTime: 15
    })
  ])

  // Associations
  await users[0].setCharacter(characters[0])
  await users[1].setCharacter(characters[1])
  await routines[0].addExercise(exercise[0])
  await routines[0].addExercise(exercise[1])
  await routines[1].addExercise(exercise[2])
  await routines[1].addExercise(exercise[3])
  await sessions[0].setRoutine(routines[0])
  await sessions[1].setRoutine(routines[1])
  await users[0].setSessions(sessions[0])
  await users[1].setSessions(sessions[1])
  await sessionExercises[0].setExercise(exercise[0])
  await sessionExercises[1].setExercise(exercise[1])
  await sessionExercises[2].setExercise(exercise[2])
  await sessionExercises[3].setExercise(exercise[3])
  await sessionExercises[0].setSession(sessions[0])
  await sessionExercises[1].setSession(sessions[0])
  await sessionExercises[2].setSession(sessions[1])
  await sessionExercises[3].setSession(sessions[1])
  await sessionExercises[0].setUser(users[0])
  await sessionExercises[1].setUser(users[0])
  await sessionExercises[2].setUser(users[1])
  await sessionExercises[3].setUser(users[1])


  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
