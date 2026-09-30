import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { http, ApiClientError } from '../../services/http.ts'
import { useAuth } from '../../context/AuthContext.tsx'
import { useCollection } from '../../context/CollectionContext.tsx'
import type { Recipe } from '../../types/api.ts'

export default function RecipeDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const { isInCollection, addEntry } = useCollection()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        async function load() {
            setLoading(true)
            setError(null)
            try {
                setRecipe(await http.get<Recipe>(`/items/${id}`))
            } catch (err) {
                setError(err instanceof ApiClientError ? err.message : 'Erreur inconnue')
            } finally {
                setLoading(false)
            }
        }

        void load()
    }, [id])

    const handleAdd = async () => {
        if (!recipe) return
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
        <div className="flex flex-1 flex-col items-center px-6 py-16">
            <Link to="/recipes" className="self-start text-sm font-medium text-basil hover:text-basil-dark">
                ← Retour aux recettes
            </Link>

            {loading && <p className="mt-10 text-ink-soft">Chargement...</p>}
            {error && (
                <p className="mt-10 border-l-4 border-tomato bg-tomato/10 px-3 py-2 text-sm text-tomato-dark">
                    {error}
                </p>
            )}

            {!loading && recipe && (
                <div className="mt-6 w-full max-w-2xl border-2 border-ink/10 bg-paper p-6">
                    {recipe.image_url && (
                        <img
                            src={recipe.image_url}
                            alt={recipe.titre}
                            className="mb-6 h-56 w-full border-2 border-ink/10 object-cover"
                        />
                    )}

                    <p className="text-xs font-semibold tracking-[0.2em] text-basil uppercase">{recipe.categorie}</p>
                    <h1 className="mt-2 text-2xl font-extrabold text-ink">{recipe.titre}</h1>

                    {recipe.description && <p className="mt-4 text-ink-soft">{recipe.description}</p>}

                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-soft">
                        {recipe.temps_preparation !== null && (
                            <span className="border-2 border-ink/10 px-3 py-1.5">
                                ⏱ {recipe.temps_preparation} min
                            </span>
                        )}
                        {recipe.difficulte && <span className="border-2 border-ink/10 px-3 py-1.5">{recipe.difficulte}</span>}
                        {recipe.type_plat && <span className="border-2 border-ink/10 px-3 py-1.5">{recipe.type_plat}</span>}
                    </div>

                    {user && (
                        <button
                            onClick={() => void handleAdd()}
                            disabled={isInCollection(recipe.id) || adding}
                            className="mt-6 border-2 border-basil bg-basil px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-basil-dark hover:border-basil-dark disabled:cursor-not-allowed disabled:border-ink/20 disabled:bg-ink/10 disabled:text-ink-soft"
                        >
                            {isInCollection(recipe.id)
                                ? 'Dans ma collection'
                                : adding
                                  ? 'Ajout...'
                                  : 'Ajouter à ma collection'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
