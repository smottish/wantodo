const { MongoClient, ObjectId } = require('mongodb')
const shortid = require('shortid')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const DEFAULT_WANTS = [
  { description: "Learn a new language" },
  { description: "Exercise 30 min a day" },
  { description: "Read for 15 minutes" },
]

async function run(user={}) {
    try {
      await client.connect()
      const database = client.db('wantodo')
      const users = database.collection('users')
      const wants = database.collection('wants')
      user.accessCode = shortid.generate()
      await users.insertOne(user)
      console.log('New user created :)')
      console.log(user)
      const defaultWants = DEFAULT_WANTS.map((want) => {
        want.ownerId = user._id
        return want
      })
      const res = await wants.insertMany(defaultWants)
      if (res.insertedIds < defaultWants.length) {
        console.log('!!! Error creating default wants')
      }
    } catch (e) {
      console.log('!!! Error')
      console.log(e)
  } finally {
      client.close()
  }
}

async function main() {
    if (!process.env.MONGODB_URI) {
        console.log('!!! Please set the MONGODB_URI env var')
        return
    }

    if (process.argv.length < 4) {
        console.log('!!! Please enter the first and last name of the new user')
        return
    }

    await run({
        first_name: process.argv[2],
        last_name: process.argv[3],
    })
}

main()
