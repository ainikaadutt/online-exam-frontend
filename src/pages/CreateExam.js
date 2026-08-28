import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    FaBook,
    FaClock,
    FaCalendarAlt,
    FaArrowLeft,
    FaPlus
} from "react-icons/fa";

import api from "../services/api";

import "../styles/create-exam.css";


function CreateExam() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        // =========================
        // BASIC VALIDATION
        // =========================

        if (!title.trim()) {
            alert("Please enter an exam title.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter an exam description.");
            return;
        }

        if (!duration || Number(duration) <= 0) {
            alert("Please enter a valid duration.");
            return;
        }

        if (!startTime || !endTime) {
            alert("Please select start and end time.");
            return;
        }

        if (new Date(endTime) <= new Date(startTime)) {
            alert("End time must be after start time.");
            return;
        }


        try {

            setLoading(true);

            const token = localStorage.getItem("token");


            const response = await api.post(
                "/exams",
                {
                    title: title.trim(),
                    description: description.trim(),
                    duration: Number(duration),
                    startTime: startTime,
                    endTime: endTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            console.log(
                "Exam created successfully:",
                response.data
            );


            alert("Exam created successfully!");


            // After creating the exam,
            // directly open question management.

            navigate(
                `/exams/${response.data.id}/questions`
            );


        } catch (error) {

            console.error(
                "Failed to create exam:",
                error
            );


            if (error.response) {

                console.error(
                    "Backend response:",
                    error.response.data
                );

                console.error(
                    "Status:",
                    error.response.status
                );

            }


            alert(
                "Failed to create exam. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="create-exam-page">


            {/* =========================
                HEADER
            ========================= */}

            <div className="create-exam-header">

                <div>

                    <p className="create-exam-eyebrow">
                        Examination Management
                    </p>

                    <h1>
                        Create Exam
                    </h1>

                    <p>
                        Create a new examination and configure
                        its details.
                    </p>

                </div>


                <button
                    className="back-exams-button"
                    onClick={() =>
                        navigate("/teacher/exams")
                    }
                >

                    <FaArrowLeft />

                    Back to Exams

                </button>

            </div>


            {/* =========================
                FORM CARD
            ========================= */}

            <div className="create-exam-card">


                <div className="create-exam-card-header">

                    <div className="create-exam-icon">

                        <FaBook />

                    </div>


                    <div>

                        <h2>
                            Examination Details
                        </h2>

                        <p>
                            Enter the information for your new
                            examination.
                        </p>

                    </div>

                </div>


                <form
                    className="create-exam-form"
                    onSubmit={handleSubmit}
                >


                    {/* =========================
                        TITLE
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="title">
                            Exam Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. Java Programming Basics"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* =========================
                        DESCRIPTION
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="description">
                            Exam Description
                        </label>

                        <textarea
                            id="description"
                            placeholder="Describe the examination..."
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows="5"
                            required
                        />

                    </div>


                    {/* =========================
                        DURATION
                    ========================= */}

                    <div className="form-group">

                        <label htmlFor="duration">
                            Duration
                        </label>

                        <div className="input-with-icon">

                            <FaClock />

                            <input
                                id="duration"
                                type="number"
                                min="1"
                                placeholder="Duration in minutes"
                                value={duration}
                                onChange={(e) =>
                                    setDuration(e.target.value)
                                }
                                required
                            />

                            <span>
                                minutes
                            </span>

                        </div>

                    </div>


                    {/* =========================
                        DATE / TIME
                    ========================= */}

                    <div className="datetime-grid">


                        {/* START */}

                        <div className="form-group">

                            <label htmlFor="startTime">

                                <FaCalendarAlt />

                                Start Time

                            </label>

                            <input
                                id="startTime"
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) =>
                                    setStartTime(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* END */}

                        <div className="form-group">

                            <label htmlFor="endTime">

                                <FaCalendarAlt />

                                End Time

                            </label>

                            <input
                                id="endTime"
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) =>
                                    setEndTime(e.target.value)
                                }
                                required
                            />

                        </div>


                    </div>


                    {/* =========================
                        ACTIONS
                    ========================= */}

                    <div className="create-exam-actions">


                        <button
                            type="button"
                            className="cancel-exam-button"
                            onClick={() =>
                                navigate("/teacher/exams")
                            }
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="create-exam-button"
                            disabled={loading}
                        >

                            <FaPlus />

                            {loading
                                ? "Creating..."
                                : "Create Exam"
                            }

                        </button>


                    </div>


                </form>

            </div>


        </div>

    );

}


export default CreateExam;