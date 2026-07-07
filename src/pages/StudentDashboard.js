import { useNavigate } from "react-router-dom";

function StudentDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (
        <div>
            <h1>Student Dashboard</h1>

            <p>
                Welcome to the Online Examination System
            </p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default StudentDashboard;