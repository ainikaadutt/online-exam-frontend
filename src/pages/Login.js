import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            console.log("Full response:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === "STUDENT") {
                navigate("/student-dashboard");
            } else if (response.data.role === "TEACHER") {
                navigate("/teacher-dashboard");
            }

            console.log("Login successful");
            console.log("Token saved:", response.data.token);

        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <h1>Online Examination System</h1>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;