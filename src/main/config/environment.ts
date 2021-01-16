export default {
  host: process.env.HOST || 'http://localhost',
  port: Number(process.env.PORT) || 5050,
  mongodb: {
    url: process.env.MONGO_URL
  },
  jwtSecret: process.env.JWT_SECRET || 'fjhru$%42#1nf0_'
}
