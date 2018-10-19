import Handlers from './handlers'
import warmup from '../../warmup'
import adminOnlyRoute from '../../adminOnlyRoute'
import authenticatedRoute from '../../authenticatedRoute'

const makeRoutes = app => {
  const handlers = new Handlers()
  app.get('/warmup', warmup)
  app.post('/messages', handlers.postMessage)
  app.get('/messages', adminOnlyRoute, handlers.getManyMessages)
  app.get('/messages/:id', adminOnlyRoute, handlers.getMessage)
  app.delete('/messages/:id', adminOnlyRoute, handlers.deleteMessage)
}

export default makeRoutes


