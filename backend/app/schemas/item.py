from typing import Optional
from sqlmodel import SQLModel


class ItemRead(SQLModel):
    id: int
    title: str
    category: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None


class ItemListResponse(SQLModel):
    total: int
    page: int
    limit: int
    results: list[ItemRead]
