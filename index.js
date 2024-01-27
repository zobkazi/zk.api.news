// index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const db = require('./config/mongoDBCoenact');
const path = require('path')


const userRouter = require('./routes/userRoute')

const app = express();
const port = 8018;

// Middleware
const Middleware = [
  
]

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 

db


// Session middleware setup
app.use(
  session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
  })
);

// allRouter call
const allRouter = [
  userRouter
]



app.use('/api', allRouter)



  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
  // 404 Not Found middleware
  app.use((req, res) => {
    res.status(404).send('Not Found');
  });
  






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
