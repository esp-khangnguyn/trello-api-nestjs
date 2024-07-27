import { env } from 'src/config/environment'
import { Db, MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance: Db | null = null

// Connect to MongoDB
const mongoClientInstance = new MongoClient(env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const CONNECT_DB = async (): Promise<void> => {
  console.log('connecting...')
  await mongoClientInstance.connect()
  console.log(env.DB_NAME)
  trelloDatabaseInstance = mongoClientInstance.db(env.DB_NAME)
}

export const GET_DB = (): Db => {
  if (!trelloDatabaseInstance)
    throw new Error('Must connect to the database first')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async (): Promise<void> => {
  await mongoClientInstance.close()
}
