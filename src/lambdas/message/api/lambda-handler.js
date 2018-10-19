import serverless from 'serverless-http'
import makeApp from '../../../makeApp'
import makeRoutes from './routes'

// make the server
const app = makeApp([ makeRoutes ])

module.exports.handler = serverless(app, {
  request: (request, event, context) => {
    context.callbackWaitsForEmptyEventLoop = false
    if (event.source === 'serverless-plugin-warmup') {
      request.method = 'GET'
      request.url = '/warmup'
    }
  }
})
