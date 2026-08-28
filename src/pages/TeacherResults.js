import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
    FaChartBar,
    FaArrowLeft,
    FaEye,
    FaCheckCircle
} from "react-icons/fa";

import "../styles/teacher-results.css";

function TeacherResults() {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/attempts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAttempts(response.data);

        } catch (error) {

            console.error(
                "Failed to load student results:",
                error
            );

            alert("Failed to load student results");

        } finally {

            setLoading(false);

        }
    };


    const viewResult = (attemptId) => {

        navigate(`/teacher/results/${attemptId}`);

    };


    if (loading) {

        return (
            <div className="teacher-results-page">

                <div className="teacher-results-loading">
                    Loading student results...
                </div>

            </div>
        );

    }


    return (

        <div className="teacher-results-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="teacher-results-header">

                <div>

                    <p className="teacher-results-eyebrow">
                        Performance Management
                    </p>

                    <h1>
                        Student Results
                    </h1>

                    <p>
                        View completed examinations and student scores.
                    </p>

                </div>

                <button
                    className="teacher-results-back"
                    onClick={() =>
                        navigate("/teacher/dashboard")
                    }
                >
                    <FaArrowLeft />
                    Back to Dashboard
                </button>

            </div>


            {/* =========================
                SUMMARY
            ========================= */}

            <div className="teacher-results-summary">

                <div className="teacher-results-summary-icon">
                    <FaChartBar />
                </div>

                <div>

                    {/*<span>*/}
                    {/*    Submitted Examinations*/}
                    {/*</span>*/}

                    <span> Submitted Attempts </span>

                    <strong>
                        {attempts.length}
                    </strong>

                </div>

            </div>


            {/* =========================
                RESULTS
            ========================= */}

            {attempts.length === 0 ? (

                <div className="teacher-results-empty">

                    <FaChartBar />

                    <h2>
                        No Results Available
                    </h2>

                    <p>
                        No students have submitted an examination yet.
                    </p>

                </div>

            ) : (

                <div className="teacher-results-list">

                    {attempts.map((attempt, index) => (

                        <div
                            className="teacher-result-card"
                            key={attempt.id}
                        >

                            {/* Student */}

                            <div className="teacher-result-student">

                                <div className="teacher-result-avatar">
                                    {attempt.student?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "S"}
                                </div>

                                <div>

                                    <h2>
                                        {attempt.student?.name ||
                                            "Unknown Student"}
                                    </h2>

                                    <p>
                                        {attempt.student?.email ||
                                            "No email available"}
                                    </p>

                                </div>

                            </div>


                            {/* Exam */}

                            <div className="teacher-result-info">

                                <span>
                                    Examination
                                </span>

                                <strong>
                                    {attempt.exam?.title ||
                                        "Unknown Exam"}
                                </strong>

                            </div>


                            {/* Score */}

                            <div className="teacher-result-score">

                                <span>
                                    Score
                                </span>

                                <strong>
                                    {attempt.score ?? 0}
                                </strong>

                                <small>
                                    Marks
                                </small>

                            </div>


                            {/* Status */}

                            <div className="teacher-result-status">

                                <span>
                                    Status
                                </span>

                                <div>
                                    <FaCheckCircle />
                                    Submitted
                                </div>

                            </div>


                            {/* Action */}

                            <button
                                className="teacher-result-view-btn"
                                onClick={() =>
                                    viewResult(attempt.id)
                                }
                            >

                                <FaEye />
                                View Result

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default TeacherResults;