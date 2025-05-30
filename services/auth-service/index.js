// auth-service/index.js (ajoute ça)

const express = require('express');
const client = require('prom-client');
require('dotenv').config();

const app = express();

// Create a Registry which registers the metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Expose /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/auth', (req, res) => {
  res.send(`Auth OK - secret=${process.env.AUTH_SECRET}`);
});

app.listen(3001, () => console.log('Auth Service on port 3001'));
