import './LoginPage.css'


export default function LoginPage() {


    return(
        <div className="login-page">

            <form className="login-form">
                <h1>Login</h1>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" placeholder="user@email.com" />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="secret@password" />
                </div>

                <button type="submit">Sign In</button>
            </form>

        </div>
    )
}