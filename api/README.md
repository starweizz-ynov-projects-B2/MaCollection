# Backend — Ma Collection API

API REST construite avec **FastAPI**, **SQLModel** et **PostgreSQL**.

## Lancer le serveur

```bash
cd api
python -m venv venv
venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

L'API est disponible sur `http://localhost:8000`.
La doc interactive Swagger est accessible sur `http://localhost:8000/docs`.

## Stack

- **FastAPI** — framework web
- **SQLModel** — ORM (basé sur SQLAlchemy + Pydantic)
- **PostgreSQL** — base de données (via pgAdmin en local ou avec Docker automatiquement installé)
- **JWT** — authentification via `python-jose` + `bcrypt`
- **logging** — traçabilité des erreurs et actions importantes

---

## Routes

### Auth — `/auth`

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/auth/register` | non | Créer un compte |
| POST | `/auth/login` | non | Se connecter, retourne un JWT |
| GET | `/auth/me` | oui | Infos de l'utilisateur connecté |

**POST `/auth/register`**
```json
// Body
{ "username": "string", "email": "string", "password": "string" }

// Réponse 201
{ "id": 1, "email": "string" }
```

**POST `/auth/login`**
```json
// Body
{ "email": "string", "password": "string" }

// Réponse 200
{ "access_token": "string", "token_type": "bearer" }
```

---

### Catalogue — `/items`

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/items` | non | Liste paginée du catalogue |
| GET | `/items/{id}` | non | Fiche détaillée d'un item |

**GET `/items`** — Paramètres de requête :

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `q` | string | - | Recherche par mot-clé dans le titre |
| `categorie` | string | - | Filtre par catégorie |
| `page` | int | 1 | Numéro de page |
| `limit` | int | 12 | Nombre de résultats (max 50) |

```json
// Réponse 200
{
  "total": 42,
  "page": 1,
  "limit": 12,
  "results": [
    { "id": 1, "titre": "string", "categorie": "string", "description": "string", "image_url": "string" }
  ]
}
```

---

### Collection — `/me`

> Toutes ces routes nécessitent un JWT valide dans le header `Authorization: Bearer <token>`

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/me/collection` | Ajouter un item à sa collection |
| GET | `/me/collection` | Lister sa collection |
| PATCH | `/me/collection/{id}` | Modifier une entrée |
| DELETE | `/me/collection/{id}` | Supprimer une entrée |
| GET | `/me/stats` | Statistiques de sa collection |

**POST `/me/collection`**
```json
// Body
{
  "item_id": 1,
  "statut": "a_decouvrir",   // "a_decouvrir" | "en_cours" | "termine"
  "note": 4,                  // entier entre 1 et 5, optionnel
  "commentaire": "string"     // optionnel
}

// Réponse 201
{
  "id": 1,
  "statut": "a_decouvrir",
  "note": 4,
  "commentaire": "string",
  "date_ajout": "2026-10-01T15:00:00",
  "item": { "id": 1, "titre": "string", "categorie": "string", "description": "string", "image_url": "string" }
}
```

**GET `/me/collection`** — Paramètres de requête :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `statut` | string | Filtre par statut (`a_decouvrir`, `en_cours`, `termine`) |
| `tri` | string | Tri par `date` (défaut) ou `note` |

**GET `/me/stats`**
```json
// Réponse 200
{
  "total": 10,
  "par_statut": {
    "a_decouvrir": 4,
    "en_cours": 3,
    "termine": 3
  },
  "note_moyenne": 3.75
}
```

---

## Structure

```bash
app/
├── core/         # Config, sécurité, exceptions
├── db/           # Session PostgreSQL
├── dependencies/ # Dépendances FastAPI (auth JWT)
├── models/       # Tables SQLModel (User, Item, CollectionEntry)
├── routers/      # Routes (auth, items, collection)
├── schemas/      # Schémas Pydantic (entrée/sortie)
└── main.py       # Point d'entrée
```
