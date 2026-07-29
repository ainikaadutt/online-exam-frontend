import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditExam() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        loadExam();
    }, []);

    const loadExam = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/exams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const exam = response.data;

            setTitle(exam.title);
            setDescription(exam.description);
            setDuration(exam.duration);

            setStartTime(exam.startTime ? exam.startTime.substring(0, 16) : "");
            setEndTime(exam.endTime ? exam.endTime.substring(0, 16) : "");

        } catch (error) {

            console.error(error);

            alert("Failed to load exam");
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(`/exams/${id}`,
                {
                    title,
                    description,
                    duration,
                    startTime,
                    endTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            alert("Exam updated successfully");

            navigate("/manage-exams");

        } catch (error) {

            console.error(error);

            alert("Failed to update exam");

        }

    };

    return (

        <div>

            <h1>Edit Exam</h1>

            <form onSubmit={handleSubmit}>

                <input
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Title"
                />

                <br /><br />

                <textarea
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    value={duration}
                    onChange={(e)=>setDuration(e.target.value)}
                />

                <br /><br />

                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e)=>setStartTime(e.target.value)}
                />

                <br /><br />

                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e)=>setEndTime(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Update Exam
                </button>

            </form>

        </div>

    );

}

export default EditExam;