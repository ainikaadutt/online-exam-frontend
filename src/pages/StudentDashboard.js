import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardCard from "../components/cards/DashboardCard";
import ActionCard from "../components/cards/ActionCard";
import PageHeader from "../components/common/PageHeader";

import {
    FaBook,
    FaClipboardList,
    FaTrophy
} from "react-icons/fa";

import "../styles/student-dashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (

        <DashboardLayout
            title="Student Dashboard"
            role="STUDENT"
        >

            <PageHeader
                greeting="Good Afternoon 👋"
                title="Student Dashboard"
                description="Welcome back to ExamVerse. Continue your examinations and track your progress."
            />

            {/* =========================
                STATISTICS
            ========================= */}

            <div className="stats-grid">

                <DashboardCard
                    icon={<FaBook />}
                    title="Available Exams"
                    value="—"
                />

                <DashboardCard
                    icon={<FaClipboardList />}
                    title="Exams Attempted"
                    value="—"
                />

                <DashboardCard
                    icon={<FaTrophy />}
                    title="Results"
                    value="—"
                />

            </div>


            {/* =========================
                QUICK ACTIONS
            ========================= */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <h2>Quick Actions</h2>

                    <p>
                        Continue your examination journey
                    </p>

                </div>

                <div className="action-grid">

                    <ActionCard
                        icon={<FaBook />}
                        title="Available Exams"
                        description="View and attempt available examinations"
                        onClick={() =>
                            navigate("/student/exams")
                        }
                    />

                    <ActionCard
                        icon={<FaTrophy />}
                        title="My Results"
                        description="View your examination results"
                        onClick={() =>
                            navigate("/student/results")
                        }
                    />

                </div>

            </section>


            {/* =========================
                STUDENT INFORMATION
            ========================= */}

            <section className="dashboard-section">

                <div className="student-info-card">

                    <div className="student-info-icon">
                        <FaClipboardList />
                    </div>

                    <div>

                        <h2>
                            Ready for your next exam?
                        </h2>

                        <p>
                            Check the available examinations and
                            start when you're ready.
                        </p>

                    </div>

                    <button
                        className="student-exam-button"
                        onClick={() =>
                            navigate("/student/exams")
                        }
                    >
                        View Exams
                    </button>

                </div>

            </section>

        </DashboardLayout>

    );
}

export default StudentDashboard;