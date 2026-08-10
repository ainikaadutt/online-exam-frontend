import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttemptExam from "./pages/AttemptExam";
import ManageQuestions from "./pages/ManageQuestions";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateExam from "./pages/CreateExam";
import AddQuestions from "./pages/AddQuestions";
import ManageExams from "./pages/ManageExams";
import EditExam from "./pages/EditExam";
import EditQuestion from "./pages/EditQuestion";
import AvailableExams from "./pages/AvailableExams";
import StudentResult from "./pages/StudentResult";
import StudentResults from "./pages/StudentResults";
import ProtectedRoute from "./components/common/ProtectedRoute";
import TeacherResults from "./pages/TeacherResults";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    ROOT
                ========================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    STUDENT DASHBOARD
                ========================= */}
                <Route
                    path="/teacher/results"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <TeacherResults />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRole="STUDENT"
                        >
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    TEACHER DASHBOARD
                ========================= */}

                <Route
                    path="/teacher/dashboard"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <TeacherDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/teacher/results"
                    element={
                        <ProtectedRoute allowedRole="TEACHER">
                            <TeacherResults />
                        </ProtectedRoute>
                    }
                />

                {/* =========================
                    AVAILABLE EXAMS
                ========================= */}

                <Route
                    path="/student/exams"
                    element={
                        <ProtectedRoute
                            allowedRole="STUDENT"
                        >
                            <AvailableExams />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    ATTEMPT EXAM
                ========================= */}

                <Route
                    path="/student/exams/:examId"
                    element={
                        <ProtectedRoute
                            allowedRole="STUDENT"
                        >
                            <AttemptExam />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/results"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentResults />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/results/:attemptId"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentResult />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    STUDENT RESULT
                ========================= */}

                <Route
                    path="/student/results/:attemptId"
                    element={
                        <ProtectedRoute
                            allowedRole="STUDENT"
                        >
                            <StudentResult />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    TEACHER - CREATE EXAM
                ========================= */}

                <Route
                    path="/teacher/exams/create"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <CreateExam />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    TEACHER - MANAGE EXAMS
                ========================= */}

                <Route
                    path="/teacher/exams"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <ManageExams />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    TEACHER - QUESTIONS
                ========================= */}

                <Route
                    path="/teacher/exams/:examId/questions"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <ManageQuestions />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/exams/:examId/add-question"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <AddQuestions />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    TEACHER - EDIT EXAM
                ========================= */}

                <Route
                    path="/teacher/exams/edit/:id"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <EditExam />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    TEACHER - EDIT QUESTION
                ========================= */}

                <Route
                    path="/edit-question/:id"
                    element={
                        <ProtectedRoute
                            allowedRole="TEACHER"
                        >
                            <EditQuestion />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;