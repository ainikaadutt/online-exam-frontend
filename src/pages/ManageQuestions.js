import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/manage-questions.css";

function ManageQuestions() {
    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, [examId]);

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
            console.error("Failed to load questions:", error);
            alert("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    const deleteQuestion = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Question deleted successfully");

            fetchQuestions();

        } catch (error) {
            console.error("Failed to delete question:", error);
            alert("Failed to delete question");
        }
    };

    if (loading) {
        return (
            <div className="manage-questions-page">
                <div className="questions-loading">
                    Loading questions...
                </div>
            </div>
        );
    }

    return (
        <div className="manage-questions-page">

            <div className="questions-header">

                <div>
                    <p className="page-label">
                        Question Management
                    </p>

                    <h1>Manage Questions</h1>

                    <p className="page-description">
                        Create, edit and manage questions for this examination.
                    </p>
                </div>

                <button
                    className="add-question-button"
                    onClick={() =>
                        navigate(`/exams/${examId}/add-question`)
                    }
                >
                    + Add New Question
                </button>

            </div>

            <div className="exam-info">
                <span>Exam ID</span>
                <strong>{examId}</strong>
            </div>

            <div className="questions-summary">
                <span>Total Questions</span>
                <strong>{questions.length}</strong>
            </div>

            {questions.length === 0 ? (

                <div className="no-questions">

                    <div className="no-questions-icon">
                        ?
                    </div>

                    <h2>No Questions Yet</h2>

                    <p>
                        This examination does not have any questions.
                        Add your first question to get started.
                    </p>

                    <button
                        className="add-question-button"
                        onClick={() =>
                            navigate(`/exams/${examId}/add-question`)
                        }
                    >
                        + Add Question
                    </button>

                </div>

            ) : (

                <div className="questions-list">

                    {questions.map((question, index) => (

                        <div
                            className="question-card"
                            key={question.id}
                        >

                            <div className="question-card-header">

                                <div className="question-number">
                                    Question {index + 1}
                                </div>

                                <div className="question-actions">

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            navigate(
                                                `/edit-question/${question.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            deleteQuestion(question.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                            <h2 className="question-text">
                                {question.questionText}
                            </h2>

                            <div className="options-grid">

                                <div className="option">
                                    <span className="option-label">A</span>
                                    <span>{question.optionA}</span>
                                </div>

                                <div className="option">
                                    <span className="option-label">B</span>
                                    <span>{question.optionB}</span>
                                </div>

                                <div className="option">
                                    <span className="option-label">C</span>
                                    <span>{question.optionC}</span>
                                </div>

                                <div className="option">
                                    <span className="option-label">D</span>
                                    <span>{question.optionD}</span>
                                </div>

                            </div>

                            <div className="correct-answer">

                                <span>
                                    Correct Answer
                                </span>

                                <strong>
                                    {question.correctAnswer}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            <div className="back-section">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/teacher/exams")
                    }
                >
                    ← Back to Manage Exams
                </button>

            </div>

        </div>
    );
}

export default ManageQuestions;