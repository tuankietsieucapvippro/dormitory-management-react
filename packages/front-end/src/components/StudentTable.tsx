import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { studentApi } from "../services/api";

interface Student {
  sinhvienid: number;
  mssv: string;
  hotensv: string;
  lop: string;
  gioitinh: string;
  ngaysinh: string;
  noisinh: string;
  email: string;
  sodienthoai: string;
  diachi: string;
  socccd: string;
  dkphongs?: {
    phong: {
      tenphong: string;
      toanha: {
        tentoanha: string;
      };
    };
  }[];
}

const StudentTable = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    sinhvienid: null as number | null,
    tensinhvien: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentApi.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.sinhvienid) return;

    try {
      await studentApi.delete(deleteModal.sinhvienid);
      setDeleteModal({ isOpen: false, sinhvienid: null, tensinhvien: "" });
      fetchStudents();
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sinh viên:", error);
      alert("Có lỗi xảy ra khi xóa sinh viên");
    }
  };

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#201b39] text-left">
            <th className="border border-gray-300 px-4 py-2">Mã SV</th>
            <th className="border border-gray-300 px-4 py-2">Họ và tên</th>
            <th className="border border-gray-300 px-4 py-2">Giới tính</th>
            <th className="border border-gray-300 px-4 py-2">Ngày sinh</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
            <th className="border border-gray-300 px-4 py-2">Phòng</th>
            <th className="border border-gray-300 px-4 py-2">Tòa nhà</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.sinhvienid}>
              <td className="border border-gray-300 px-4 py-2">
                {student.mssv}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.hotensv}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.gioitinh}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(student.ngaysinh).toLocaleDateString("vi-VN")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.sodienthoai}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.dkphongs?.find((dkphong) => dkphong.phong.tenphong)
                  ?.phong.tenphong || "Chưa có phòng"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {student.dkphongs?.find((dkphong) => dkphong.phong.tenphong)
                  ?.phong.toanha?.tentoanha || "Chưa có phòng"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/student/edit/${student.sinhvienid}`)
                    }
                    className="text-yellow-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => navigate(`/student/${student.sinhvienid}`)}
                    className="text-blue-500"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        sinhvienid: student.sinhvienid,
                        tensinhvien: student.hotensv,
                      })
                    }
                    className="text-red-500"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa sinh viên "${deleteModal.tensinhvien}" không? Hành động này không thể hoàn tác.`}
        onClose={() =>
          setDeleteModal({ isOpen: false, sinhvienid: null, tensinhvien: "" })
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default StudentTable;
