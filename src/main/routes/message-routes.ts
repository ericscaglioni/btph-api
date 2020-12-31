import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddMessaqeController } from '../factories/controllers/message/add-message/add-message-controller-factory'

export default (router: Router): void => {
  router.post('/messages', adaptRoute(makeAddMessaqeController()))
}
