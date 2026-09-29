import { useEffect, useState } from 'react'
import EditRecipe from '../../components/EditRecipe.tsx'
import AddRecipe from '../../components/AddRecipe.tsx'
import { http, ApiClientError } from '../../services/http.ts'
import { useAuth } from '../../context/AuthContext.tsx'
import type { PaginatedItems, Recipe } from '../../types/api.ts'

export default function MyRecipesPage() {
    const { token } = useAuth()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        http
            .get<PaginatedItems>('/items/mine', token)
            .then((data) => setRecipes(data.results))
            .catch((err) => setError(err instanceof ApiClientError ? err.message : 'Erreur inconnue'))
            .finally(() => setLoading(false))
    }, [token])

    const handleSave = (updated: Recipe) => {
        setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
        setEditingRecipe(null)
    }

    const handleAdd = (added: Recipe) => {
        setRecipes((prev) => [...prev, added])
        setIsAdding(false)

        try {
            http.post("/")
        } catch (error) {
            setError(error instanceof ApiClientError ? error.message : error);
        }
    }

    return (
        <div className="flex flex-1 flex-col items-center px-6 py-16">
            <span className="border-2 border-basil px-3 py-1 text-xs font-semibold tracking-[0.2em] text-basil uppercase">
                Votre carnet
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Mes recettes</h1>
            <p className="mt-3 mb-8 max-w-md text-center text-ink-soft">
                Ici vous pouvez créer, supprimer, éditer vos recettes
            </p>

            <button
                onClick={() => setIsAdding(true)}
                className="border-2 border-basil bg-basil px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-basil-dark hover:border-basil-dark cursor-pointer"
            >
                Ajouter une recette pour la commu (nan Yuki GROS)
            </button>

            {loading && <p className="mt-10 text-ink-soft">Chargement...</p>}
            {error && (
                <p className="mt-10 border-l-4 border-tomato bg-tomato/10 px-3 py-2 text-sm text-tomato-dark">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <ul className="mt-10 w-full max-w-2xl divide-y-2 divide-ink/10 border-2 border-ink/10 bg-paper">
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="flex items-center gap-4 p-4">
                            <img
                                src={recipe.image_url}
                                alt={recipe.titre}
                                className="h-16 w-16 shrink-0 border-2 border-ink/10 bg-cream-dark object-cover"
                            />
                            <div className="flex-1 text-left">
                                <h3 className="font-semibold text-ink">{recipe.titre}</h3>
                                <p className="text-sm text-ink-soft">{recipe.description}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button
                                    onClick={() => setEditingRecipe(recipe)}
                                    className="border-2 border-ink/20 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-basil hover:text-basil cursor-pointer"
                                >
                                    Éditer
                                </button>
                                <button className="border-2 border-tomato/40 px-3 py-1.5 text-sm font-medium text-tomato-dark transition-colors hover:bg-tomato/10 cursor-pointer">
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {editingRecipe && (
                <EditRecipe
                    recipe={editingRecipe}
                    onClose={() => setEditingRecipe(null)}
                    onSave={handleSave}
                />
            )}

            {isAdding && <AddRecipe onClose={() => setIsAdding(false)} onAdd={handleAdd} />}
        </div>
    )
}
