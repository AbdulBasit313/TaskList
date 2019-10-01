const express = require('express')
const cors = require('cors');
const app = express()
const connectDB = require('./config/db')

app.use(express.json());
app.use(cors());

// connect database
connectDB()

app.get('/', (req, res) => {
   res.send('hello world')
})


// Define routes
app.use('/api/tasks', require('./routes/tasks'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))