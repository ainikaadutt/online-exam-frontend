import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardCard from "../components/cards/DashboardCard";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {

    const navigate = useNavigate();

    return (

        <DashboardLayout
            title="Teacher Dashboard"
            role="TEACHER"
        >

            <h1 style={{ marginBottom: "10px" }}>
                Welcome, Teacher 👋
            </h1>

            <p style={{ color: "#6B7280", marginBottom: "30px" }}>
                Manage your exams, questions and monitor student performance.
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "40px"
                }}
            >

                <DashboardCard
                    title="Total Exams"
                    value="12"
                />

                <DashboardCard
                    title="Questions"
                    value="120"
                />

                <DashboardCard
                    title="Students"
                    value="85"
                />

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px"
                }}
            >

                <Button
                    text="Create Exam"
                    onClick={() =>
                        navigate("/teacher/exams/create")
                    }
                />

                <Button
                    text="Manage Exams"
                    onClick={() =>
                        navigate("/teacher/exams")
                    }
                />

            </div>

        </DashboardLayout>

    );

}

export default TeacherDashboard;