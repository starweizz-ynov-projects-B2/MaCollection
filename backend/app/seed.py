from sqlmodel import Session
from app.db.session import engine, create_db_and_tables
from app.models.user import User
from app.models.item import Item
from app.models.collection_entry import CollectionEntry, StatutEnum
from app.core.security import hash_password


def seed():
    create_db_and_tables()

    with Session(engine) as session:
        # Users
        users = [
            User(username="alice", email="alice@example.com", hashed_password=hash_password("password123")),
            User(username="bob", email="bob@example.com", hashed_password=hash_password("password123")),
        ]
        session.add_all(users)
        session.commit()
        for u in users:
            session.refresh(u)

        # Items
        items = [
            Item(
                titre="Tarte aux pommes",
                categorie="Dessert",
                description="Une tarte aux pommes traditionnelle",
                temps_preparation=45,
                difficulte="facile",
                type_plat="dessert",
            ),
            Item(
                titre="Ratatouille",
                categorie="Plat",
                description="Un mélange de légumes du sud mijotés",
                temps_preparation=60,
                difficulte="moyen",
                type_plat="plat principal",
            ),
            Item(
                titre="Velouté de courgettes",
                categorie="Entrée",
                description="Une soupe onctueuse à la courgette",
                temps_preparation=30,
                difficulte="facile",
                type_plat="entrée",
            ),
        ]
        session.add_all(items)
        session.commit()
        for i in items:
            session.refresh(i)

        # Collection entries
        entries = [
            CollectionEntry(user_id=users[0].id, item_id=items[0].id, statut=StatutEnum.termine, note=5),
            CollectionEntry(user_id=users[0].id, item_id=items[1].id, statut=StatutEnum.en_cours),
            CollectionEntry(user_id=users[1].id, item_id=items[2].id, statut=StatutEnum.a_decouvrir),
        ]
        session.add_all(entries)
        session.commit()

    print("Seed terminé avec succès.")


if __name__ == "__main__":
    seed()
