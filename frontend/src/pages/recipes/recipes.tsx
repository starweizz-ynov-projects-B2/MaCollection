
export default function RecipesPage() {
    return (
        <div className="flex flex-col items-center flex-1 px-6 py-16">
            <h1 className="text-3xl font-semibold text-neutral-900">Les recettes communautaires</h1>
            <p className="mt-3 max-w-md text-neutral-500 text-center mb-8">
                Ici vous découvrirez toutes les recettes de la communauté
            </p>

            <ul className="mt-10 w-full max-w-2xl divide-y divide-neutral-200 border border-neutral-200 rounded-lg">
                {}
            </ul>
        </div>
    )
}