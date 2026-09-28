from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select, func

from app.db.session import get_session
from app.models.item import Item
from app.schemas.item import ItemRead, ItemListResponse

router = APIRouter()


@router.get("", response_model=ItemListResponse)
def list_items(
    q: Optional[str] = Query(None, min_length=1),
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    session: Session = Depends(get_session),
):
    statement = select(Item)

    if q:
        statement = statement.where(Item.title.ilike(f"%{q}%"))
    if category:
        statement = statement.where(Item.category == category)

    count_statement = select(func.count()).select_from(statement.subquery())
    total = session.exec(count_statement).one()

    statement = statement.offset((page - 1) * limit).limit(limit)
    results = session.exec(statement).all()

    return ItemListResponse(total=total, page=page, limit=limit, results=results)


@router.get("/{item_id}", response_model=ItemRead)
def get_item(item_id: int, session: Session = Depends(get_session)):
    item = session.get(Item, item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item introuvable")
    return item
