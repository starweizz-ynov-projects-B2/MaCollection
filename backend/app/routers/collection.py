from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select

from app.db.session import get_session
from app.models.collection_entry import CollectionEntry, StatusEnum
from app.models.user import User
from app.schemas.collection import CollectionEntryCreate, CollectionEntryUpdate, CollectionEntryRead
from app.dependencies.auth import get_current_user

router = APIRouter()


@router.post("", response_model=CollectionEntryRead, status_code=status.HTTP_201_CREATED)
def add_to_collection(
    entry_in: CollectionEntryCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    existing = session.exec(
        select(CollectionEntry).where(
            CollectionEntry.user_id == current_user.id,
            CollectionEntry.item_id == entry_in.item_id,
        )
    ).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Item déjà dans la collection")

    entry = CollectionEntry(user_id=current_user.id, **entry_in.model_dump())
    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


@router.get("", response_model=list[CollectionEntryRead])
def get_collection(
    status_filter: Optional[StatusEnum] = Query(None, alias="status"),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    statement = select(CollectionEntry).where(CollectionEntry.user_id == current_user.id)
    if status_filter:
        statement = statement.where(CollectionEntry.status == status_filter)
    return session.exec(statement).all()


@router.patch("/{entry_id}", response_model=CollectionEntryRead)
def update_entry(
    entry_id: int,
    entry_in: CollectionEntryUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    entry = session.get(CollectionEntry, entry_id)
    if not entry or entry.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entrée introuvable")

    for key, value in entry_in.model_dump(exclude_unset=True).items():
        setattr(entry, key, value)

    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_entry(
    entry_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    entry = session.get(CollectionEntry, entry_id)
    if not entry or entry.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entrée introuvable")

    session.delete(entry)
    session.commit()
