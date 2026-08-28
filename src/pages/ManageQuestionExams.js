import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageQuestionExams() {

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/exams",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExams(response.data);

        } catch (error) {

            console.error(
                "Failed to load exams:",
                error
            );

            alert("Failed to load exams");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <div style={styles.page}>

                <h1>Manage Questions</h1>

                <p>
                    Loading examinations...
                </p>

            </div>
        );
    }

    return (

        <div style={styles.page}>

            <div style={styles.header}>

                <div>

                    <p style={styles.eyebrow}>
                        Question Management
                    </p>

                    <h1 style={styles.title}>
                        Manage Questions
                    </h1>

                    <p style={styles.description}>
                        Select an examination to add, edit or
                        delete its questions.
                    </p>

                </div>

            </div>


            {exams.length === 0 ? (

                <div style={styles.empty}>

                    <h2>
                        No Exams Available
                    </h2>

                    <p>
                        Create an examination before managing
                        its questions.
                    </p>

                    <button
                        style={styles.primaryButton}
                        onClick={() =>
                            navigate("/teacher/exams/create")
                        }
                    >
                        Create Exam
                    </button>

                </div>

            ) : (

                <div style={styles.grid}>

                    {exams.map((exam) => (

                        <div
                            key={exam.id}
                            style={styles.card}
                        >

                            <div style={styles.cardIcon}>
                                📋
                            </div>

                            <h2 style={styles.examTitle}>
                                {exam.title}
                            </h2>

                            <p style={styles.examDescription}>
                                {exam.description ||
                                    "No description provided"}
                            </p>

                            <div style={styles.examInfo}>

                                <span>
                                    Duration
                                </span>

                                <strong>
                                    {exam.duration} mins
                                </strong>

                            </div>

                            <button
                                style={styles.questionButton}
                                onClick={() =>
                                    navigate(
                                        `/teacher/exams/${exam.id}/questions`
                                    )
                                }
                            >
                                Manage Questions →
                            </button>

                        </div>

                    ))}

                </div>

            )}


            <button
                style={styles.backButton}
                onClick={() =>
                    navigate("/teacher/dashboard")
                }
            >
                ← Back to Dashboard
            </button>

        </div>
    );
}


const styles = {

    page: {
        minHeight: "100vh",
        padding: "40px",
        background: "#f8fafc",
        boxSizing: "border-box"
    },

    header: {
        marginBottom: "35px"
    },

    eyebrow: {
        margin: 0,
        fontSize: "13px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "1px"
    },

    title: {
        margin: "8px 0",
        fontSize: "32px"
    },

    description: {
        margin: 0,
        color: "#64748b"
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px"
    },

    card: {
        background: "#ffffff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow:
            "0 4px 15px rgba(0, 0, 0, 0.08)"
    },

    cardIcon: {
        fontSize: "30px",
        marginBottom: "15px"
    },

    examTitle: {
        margin: "0 0 10px",
        fontSize: "21px"
    },

    examDescription: {
        color: "#64748b",
        minHeight: "45px"
    },

    examInfo: {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 0",
        padding: "12px 0",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0"
    },

    questionButton: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        background: "#2563eb",
        color: "white"
    },

    primaryButton: {
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        background: "#2563eb",
        color: "white"
    },

    empty: {
        background: "#ffffff",
        padding: "50px",
        textAlign: "center",
        borderRadius: "12px"
    },

    backButton: {
        marginTop: "30px",
        padding: "10px 18px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        background: "white",
        cursor: "pointer"
    }
};

export default ManageQuestionExams;