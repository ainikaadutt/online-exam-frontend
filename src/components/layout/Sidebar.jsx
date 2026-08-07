import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FaHome,
    FaBook,
    FaClipboardList,
    FaSignOutAlt,
    FaChevronDown
} from "react-icons/fa";

import "../../styles/sidebar.css";

function Sidebar({ role }) {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <div className="logo-circle">
                    EV
                </div>

                <div>

                    <h2>ExamVerse</h2>

                    <p>Secure • Smart • Seamless</p>

                </div>

            </div>

            <nav className="sidebar-menu">

                <Link
                    className={location.pathname.includes("dashboard") ? "active" : ""}
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

                        <div className="menu-group">

                            <div className="menu-title">

                                <FaBook />

                                <span>Exams</span>

                                <FaChevronDown className="arrow" />

                            </div>

                            <Link
                                className={location.pathname.includes("/create") ? "sub-active" : ""}
                                to="/teacher/exams/create"
                            >
                                Create Exam
                            </Link>

                            <Link
                                className={
                                    location.pathname === "/teacher/exams"
                                        ? "sub-active"
                                        : ""
                                }
                                to="/teacher/exams"
                            >
                                Manage Exams
                            </Link>

                        </div>

                    ) : (

                        <div className="menu-group">

                            <div className="menu-title">

                                <FaBook />

                                <span>Exams</span>

                                <FaChevronDown className="arrow" />

                            </div>

                            <Link to="/student/exams">

                                Available Exams

                            </Link>

                            <Link to="/student/results">

                                Results

                            </Link>

                        </div>

                    )
                }

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                <span>Logout</span>

            </button>

        </aside>

    );

}

export default Sidebar;