import "../styles/login.css";
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
                navigate("/student/dashboard");
            } else if (response.data.role === "TEACHER") {
                navigate("/teacher/dashboard");
            }

            console.log("Login successful");
            console.log("Token saved:", response.data.token);

        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo">

                    <h1>🎓 ExamVerse</h1>

                    <p>Secure. Smart. Seamless.</p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;