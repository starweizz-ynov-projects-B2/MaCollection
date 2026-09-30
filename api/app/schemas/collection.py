from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from app.models.collection_entry import StatutEnum
from app.schemas.item import ItemRead


class CollectionEntryCreate(SQLModel):
    item_id: int
    statut: StatutEnum = StatutEnum.a_decouvrir
    note: Optional[int] = Field(default=None, ge=1, le=5)
    commentaire: Optional[str] = None


class CollectionEntryUpdate(SQLModel):
    statut: Optional[StatutEnum] = None
    note: Optional[int] = Field(default=None, ge=1, le=5)
    commentaire: Optional[str] = None


class CollectionEntryRead(SQLModel):
    id: int
    statut: StatutEnum
    note: Optional[int] = None
    commentaire: Optional[str] = None
    date_ajout: datetime
    item: ItemRead


class CollectionStats(SQLModel):
    total: int
    par_statut: dict[str, int]
    note_moyenne: Optional[float] = None
