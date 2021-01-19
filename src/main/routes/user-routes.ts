import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddUserController } from '@/main/factories/controllers/user/add-user/add-user-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', auth, adaptRoute(makeAddUserController()))
}
