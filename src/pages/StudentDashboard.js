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

            <p>Welcome to the Online Examination System</p>

            <button
                onClick={() => navigate("/available-exams")}
            >
                Available Exams
            </button>

            {" "}

            <button
                onClick={() => navigate("/my-results")}
            >
                My Results
            </button>

            <br /><br />

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default StudentDashboard;