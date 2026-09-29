# Backend — Ma Collection API

API REST construite avec **FastAPI**, **SQLModel** et **SQLite**.

## Lancer le serveur

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows : .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

L'API est disponible sur `http://localhost:8000`.  
La doc interactive Swagger est accessible sur `http://localhost:8000/docs`.

## Stack

- **FastAPI** — framework web
- **SQLModel** — ORM (basé sur SQLAlchemy + Pydantic)
- **PostgreSQL** — base de données (via pgAdmin)
- **JWT** — authentification via `python-jose` + `bcrypt`

## Routes

### Auth — `/auth`

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/auth/register` | Créer un compte |
| POST | `/auth/login` | Se connecter, retourne un JWT |
| GET | `/auth/me` | Infos de l'utilisateur connecté |

### Items — `/items`

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/items` | Liste paginée des items (filtres : `q`, `category`, `page`, `limit`) |
| GET | `/items/{id}` | Détail d'un item |

## Structure

```
app/
├── core/        # Config, sécurité, exceptions
├── db/          # Session PostgreSQL
├── dependencies/# Dépendances FastAPI (auth)
├── models/      # Tables SQLModel (User, Item, CollectionEntry)
├── routers/     # Routes (auth, items, collection)
├── schemas/     # Schémas Pydantic (entrée/sortie)
└── main.py      # Point d'entrée
```
