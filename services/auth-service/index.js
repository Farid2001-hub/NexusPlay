const express = require('express');
require('dotenv').config();
const client = require('prom-client');

const app = express();

// Initialiser Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// /auth fonctionne comme avant
app.get('/auth', (req, res) => {
  res.send(`Auth OK - secret=${process.env.AUTH_SECRET}`);
});

// Nouveau endpoint Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    console.error('Metrics error:', err);
    res.status(500).end();
  }
});

// Démarrer le serveur
const PORT = 3001;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
