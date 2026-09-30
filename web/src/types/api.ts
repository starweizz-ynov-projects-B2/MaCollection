export type Statut = "a_decouvrir" | "en_cours" | "termine";

export type Recipe = {
    id: number;
    titre: string;
    categorie: string;
    description: string | null;
    image_url: string | null;
    temps_preparation: number | null;
    difficulte: string | null;
    type_plat: string | null;
}

export type Entry = {
    id: number;
    statut: Statut;
    note: number | null;
    commentaire: string | null;
    date_ajout: string;
    item: Recipe;
}

export type PaginatedItems = {
    total: number;
    page: number;
    limit: number;
    results: Recipe[];
};

export type CollectionStats = {
    total: number;
    par_statut: Record<Statut, number>;
    note_moyenne: number | null;
};

export type AuthUser = { id: number; email: string };
export type AuthUserResponse = { access_token: string; token_type: string };

export type ApiError = { erreur: { code: number; message: string } };