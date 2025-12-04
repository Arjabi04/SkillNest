require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const forgotPasswordRoute = require('./routes/forgotPassword');
const hobbiesRoute = require('./routes/interests');


const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());


async function startServer() {
  mongoClient = await connectDB(); // connect to MongoDB

  // Routes
  app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the app' });
  });

  // Signup route
app.use('/api/signup', signupRoute);
// Login route
app.use('/api/login', loginRoute);


// forgot pass route
app.use('/api/forgot-password', forgotPasswordRoute);
app.use('/api/interests', hobbiesRoute);



  // Example route using DB
//   app.get('/test', async (req, res) => {
//     const db = mongoClient.db("SkillNest");
//     const collections = await db.listCollections().toArray();
//     res.json({ collections });
//   });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

startServer();
