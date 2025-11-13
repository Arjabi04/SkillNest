require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

let mongoClient;

async function startServer() {
  mongoClient = await connectDB(); // connect to MongoDB

  // Routes
  app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the app' });
  });

  // Example route using DB
  app.get('/test', async (req, res) => {
    const db = mongoClient.db("SkillNest"); // use your database
    const collections = await db.listCollections().toArray();
    res.json({ collections });
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

startServer();
