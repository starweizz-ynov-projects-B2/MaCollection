import { useState } from 'react'
import type { Recipe } from '../types/api.ts'

type EditRecipeProps = {
    recipe: Recipe
    onClose: () => void
    onSave: (recipe: Recipe) => void
}

export default function EditRecipe({ recipe, onClose, onSave }: EditRecipeProps) {
    const [title, setTitle] = useState(recipe.titre)
    const [description, setDescription] = useState(recipe.description)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({ ...recipe, titre: title, description })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
            <div className="w-full max-w-md border-2 border-ink bg-paper p-6">
                <h2 className="text-lg font-bold text-ink">Éditer la recette</h2>

                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="title" className="text-xs font-semibold tracking-wide text-ink uppercase">
                            Titre
                        </label>
                        <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-ink/20 bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-basil"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                        <label
                            htmlFor="description"
                            className="text-xs font-semibold tracking-wide text-ink uppercase"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="border-2 border-ink/20 bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-basil"
                        />
                    </div>

                    <div className="mt-2 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border-2 border-ink/20 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-ink cursor-pointer"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="border-2 border-mustard bg-mustard px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-mustard-dark hover:border-mustard-dark cursor-pointer"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
