import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [examId, setExamId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    const fetchQuestion = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(`/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const question = response.data;

            setQuestionText(question.questionText || "");
            setOptionA(question.optionA || "");
            setOptionB(question.optionB || "");
            setOptionC(question.optionC || "");
            setOptionD(question.optionD || "");
            setCorrectAnswer(
                question.correctAnswer
                    ? question.correctAnswer.toUpperCase()
                    : ""
            );

            if (question.exam) {
                setExamId(question.exam.id);
            }

        } catch (error) {
            console.error("Failed to load question:", error);
            alert("Failed to load question");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/questions/${id}`,
                {
                    questionText: questionText.trim(),
                    optionA: optionA.trim(),
                    optionB: optionB.trim(),
                    optionC: optionC.trim(),
                    optionD: optionD.trim(),
                    correctAnswer: correctAnswer,
                    exam: {
                        id: Number(examId)
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Question updated successfully");

            if (examId) {
                navigate(`/teacher/exams/${examId}/questions`);
            } else {
                navigate(-1);
            }

        } catch (error) {
            console.error("Failed to update question:", error);

            if (error.response) {
                console.error(
                    "Backend response:",
                    error.response.data
                );
            }

            alert("Failed to update question");
        }
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                Loading question...
            </div>
        );
    }

    return (
        <div style={styles.page}>

            <div style={styles.container}>

                <div style={styles.header}>

                    <p style={styles.label}>
                        Question Management
                    </p>

                    <h1 style={styles.title}>
                        Edit Question
                    </h1>

                    <p style={styles.subtitle}>
                        Update the question and its correct answer.
                    </p>

                </div>

                <div style={styles.card}>

                    {examId && (
                        <div style={styles.examInfo}>
                            Exam ID <strong>{examId}</strong>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* Question */}

                        <div style={styles.formGroup}>

                            <label style={styles.formLabel}>
                                Question
                            </label>

                            <textarea
                                value={questionText}
                                onChange={(e) =>
                                    setQuestionText(e.target.value)
                                }
                                required
                                rows="4"
                                style={styles.textarea}
                            />

                        </div>

                        {/* Option A */}

                        <div style={styles.formGroup}>

                            <label style={styles.formLabel}>
                                Option A
                            </label>

                            <input
                                type="text"
                                value={optionA}
                                onChange={(e) =>
                                    setOptionA(e.target.value)
                                }
                                required
                                style={styles.input}
                            />

                        </div>

                        {/* Option B */}

                        <div style={styles.formGroup}>

                            <label style={styles.formLabel}>
                                Option B
                            </label>

                            <input
                                type="text"
                                value={optionB}
                                onChange={(e) =>
                                    setOptionB(e.target.value)
                                }
                                required
                                style={styles.input}
                            />

                        </div>

                        {/* Option C */}

                        <div style={styles.formGroup}>

                            <label style={styles.formLabel}>
                                Option C
                            </label>

                            <input
                                type="text"
                                value={optionC}
                                onChange={(e) =>
                                    setOptionC(e.target.value)
                                }
                                required
                                style={styles.input}
                            />

                        </div>

                        {/* Option D */}

                        <div style={styles.formGroup}>

                            <label style={styles.formLabel}>
                                Option D
                            </label>

                            <input
                                type="text"
                                value={optionD}
                                onChange={(e) =>
                                    setOptionD(e.target.value)
                                }
                                required
                                style={styles.input}
                            />

                        </div>

                        {/* Correct Answer */}

                        <div style={styles.formGroup}>

                            <label style={styles.formLabel}>
                                Correct Answer
                            </label>

                            <select
                                value={correctAnswer}
                                onChange={(e) =>
                                    setCorrectAnswer(e.target.value)
                                }
                                required
                                style={styles.input}
                            >
                                <option value="">
                                    Select correct option
                                </option>

                                <option value="A">
                                    A
                                </option>

                                <option value="B">
                                    B
                                </option>

                                <option value="C">
                                    C
                                </option>

                                <option value="D">
                                    D
                                </option>

                            </select>

                        </div>

                        {/* Buttons */}

                        <div style={styles.buttonContainer}>

                            <button
                                type="button"
                                onClick={() =>
                                    examId
                                        ? navigate(
                                            `/teacher/exams/${examId}/questions`
                                        )
                                        : navigate(-1)
                                }
                                style={styles.cancelButton}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                style={styles.submitButton}
                            >
                                Update Question
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        padding: "40px",
        background: "#f8faf9",
        boxSizing: "border-box"
    },

    container: {
        maxWidth: "900px",
        margin: "0 auto"
    },

    header: {
        marginBottom: "30px"
    },

    label: {
        color: "#2f855a",
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "8px"
    },

    title: {
        margin: "0",
        color: "#174c55",
        fontSize: "36px",
        fontWeight: "700"
    },

    subtitle: {
        color: "#718096",
        fontSize: "16px",
        marginTop: "10px"
    },

    card: {
        background: "#ffffff",
        border: "1px solid #e2e8e4",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
    },

    examInfo: {
        marginBottom: "28px",
        padding: "12px 16px",
        background: "#edf7f1",
        borderRadius: "8px",
        color: "#2f855a",
        fontSize: "14px"
    },

    formGroup: {
        marginBottom: "22px"
    },

    formLabel: {
        display: "block",
        marginBottom: "8px",
        color: "#174c55",
        fontSize: "14px",
        fontWeight: "600"
    },

    input: {
        width: "100%",
        padding: "12px 14px",
        border: "1px solid #d8e1dc",
        borderRadius: "8px",
        fontSize: "14px",
        boxSizing: "border-box",
        outline: "none"
    },

    textarea: {
        width: "100%",
        padding: "12px 14px",
        border: "1px solid #d8e1dc",
        borderRadius: "8px",
        fontSize: "14px",
        boxSizing: "border-box",
        resize: "vertical",
        fontFamily: "inherit",
        outline: "none"
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        marginTop: "30px"
    },

    cancelButton: {
        padding: "12px 22px",
        border: "1px solid #d8e1dc",
        borderRadius: "8px",
        background: "#ffffff",
        color: "#174c55",
        fontWeight: "600",
        cursor: "pointer"
    },

    submitButton: {
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        background: "#2f855a",
        color: "#ffffff",
        fontWeight: "600",
        cursor: "pointer"
    },

    loading: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#174c55",
        fontSize: "18px"
    }
};

export default EditQuestion;