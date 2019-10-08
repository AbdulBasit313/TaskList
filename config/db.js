const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

mongoose.set('useFindAndModify', false)

const connectDB = () => {
   mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
   })
      .then(() => console.log('Mongo DB connected'))
      .catch(err => {
         console.error(err.message)
         process.exit(1)
      })
}

module.exports = connectDB