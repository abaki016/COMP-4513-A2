import { useState } from "react";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic (you can replace this with actual authentication logic)
        console.log("Simulating login...");
        if (email === "test@example.com" && password === "password") {
            console.log("Login successful");
            // Call the onLogin function passed from props
            onLogin();
        } else {
            console.log("Login failed");
            setLoginError("Invalid email or password");
        }
    };

    const handleRegister = () => {
        // Simulate register logic (you can replace this with actual registration logic or navigate to a registration page)
        console.log("Simulating registration...");
        // Navigate to registration page if needed
    };

    return (
        <div>
            {/* Hero Image with Application Name */}
            <h1 style={{ textAlign: "center" }}>COMP 4513 Assignment #2: React</h1>
            {/* Login Form */}
            <div style={{ textAlign: "center" }}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleRegister}>
                        Register
                    </button>
                </form>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            </div>
        </div>
    );
};

export default Login;