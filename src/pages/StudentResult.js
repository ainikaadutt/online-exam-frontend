
import { useEffect, useState } from "react";
import {
    useParams,
    useNavigate,
    useLocation
} from "react-router-dom";

import {
    FaCheckCircle,
    FaTrophy,
    FaArrowLeft,
    FaTimesCircle
} from "react-icons/fa";

import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import "../styles/student-result.css";

function StudentResult() {

    const { attemptId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Detect whether the result is being viewed by a teacher or student
    const isTeacher = location.pathname.startsWith("/teacher/");
    const userRole = isTeacher ? "TEACHER" : "STUDENT";

    const resultsPath = isTeacher
        ? "/teacher/results"
        : "/student/results";

    const dashboardPath = isTeacher
        ? "/teacher/dashboard"
        : "/student/dashboard";

    const [attempt, setAttempt] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchResult = async () => {

            try {

                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                // Fetch examination attempt details
                const attemptResponse = await api.get(
                    `/attempts/${attemptId}`,
                    config
                );

                setAttempt(attemptResponse.data);

                // Fetch question-wise answers
                const responseData = await api.get(
                    `/attempts/${attemptId}/responses`,
                    config
                );

                setResponses(
                    Array.isArray(responseData.data)
                        ? responseData.data
                        : []
                );

            } catch (err) {

                console.error("Failed to load result:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load examination result."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchResult();

    }, [attemptId]);

    // Convert option letter into actual option text
    const getOptionText = (question, answer) => {

        if (!answer) {
            return "Not Answered";
        }

        const option = String(answer).toUpperCase().trim();

        return question?.["option" + option] || answer;
    };

    const correctCount = responses.filter(
        response => Number(response.marks) > 0
    ).length;

    const incorrectCount = responses.length - correctCount;

    // Loading screen
    if (loading) {

        return (
            <DashboardLayout
                title="Exam Result"
                role={userRole}
            >
                <div className="result-loading">
                    <h2>Loading examination result...</h2>
                </div>
            </DashboardLayout>
        );
    }

    // Error screen
    if (error || !attempt) {

        return (
            <DashboardLayout
                title="Exam Result"
                role={userRole}
            >
                <div className="result-loading">

                    <h2>
                        {error || "Result not found"}
                    </h2>

                    <button
                        className="result-back-button"
                        onClick={() => navigate(resultsPath)}
                    >
                        <FaArrowLeft />
                        Back to Results
                    </button>

                </div>
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout
            title="Exam Result"
            role={userRole}
        >

            <div className="result-page">

                {/* Result Header */}

                <div className="result-header">

                    <p>EXAMINATION COMPLETED</p>

                    <h1>
                        {isTeacher
                            ? "Student Examination Result"
                            : "Your Result"}
                    </h1>

                    <span>
                        {attempt.exam?.title || "Examination"}
                    </span>

                </div>


                {/* Score Card */}

                <div className="result-score-card">

                    <div className="result-trophy">
                        <FaTrophy />
                    </div>

                    <p className="score-label">
                        Score
                    </p>

                    <h2>
                        {attempt.score ?? 0}
                    </h2>

                    <p className="score-message">
                        Marks obtained
                    </p>

                    <div className="submitted-badge">

                        <FaCheckCircle />

                        {attempt.submitted
                            ? "Exam Submitted"
                            : "Not Submitted"}

                    </div>

                </div>


                {/* Result Details */}

                <div className="result-details">

                    <div className="result-detail">

                        <span>Attempt ID</span>

                        <strong>
                            #{attempt.id}
                        </strong>

                    </div>

                    {isTeacher && (

                        <div className="result-detail">

                            <span>Student Name</span>

                            <strong>
                                {attempt.student?.name || "Unknown Student"}
                            </strong>

                        </div>

                    )}

                    <div className="result-detail">

                        <span>Total Questions Answered</span>

                        <strong>
                            {responses.length}
                        </strong>

                    </div>

                    <div className="result-detail">

                        <span>Correct Answers</span>

                        <strong>
                            {correctCount}
                        </strong>

                    </div>

                    <div className="result-detail">

                        <span>Incorrect Answers</span>

                        <strong>
                            {incorrectCount}
                        </strong>

                    </div>

                </div>


                {/* Question-wise Answer Review */}

                <div className="answer-review">

                    <h2>Answer Review</h2>

                    {responses.length === 0 ? (

                        <p>
                            No answer details available.
                        </p>

                    ) : (

                        responses.map((response, index) => {

                            const question = response.question;

                            const isCorrect =
                                Number(response.marks) > 0;

                            return (

                                <div
                                    className={`answer-review-card ${
                                        isCorrect
                                            ? "correct"
                                            : "incorrect"
                                    }`}
                                    key={response.id}
                                >

                                    <div className="answer-review-heading">

                                        <h3>
                                            Question {index + 1}
                                        </h3>

                                        <span>

                                            {isCorrect ? (
                                                <>
                                                    <FaCheckCircle />
                                                    Correct
                                                </>
                                            ) : (
                                                <>
                                                    <FaTimesCircle />
                                                    Incorrect
                                                </>
                                            )}

                                        </span>

                                    </div>


                                    <p className="review-question">

                                        {question?.questionText ||
                                            "Question unavailable"}

                                    </p>


                                    <div className="review-answer">

                                        <span>Your Answer</span>

                                        <strong>

                                            {getOptionText(
                                                question,
                                                response.selectedAnswer
                                            )}

                                        </strong>

                                    </div>


                                    <div className="review-answer">

                                        <span>Correct Answer</span>

                                        <strong>

                                            {getOptionText(
                                                question,
                                                question?.correctAnswer
                                            )}

                                        </strong>

                                    </div>


                                    <div className="review-marks">

                                        Marks Obtained:{" "}
                                        {response.marks ?? 0}

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>


                {/* Navigation Buttons */}

                <div className="result-actions">

                    {!isTeacher && (

                        <button
                            className="result-primary-button"
                            onClick={() => navigate("/student/exams")}
                        >
                            Take Another Exam
                        </button>

                    )}

                    <button
                        className="result-secondary-button"
                        onClick={() => navigate(resultsPath)}
                    >
                        <FaArrowLeft />
                        Back to Results
                    </button>

                    <button
                        className="result-secondary-button"
                        onClick={() => navigate(dashboardPath)}
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default StudentResult;

