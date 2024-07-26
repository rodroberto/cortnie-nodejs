require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

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
