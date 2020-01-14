'use strict'

const faker = require('faker')

const db = require('../server/db')
const {
  User,
  Review,
  Order,
  Item,
  Category,
  Cart,
  Address
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const userFramework = []
  const addressFramework = []
  for (let i = 0; i < 1; i++) {
    userFramework.push({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      salt: 'salt',
      admin: false
    })
    addressFramework.push({
      street: `${faker.address.streetAddress()} ${faker.address.streetName()}`,
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: '01234' //faker.address.zipCode('#####'),
    })
  }

  console.log(addressFramework)

  const users = await Promise.all([
    User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@email.com',
      password: 'admin',
      admin: true
    }),
    ...userFramework.map(user => User.create(user))
  ])

  console.log(`seeded ${users.length} users`)

  const addresses = await Promise.all(
    addressFramework.map(address => Address.create(address))
  )

  console.log(`seeded ${users.length} addresses`)

  await Promise.all(addresses.map((address, i) => address.setUser(users[i])))

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
