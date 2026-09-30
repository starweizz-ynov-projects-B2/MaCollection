# Frontend — Ma Collection

Interface React + TypeScript qui consomme l'API `backend/`.

## Lancer le serveur de développement

Le plus simple est de passer par Docker (voir le README racine). Pour lancer le frontend seul, hors Docker :

```bash
cd frontend
npm install
npm run dev
```

L'application est disponible sur `http://localhost:5173`. Elle attend l'API sur `http://localhost:8000`
(voir `src/services/http.ts`).

## Stack

- **React 19** + **TypeScript** (`strict: true`)
- **React Router** — routage, avec routes protégées (`/collection`, `/stats`)
- **Tailwind CSS v4** — pas de librairie de composants prête à l'emploi

## Pages

| Route | Accès | Description |
|-------|-------|--------------|
| `/` | public | Accueil |
| `/login`, `/register` | public | Authentification |
| `/recipes` | public | Catalogue (recherche, filtre catégorie, pagination) |
| `/recipes/:id` | public | Fiche détaillée d'une recette |
| `/collection` | authentifié | Ma collection personnelle (filtre statut, tri) |
| `/stats` | authentifié | Statistiques de ma collection |

## Architecture

```
src/
├── components/  # Composants réutilisables (cartes, pagination, navbar)
├── context/     # AuthContext (token/utilisateur), CollectionContext (collection perso)
├── hooks/       # useLocalStorage (générique), useDebounce (générique)
├── pages/       # Écrans, un dossier par domaine
├── services/    # Client HTTP unique (src/services/http.ts)
└── types/       # Types du contrat d'API, écrits à la main (src/types/api.ts)
```

Tous les appels réseau passent par `src/services/http.ts`, qui ajoute l'en-tête `Authorization`
et traduit le format d'erreur de l'API (`{erreur: {code, message}}`) en `ApiClientError`.
