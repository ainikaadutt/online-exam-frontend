import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageExams() {

    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/exams", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExams(response.data);

        } catch (error) {
            console.error(error);
            alert("Failed to load exams");
        }
    };

    const deleteExam = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this exam?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/exams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Exam deleted successfully");

            fetchExams();

        } catch (error) {
            console.error(error);
            alert("Failed to delete exam");
        }
    };

    return (
        <div>

            <h1>Manage Exams</h1>

            <button onClick={() => navigate("/create-exam")}>
                Create New Exam
            </button>

            <br /><br />

            <table border="1" cellPadding="10">

                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {exams.map((exam) => (

                    <tr key={exam.id}>

                        <td>{exam.title}</td>

                        <td>{exam.description}</td>

                        <td>{exam.duration} mins</td>

                        <td>{exam.startTime}</td>

                        <td>{exam.endTime}</td>

                        <td>

                            <button
                                onClick={() => navigate(`/teacher/exams/edit/${exam.id}`)}
                            >
                                Edit
                            </button>

                            {" "}

                            <button
                                onClick={() => deleteExam(exam.id)}
                            >
                                Delete
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    navigate(`/teacher/exams/${exam.id}/questions`)                                }
                            >
                                Questions
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageExams;