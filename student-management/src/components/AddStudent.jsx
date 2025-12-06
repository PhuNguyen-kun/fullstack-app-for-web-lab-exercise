import { useState } from "react";
import "./AddStudent.css";

const AddStudent = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    age: "",
    major: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    // Validation
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
      await onStudentAdded(formData);
      setSuccess("Thêm học sinh thành công!");
      setFormData({
        name: "",
        studentId: "",
        email: "",
        age: "",
        major: "",
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      let errorMessage = "Có lỗi xảy ra khi thêm học sinh";
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

  return (
    <div className="add-student">
      <h2>Thêm Học Sinh Mới</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

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

        <button type="submit" className="btn-submit">
          Thêm Học Sinh
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
