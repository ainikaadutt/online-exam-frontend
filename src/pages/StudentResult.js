
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

    const [attempt, setAttempt] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchResult();
    }, [attemptId]);

    const fetchResult = async () => {
        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const attemptResponse = await api.get(
                `/attempts/${attemptId}`,
                config
            );

            setAttempt(attemptResponse.data);

            const responseData = await api.get(
                `/attempts/${attemptId}/responses`,
                config
            );

            setResponses(responseData.data || []);

        } catch (err) {
            console.error("Failed to load result:", err);
            setError("Unable to load examination result.");
        } finally {
            setLoading(false);
        }
    };

    const getOptionText = (question, answer) => {
        if (!answer) return "Not Answered";

        const option = answer.toUpperCase();

        return question?.["option" + option] || answer;
    };

    const correctCount = responses.filter(
        response => Number(response.marks) > 0
    ).length;

    const incorrectCount = responses.length - correctCount;

    if (loading) {
        return (
            <DashboardLayout title="Result" role="STUDENT">
                <div className="result-loading">
                    <h2>Loading your result...</h2>
                </div>
            </DashboardLayout>
        );
    }

    if (error || !attempt) {
        return (
            <DashboardLayout title="Result" role="STUDENT">
                <div className="result-loading">
                    <h2>{error || "Result not found"}</h2>
                    <button
                        className="result-back-button"
                        onClick={() => navigate("/student/results")}
                    >
                        <FaArrowLeft /> Back to Results
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Exam Result" role="STUDENT">

            <div className="result-page">

                <div className="result-header">
                    <p>EXAMINATION COMPLETED</p>
                    <h1>Your Result</h1>
                    <span>
                        {attempt.exam?.title || "Examination"}
                    </span>
                </div>

                <div className="result-score-card">
                    <div className="result-trophy">
                        <FaTrophy />
                    </div>

                    <p className="score-label">Your Score</p>

                    <h2>{attempt.score ?? 0}</h2>

                    <p className="score-message">
                        Marks obtained
                    </p>

                    <div className="submitted-badge">
                        <FaCheckCircle />
                        {attempt.submitted ? "Exam Submitted" : "Not Submitted"}
                    </div>
                </div>

                <div className="result-details">

                    <div className="result-detail">
                        <span>Attempt ID</span>
                        <strong>#{attempt.id}</strong>
                    </div>

                    <div className="result-detail">
                        <span>Total Questions Answered</span>
                        <strong>{responses.length}</strong>
                    </div>

                    <div className="result-detail">
                        <span>Correct Answers</span>
                        <strong>{correctCount}</strong>
                    </div>

                    <div className="result-detail">
                        <span>Incorrect Answers</span>
                        <strong>{incorrectCount}</strong>
                    </div>

                </div>

                <div className="answer-review">

                    <h2>Answer Review</h2>

                    {responses.length === 0 ? (
                        <p>No answer details available.</p>
                    ) : (

                        responses.map((response, index) => {

                            const question = response.question;
                            const isCorrect = Number(response.marks) > 0;

                            return (
                                <div
                                    className={`answer-review-card ${
                                        isCorrect ? "correct" : "incorrect"
                                    }`}
                                    key={response.id}
                                >

                                    <div className="answer-review-heading">

                                        <h3>
                                            Question {index + 1}
                                        </h3>

                                        <span>
                                            {isCorrect ? (
                                                <><FaCheckCircle /> Correct</>
                                            ) : (
                                                <><FaTimesCircle /> Incorrect</>
                                            )}
                                        </span>

                                    </div>

                                    <p className="review-question">
                                        {question?.questionText || "Question unavailable"}
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
                                        Marks Obtained: {response.marks ?? 0}
                                    </div>

                                </div>
                            );
                        })
                    )}

                </div>

                <div className="result-actions">

                    <button
                        className="result-primary-button"
                        onClick={() => navigate("/student/exams")}
                    >
                        Take Another Exam
                    </button>

                    <button
                        className="result-secondary-button"
                        onClick={() => navigate("/student/results")}
                    >
                        Back to My Results
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default StudentResult;
