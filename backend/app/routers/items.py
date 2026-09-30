from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select, func

from app.db.session import get_session
from app.models.item import Item
from app.schemas.item import ItemRead, ItemListResponse

router = APIRouter()


@router.get(
    "",
    response_model=ItemListResponse,
    summary="Rechercher et paginer le catalogue de recettes",
)
def list_items(
    q: Optional[str] = Query(None, min_length=1, description="Recherche par mot-clé dans le titre"),
    categorie: Optional[str] = Query(None, description="Filtre par catégorie"),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    session: Session = Depends(get_session),
):
    statement = select(Item)

    if q:
        statement = statement.where(Item.titre.ilike(f"%{q}%"))
    if categorie:
        statement = statement.where(Item.categorie == categorie)

    count_statement = select(func.count()).select_from(statement.subquery())
    total = session.exec(count_statement).one()

    statement = statement.offset((page - 1) * limit).limit(limit)
    results = session.exec(statement).all()

    return ItemListResponse(total=total, page=page, limit=limit, results=results)


@router.get(
    "/{item_id}",
    response_model=ItemRead,
    summary="Récupérer la fiche détaillée d'une recette",
    responses={404: {"description": "Item introuvable"}},
)
def get_item(item_id: int, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item introuvable")
    return item
