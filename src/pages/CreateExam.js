import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function CreateExam() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/exams",
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

            console.log("Exam created:", response.data);
            alert("Exam created successfully");

            navigate(`/exams/${response.data.id}/questions`);

        } catch (error) {
            console.error("Failed to create exam:", error);
            alert("Failed to create exam");
        }
    };

    return (
        <div>
            <h1>Create Exam</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Exam Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <br /><br />

                <textarea
                    placeholder="Exam Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Duration in minutes"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />

                <br /><br />

                <label>Start Time: </label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />

                <br /><br />

                <label>End Time: </label>
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Create Exam
                </button>

            </form>
        </div>
    );
}

export default CreateExam;