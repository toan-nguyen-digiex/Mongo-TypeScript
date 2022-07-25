import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { menuRouter } from './routes/menu'

const app = express()
app.use(json())
app.use(menuRouter)

mongoose.connect('mongodb://GMk8koq0a6dnt1:0k1d238f8d0150bw7sb5c4bp18zd1y356fe81n3dufr84e18@dev-pms.gitgam.com:22005/admin?gssapiServiceName=mongodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true

}, (e) => {
  console.log('connected to database! ', e)
})

app.listen(3001, () => {
  console.log('Server is listening on port 3000')
})