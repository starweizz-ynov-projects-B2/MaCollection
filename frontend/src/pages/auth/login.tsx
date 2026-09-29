import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http, ApiClientError } from "../../services/http.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import type { AuthUser, AuthUserResponse } from "../../types/api.ts";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { access_token } = await http.post<AuthUserResponse>("/auth/login", { email, password });
            const user = await http.get<AuthUser>("/auth/me", access_token);
            login(access_token, user);
            navigate("/");
        } catch (err) {
            setError(err instanceof ApiClientError ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center px-6 py-16">
            <div className="grid w-full max-w-3xl border-2 border-ink sm:grid-cols-2">
                <div className="hidden flex-col justify-between bg-basil px-8 py-10 text-cream sm:flex">
                    <span className="flex h-10 w-10 items-center justify-center border-2 border-mustard text-mustard">
                        M
                    </span>
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-mustard uppercase">
                            Content de vous revoir
                        </p>
                        <h2 className="mt-3 text-2xl font-bold leading-snug">
                            Retrouvez vos recettes et votre collection.
                        </h2>
                    </div>
                    <p className="text-sm text-cream/70">Pas encore de compte ?</p>
                </div>

                <div className="bg-paper px-8 py-10">
                    <h1 className="text-2xl font-bold text-ink">Connexion</h1>
                    <p className="mt-1 text-sm text-ink-soft">Entrez vos identifiants pour continuer.</p>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-xs font-semibold tracking-wide text-ink uppercase">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="vous@exemple.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-2 border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-basil"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="password"
                                className="text-xs font-semibold tracking-wide text-ink uppercase"
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-2 border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-basil"
                            />
                        </div>

                        {error && (
                            <p className="border-l-4 border-tomato bg-tomato/10 px-3 py-2 text-sm text-tomato-dark">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 border-2 border-mustard bg-mustard px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mustard-dark hover:border-mustard-dark disabled:opacity-60"
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-ink-soft">
                        Pas encore de compte ?{" "}
                        <Link to="/register" className="font-semibold text-basil hover:text-basil-dark">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
