const BASE_URL = "http://localhost:8000";

export class ApiClientError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

async function request<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (token) headers.set("Authorization", "Bearer " + token);

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

    if (!res.ok) {
        const body: unknown = await res.json().catch(() => null);
        const message = body && typeof body === "object" && "erreur" in body ? (body as { erreur: { message: string } }).erreur.message : "Erreur inconnue";
        throw new ApiClientError(res.status, message)
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}

export const http = {
    get: <T>(path: string, token?: string | null) => request<T>(path, { method: "GET" }, token),
    post: <T>(path: string, body: unknown, token?: string | null) => request<T>(path, { method: "POST", body: JSON.stringify(body) }, token),
    patch: <T>(path: string, body: unknown, token?: string | null) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) }, token),
    delete: (path: string, token?: string | null) => request<void>(path, { method: "DELETE" }, token),
};

