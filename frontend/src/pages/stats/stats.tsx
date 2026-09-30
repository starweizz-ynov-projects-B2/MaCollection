import { useEffect, useState } from 'react'
import { http, ApiClientError } from '../../services/http.ts'
import { useAuth } from '../../context/AuthContext.tsx'
import type { CollectionStats, Statut } from '../../types/api.ts'

const STATUT_LABELS: Record<Statut, string> = {
    a_decouvrir: 'À découvrir',
    en_cours: 'En cours',
    termine: 'Terminé',
}

export default function StatsPage() {
    const { token } = useAuth()
    const [stats, setStats] = useState<CollectionStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        http
            .get<CollectionStats>('/me/stats', token)
            .then(setStats)
            .catch((err) => setError(err instanceof ApiClientError ? err.message : 'Erreur inconnue'))
            .finally(() => setLoading(false))
    }, [token])

    return (
        <div className="flex flex-1 flex-col items-center px-6 py-16">
            <span className="border-2 border-basil px-3 py-1 text-xs font-semibold tracking-[0.2em] text-basil uppercase">
                Vue d'ensemble
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Mes statistiques</h1>

            {loading && <p className="mt-10 text-ink-soft">Chargement...</p>}
            {error && (
                <p className="mt-10 border-l-4 border-tomato bg-tomato/10 px-3 py-2 text-sm text-tomato-dark">
                    {error}
                </p>
            )}
            {!loading && !error && stats && stats.total === 0 && (
                <p className="mt-10 text-ink-soft">Ajoutez des recettes à votre collection pour voir vos stats.</p>
            )}

            {!loading && !error && stats && stats.total > 0 && (
                <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="border-2 border-ink/10 bg-paper p-4 text-center">
                        <p className="text-3xl font-extrabold text-basil">{stats.total}</p>
                        <p className="mt-1 text-xs font-medium tracking-wide text-ink-soft uppercase">Total</p>
                    </div>

                    {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
                        <div key={s} className="border-2 border-ink/10 bg-paper p-4 text-center">
                            <p className="text-3xl font-extrabold text-basil">{stats.par_statut[s]}</p>
                            <p className="mt-1 text-xs font-medium tracking-wide text-ink-soft uppercase">
                                {STATUT_LABELS[s]}
                            </p>
                        </div>
                    ))}

                    <div className="border-2 border-ink/10 bg-paper p-4 text-center">
                        <p className="text-3xl font-extrabold text-mustard-dark">
                            {stats.note_moyenne ?? '—'}
                        </p>
                        <p className="mt-1 text-xs font-medium tracking-wide text-ink-soft uppercase">
                            Note moyenne
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
