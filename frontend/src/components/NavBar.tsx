import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav>
            <NavLink to="/recipes">Recettes</NavLink>
            <NavLink to="/recipes/mine">Mes recettes</NavLink>
            <NavLink to="/login">Connexion</NavLink>
            <NavLink to="/register">Inscription</NavLink>
        </nav>
    )
}