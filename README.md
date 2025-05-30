
Etudiants :

Hamza FARID
Iman ESSAMA
Toure Yacouba


# Microservices Node.js avec Gateway, Monitoring et CI/CD

Ce projet est une architecture de microservices avec des services `auth` et `game`, une passerelle NGINX, des outils de monitoring (Prometheus, Grafana), un cache Redis, un simulateur d'email (Mailhog) et une intégration continue avec GitHub Actions.

---

## 📌 Schéma d'Architecture

```
              [ Utilisateur ]
                    |
                    v
            +------------------+
            |     GATEWAY      |  <-- NGINX (Port 8080)
            +------------------+
               |           |
       /auth   |           |   /game
               v           v
   +----------------+   +----------------+
   |  AUTH SERVICE  |   |  GAME SERVICE  |
   |  (Node.js)     |   |  (Node.js)     |
   +----------------+   +----------------+
         |   \             /    |
         |    \           /     |
         v     v         v      v
     +---------+       +------------+
     |  Redis  | <-->  |  Mailhog   |   <-- Simule notification email
     +---------+       +------------+

         ^                    ^
         |                    |
         |   +----------------------------+
         |   |        Prometheus         | <-- Scrape /metrics
         |   +----------------------------+
         |                    |
         v                    v
     +----------------------------+
     |         Grafana            | <-- Visualise les métriques
     +----------------------------+

                    ^
                    |
     +----------------------------+
     |     GitHub Actions CI/CD   | <-- Build + test via docker-compose
     +----------------------------+
```

---

## 🚀 Lancer le projet

```bash
docker-compose up --build
```

Services disponibles :
- Gateway : http://localhost:8080
- Auth : http://localhost:8080/auth
- Game : http://localhost:8080/game
- Prometheus : http://localhost:9090
- Grafana : http://localhost:3000
- Mailhog : http://localhost:8025

---

## 🧪 Test de charge

Les tests de charge sont faits avec [k6](https://k6.io). Un exemple est exécuté via CI pour tester `/auth`.

---

## 🔁 CI/CD avec GitHub Actions

Le pipeline est composé de deux jobs :
- `build`: construit les images avec cache
- `test`: lance les conteneurs, vérifie la disponibilité, et exécute un test de charge

Le fichier `.github/workflows/ci.yml` contient toute la configuration.

---

## 📈 Monitoring

- Chaque service expose `/metrics` grâce à `prom-client`
- Prometheus scrape ces endpoints toutes les 5 secondes
- Grafana affiche les données en dashboard

---

## 🛠️ Dépendances techniques

- Node.js 18
- Express.js
- prom-client
- Redis
- Mailhog
- NGINX (gateway)
- Prometheus + Grafana
- GitHub Actions

---

## 📁 Structure du projet

```
.
├── gateway/
│   └── nginx.conf
├── services/
│   ├── auth-service/
│   │   ├── index.js
│   │   ├── Dockerfile
│   ├── game-service/
│   │   ├── index.js
│   │   ├── Dockerfile
├── monitoring/
│   └── prometheus.yml
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

---

## 📅 Dernière mise à jour

30 May 2025
