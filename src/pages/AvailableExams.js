import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaClock, FaArrowRight } from "react-icons/fa";

import api from "../services/api";

import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/common/PageHeader";

import "../styles/available-exams.css";

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

        <DashboardLayout
            title="Available Exams"
            role="STUDENT"
        >

            <PageHeader
                greeting="Ready to learn? 📚"
                title="Available Exams"
                description="Choose an examination and test your knowledge."
            />

            {exams.length === 0 ? (

                <div className="exam-empty-state">

                    <div className="empty-icon">
                        <FaBookOpen />
                    </div>

                    <h2>
                        No exams available
                    </h2>

                    <p>
                        There are currently no examinations available.
                        Please check again later.
                    </p>

                </div>

            ) : (

                <div className="available-exams-list">

                    {exams.map((exam) => (

                        <div
                            className="available-exam-card"
                            key={exam.id}
                        >

                            <div className="exam-card-main">

                                <div className="exam-card-icon">
                                    <FaBookOpen />
                                </div>

                                <div className="exam-card-content">

                                    <div className="exam-card-title-row">

                                        <h2>
                                            {exam.title}
                                        </h2>

                                        <span className="exam-status">
                                            Available
                                        </span>

                                    </div>

                                    <p className="exam-description">
                                        {exam.description ||
                                            "Test your knowledge with this examination."}
                                    </p>

                                    <div className="exam-meta">

                                        <span>
                                            <FaClock />
                                            {exam.duration} mins
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <button
                                className="start-exam-button"
                                onClick={() =>
                                    navigate(
                                        `/student/exams/${exam.id}`
                                    )
                                }
                            >

                                Start Exam

                                <FaArrowRight />

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </DashboardLayout>

    );
}

export default AvailableExams;