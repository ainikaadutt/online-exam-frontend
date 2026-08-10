import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/student-results.css";
function StudentResults() {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/attempts/student", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAttempts(response.data);

        } catch (error) {
            console.error("Failed to load results:", error);
            setError("Failed to load your examination results.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="page-content">
                <h1>My Results</h1>
                <p>Loading your results...</p>
            </div>
        );
    }

    return (
        <div className="page-content">

            <div className="page-header">

                <p className="eyebrow">
                    Examination History
                </p>

                <h1>My Results</h1>

                <p>
                    View your completed examinations and scores.
                </p>

            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {!error && attempts.length === 0 && (
                <div className="empty-state">

                    <h2>No Results Yet</h2>

                    <p>
                        You have not completed any examinations yet.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/student/exams")
                        }
                    >
                        Browse Available Exams
                    </button>

                </div>
            )}

            {attempts.length > 0 && (

                <div className="results-list">

                    {attempts.map((attempt) => (

                        <div
                            className="result-card"
                            key={attempt.id}
                        >

                            <div className="result-info">

                                <h2>
                                    {attempt.exam?.title ||
                                        "Examination"}
                                </h2>

                                <p>
                                    {attempt.exam?.description ||
                                        "Examination attempt"}
                                </p>

                                <span>
                                    Attempt #{attempt.id}
                                </span>

                            </div>

                            <div className="result-score">

                                <strong>
                                    {attempt.score ?? 0}
                                </strong>

                                <span>
                                    Marks
                                </span>

                            </div>

                            <div className="result-status">

                                <span className="status submitted">
                                    {attempt.submitted
                                        ? "Submitted"
                                        : "In Progress"}
                                </span>

                                <Link
                                    to={`/student/results/${attempt.id}`}
                                    className="view-result-btn"
                                >
                                    View Result
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default StudentResults;