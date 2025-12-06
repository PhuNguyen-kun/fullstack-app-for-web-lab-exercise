import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditStudent.css";

const EditStudent = ({ onStudentUpdated, students }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    age: "",
    major: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const student = students.find((s) => s._id === id);
    if (student) {
      setFormData({
        name: student.name,
        studentId: student.studentId,
        email: student.email,
        age: student.age,
        major: student.major,
      });
      setLoading(false);
    } else {
      setError("Không tìm thấy học sinh");
      setLoading(false);
    }
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.studentId ||
      !formData.email ||
      !formData.age ||
      !formData.major
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      await onStudentUpdated(id, formData);
      navigate("/");
    } catch (err) {
      let errorMessage = "Có lỗi xảy ra khi cập nhật học sinh";
      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        if (msg.includes("duplicate key") && msg.includes("studentId")) {
          errorMessage = "Mã sinh viên đã tồn tại";
        } else if (msg.includes("duplicate key") && msg.includes("email")) {
          errorMessage = "Email đã tồn tại";
        } else {
          errorMessage = msg;
        }
      }
      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="edit-student">
      <h2>Chỉnh Sửa Thông Tin Học Sinh</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Mã Sinh Viên:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Nhập mã sinh viên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Tuổi:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Nhập tuổi"
            min="1"
            max="150"
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">Chuyên Ngành:</label>
          <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Nhập chuyên ngành"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-submit">
            Cập Nhật
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
