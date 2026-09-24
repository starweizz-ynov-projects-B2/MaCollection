import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

export default function Home() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
            <h1 className="text-3xl font-semibold text-neutral-900">Le livre des recettes</h1>
            <p className="mt-3 max-w-md text-neutral-500">
                Parcourez les recettes de la communauté et gardez les vôtres au même endroit.
            </p>

            <div className="mt-8 flex gap-3">
                <Link
                    to="/recipes"
                    className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-700"
                >
                    Voir les recettes
                </Link>
                {!user && (
                    <Link
                        to="/register"
                        className="px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-300 rounded-md hover:bg-neutral-100"
                    >
                        Créer un compte
                    </Link>
                )}
            </div>
        </div>
    )
}
