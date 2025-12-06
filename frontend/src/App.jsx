import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/api";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
      setError("");
    } catch (err) {
      setError(
        "Không thể tải danh sách học sinh. Vui lòng kiểm tra kết nối server."
      );
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student
  const handleAddStudent = async (studentData) => {
    const newStudent = await createStudent(studentData);
    setStudents([...students, newStudent]);
  };

  // Update student
  const handleUpdateStudent = async (id, studentData) => {
    const updatedStudent = await updateStudent(id, studentData);
    setStudents(students.map((s) => (s._id === id ? updatedStudent : s)));
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    setStudents(students.filter((s) => s._id !== id));
  };

  // Toggle sort order
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>🎓 Hệ Thống Quản Lý Học Sinh</h1>
            <nav>
              <Link to="/" className="nav-link">
                Danh Sách
              </Link>
              <Link to="/add" className="nav-link">
                Thêm Học Sinh
              </Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-text">{error}</p>
                <button onClick={fetchStudents} className="btn-retry">
                  Thử lại
                </button>
              </div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <StudentList
                      students={students}
                      onDeleteStudent={handleDeleteStudent}
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      sortOrder={sortOrder}
                      onSortToggle={handleSortToggle}
                    />
                  }
                />
                <Route
                  path="/add"
                  element={<AddStudent onStudentAdded={handleAddStudent} />}
                />
                <Route
                  path="/edit/:id"
                  element={
                    <EditStudent
                      onStudentUpdated={handleUpdateStudent}
                      students={students}
                    />
                  }
                />
              </Routes>
            )}
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>Student Management System - HUST Web Programming Exercise</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
