import express from 'express'
import bodyParser from 'body-parser'

// this function creates the express app that is used
// both locally and in our hosted environments,
// including production. Any changes you make here
// will be reflected everywhere, so be careful.
const makeApp = (makeRoutesFunctions) => {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200)
    } else {
      //move on
      next()
    }
  })

  makeRoutesFunctions.forEach(makeRoutes => {
    makeRoutes(app)
  })

  return app

}

export default makeApp
