import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic (you can replace this with actual authentication logic)
        console.log("Simulating login...");
        if (email === "test@example.com" && password === "password") {
            console.log("Login successful");
            // Set login status in localStorage or context if needed
            navigate("/home"); // Navigate to the Home view after login
        } else {
            console.log("Login failed");
            // Handle login failure (e.g., display error message)
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
            <h1 style={{ textAlign: "center" }}>Your Application Name</h1>
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
                    <button type="button" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    )
};

export default Login;