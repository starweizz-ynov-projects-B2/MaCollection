import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive ? 'text-white bg-neutral-800' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
    }`

export default function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <NavLink to="/" className="text-lg font-semibold text-neutral-900">
                MaCollection
            </NavLink>

            <div className="flex items-center gap-1">
                <NavLink to="/recipes" className={linkClass}>
                    Recettes
                </NavLink>
                <NavLink to="/recipes/mine" className={linkClass}>
                    Mes recettes
                </NavLink>
                {user && (
                    <>
                        <NavLink to="/collection" className={linkClass}>
                            Collection
                        </NavLink>
                        <NavLink to="/stats" className={linkClass}>
                            Stats
                        </NavLink>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2">
                {user ? (
                    <>
                        <span className="text-sm text-neutral-500">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-100"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={linkClass}>
                            Connexion
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="px-3 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-700"
                        >
                            Inscription
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}
