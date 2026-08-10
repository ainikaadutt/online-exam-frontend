import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaCheckCircle,
    FaTrophy,
    FaArrowLeft
} from "react-icons/fa";

import api from "../services/api";

import DashboardLayout from "../components/layout/DashboardLayout";

import "../styles/student-result.css";

function StudentResult() {

    const { attemptId } = useParams();
    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResult();
    }, [attemptId]);

    const fetchResult = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/attempts/${attemptId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAttempt(response.data);

        } catch (error) {

            console.error(
                "Failed to load result:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (

            <DashboardLayout
                title="Result"
                role="STUDENT"
            >

                <div className="result-loading">

                    <div className="result-icon">
                        <FaTrophy />
                    </div>

                    <h2>
                        Loading your result...
                    </h2>

                    <p>
                        Please wait while we retrieve your examination result.
                    </p>

                </div>

            </DashboardLayout>

        );
    }


    if (!attempt) {

        return (

            <DashboardLayout
                title="Result"
                role="STUDENT"
            >

                <div className="result-loading">

                    <div className="result-icon">
                        <FaCheckCircle />
                    </div>

                    <h2>
                        Result not found
                    </h2>

                    <p>
                        We could not find the requested examination result.
                    </p>

                    <button
                        className="result-back-button"
                        onClick={() =>
                            navigate("/student/exams")
                        }
                    >
                        <FaArrowLeft />
                        Back to Exams
                    </button>

                </div>

            </DashboardLayout>

        );
    }


    return (

        <DashboardLayout
            title="Exam Result"
            role="STUDENT"
        >

            <div className="result-page">

                {/* Header */}

                <div className="result-header">

                    <p>
                        Examination Completed
                    </p>

                    <h1>
                        Your Result
                    </h1>

                    <span>
                        Your exam has been submitted successfully.
                    </span>

                </div>


                {/* Score Card */}

                <div className="result-score-card">

                    <div className="result-trophy">

                        <FaTrophy />

                    </div>

                    <p className="score-label">
                        Your Score
                    </p>

                    <h2>
                        {attempt.score}
                    </h2>

                    <p className="score-message">
                        Marks obtained
                    </p>

                    <div className="submitted-badge">

                        <FaCheckCircle />

                        Exam Submitted

                    </div>

                </div>


                {/* Details */}

                <div className="result-details">

                    <div className="result-detail">

                        <span>
                            Attempt ID
                        </span>

                        <strong>
                            #{attempt.id}
                        </strong>

                    </div>


                    <div className="result-detail">

                        <span>
                            Status
                        </span>

                        <strong>
                            {attempt.submitted
                                ? "Submitted"
                                : "Not Submitted"}
                        </strong>

                    </div>

                </div>


                {/* Actions */}

                <div className="result-actions">

                    <button
                        className="result-primary-button"
                        onClick={() =>
                            navigate("/student/exams")
                        }
                    >
                        Take Another Exam
                    </button>

                    <button
                        className="result-secondary-button"
                        onClick={() =>
                            navigate("/student/dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default StudentResult;