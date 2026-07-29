import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ManageQuestions() {

    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

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

    const deleteQuestion = async (id) => {

        if (!window.confirm("Delete this question?")) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Question deleted");

            fetchQuestions();

        } catch (error) {

            console.error(error);

            alert("Failed to delete question");

        }

    };

    return (

        <div>

            <h1>Manage Questions</h1>

            <button
                onClick={() =>
                    navigate(`/exams/${examId}/add-question`)
                }
            >
                Add New Question
            </button>

            <br /><br />

            <table border="1" cellPadding="10">

                <thead>

                <tr>

                    <th>Question</th>

                    <th>Correct Answer</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {questions.map((question) => (

                    <tr key={question.id}>

                        <td>{question.questionText}</td>

                        <td>{question.correctAnswer}</td>

                        <td>

                            <button
                                onClick={() =>
                                    navigate(`/edit-question/${question.id}`)
                                }
                            >
                                Edit
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    deleteQuestion(question.id)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}

export default ManageQuestions;