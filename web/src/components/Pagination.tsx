type PaginationProps = {
    page: number
    limit: number
    total: number
    onPageChange: (page: number) => void
}

export default function Pagination({ page, limit, total, onPageChange }: PaginationProps) {
    const lastPage = Math.max(1, Math.ceil(total / limit))

    return (
        <div className="mt-6 flex items-center justify-center gap-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="border-2 border-ink/20 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-basil hover:text-basil disabled:cursor-not-allowed disabled:opacity-40"
            >
                Précédent
            </button>
            <span className="text-sm text-ink-soft">
                Page {page} / {lastPage}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= lastPage}
                className="border-2 border-ink/20 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-basil hover:text-basil disabled:cursor-not-allowed disabled:opacity-40"
            >
                Suivant
            </button>
        </div>
    )
}
