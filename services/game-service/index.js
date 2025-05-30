const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/game', (req, res) => {
  res.send('Game Service OK');
});

app.listen(3002, () => console.log('Game Service on port 3002'));
