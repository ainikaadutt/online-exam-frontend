import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaCheckCircle,
    FaClipboardList,
    FaPaperPlane
} from "react-icons/fa";

import api from "../services/api";

import "../styles/attempt-exam.css";

function AttemptExam() {

    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/questions/exam/${examId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuestions(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load questions");

        }

    };


    const handleAnswerChange = (questionId, answer) => {

        setAnswers({
            ...answers,
            [questionId]: answer
        });

    };


    const submitExam = async () => {

        if (submitting) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to submit the exam?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setSubmitting(true);

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/attempts/submit",
                {
                    examId: Number(examId),
                    answers: answers
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "Exam submitted successfully:",
                response.data
            );

            navigate(
                `/student/results/${response.data.id}`
            );

        } catch (error) {

            console.error(
                "Exam submission failed:",
                error
            );

            if (error.response) {

                console.error(
                    "Backend response:",
                    error.response.data
                );

                console.error(
                    "Status:",
                    error.response.status
                );
            }

            alert(
                "Failed to submit exam. Please try again."
            );

            setSubmitting(false);
        }

    };


    const answeredCount =
        Object.keys(answers).length;

    const progress =
        questions.length > 0
            ? (answeredCount / questions.length) * 100
            : 0;


    return (

        <div className="exam-page">

            {/* =========================
                EXAM HEADER
            ========================= */}

            <header className="exam-header">

                <div className="exam-brand">

                    <div className="exam-brand-icon">
                        EV
                    </div>

                    <div>

                        <h2>
                            ExamVerse
                        </h2>

                        <p>
                            Online Examination
                        </p>

                    </div>

                </div>


                <div className="exam-header-info">

                    <span>
                        Question Progress
                    </span>

                    <strong>
                        {answeredCount} / {questions.length}
                    </strong>

                </div>

            </header>


            {/* =========================
                EXAM CONTENT
            ========================= */}

            <main className="exam-container">

                <div className="exam-title-section">

                    <div>

                        <p className="exam-eyebrow">
                            Examination
                        </p>

                        <h1>
                            Attempt Exam
                        </h1>

                        <p>
                            Answer each question carefully before
                            submitting your examination.
                        </p>

                    </div>


                    <div className="question-count">

                        <FaClipboardList />

                        <span>
                            {questions.length} Questions
                        </span>

                    </div>

                </div>


                {/* =========================
                    PROGRESS
                ========================= */}

                <div className="exam-progress">

                    <div className="progress-info">

                        <span>
                            Progress
                        </span>

                        <strong>
                            {answeredCount} of {questions.length} answered
                        </strong>

                    </div>


                    <div className="progress-track">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                </div>


                {/* =========================
                    QUESTIONS
                ========================= */}

                <div className="questions-list">

                    {questions.length === 0 ? (

                        <div className="exam-loading">

                            <div className="loading-icon">
                                <FaClipboardList />
                            </div>

                            <h2>
                                Loading questions...
                            </h2>

                            <p>
                                Please wait while we prepare
                                your examination.
                            </p>

                        </div>

                    ) : (

                        questions.map(
                            (question, index) => (

                                <div
                                    className="question-card"
                                    key={question.id}
                                >

                                    <div className="question-header">

                                        <span className="question-number">
                                            Question {index + 1}
                                        </span>


                                        {answers[question.id] && (

                                            <span className="answered-badge">

                                                <FaCheckCircle />

                                                Answered

                                            </span>

                                        )}

                                    </div>


                                    <h2 className="question-text">
                                        {question.questionText}
                                    </h2>


                                    <div className="options-list">

                                        {["A", "B", "C", "D"].map(
                                            (option) => (

                                                <label
                                                    className={`exam-option ${
                                                        answers[question.id] === option
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    key={option}
                                                >

                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={option}
                                                        checked={
                                                            answers[question.id] ===
                                                            option
                                                        }
                                                        onChange={() =>
                                                            handleAnswerChange(
                                                                question.id,
                                                                option
                                                            )
                                                        }
                                                    />


                                                    <span className="option-letter">
                                                        {option}
                                                    </span>


                                                    <span className="option-text">
                                                        {
                                                            question[
                                                            "option" + option
                                                                ]
                                                        }
                                                    </span>

                                                </label>

                                            )
                                        )}

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>


                {/* =========================
                    SUBMIT
                ========================= */}

                {questions.length > 0 && (

                    <div className="exam-submit-section">

                        <div>

                            <h3>
                                Ready to submit?
                            </h3>

                            <p>
                                Make sure you have reviewed your
                                answers before submitting.
                            </p>

                        </div>


                        <button
                            className="submit-exam-button"
                            onClick={submitExam}
                            disabled={submitting}
                        >

                            <FaPaperPlane />

                            {submitting
                                ? "Submitting..."
                                : "Submit Exam"
                            }

                        </button>

                    </div>

                )}

            </main>

        </div>

    );
}

export default AttemptExam;