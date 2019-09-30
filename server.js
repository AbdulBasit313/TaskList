const express = require('express')
const app = express()
const connectDB = require('./config/db')

app.use(express.json());
// connect database
connectDB()

app.get('/', (req, res) => {
   res.send('hello world')
})


// Define routes
app.use('/api/tasks', require('./routes/tasks'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))