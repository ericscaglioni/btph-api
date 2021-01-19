import request from 'supertest'
import app from '@/main/config/app'

describe('User routes', () => {
  describe('POST /users', () => {
    it('Should return 401 if no access token is provided', async () => {
      await request(app)
        .post('/api/users')
        .expect(401)
    })
  })
})
