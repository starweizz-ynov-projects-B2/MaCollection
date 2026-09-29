import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

export default function Home() {
    const { user } = useAuth()

    return (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
            <span className="border-2 border-basil px-3 py-1 text-xs font-semibold tracking-[0.2em] text-basil uppercase">
                Le carnet de la communauté
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Le livre des recettes
            </h1>

            <p className="mt-4 max-w-md text-ink-soft">
                Parcourez les recettes de la communauté et gardez les vôtres au même endroit.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                    to="/recipes"
                    className="border-2 border-basil bg-basil px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-basil-dark hover:border-basil-dark"
                >
                    Voir les recettes
                </Link>
                {!user && (
                    <Link
                        to="/register"
                        className="border-2 border-mustard bg-mustard px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mustard-dark hover:border-mustard-dark"
                    >
                        Créer un compte
                    </Link>
                )}
            </div>
        </div>
    )
}
