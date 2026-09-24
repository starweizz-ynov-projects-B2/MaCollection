export type Statut = "a_decouvrir" | "en_cours" | "termine";

export type Recipe = {
    id: number;
    titre: string;
    categorie: string;
    description: string;
    image_url: string;
    temps_preparation: number;
    difficulte: string;
    type_plat: string;
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

export type AuthUser = { id: number; email: string };
export type AuthUserResponse = { access_token: string };

export type ApiError = { erreur: { code: number; message: string } };