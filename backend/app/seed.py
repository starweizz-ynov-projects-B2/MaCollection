from sqlmodel import Session
from app.db.session import engine, create_db_and_tables
from app.models.user import User
from app.models.item import Item
from app.models.collection_entry import CollectionEntry, StatusEnum
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
            Item(title="The Witcher 3", description="RPG open world", category="Jeu vidéo"),
            Item(title="Dune", description="Roman de science-fiction", category="Livre"),
            Item(title="Breaking Bad", description="Série dramatique", category="Série"),
        ]
        session.add_all(items)
        session.commit()
        for i in items:
            session.refresh(i)

        # Collection entries
        entries = [
            CollectionEntry(user_id=users[0].id, item_id=items[0].id, status=StatusEnum.termine, note=9),
            CollectionEntry(user_id=users[0].id, item_id=items[1].id, status=StatusEnum.en_cours),
            CollectionEntry(user_id=users[1].id, item_id=items[2].id, status=StatusEnum.a_decouvrir),
        ]
        session.add_all(entries)
        session.commit()

    print("Seed terminé avec succès.")


if __name__ == "__main__":
    seed()
