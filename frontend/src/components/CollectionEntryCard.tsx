import { useState } from 'react'
import { useCollection } from '../context/CollectionContext.tsx'
import type { Entry, Statut } from '../types/api.ts'

const STATUT_LABELS: Record<Statut, string> = {
    a_decouvrir: 'À découvrir',
    en_cours: 'En cours',
    termine: 'Terminé',
}

type CollectionEntryCardProps = {
    entry: Entry
}

export default function CollectionEntryCard({ entry }: CollectionEntryCardProps) {
    const { updateEntry, removeEntry } = useCollection()
    const [statut, setStatut] = useState<Statut>(entry.statut)
    const [note, setNote] = useState(entry.note ?? '')
    const [commentaire, setCommentaire] = useState(entry.commentaire ?? '')
    const [saving, setSaving] = useState(false)

    const dirty = statut !== entry.statut || note !== (entry.note ?? '') || commentaire !== (entry.commentaire ?? '')

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateEntry(entry.id, {
                statut,
                note: note === '' ? null : Number(note),
                commentaire: commentaire === '' ? null : commentaire,
            })
        } finally {
            setSaving(false)
        }
    }

    return (
        <li className="flex flex-col gap-3 border-2 border-ink/10 bg-paper p-4 sm:flex-row sm:items-start">
            <div className="h-16 w-16 shrink-0 border-2 border-ink/10 bg-cream-dark">
                {entry.item.image_url && (
                    <img src={entry.item.image_url} alt={entry.item.titre} className="h-full w-full object-cover" />
                )}
            </div>

            <div className="flex-1">
                <h3 className="font-semibold text-ink">{entry.item.titre}</h3>
                <p className="text-xs font-medium tracking-wide text-basil uppercase">{entry.item.categorie}</p>

                <div className="mt-3 flex flex-wrap gap-3">
                    <select
                        value={statut}
                        onChange={(e) => setStatut(e.target.value as Statut)}
                        className="border-2 border-ink/20 bg-cream px-2 py-1.5 text-sm text-ink outline-none focus:border-basil"
                    >
                        {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
                            <option key={s} value={s}>
                                {STATUT_LABELS[s]}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        min={1}
                        max={5}
                        placeholder="Note (1-5)"
                        value={note}
                        onChange={(e) => setNote(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-28 border-2 border-ink/20 bg-cream px-2 py-1.5 text-sm text-ink outline-none focus:border-basil"
                    />
                </div>

                <textarea
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Commentaire..."
                    rows={2}
                    className="mt-3 w-full border-2 border-ink/20 bg-cream px-2 py-1.5 text-sm text-ink outline-none focus:border-basil"
                />
            </div>

            <div className="flex shrink-0 gap-2">
                <button
                    onClick={() => void handleSave()}
                    disabled={!dirty || saving}
                    className="border-2 border-mustard bg-mustard px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-mustard-dark hover:border-mustard-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button
                    onClick={() => void removeEntry(entry.id)}
                    className="border-2 border-tomato/40 px-3 py-1.5 text-sm font-medium text-tomato-dark transition-colors hover:bg-tomato/10"
                >
                    Retirer
                </button>
            </div>
        </li>
    )
}
