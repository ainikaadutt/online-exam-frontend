import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AvailableExams() {

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

    return (

        <div>

            <h1>Available Exams</h1>

            <table border="1" cellPadding="10">

                <thead>

                <tr>

                    <th>Title</th>

                    <th>Description</th>

                    <th>Duration</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {exams.map((exam) => (

                    <tr key={exam.id}>

                        <td>{exam.title}</td>

                        <td>{exam.description}</td>

                        <td>{exam.duration} mins</td>

                        <td>

                            <button
                                onClick={() =>
                                    navigate(`/exam/${exam.id}`)
                                }
                            >
                                Start Exam
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}

export default AvailableExams;