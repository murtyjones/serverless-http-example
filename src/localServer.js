import fs from 'fs'
import { resolve } from 'path'
import { join } from 'path'
import chalk from 'chalk'
import yaml_config from 'node-yaml-config'

// choose environment based on flag or else
// default to the 'dev' environment in env.yml
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const isLocalIntegration = process.env.NODE_ENV === 'integration-local'
const config = yaml_config.load(__dirname + '/../env.yml',
  isDev ? 'dev' : isLocalIntegration ? 'integration' : process.env.NODE_ENV
)
Object.keys(config).forEach(key => {
  const value = config[key]
  process.env[key] = value
})

import makeApp from './makeApp'

// for each lambda folder, find its 'routes' file
// and push it into the array that we'll
// use to provide routes to our local express server.
// This way, we don't have to remember to come back
// to this file each time we add a new lambda :)
const lambdas = resolve(__dirname, '../src/lambdas')
const makeRoutesFunctions = []
fs.readdirSync(lambdas)
  .forEach(function (childDir) {
    let routesPath = join(lambdas, childDir, 'api', 'routes.js')
    if (!fs.existsSync(routesPath))
      return null
    makeRoutesFunctions.push(require(routesPath).default)
  })


const app = makeApp(makeRoutesFunctions)

app.set('host', '0.0.0.0')
app.set('port', 8080)

app.listen(app.get('port'), () => {
  console.log('\n')
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

export default app
