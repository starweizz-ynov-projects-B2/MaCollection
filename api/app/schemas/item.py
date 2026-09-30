from typing import Optional
from sqlmodel import SQLModel


class ItemRead(SQLModel):
    id: int
    titre: str
    categorie: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    temps_preparation: Optional[int] = None
    difficulte: Optional[str] = None
    type_plat: Optional[str] = None


class ItemListResponse(SQLModel):
    total: int
    page: int
    limit: int
    results: list[ItemRead]
