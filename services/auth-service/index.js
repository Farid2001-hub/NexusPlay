const express = require('express');
require('dotenv').config();
const app = express();

app.get('/auth', (req, res) => {
  res.send(`Auth OK - secret=${process.env.AUTH_SECRET}`);
});

app.listen(3001, () => console.log('Auth Service on port 3001'));
