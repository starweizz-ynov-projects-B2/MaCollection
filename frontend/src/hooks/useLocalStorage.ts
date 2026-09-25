import { useState } from "react";

export function useLocalStorage<T>(cle: string, valeureInitiale: T): [T, (v: T) => void] {
    const [valeur, setValeur] = useState<T>(() => {
        try {
            const item = localStorage.getItem(cle);
            return item ? (JSON.parse(item) as T) : valeureInitiale;
        } catch {
            return valeureInitiale;
        }
    });

    const setEtStocke = (v: T) => {
        setValeur(v);
        try {
            localStorage.setItem(cle, JSON.stringify(v));
        } catch {
            //
        }
    };

    return [valeur, setEtStocke];
}