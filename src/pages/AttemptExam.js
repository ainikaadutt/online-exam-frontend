import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AttemptExam() {

    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

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

    const handleAnswerChange = (questionId, answer) => {

        setAnswers({
            ...answers,
            [questionId]: answer
        });

    };

    const submitExam = () => {

        console.log(answers);

        alert("Frontend completed. Backend integration coming next.");

        navigate("/student-dashboard");

    };

    return (

        <div style={{padding:"30px"}}>

            <h1>Attempt Exam</h1>

            {
                questions.map((question,index)=>(
                    <div
                        key={question.id}
                        style={{
                            border:"1px solid #ccc",
                            padding:"20px",
                            marginBottom:"20px",
                            borderRadius:"8px"
                        }}
                    >

                        <h3>
                            Question {index+1}
                        </h3>

                        <p>{question.questionText}</p>

                        {
                            ["A","B","C","D"].map(option=>(
                                <div key={option}>

                                    <label>

                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            checked={
                                                answers[question.id]===option
                                            }
                                            onChange={()=>
                                                handleAnswerChange(
                                                    question.id,
                                                    option
                                                )
                                            }
                                        />

                                        {question["option"+option]}

                                    </label>

                                </div>
                            ))
                        }

                    </div>
                ))
            }

            <button
                onClick={submitExam}
            >
                Submit Exam
            </button>

        </div>

    );

}

export default AttemptExam;