import AddQuestions from "./pages/AddQuestions";
import CreateExam from "./pages/CreateExam";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/student-dashboard"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/teacher-dashboard"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-exam"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <CreateExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/exams/:examId/questions"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <AddQuestions />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;