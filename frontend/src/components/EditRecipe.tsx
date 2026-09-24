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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-neutral-900">Éditer la recette</h2>

                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1 text-left">
                        <label htmlFor="title" className="text-sm font-medium text-neutral-700">
                            Titre
                        </label>
                        <input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                        <label htmlFor="description" className="text-sm font-medium text-neutral-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
                        />
                    </div>

                    <div className="mt-2 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1.5 text-sm font-medium text-neutral-700 border border-neutral-300 rounded-md hover:bg-neutral-100 cursor-pointer"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1.5 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-700 cursor-pointer"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
