import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http, ApiClientError } from "../../services/http.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import FormField from "../../components/FormField.tsx";
import type { AuthUser, AuthUserResponse } from "../../types/api.ts";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        setLoading(true);

        try {
            await http.post("/auth/register", { email, password });
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
                            Bienvenue
                        </p>
                        <h2 className="mt-3 text-2xl font-bold leading-snug">
                            Créez votre carnet et gardez vos recettes favorites.
                        </h2>
                    </div>
                    <p className="text-sm text-cream/70">Déjà inscrit ?</p>
                </div>

                <div className="bg-paper px-8 py-10">
                    <h1 className="text-2xl font-bold text-ink">Inscription</h1>
                    <p className="mt-1 text-sm text-ink-soft">Créez votre compte en quelques secondes.</p>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                        <FormField id="email" label="Email" type="email" placeholder="vous@exemple.com" value={email} onChange={setEmail} />
                        <FormField id="password" label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={setPassword} />
                        <FormField id="confirm-password" label="Confirmation du mot de passe" type="password" placeholder="••••••••" value={confirmPassword} onChange={setConfirmPassword} />

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
                            {loading ? "Inscription..." : "S'inscrire"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-ink-soft">
                        Déjà inscrit ?{" "}
                        <Link to="/login" className="font-semibold text-basil hover:text-basil-dark">
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
