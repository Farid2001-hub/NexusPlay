const express = require('express');
require('dotenv').config();
const client = require('prom-client');

const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/game', (req, res) => res.send('Auth OK'));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3002, () => console.log('game Service on 3002'));
