import { useEffect, useState } from "react";

export function useDebounce<T>(valeur: T, delaiMs: number): T {
    const [valeurDebounce, setValeurDebounce] = useState<T>(valeur);

    useEffect(() => {
        const timeout = setTimeout(() => setValeurDebounce(valeur), delaiMs);
        return () => clearTimeout(timeout);
    }, [valeur, delaiMs]);

    return valeurDebounce;
}
