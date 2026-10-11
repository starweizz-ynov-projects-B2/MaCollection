import logging
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select

from app.db.session import get_session
from app.models.collection_entry import CollectionEntry, StatutEnum
from app.models.item import Item
from app.models.user import User
from app.schemas.collection import (
    CollectionEntryCreate,
    CollectionEntryUpdate,
    CollectionEntryRead,
    CollectionStats,
)
from app.schemas.item import ItemRead
from app.dependencies.auth import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter()


def _to_read(entry: CollectionEntry, item: Item) -> CollectionEntryRead:
    return CollectionEntryRead(
        id=entry.id,
        statut=entry.statut,
        note=entry.note,
        commentaire=entry.commentaire,
        date_ajout=entry.date_ajout,
        item=ItemRead.model_validate(item),
    )


@router.post(
    "/collection",
    response_model=CollectionEntryRead,
    status_code=status.HTTP_201_CREATED,
    summary="Ajouter un item à sa collection personnelle",
    responses={404: {"description": "Item inexistant"}, 409: {"description": "Item déjà présent"}},
)
def add_to_collection(
    entry_in: CollectionEntryCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    item = session.get(Item, entry_in.item_id)
    if item is None:
        logger.warning("Ajout collection échoué : item inexistant id=%s (user_id=%s)", entry_in.item_id, current_user.id)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item introuvable")

    existing = session.exec(
        select(CollectionEntry).where(
            CollectionEntry.user_id == current_user.id,
            CollectionEntry.item_id == entry_in.item_id,
        )
    ).first()
    if existing:
        logger.warning("Ajout collection échoué : item id=%s déjà présent (user_id=%s)", entry_in.item_id, current_user.id)
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Item déjà dans la collection")

    entry = CollectionEntry(user_id=current_user.id, **entry_in.model_dump())
    session.add(entry)
    session.commit()
    session.refresh(entry)
    logger.info("Item id=%s ajouté à la collection de user_id=%s", entry_in.item_id, current_user.id)
    return _to_read(entry, item)


@router.get(
    "/collection",
    response_model=list[CollectionEntryRead],
    summary="Lister sa collection personnelle",
)
def get_collection(
    statut: Optional[StatutEnum] = Query(None),
    tri: Optional[str] = Query(None, pattern="^(date|note)$", description="Tri par 'date' ou 'note'"),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    statement = select(CollectionEntry).where(CollectionEntry.user_id == current_user.id)
    if statut:
        statement = statement.where(CollectionEntry.statut == statut)

    if tri == "note":
        statement = statement.order_by(CollectionEntry.note.desc())
    else:
        statement = statement.order_by(CollectionEntry.date_ajout.desc())

    entries = session.exec(statement).all()

    results = []
    for entry in entries:
        item = session.get(Item, entry.item_id)
        results.append(_to_read(entry, item))
    return results


@router.patch(
    "/collection/{entry_id}",
    response_model=CollectionEntryRead,
    summary="Modifier une entrée de sa collection",
    responses={404: {"description": "Entrée introuvable"}},
)
def update_entry(
    entry_id: int,
    entry_in: CollectionEntryUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    entry = session.get(CollectionEntry, entry_id)
    if not entry or entry.user_id != current_user.id:
        logger.warning("Modification collection échouée : entrée id=%s introuvable ou non autorisée (user_id=%s)", entry_id, current_user.id)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entrée introuvable")

    for key, value in entry_in.model_dump(exclude_unset=True).items():
        setattr(entry, key, value)

    session.add(entry)
    session.commit()
    session.refresh(entry)
    logger.info("Entrée id=%s modifiée par user_id=%s", entry_id, current_user.id)
    item = session.get(Item, entry.item_id)
    return _to_read(entry, item)


@router.delete(
    "/collection/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Retirer une entrée de sa collection",
    responses={404: {"description": "Entrée introuvable"}},
)
def delete_entry(
    entry_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    entry = session.get(CollectionEntry, entry_id)
    if not entry or entry.user_id != current_user.id:
        logger.warning("Suppression collection échouée : entrée id=%s introuvable ou non autorisée (user_id=%s)", entry_id, current_user.id)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entrée introuvable")

    session.delete(entry)
    session.commit()
    logger.info("Entrée id=%s supprimée par user_id=%s", entry_id, current_user.id)


@router.get(
    "/stats",
    response_model=CollectionStats,
    summary="Statistiques de sa collection personnelle",
)
def get_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    entries = session.exec(
        select(CollectionEntry).where(CollectionEntry.user_id == current_user.id)
    ).all()

    total = len(entries)
    par_statut = {s.value: 0 for s in StatutEnum}
    notes = []
    for entry in entries:
        par_statut[entry.statut.value] += 1
        if entry.note is not None:
            notes.append(entry.note)

    note_moyenne = round(sum(notes) / len(notes), 2) if notes else None

    return CollectionStats(total=total, par_statut=par_statut, note_moyenne=note_moyenne)
