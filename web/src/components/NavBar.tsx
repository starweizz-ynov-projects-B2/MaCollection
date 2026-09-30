import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `border-b-2 px-1 py-1 text-sm font-medium tracking-wide transition-colors ${
        isActive
            ? 'border-mustard text-white'
            : 'border-transparent text-cream/70 hover:border-mustard/50 hover:text-white'
    }`

export default function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="border-b-4 border-mustard bg-basil">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <NavLink to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
                    MaCollection
                </NavLink>

                <div className="flex items-center gap-6">
                    <NavLink to="/recipes" className={linkClass}>
                        Recettes
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

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="text-sm text-cream/80">{user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="border-2 border-cream/30 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:border-mustard hover:text-mustard cursor-pointer"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="border-2 border-cream/30 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:border-mustard hover:text-mustard"
                            >
                                Connexion
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="border-2 border-mustard bg-mustard px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-mustard-dark hover:border-mustard-dark"
                            >
                                Inscription
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
