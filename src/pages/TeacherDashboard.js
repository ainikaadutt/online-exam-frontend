import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBook,
    FaClipboardList,
    FaUsers,
    FaChartBar,
    FaPlus,
    FaArrowRight
} from "react-icons/fa";

import api from "../services/api";

import "../styles/teacher-dashboard.css";

function TeacherDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        exams: 0,
        questions: 0,
        students: 0,
        results: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const [
                examsResponse,
                questionsResponse,
                usersResponse,
                attemptsResponse
            ] = await Promise.all([
                api.get("/exams", config),
                api.get("/questions", config),
                api.get("/users", config),
                api.get("/attempts", config)
            ]);

            const students = usersResponse.data.filter(
                (user) => user.role === "STUDENT"
            );

            const submittedAttempts =
                attemptsResponse.data.filter(
                    (attempt) => attempt.submitted === true
                );

            setStats({
                exams: examsResponse.data.length,
                questions: questionsResponse.data.length,
                students: students.length,
                results: submittedAttempts.length
            });

        } catch (error) {

            console.error(
                "Failed to load dashboard statistics:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (

        <div className="teacher-dashboard">

            {/* =========================
                HEADER
            ========================= */}

            <div className="teacher-dashboard-header">

                <div>

                    <p className="teacher-eyebrow">
                        Teacher Portal
                    </p>

                    <h1>
                        Teacher Dashboard
                    </h1>

                    <p>
                        Manage your examinations, questions and
                        student performance.
                    </p>

                </div>

                <button
                    className="teacher-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>


            {/* =========================
                STATISTICS
            ========================= */}

            <div className="teacher-stats-grid">

                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        <FaBook />
                    </div>

                    <div>
                        <span>Examinations</span>

                        <strong>
                            {loading ? "..." : stats.exams}
                        </strong>
                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        <FaClipboardList />
                    </div>

                    <div>
                        <span>Questions</span>

                        <strong>
                            {loading ? "..." : stats.questions}
                        </strong>
                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        <FaUsers />
                    </div>

                    <div>
                        <span>Students</span>

                        <strong>
                            {loading ? "..." : stats.students}
                        </strong>
                    </div>

                </div>


                <div className="teacher-stat-card">

                    <div className="teacher-stat-icon">
                        <FaChartBar />
                    </div>

                    <div>
                        <span>Results</span>

                        <strong>
                            {loading ? "..." : stats.results}
                        </strong>
                    </div>

                </div>

            </div>


            {/* =========================
                QUICK ACTIONS
            ========================= */}

            <section className="teacher-dashboard-section">

                <div className="teacher-section-heading">

                    <h2>
                        Quick Actions
                    </h2>

                    <p>
                        Manage your examination system.
                    </p>

                </div>


                <div className="teacher-action-grid">


                    {/* Create Exam */}

                    <button
                        className="teacher-action-card"
                        onClick={() =>
                            navigate("/teacher/exams/create")
                        }
                    >

                        <div className="teacher-action-icon">
                            <FaPlus />
                        </div>

                        <div className="teacher-action-content">

                            <h3>
                                Create Exam
                            </h3>

                            <p>
                                Create a new examination and
                                configure its details.
                            </p>

                        </div>

                        <FaArrowRight
                            className="teacher-action-arrow"
                        />

                    </button>


                    {/* Manage Exams */}

                    <button
                        className="teacher-action-card"
                        onClick={() =>
                            navigate("/teacher/exams")
                        }
                    >

                        <div className="teacher-action-icon">
                            <FaBook />
                        </div>

                        <div className="teacher-action-content">

                            <h3>
                                Manage Exams
                            </h3>

                            <p>
                                Edit, delete and manage your
                                existing examinations.
                            </p>

                        </div>

                        <FaArrowRight
                            className="teacher-action-arrow"
                        />

                    </button>


                    {/* Student Results */}

                    <button
                        className="teacher-action-card"
                        onClick={() =>
                            navigate("/teacher/results")
                        }
                    >

                        <div className="teacher-action-icon">
                            <FaChartBar />
                        </div>

                        <div className="teacher-action-content">

                            <h3>
                                Student Results
                            </h3>

                            <p>
                                View examination attempts and
                                student scores.
                            </p>

                        </div>

                        <FaArrowRight
                            className="teacher-action-arrow"
                        />

                    </button>


                    {/* Manage Questions */}

                    <button
                        className="teacher-action-card"
                        onClick={() =>
                            navigate("/teacher/exams")
                        }
                    >

                        <div className="teacher-action-icon">
                            <FaClipboardList />
                        </div>

                        <div className="teacher-action-content">

                            <h3>
                                Manage Questions
                            </h3>

                            <p>
                                Open an examination to add,
                                edit or delete questions.
                            </p>

                        </div>

                        <FaArrowRight
                            className="teacher-action-arrow"
                        />

                    </button>

                </div>

            </section>


            {/* =========================
                RECENT ACTIVITY
            ========================= */}

            <section className="teacher-dashboard-section">

                <div className="teacher-section-heading">

                    <h2>
                        Recent Activity
                    </h2>

                    <p>
                        Quick access to your examination management.
                    </p>

                </div>


                <div className="teacher-recent-card">

                    <div className="teacher-recent-item">

                        <div className="teacher-recent-icon">
                            <FaBook />
                        </div>

                        <div>

                            <h3>
                                Manage your examinations
                            </h3>

                            <p>
                                View all created exams and manage
                                their questions.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/teacher/question-exams")
                            }
                        >
                            Open
                            <FaArrowRight />
                        </button>

                    </div>


                    <div className="teacher-recent-item">

                        <div className="teacher-recent-icon">
                            <FaChartBar />
                        </div>

                        <div>

                            <h3>
                                Review student results
                            </h3>

                            <p>
                                Check submitted examination
                                attempts and scores.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/teacher/results")
                            }
                        >
                            Open
                            <FaArrowRight />
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default TeacherDashboard;