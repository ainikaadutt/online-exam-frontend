import { useNavigate } from "react-router-dom";

function TeacherDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div>
            <h1>Teacher Dashboard</h1>

            <p>
                Welcome to the Online Examination System
            </p>

            <button onClick={() => navigate("/create-exam")}>
                Create Exam
            </button>

            <br /><br />

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default TeacherDashboard;