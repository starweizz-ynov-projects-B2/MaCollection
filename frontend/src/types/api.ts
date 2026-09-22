export type Statut = "a_decouvrir" | "en_cours" | "termine";

export type Item = {
    id: number;
    titre: string;
    categorie: string;
    description: string;
    image_url: string;
    annee: number;
    temps_preparation: number;
    difficulte: string;
}

export type Entry = {
    id: number;
    statut: Statut;
    note: number | null;
    commentaire: string | null;
    date_ajout: string;
    item: Item;
}

export type PaginatedItems = {
    total: number;
    page: number;
    limit: number;
    results: Item[];
};

export type AuthUser = { id: number; email: string };
export type AuthUserResponse = { access_token: string };

export type ApiError = { erreur: { code: number; message: string } };