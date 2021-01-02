export default {
  host: process.env.HOST || 'http://localhost',
  port: Number(process.env.PORT) || 5050,
  mongodb: {
    url: process.env.MONGO_URL
  }
}
