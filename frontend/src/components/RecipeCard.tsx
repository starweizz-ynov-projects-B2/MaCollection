import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { useCollection } from '../context/CollectionContext.tsx'
import { ApiClientError } from '../services/http.ts'
import type { Recipe } from '../types/api.ts'

type RecipeCardProps = {
    recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { user } = useAuth()
    const { isInCollection, addEntry } = useCollection()
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inCollection = isInCollection(recipe.id)

    const handleAdd = async () => {
        setAdding(true)
        setError(null)
        try {
            await addEntry(recipe.id)
        } catch (err) {
            setError(err instanceof ApiClientError ? err.message : 'Erreur inconnue')
        } finally {
            setAdding(false)
        }
    }

    return (
        <li className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 border-2 border-ink/10 bg-cream-dark">
                {recipe.image_url && (
                    <img src={recipe.image_url} alt={recipe.titre} className="h-full w-full object-cover" />
                )}
            </div>

            <div className="flex-1 text-left">
                <Link to={`/recipes/${recipe.id}`} className="font-semibold text-ink hover:text-basil">
                    {recipe.titre}
                </Link>
                <p className="text-xs font-medium tracking-wide text-basil uppercase">{recipe.categorie}</p>
                {recipe.description && <p className="mt-1 text-sm text-ink-soft">{recipe.description}</p>}
                {error && <p className="mt-1 text-xs text-tomato-dark">{error}</p>}
            </div>

            {user && (
                <button
                    onClick={() => void handleAdd()}
                    disabled={inCollection || adding}
                    className="shrink-0 border-2 border-basil bg-basil px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-basil-dark hover:border-basil-dark disabled:cursor-not-allowed disabled:border-ink/20 disabled:bg-ink/10 disabled:text-ink-soft"
                >
                    {inCollection ? 'Dans ma collection' : adding ? 'Ajout...' : 'Ajouter à ma collection'}
                </button>
            )}
        </li>
    )
}
