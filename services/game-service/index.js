const express = require('express');
const client = require('prom-client');

const app = express();

// Initialiser Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/game', (req, res) => {
  res.send('Game Service OK');
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    console.error('Metrics error:', err);
    res.status(500).end();
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Game Service on port ${PORT}`));
