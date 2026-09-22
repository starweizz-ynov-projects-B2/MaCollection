export default function RegisterPage() {
    return (
        <div className="container">
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" placeholder="Password" />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirmation du mot de passe</label>
                    <input type="password" id="confirm-password" placeholder="Confirmation du mot de passe" />
                </div>
            </form>
        </div>
    )
}