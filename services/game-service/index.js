const express = require('express');
const app = express();

app.get('/game', (req, res) => {
  res.send('Game Service OK');
});

app.listen(3002, () => console.log('Game Service on port 3002'));


