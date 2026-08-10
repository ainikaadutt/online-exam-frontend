import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/manage-exams.css";

function ManageExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/exams", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExams(response.data);

        } catch (error) {
            console.error("Failed to load exams:", error);
            alert("Failed to load exams");
        } finally {
            setLoading(false);
        }
    };

    const deleteExam = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this exam?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/exams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Exam deleted successfully");

            fetchExams();

        } catch (error) {
            console.error("Failed to delete exam:", error);
            alert("Failed to delete exam");
        }
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) {
            return "—";
        }

        return new Date(dateTime).toLocaleString();
    };

    return (
        <div className="manage-exams-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="manage-exams-header">

                <div>
                    <p className="manage-eyebrow">
                        Examination Management
                    </p>

                    <h1>Manage Exams</h1>

                    <p>
                        Create, edit and manage your examinations.
                    </p>
                </div>

                <button
                    className="create-exam-btn"
                    onClick={() =>
                        navigate("/teacher/exams/create")
                    }
                >
                    + Create New Exam
                </button>

            </div>

            {/* =========================
                EXAM COUNT
            ========================= */}

            <div className="exam-summary">
                <span>
                    Total Exams
                </span>

                <strong>
                    {exams.length}
                </strong>
            </div>

            {/* =========================
                LOADING
            ========================= */}

            {loading && (
                <div className="exam-empty-state">
                    <h2>Loading exams...</h2>
                    <p>
                        Please wait while we load your examinations.
                    </p>
                </div>
            )}

            {/* =========================
                NO EXAMS
            ========================= */}

            {!loading && exams.length === 0 && (
                <div className="exam-empty-state">

                    <div className="empty-icon">
                        📋
                    </div>

                    <h2>No Exams Yet</h2>

                    <p>
                        You haven't created any examinations yet.
                    </p>

                    <button
                        className="create-exam-btn"
                        onClick={() =>
                            navigate("/teacher/exams/create")
                        }
                    >
                        Create Your First Exam
                    </button>

                </div>
            )}

            {/* =========================
                EXAMS
            ========================= */}

            {!loading && exams.length > 0 && (

                <div className="exams-table-card">

                    <div className="table-header">

                        <div>
                            <h2>Your Examinations</h2>

                            <p>
                                View and manage all created exams.
                            </p>
                        </div>

                    </div>

                    <div className="table-wrapper">

                        <table className="exams-table">

                            <thead>

                            <tr>
                                <th>Exam</th>
                                <th>Duration</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th>
                            </tr>

                            </thead>

                            <tbody>

                            {exams.map((exam) => (

                                <tr key={exam.id}>

                                    {/* Exam */}

                                    <td>
                                        <div className="exam-title">

                                            <div className="exam-icon">
                                                📖
                                            </div>

                                            <div>
                                                <h3>
                                                    {exam.title}
                                                </h3>

                                                <p>
                                                    {exam.description ||
                                                        "No description provided"}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* Duration */}

                                    <td>
                                            <span className="duration">
                                                {exam.duration} mins
                                            </span>
                                    </td>

                                    {/* Start */}

                                    <td>
                                            <span className="date-time">
                                                {formatDateTime(
                                                    exam.startTime
                                                )}
                                            </span>
                                    </td>

                                    {/* End */}

                                    <td>
                                            <span className="date-time">
                                                {formatDateTime(
                                                    exam.endTime
                                                )}
                                            </span>
                                    </td>

                                    {/* Actions */}

                                    <td>

                                        <div className="exam-actions">

                                            <button
                                                className="action-btn questions"
                                                onClick={() =>
                                                    navigate(
                                                        `/teacher/exams/${exam.id}/questions`
                                                    )
                                                }
                                            >
                                                Questions
                                            </button>

                                            <button
                                                className="action-btn edit"
                                                onClick={() =>
                                                    navigate(
                                                        `/teacher/exams/edit/${exam.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="action-btn delete"
                                                onClick={() =>
                                                    deleteExam(exam.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ManageExams;