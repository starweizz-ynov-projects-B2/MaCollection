import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { http, ApiClientError } from "../services/http.ts";
import { useAuth } from "./AuthContext.tsx";
import type { Entry, Statut } from "../types/api.ts";

type EntryPatch = Partial<Pick<Entry, "statut" | "note" | "commentaire">>;

type CollectionContextValue = {
    entries: Entry[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    addEntry: (itemId: number) => Promise<void>;
    updateEntry: (entryId: number, patch: EntryPatch) => Promise<void>;
    removeEntry: (entryId: number) => Promise<void>;
    isInCollection: (itemId: number) => boolean;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        if (!token) {
            setEntries([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await http.get<Entry[]>("/me/collection", token);
            setEntries(data);
        } catch (err) {
            setError(err instanceof ApiClientError ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        async function load() {
            if (!token) {
                setEntries([]);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const data = await http.get<Entry[]>("/me/collection", token);
                setEntries(data);
            } catch (err) {
                setError(err instanceof ApiClientError ? err.message : "Erreur inconnue");
            } finally {
                setLoading(false);
            }
        }

        void load();
    }, [token]);

    const addEntry = async (itemId: number) => {
        const entry = await http.post<Entry>(
            "/me/collection",
            { item_id: itemId, statut: "a_decouvrir" satisfies Statut },
            token,
        );
        setEntries((prev) => [entry, ...prev]);
    };

    const updateEntry = async (entryId: number, patch: EntryPatch) => {
        const updated = await http.patch<Entry>(`/me/collection/${entryId}`, patch, token);
        setEntries((prev) => prev.map((e) => (e.id === entryId ? updated : e)));
    };

    const removeEntry = async (entryId: number) => {
        await http.delete(`/me/collection/${entryId}`, token);
        setEntries((prev) => prev.filter((e) => e.id !== entryId));
    };

    const isInCollection = (itemId: number) => entries.some((e) => e.item.id === itemId);

    return (
        <CollectionContext.Provider
            value={{ entries, loading, error, refresh, addEntry, updateEntry, removeEntry, isInCollection }}
        >
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollection(): CollectionContextValue {
    const ctx = useContext(CollectionContext);
    if (!ctx) throw new Error("useCollection must be used within CollectionProvider");
    return ctx;
}
