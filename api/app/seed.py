from sqlmodel import Session, select
from app.db.session import engine, create_db_and_tables
from app.models.user import User
from app.models.item import Item
from app.models.collection_entry import CollectionEntry, StatutEnum
from app.core.security import hash_password

ITEMS = [
    ("Tarte aux pommes", "Dessert", "Une tarte aux pommes traditionnelle", 45, "facile", "dessert"),
    ("Fondant au chocolat", "Dessert", "Coeur coulant au chocolat noir", 35, "facile", "dessert"),
    ("Crème brûlée", "Dessert", "Crème vanillée à la croûte caramélisée", 50, "moyen", "dessert"),
    ("Mousse au chocolat", "Dessert", "Mousse aérienne au chocolat noir", 20, "facile", "dessert"),
    ("Clafoutis aux cerises", "Dessert", "Clafoutis moelleux aux cerises fraîches", 40, "facile", "dessert"),
    ("Panna cotta", "Dessert", "Crème italienne à la vanille et coulis de fruits", 25, "facile", "dessert"),
    ("Tiramisu", "Dessert", "Dessert italien au café et mascarpone", 30, "moyen", "dessert"),
    ("Crumble aux poires", "Dessert", "Crumble croustillant aux poires et cannelle", 40, "facile", "dessert"),
    ("Ratatouille", "Plat", "Un mélange de légumes du sud mijotés", 60, "moyen", "plat principal"),
    ("Blanquette de veau", "Plat", "Veau mijoté à la crème et aux champignons", 120, "difficile", "plat principal"),
    ("Poulet rôti aux herbes", "Plat", "Poulet fermier rôti au four", 90, "facile", "plat principal"),
    ("Boeuf bourguignon", "Plat", "Boeuf mijoté au vin rouge et aux lardons", 180, "difficile", "plat principal"),
    ("Curry de légumes", "Plat", "Curry épicé aux légumes de saison", 45, "facile", "plat principal"),
    ("Lasagnes bolognaise", "Plat", "Lasagnes maison à la sauce bolognaise", 90, "moyen", "plat principal"),
    ("Risotto aux champignons", "Plat", "Risotto crémeux aux champignons de Paris", 40, "moyen", "plat principal"),
    ("Saumon en papillote", "Plat", "Saumon vapeur aux légumes croquants", 30, "facile", "plat principal"),
    ("Couscous royal", "Plat", "Semoule, légumes et viandes mijotées", 150, "difficile", "plat principal"),
    ("Chili con carne", "Plat", "Ragoût épicé au boeuf et haricots rouges", 75, "moyen", "plat principal"),
    ("Velouté de courgettes", "Entrée", "Une soupe onctueuse à la courgette", 30, "facile", "entrée"),
    ("Salade César", "Entrée", "Salade croquante au poulet et parmesan", 20, "facile", "entrée"),
    ("Soupe à l'oignon gratinée", "Entrée", "Soupe mijotée gratinée au fromage", 60, "moyen", "entrée"),
    ("Carpaccio de boeuf", "Entrée", "Fines tranches de boeuf à l'huile d'olive", 15, "facile", "entrée"),
    ("Tartare de saumon", "Entrée", "Saumon frais coupé au couteau, agrumes", 20, "facile", "entrée"),
    ("Terrine de campagne", "Entrée", "Terrine maison au porc et aux herbes", 90, "moyen", "entrée"),
    ("Quiche lorraine", "Entrée", "Quiche traditionnelle aux lardons", 55, "facile", "entrée"),
    ("Gaspacho", "Entrée", "Soupe froide de légumes d'été", 15, "facile", "entrée"),
    ("Mojito", "Boisson", "Cocktail rafraîchissant à la menthe et au rhum", 10, "facile", "boisson"),
    ("Smoothie mangue-passion", "Boisson", "Smoothie tropical vitaminé", 10, "facile", "boisson"),
    ("Chocolat chaud maison", "Boisson", "Chocolat chaud onctueux et gourmand", 15, "facile", "boisson"),
    ("Thé glacé pêche", "Boisson", "Thé glacé fruité et désaltérant", 15, "facile", "boisson"),
    ("Limonade maison", "Boisson", "Limonade fraîche au citron pressé", 10, "facile", "boisson"),
    ("Vin chaud épicé", "Boisson", "Vin rouge chauffé aux épices d'hiver", 20, "facile", "boisson"),
    ("Pain maison", "Boulangerie", "Pain de campagne à la croûte croustillante", 180, "moyen", "accompagnement"),
    ("Croissants maison", "Boulangerie", "Croissants feuilletés au beurre", 240, "difficile", "petit-déjeuner"),
    ("Brioche tressée", "Boulangerie", "Brioche moelleuse au beurre", 200, "moyen", "petit-déjeuner"),
    ("Baguette tradition", "Boulangerie", "Baguette croustillante à la mie alvéolée", 150, "moyen", "accompagnement"),
    ("Pancakes moelleux", "Boulangerie", "Pancakes gonflés pour le petit-déjeuner", 20, "facile", "petit-déjeuner"),
    ("Focaccia à l'italienne", "Boulangerie", "Pain plat italien à l'huile d'olive", 120, "moyen", "accompagnement"),
    ("Houmous maison", "Apéritif", "Purée de pois chiches au tahini", 15, "facile", "apéritif"),
    ("Guacamole", "Apéritif", "Purée d'avocat épicée et citronnée", 15, "facile", "apéritif"),
    ("Bruschetta tomate-basilic", "Apéritif", "Toasts croustillants garnis de tomates fraîches", 20, "facile", "apéritif"),
    ("Rillettes de thon", "Apéritif", "Rillettes maison au thon et fromage frais", 15, "facile", "apéritif"),
    ("Feuilletés au fromage", "Apéritif", "Bouchées feuilletées gourmandes", 30, "facile", "apéritif"),
]


def seed():
    create_db_and_tables()

    with Session(engine) as session:
        # Users
        user_specs = [
            ("alice", "alice@example.com"),
            ("bob", "bob@example.com"),
        ]
        users = []
        for username, email in user_specs:
            existing = session.exec(select(User).where(User.email == email)).first()
            if existing:
                users.append(existing)
                continue
            user = User(username=username, email=email, hashed_password=hash_password("password123"))
            session.add(user)
            session.commit()
            session.refresh(user)
            users.append(user)

        # Items
        items = []
        for titre, categorie, description, temps_preparation, difficulte, type_plat in ITEMS:
            existing = session.exec(select(Item).where(Item.titre == titre)).first()
            if existing:
                items.append(existing)
                continue
            item = Item(
                titre=titre,
                categorie=categorie,
                description=description,
                temps_preparation=temps_preparation,
                difficulte=difficulte,
                type_plat=type_plat,
            )
            session.add(item)
            session.commit()
            session.refresh(item)
            items.append(item)

        # Collection entries
        entry_specs = [
            (users[0].id, items[0].id, StatutEnum.termine, 5),
            (users[0].id, items[8].id, StatutEnum.en_cours, None),
            (users[1].id, items[18].id, StatutEnum.a_decouvrir, None),
        ]
        for user_id, item_id, statut, note in entry_specs:
            existing = session.exec(
                select(CollectionEntry).where(
                    CollectionEntry.user_id == user_id,
                    CollectionEntry.item_id == item_id,
                )
            ).first()
            if existing:
                continue
            session.add(CollectionEntry(user_id=user_id, item_id=item_id, statut=statut, note=note))
        session.commit()

    print(f"Seed terminé avec succès ({len(ITEMS)} items).")


if __name__ == "__main__":
    seed()
