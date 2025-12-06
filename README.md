# Student Management System 🎓

Ứng dụng quản lý học sinh full-stack sử dụng MERN stack (MongoDB, Express, React, Node.js).

## Tính năng

- ✅ Hiển thị danh sách học sinh
- ✅ Thêm học sinh mới
- ✅ Chỉnh sửa thông tin học sinh
- ✅ Xóa học sinh (với xác nhận)
- ✅ Tìm kiếm học sinh theo tên
- ✅ Sắp xếp danh sách A-Z / Z-A

## Công nghệ sử dụng

### Backend

- Node.js & Express.js
- MongoDB với Mongoose
- Docker cho MongoDB

### Frontend

- React 19
- React Router DOM
- Axios
- Vite

## Cài đặt và Chạy

### 1. Khởi động MongoDB với Docker

```bash
# Từ thư mục backend
cd backend
docker-compose up -d
```

### 2.1. Tạo file môi trường cho backend

Trước khi chạy backend, hãy tạo file `.env` từ file mẫu:

```bash
cp backend/.env.example backend/.env
```

Bạn có thể chỉnh sửa giá trị trong `.env` nếu cần (ví dụ đổi port hoặc URI MongoDB).

### 2.2. Cài đặt và chạy Backend

```bash
# Ở trong thư mục backend
npm install
npm run dev
```

Backend sẽ chạy tại: http://localhost:5000

### 3. Cài đặt và chạy Frontend

```bash
# Từ thư mục gốc
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

## Cấu trúc thư mục

```
fullstack-app-for-web-lab-exercise/
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── docker-compose.yml    # MongoDB container config
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentList.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   └── EditStudent.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/students` - Lấy danh sách tất cả học sinh
- `GET /api/students/:id` - Lấy thông tin một học sinh
- `POST /api/students` - Thêm học sinh mới
- `PUT /api/students/:id` - Cập nhật thông tin học sinh
- `DELETE /api/students/:id` - Xóa học sinh

## Cấu trúc dữ liệu Student

```json
{
  "name": "Nguyễn Văn A",
  "studentId": "20210001",
  "email": "nguyenvana@example.com",
  "age": 20,
  "major": "Công nghệ thông tin"
}
```

## Hướng dẫn sử dụng

1. **Xem danh sách**: Trang chủ hiển thị tất cả học sinh
2. **Thêm học sinh**: Click "Thêm Học Sinh" trên thanh điều hướng
3. **Sửa thông tin**: Click nút "Sửa" trên mỗi dòng học sinh
4. **Xóa học sinh**: Click nút "Xóa" và xác nhận lại
5. **Tìm kiếm**: Nhập tên vào ô tìm kiếm
6. **Sắp xếp**: Click nút "Sắp xếp" để đổi thứ tự A-Z / Z-A

## Lưu ý

- Đảm bảo Docker đang chạy trước khi khởi động MongoDB
- Backend phải chạy trước khi sử dụng Frontend
- Kiểm tra port 27017, 5000, và 5173 không bị chiếm dụng

## Tác giả

Bài thực hành Web - HUST
