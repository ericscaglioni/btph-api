import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddMessageController } from '@/main/factories/controllers/message/add-message/add-message-controller-factory'
import { makeLoadMessagesController } from '@/main/factories/controllers/message/load-messages/load-messages-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/messages', adaptRoute(makeAddMessageController()))
  router.get('/messages', auth, adaptRoute(makeLoadMessagesController()))
}
