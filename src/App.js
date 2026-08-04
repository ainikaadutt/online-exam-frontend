import { Navigate } from "react-router-dom";
import AttemptExam from "./pages/AttemptExam";
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
import ProtectedRoute from "./components/common/ProtectedRoute";
import AvailableExams from "./pages/AvailableExams";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Student Dashboard */}
                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Teacher Dashboard */}
                <Route
                    path="/teacher/dashboard"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/exams/:examId"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <AttemptExam />
                        </ProtectedRoute>
                    }
                />

                {/* Create Exam */}
                <Route
                    path="/teacher/exams/create"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <CreateExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/exams"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <AvailableExams />
                        </ProtectedRoute>
                    }
                />

                {/* Add Questions */}

                <Route
                    path="/teacher/exams/:examId/questions"                    element={
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
                    path="/teacher/exams"                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <ManageExams />
                        </ProtectedRoute>
                    }
                />

                {/* Edit Exam */}
                <Route
                    path="/teacher/exams/edit/:id"                    element={
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