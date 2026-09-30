# Backend — Ma Collection API

API REST construite avec **FastAPI**, **SQLModel** et **PostgreSQL**.

## Lancer le serveur

Le plus simple est de passer par Docker (voir le README racine). Pour lancer le backend seul, hors Docker :

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows : .venv\Scripts\activate
pip install -r requirements.txt
# DATABASE_URL et JWT_SECRET doivent être définis dans l'environnement (voir .env.example)
uvicorn app.main:app --reload
```

L'API est disponible sur `http://localhost:8000`.
La doc interactive Swagger est accessible sur `http://localhost:8000/docs`.

## Peupler le catalogue

```bash
python -m app.seed
```

Le script est idempotent : le relancer ne crée pas de doublons.

## Stack

- **FastAPI** — framework web
- **SQLModel** — ORM (basé sur SQLAlchemy + Pydantic)
- **PostgreSQL** — base de données
- **JWT** — authentification via `python-jose` + `bcrypt`

## Routes

### Auth — `/auth`

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/auth/register` | Créer un compte (`{email, password}`) |
| POST | `/auth/login` | Se connecter, retourne un JWT |
| GET | `/auth/me` | Infos de l'utilisateur connecté |

### Catalogue (public) — `/items`

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/items` | Liste paginée (filtres : `q`, `categorie`, `page`, `limit`) |
| GET | `/items/{id}` | Détail d'un item |

### Collection personnelle (authentifié) — `/me`

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/me/collection` | Ma collection (filtres : `statut`, `tri=date\|note`) |
| POST | `/me/collection` | Ajouter un item à ma collection |
| PATCH | `/me/collection/{entry_id}` | Modifier une entrée |
| DELETE | `/me/collection/{entry_id}` | Retirer une entrée |
| GET | `/me/stats` | Statistiques de ma collection |

## Structure

```
app/
├── core/        # Config, sécurité, exceptions
├── db/          # Session PostgreSQL
├── dependencies/# Dépendances FastAPI (auth)
├── models/      # Tables SQLModel (User, Item, CollectionEntry)
├── routers/     # Routes (auth, items, collection)
├── schemas/     # Schémas Pydantic (entrée/sortie)
├── seed.py      # Peuplement du catalogue
└── main.py      # Point d'entrée
```
