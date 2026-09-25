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
    }

    return (
        <div className="flex flex-col items-center flex-1 px-6 py-16">
            <h1 className="text-3xl font-semibold text-neutral-900">Mes recettes</h1>
            <p className="mt-3 max-w-md text-neutral-500 text-center mb-8">
                Ici vous pouvez créer, supprimer, éditer vos recettes
            </p>

            <button
                onClick={() => setIsAdding(true)}
                className="px-3 py-1.5 text-sm font-medium text-neutral-700 border border-neutral-300 rounded-md hover:bg-neutral-100 cursor-pointer"
            >
                Ajouter une recette pour la commu (nan Yuki GROS)
            </button>

            {loading && <p className="mt-10 text-neutral-500">Chargement...</p>}
            {error && <p className="mt-10 text-red-600">{error}</p>}

            {!loading && !error && (
                <ul className="mt-10 w-full max-w-2xl divide-y divide-neutral-200 border border-neutral-200 rounded-lg">
                    {recipes.map((recipe) => (
                        <li key={recipe.id} className="flex items-center gap-4 p-4">
                            <img
                                src={recipe.image_url}
                                alt={recipe.titre}
                                className="w-16 h-16 rounded-md bg-neutral-100 object-cover shrink-0"
                            />
                            <div className="flex-1 text-left">
                                <h3 className="font-medium text-neutral-900">{recipe.titre}</h3>
                                <p className="text-sm text-neutral-500">{recipe.description}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button
                                    onClick={() => setEditingRecipe(recipe)}
                                    className="px-3 py-1.5 text-sm font-medium text-neutral-700 border border-neutral-300 rounded-md hover:bg-neutral-100 cursor-pointer"
                                >
                                    Éditer
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 cursor-pointer">
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
