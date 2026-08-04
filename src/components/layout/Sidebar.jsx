import { Link, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaBook,
    FaClipboardList,
    FaSignOutAlt
} from "react-icons/fa";

import "../../styles/sidebar.css";

function Sidebar({ role }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (

        <div className="sidebar">

            <div className="logo">
                <h2>Online Exam</h2>
            </div>

            <div className="menu">

                <Link
                    to={
                        role === "TEACHER"
                            ? "/teacher/dashboard"
                            : "/student/dashboard"
                    }
                >
                    <FaHome />
                    <span>Dashboard</span>
                </Link>

                {
                    role === "TEACHER" ? (
                        <>
                            <Link to="/teacher/exams/create">
                                <FaBook />
                                <span>Create Exam</span>
                            </Link>

                            <Link to="/teacher/exams">
                                <FaClipboardList />
                                <span>Manage Exams</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/student/exams">
                                <FaBook />
                                <span>Available Exams</span>
                            </Link>

                            <Link to="/student/results">
                                <FaClipboardList />
                                <span>Results</span>
                            </Link>
                        </>
                    )
                }

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

        </div>

    );

}

export default Sidebar;