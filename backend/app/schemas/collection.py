from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel
from app.models.collection_entry import StatusEnum


class CollectionEntryCreate(SQLModel):
    item_id: int
    status: StatusEnum = StatusEnum.a_decouvrir
    note: Optional[int] = None
    commentaire: Optional[str] = None


class CollectionEntryUpdate(SQLModel):
    status: Optional[StatusEnum] = None
    note: Optional[int] = None
    commentaire: Optional[str] = None


class CollectionEntryRead(SQLModel):
    id: int
    item_id: int
    status: StatusEnum
    note: Optional[int] = None
    commentaire: Optional[str] = None
    date_ajout: datetime
