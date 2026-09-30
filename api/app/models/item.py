from typing import Optional
from sqlmodel import SQLModel, Field


class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titre: str = Field(index=True)
    categorie: str = Field(index=True)
    description: Optional[str] = None
    image_url: Optional[str] = None
    temps_preparation: Optional[int] = None
    difficulte: Optional[str] = None
    type_plat: Optional[str] = None
