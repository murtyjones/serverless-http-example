import mongoFactory from '../services/KiwiMongoFactory'
import MongoService from '../services/MongoService'


// enables tracing on lambdas
import awsXRay from 'aws-xray-sdk'
awsXRay.captureAWS(require('aws-sdk'))

const _idIndex = { key: { _id: 1 } }
const lessonIdIndex = { key: { lessonId: -1 } }
const userIdIndex = { key: { userId: -1 } }
const typeIndex = { key: { type: 1 } }
const nameIndex = { key: { name: 1 } }
const providerIdIndex = { key: { providerId: 1 } }
const provideeIdIndex = { key: { provideeId: 1 } }

const warmup = async (req, res, next) => {
  try {
    console.log('returning warm')
    await mongoFactory.getConnection(process.env.MONGO_URI, process.env.MONGO_DB_NAME)
    const mongoService = new MongoService()
    await mongoService.createIndexes('Lessons',          [ _idIndex, lessonIdIndex ])
    await mongoService.createIndexes('LessonThemes',     [ _idIndex ])
    await mongoService.createIndexes('LessonMetadata',   [ typeIndex ])
    await mongoService.createIndexes('Messages',         [ _idIndex ])
    await mongoService.createIndexes('PasswordRecovery', [ _idIndex ])
    await mongoService.createIndexes('Profiles',         [ _idIndex ])
    await mongoService.createIndexes('UserLessons',      [ _idIndex, lessonIdIndex, userIdIndex ])
    await mongoService.createIndexes('UserProjects',     [ _idIndex, userIdIndex ])
    await mongoService.createIndexes('Variables',        [ _idIndex, nameIndex ])
    await mongoService.createIndexes('Subscriptions',    [ _idIndex, providerIdIndex, provideeIdIndex ])

    return res.status(200).send('Warm!')
  } catch(err) {
    console.error(`warmup error: [${err}]`)
    return res.status(500).send('Fail!')
  }
}


export default warmup
