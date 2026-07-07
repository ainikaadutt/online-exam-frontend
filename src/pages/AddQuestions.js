import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AddQuestions() {
    const { examId } = useParams();

    const [questionText, setQuestionText] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/questions",
                {
                    questionText,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    correctAnswer,
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

            alert("Question added successfully");

            setQuestionText("");
            setOptionA("");
            setOptionB("");
            setOptionC("");
            setOptionD("");
            setCorrectAnswer("");

        } catch (error) {
            console.error("Failed to add question:", error);
            alert("Failed to add question");
        }
    };

    return (
        <div>
            <h1>Add Questions</h1>

            <p>Exam ID: {examId}</p>

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
                    Add Question
                </button>
            </form>
        </div>
    );
}

export default AddQuestions;