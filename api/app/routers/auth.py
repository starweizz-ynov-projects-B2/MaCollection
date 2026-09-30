import re

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.db.session import get_session
from app.models.user import User
from app.schemas.user import UserCreate, UserRead
from app.schemas.auth import Token, LoginRequest
from app.core.security import hash_password, verify_password, create_access_token
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Créer un compte",
    responses={409: {"description": "Email déjà pris"}},
)
def register(user_in: UserCreate, session: Session = Depends(get_session)):
    existingUserEmail = session.exec(select(User).where(User.email == user_in.email)).first()
    if existingUserEmail:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email déjà pris")

    existingUserUsername = session.exec(select(User).where(User.username == user_in.username)).first()
    if existingUserUsername:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Nom d'utilisateur déjà pris")

    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post(
    "/login",
    response_model=Token,
    summary="Se connecter",
    responses={401: {"description": "Email ou mot de passe invalide"}},
)
def login(user_in: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == user_in.email)).first()

    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou mot de passe invalide")

    token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=token)


@router.get(
    "/me",
    response_model=UserRead,
    summary="Récupérer l'utilisateur courant",
    responses={401: {"description": "Non authentifié"}},
)
def me(current_user: User = Depends(get_current_user)):
    return current_user
