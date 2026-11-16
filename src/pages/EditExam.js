
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/create-exam.css";

function EditExam() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadExam();
    }, [id]);

    const loadExam = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(`/exams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const exam = response.data;

            setTitle(exam.title || "");
            setDescription(exam.description || "");
            setDuration(exam.duration || "");

            setStartTime(
                exam.startTime
                    ? exam.startTime.substring(0, 16)
                    : ""
            );

            setEndTime(
                exam.endTime
                    ? exam.endTime.substring(0, 16)
                    : ""
            );

        } catch (err) {
            console.error("Failed to load exam:", err);
            setError("Unable to load exam details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (new Date(endTime) <= new Date(startTime)) {
            setError("End time must be after start time.");
            return;
        }

        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/exams/${id}`,
                {
                    title,
                    description,
                    duration: Number(duration),
                    startTime,
                    endTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Exam updated successfully!");

            navigate("/teacher/exams");

        } catch (err) {
            console.error("Update failed:", err);

            setError(
                err.response?.data?.message ||
                "Failed to update exam. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="create-exam-page">
            <h2>Loading exam details...</h2>
        </div>;
    }

    if (error && !title) {
        return <div className="create-exam-page">
            <p>{error}</p>
            <button onClick={() => navigate("/teacher/exams")}>
                Back to Exams
            </button>
        </div>;
    }

    return (
        <div className="create-exam-page">

            <div className="create-exam-header">
                <div>
                    <p className="create-exam-eyebrow">
                        Examination Management
                    </p>

                    <h1>Edit Exam</h1>

                    <p>
                        Update the examination details.
                    </p>
                </div>

                <button
                    className="back-exams-button"
                    onClick={() => navigate("/teacher/exams")}
                >
                    Back to Exams
                </button>
            </div>

            <div className="create-exam-card">

                <div className="create-exam-card-header">
                    <div>
                        <h2>Examination Details</h2>
                        <p>
                            Modify the information below.
                        </p>
                    </div>
                </div>

                <form
                    className="create-exam-form"
                    onSubmit={handleSubmit}
                >

                    {error && (
                        <p role="alert" style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    <div className="form-group">
                        <label>Exam Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows="5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (minutes)</label>
                        <input
                            type="number"
                            min="1"
                            value={duration}
                            onChange={(e) =>
                                setDuration(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="datetime-grid">

                        <div className="form-group">
                            <label>Start Time</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) =>
                                    setStartTime(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>End Time</label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) =>
                                    setEndTime(e.target.value)
                                }
                                required
                            />
                        </div>

                    </div>

                    <div className="create-exam-actions">

                        <button
                            type="button"
                            className="cancel-exam-button"
                            onClick={() =>
                                navigate("/teacher/exams")
                            }
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-exam-button"
                            disabled={saving}
                        >
                            {saving ? "Updating..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditExam;
