import { useEffect, useState } from 'react'
import { http, ApiClientError } from '../../services/http.ts'
import { useDebounce } from '../../hooks/useDebounce.ts'
import RecipeCard from '../../components/RecipeCard.tsx'
import Pagination from '../../components/Pagination.tsx'
import type { PaginatedItems } from '../../types/api.ts'

const CATEGORIES = ['Dessert', 'Plat', 'Entrée', 'Boisson', 'Boulangerie', 'Apéritif']
const LIMIT = 12

export default function RecipesPage() {
    const [q, setQ] = useState('')
    const [categorie, setCategorie] = useState('')
    const [page, setPage] = useState(1)
    const [data, setData] = useState<PaginatedItems | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const debouncedQ = useDebounce(q, 400)

    const filterKey = `${debouncedQ}|${categorie}`
    const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
    if (prevFilterKey !== filterKey) {
        setPrevFilterKey(filterKey)
        if (page !== 1) setPage(1)
    }

    useEffect(() => {
        async function load() {
            setLoading(true)
            setError(null)

            const params = new URLSearchParams()
            if (debouncedQ) params.set('q', debouncedQ)
            if (categorie) params.set('categorie', categorie)
            params.set('page', String(page))
            params.set('limit', String(LIMIT))

            try {
                setData(await http.get<PaginatedItems>(`/items?${params.toString()}`))
            } catch (err) {
                setError(err instanceof ApiClientError ? err.message : 'Erreur inconnue')
            } finally {
                setLoading(false)
            }
        }

        void load()
    }, [debouncedQ, categorie, page])

    return (
        <div className="flex flex-1 flex-col items-center px-6 py-16">
            <span className="border-2 border-basil px-3 py-1 text-xs font-semibold tracking-[0.2em] text-basil uppercase">
                Communauté
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Les recettes communautaires</h1>
            <p className="mt-3 mb-8 max-w-md text-center text-ink-soft">
                Ici vous découvrirez toutes les recettes de la communauté
            </p>

            <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
                <input
                    type="search"
                    placeholder="Rechercher une recette..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="flex-1 border-2 border-ink/20 bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-basil"
                />
                <select
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="border-2 border-ink/20 bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-basil"
                >
                    <option value="">Toutes les catégories</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p className="mt-10 text-ink-soft">Chargement...</p>}
            {error && (
                <p className="mt-10 border-l-4 border-tomato bg-tomato/10 px-3 py-2 text-sm text-tomato-dark">
                    {error}
                </p>
            )}
            {!loading && !error && data && data.results.length === 0 && (
                <p className="mt-10 text-ink-soft">Aucune recette ne correspond à votre recherche.</p>
            )}

            {!loading && !error && data && data.results.length > 0 && (
                <>
                    <ul className="mt-6 w-full max-w-2xl divide-y-2 divide-ink/10 border-2 border-ink/10 bg-paper">
                        {data.results.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </ul>
                    <Pagination page={data.page} limit={data.limit} total={data.total} onPageChange={setPage} />
                </>
            )}
        </div>
    )
}
