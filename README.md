
# Projet MaCollection

Ce repo est un projet Ynov B2 qui consiste à créer un site pour mettre en pratique ce qu'on a vu en cours, c'est à dire :

- Créer un backend python avec FastAPI, le relier à une base de données (ici PostGreSQL), établir des routes API et les exposer sur le réseau.
- Créer le frontend de l'application avec React et récupérer les données du site avec l'API backend python.



## Fonctionnalités

- Catalogue public de recettes (recherche, filtre par catégorie, pagination, fiche détaillée)
- Connexion utilisateur avec création de compte et connexion
- Collection personnelle : ajouter une recette du catalogue, lui donner un statut
  (à découvrir / en cours / terminé), une note et un commentaire
- Filtrer sa collection par statut, la trier par date d'ajout ou par note
- Statistiques de sa collection (total, répartition par statut, note moyenne)


## Installation

```bash
git clone https://github.com/starweizz-ynov-projects-B2/MaCollection.git
cd MaCollection
```

Prérequis : Python 3.12+ et Node 20+.

## Lancer le projet

### 1. Backend (API FastAPI + SQLite)

```bash
cd api
python -m venv .venv
source .venv/bin/activate   # Windows : .venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env        # puis changer JWT_SECRET
python -m app.seed          # peuple le catalogue (43 recettes, idempotent)
uvicorn app.main:app --reload
```

L'API tourne sur `http://localhost:8000` (doc interactive : `http://localhost:8000/docs`).

### 2. Frontend (React + Vite), dans un second terminal

```bash
cd web
npm install
npm run dev
```

Le frontend est disponible sur `http://localhost:5173`.

### Avec Docker (optionnel)

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec backend python -m app.seed
docker compose down
```


## Auteurs du projet (à 2)

- [@mariusmdc](https://github.com/mariusmdc)
- [@StarWeizz](https://github.com/StarWeizz)

