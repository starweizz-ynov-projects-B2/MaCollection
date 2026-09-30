
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

Cloner le projet

```bash
  git clone https://github.com/starweizz-ynov-projects-B2/MaCollection.git
```

## Déployer le projet

Pour lancer et déployer le projet avec Docker voici les commandes à utiliser :

```bash
  # Créer le fichier .env
  cp .env.example .env

  # Lancer le projet avec
  docker compose up -d --build

  # Peupler le catalogue (une fois les conteneurs démarrés, idempotent)
  docker compose exec backend python -m app.seed

  # Cmd pour arrêter le projet
  docker compose down
```

Le frontend est disponible sur `http://localhost:5173`, l'API sur `http://localhost:8000`
(doc interactive : `http://localhost:8000/docs`).


## Auteurs du projet (à 2)

- [@mariusmdc](https://github.com/mariusmdc)
- [@StarWeizz](https://github.com/StarWeizz)

