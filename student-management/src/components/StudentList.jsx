import { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentList.css";

const StudentList = ({
  students,
  onDeleteStudent,
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortToggle,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDeleteStudent(studentToDelete._id);
      setShowModal(false);
      setStudentToDelete(null);
    } catch (err) {
      alert("Có lỗi xảy ra khi xóa học sinh");
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setStudentToDelete(null);
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort students based on sort order
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="student-list">
      <div className="list-header">
        <h2>Danh Sách Học Sinh</h2>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={onSortToggle} className="btn-sort">
            Sắp xếp: {sortOrder === "asc" ? "A-Z ↓" : "Z-A ↑"}
          </button>
        </div>
      </div>

      {sortedStudents.length === 0 ? (
        <div className="no-students">
          {searchTerm ? "Không tìm thấy học sinh nào" : "Chưa có học sinh nào"}
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Tuổi</th>
                <th>Chuyên Ngành</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.major}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/edit/${student._id}`} className="btn-edit">
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(student)}
                        className="btn-delete"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Xác nhận xóa</h3>
            <p>
              Bạn chắc chắn muốn xóa sinh viên{" "}
              <strong>{studentToDelete?.name}</strong>?
            </p>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete} className="btn-confirm">
                Xác nhận
              </button>
              <button onClick={handleCancelDelete} className="btn-cancel-modal">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
