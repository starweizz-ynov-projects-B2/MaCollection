export default function RecipesPage() {
    return (
        <div className="flex flex-1 flex-col items-center px-6 py-16">
            <span className="border-2 border-basil px-3 py-1 text-xs font-semibold tracking-[0.2em] text-basil uppercase">
                Communauté
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Les recettes communautaires</h1>
            <p className="mt-3 mb-8 max-w-md text-center text-ink-soft">
                Ici vous découvrirez toutes les recettes de la communauté
            </p>

            <ul className="mt-6 w-full max-w-2xl divide-y-2 divide-ink/10 border-2 border-ink/10 bg-paper">
                {}
            </ul>
        </div>
    )
}
