import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageQuestions from "./pages/ManageQuestions";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateExam from "./pages/CreateExam";
import AddQuestions from "./pages/AddQuestions";
import ManageExams from "./pages/ManageExams";
import EditExam from "./pages/EditExam";
import EditQuestion from "./pages/EditQuestion";
import ProtectedRoute from "./components/ProtectedRoute";
import AvailableExams from "./pages/AvailableExams";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Student Dashboard */}
                <Route
                    path="/student-dashboard"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Teacher Dashboard */}
                <Route
                    path="/teacher-dashboard"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Create Exam */}
                <Route
                    path="/create-exam"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <CreateExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/available-exams"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <AvailableExams />
                        </ProtectedRoute>
                    }
                />

                {/* Add Questions */}

                <Route
                    path="/exams/:examId/questions"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <ManageQuestions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/exams/:examId/add-question"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <AddQuestions />
                        </ProtectedRoute>
                    }
                />

                {/* Manage Exams */}
                <Route
                    path="/manage-exams"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <ManageExams />
                        </ProtectedRoute>
                    }
                />

                {/* Edit Exam */}
                <Route
                    path="/edit-exam/:id"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <EditExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-question/:id"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <EditQuestion />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;