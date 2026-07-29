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

    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const question = response.data;

            setQuestionText(question.questionText);
            setOptionA(question.optionA);
            setOptionB(question.optionB);
            setOptionC(question.optionC);
            setOptionD(question.optionD);
            setCorrectAnswer(question.correctAnswer);
            setExamId(question.exam.id);

        } catch (error) {

            console.error(error);
            alert("Failed to load question");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/questions/${id}`,
                {
                    questionText,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    correctAnswer,
                    exam: {
                        id: examId
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Question updated successfully");

            navigate(`/exams/${examId}/questions`);

        } catch (error) {

            console.error(error);
            alert("Failed to update question");

        }

    };

    return (
        <div>

            <h1>Edit Question</h1>

            <form onSubmit={handleSubmit}>

                <textarea
                    placeholder="Question"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Option A"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Option B"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Option C"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Option D"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Correct Answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Update Question
                </button>

            </form>

        </div>
    );
}

export default EditQuestion;