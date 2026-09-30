import { useAuth } from '../context/AuthContext.tsx'
import { useCollection } from '../context/CollectionContext.tsx'
import type { Recipe } from '../types/api.ts'

type RecipeCardProps = {
    recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { user } = useAuth()
    const { isInCollection, addEntry } = useCollection()
    const inCollection = isInCollection(recipe.id)

    return (
        <li className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 border-2 border-ink/10 bg-cream-dark">
                {recipe.image_url && (
                    <img src={recipe.image_url} alt={recipe.titre} className="h-full w-full object-cover" />
                )}
            </div>

            <div className="flex-1 text-left">
                <h3 className="font-semibold text-ink">{recipe.titre}</h3>
                <p className="text-xs font-medium tracking-wide text-basil uppercase">{recipe.categorie}</p>
                {recipe.description && <p className="mt-1 text-sm text-ink-soft">{recipe.description}</p>}
            </div>

            {user && (
                <button
                    onClick={() => void addEntry(recipe.id)}
                    disabled={inCollection}
                    className="shrink-0 border-2 border-basil bg-basil px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-basil-dark hover:border-basil-dark disabled:cursor-not-allowed disabled:border-ink/20 disabled:bg-ink/10 disabled:text-ink-soft"
                >
                    {inCollection ? 'Dans ma collection' : 'Ajouter à ma collection'}
                </button>
            )}
        </li>
    )
}
