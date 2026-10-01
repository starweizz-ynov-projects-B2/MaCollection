import { useMemo, useState } from 'react'
import { useCollection } from '../../context/CollectionContext.tsx'
import CollectionEntryCard from '../../components/CollectionEntryCard.tsx'
import type { Statut } from '../../types/api.ts'

const STATUT_LABELS: Record<Statut, string> = {
    a_decouvrir: 'À découvrir',
    en_cours: 'En cours',
    termine: 'Terminé',
}

export default function CollectionPage() {
    const { entries, loading, error } = useCollection()
    const [statutFilter, setStatutFilter] = useState<Statut | ''>('')
    const [tri, setTri] = useState<'date' | 'note'>('date')

    const visibleEntries = useMemo(() => {
        const filtered = statutFilter ? entries.filter((e) => e.statut === statutFilter) : entries

        return [...filtered].sort((a, b) => {
            if (tri === 'note') return (b.note ?? 0) - (a.note ?? 0)
            return new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
        })
    }, [entries, statutFilter, tri])

    return (
        <div className="flex flex-1 flex-col items-center px-6 py-16">
            <span className="border-2 border-basil px-3 py-1 text-xs font-semibold tracking-[0.2em] text-basil uppercase">
                Votre carnet
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Ma collection</h1>
            <p className="mt-3 mb-8 max-w-md text-center text-ink-soft">
                Les recettes que vous avez ajoutées, avec leur statut et votre note
            </p>

            <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
                <select
                    value={statutFilter}
                    onChange={(e) => setStatutFilter(e.target.value as Statut | '')}
                    className="border-2 border-ink/20 bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-basil"
                >
                    <option value="">Tous les statuts</option>
                    {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
                        <option key={s} value={s}>
                            {STATUT_LABELS[s]}
                        </option>
                    ))}
                </select>

                <select
                    value={tri}
                    onChange={(e) => setTri(e.target.value as 'date' | 'note')}
                    className="border-2 border-ink/20 bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-basil"
                >
                    <option value="date">Trier par date d'ajout</option>
                    <option value="note">Trier par note</option>
                </select>
            </div>

            {loading && <p className="mt-10 text-ink-soft">Chargement...</p>}
            {error && (
                <p className="mt-10 border-l-4 border-tomato bg-tomato/10 px-3 py-2 text-sm text-tomato-dark">
                    {error}
                </p>
            )}
            {!loading && !error && visibleEntries.length === 0 && (
                <p className="mt-10 text-ink-soft">
                    Votre collection est vide. Ajoutez des recettes depuis la page Recettes.
                </p>
            )}

            {!loading && !error && visibleEntries.length > 0 && (
                <ul className="mt-6 flex w-full max-w-2xl flex-col gap-3">
                    {visibleEntries.map((entry) => (
                        <CollectionEntryCard key={entry.id} entry={entry} />
                    ))}
                </ul>
            )}
        </div>
    )
}
