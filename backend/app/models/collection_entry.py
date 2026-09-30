from typing import Optional
from datetime import datetime, timezone
from enum import Enum
from sqlmodel import SQLModel, Field


class StatutEnum(str, Enum):
    a_decouvrir = "a_decouvrir"
    en_cours = "en_cours"
    termine = "termine"


class CollectionEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    item_id: int = Field(foreign_key="item.id")
    statut: StatutEnum = Field(default=StatutEnum.a_decouvrir)
    note: Optional[int] = None
    commentaire: Optional[str] = None
    date_ajout: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
