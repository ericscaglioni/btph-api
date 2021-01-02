import * as dotenv from 'dotenv'
import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

dotenv.config()

// eslint-disable-next-line import/first
import env from './config/environment'

MongoHelper.connect(env.mongodb.url)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, env.host, () => console.log(`Server running at ${env.host}:${env.port}`))
  })
  .catch(console.error)
