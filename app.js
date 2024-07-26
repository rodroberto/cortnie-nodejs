require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./cortnie-firebase.json');
const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data', (req, res) => {
  res.json({
    message: 'Data received',
    data: req.body
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
