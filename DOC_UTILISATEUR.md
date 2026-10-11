# MaCollection — Documentation utilisateur

MaCollection est une application web qui vous permet de gérer votre collection personnelle de recettes.
Parcourez un catalogue de recettes, ajoutez celles qui vous intéressent à votre collection et suivez votre progression.

---

## Démarrage rapide

Première utilisation en moins de 5 minutes :

1. Ouvrez l'application sur `http://localhost:5173`
2. Cliquez sur **S'inscrire** et renseignez votre email et mot de passe
3. Connectez-vous avec vos identifiants
4. Cliquez sur **Catalogue** pour parcourir les recettes disponibles
5. Cliquez sur une recette puis sur **Ajouter à ma collection**

Votre collection est maintenant accessible depuis le menu **Mes recettes**.

---

## Guide des fonctionnalités

### Parcourir le catalogue

1. Cliquez sur **Catalogue** dans le menu
2. Utilisez la barre de recherche pour trouver une recette par nom
3. Utilisez le filtre **Catégorie** pour affiner les résultats
4. Cliquez sur une recette pour afficher sa fiche détaillée

### Ajouter une recette à sa collection

1. Ouvrez la fiche d'une recette depuis le catalogue
2. Cliquez sur **Ajouter à ma collection**
3. Choisissez un statut : **À découvrir**, **En cours** ou **Terminé**
4. Ajoutez une note (de 1 à 5) et un commentaire si vous le souhaitez
5. Validez

> Une recette ne peut être ajoutée qu'une seule fois à votre collection.

### Gérer sa collection

1. Cliquez sur **Ma collection** dans le menu
2. Filtrez par statut avec le menu déroulant
3. Triez par **date d'ajout** ou par **note**
4. Cliquez sur une entrée pour modifier son statut, sa note ou son commentaire
5. Cliquez sur **Supprimer** pour retirer une recette de votre collection

### Consulter ses statistiques

1. Cliquez sur **Statistiques** dans le menu
2. Consultez le nombre total de recettes dans votre collection
3. Visualisez la répartition par statut (À découvrir / En cours / Terminé)
4. Consultez votre note moyenne

---

## Référence — Statuts disponibles

| Statut | Description |
|--------|-------------|
| À découvrir | Recette repérée, pas encore essayée |
| En cours | Recette en cours d'apprentissage |
| Terminé | Recette maîtrisée |

---

## FAQ

**Je ne peux pas ajouter une recette à ma collection.**
Vous devez être connecté pour ajouter une recette. Si vous l'êtes déjà, cette recette est peut-être déjà présente dans votre collection.

**Ma session a expiré, je dois me reconnecter.**
La session dure 30 minutes. Reconnectez-vous avec vos identifiants pour continuer.

**Je ne retrouve pas une recette dans le catalogue.**
Vérifiez l'orthographe dans la barre de recherche ou supprimez le filtre de catégorie actif.

**J'ai oublié mon mot de passe.**
La réinitialisation de mot de passe n'est pas encore disponible. Créez un nouveau compte avec une autre adresse email.

**Ma note n'est pas enregistrée.**
La note doit être un nombre entier entre 1 et 5.
