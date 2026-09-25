
# Projet MaCollection

Ce repo est un projet Ynov B2 qui consiste à créer un site pour mettre en pratique ce qu'on a vu en cours, c'est à dire :

- Créer un backend python avec FastAPI, le relier à une base de données (ici PostGreSQL), établir des routes API et les exposer sur le réseau.
- Créer le frontend de l'application avec React et récupérer les données du site avec l'API backend python.



## Fonctionnalités

- Wall of recipes (livre des recettes créées par la communauté)
- Connexion utilisateur avec création de compte et connexion
- Enregistrement de recettes par utilisateur
- Modifier une recette
- Supprimer une recette
- Mode jour nuit pour l'accessibilité numérique #nerd RGAA friendly


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

  # Cmd pour arrêter le projet
  docker compose down
```


## Auteurs du projet (à 2)

- [@mariusmdc](https://github.com/mariusmdc)
- [@StarWeizz](https://github.com/StarWeizz)

