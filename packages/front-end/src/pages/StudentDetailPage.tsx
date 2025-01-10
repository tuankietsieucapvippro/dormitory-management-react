import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { studentApi } from "../services/api";
import { formatDate, formatCurrency } from "../utils/format";

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await studentApi.getById(Number(id));
        setStudent(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin sinh viên:", error);
        alert("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center bg-[#130f21] text-[#e1dce4]">
          Đang tải...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-full flex-col gap-6 bg-[#130f21] p-6 text-[#e1dce4]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Thông tin sinh viên</h1>
          <button
            onClick={() => navigate("/student")}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            Quay lại
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Thông tin cá nhân */}
          <div className="rounded-lg bg-[#201b39] p-6">
            <h2 className="mb-4 text-xl font-semibold">Thông tin cá nhân</h2>
            <div className="grid gap-4">
              <InfoItem label="Mã sinh viên" value={student.mssv} />
              <InfoItem label="Họ và tên" value={student.hotensv} />
              <InfoItem label="Lớp" value={student.lop} />
              <InfoItem label="Giới tính" value={student.gioitinh} />
              <InfoItem
                label="Ngày sinh"
                value={formatDate(student.ngaysinh)}
              />
              <InfoItem label="Nơi sinh" value={student.noisinh} />
              <InfoItem label="Email" value={student.email} />
              <InfoItem label="Số điện thoại" value={student.sodienthoai} />
              <InfoItem label="Địa chỉ" value={student.diachi} />
              <InfoItem label="Số CCCD" value={student.socccd} />
            </div>
          </div>

          {/* Thông tin phòng ở */}
          <div className="rounded-lg bg-[#201b39] p-6">
            <h2 className="mb-4 text-xl font-semibold">Thông tin phòng ở</h2>
            {student.dkphongs && student.dkphongs[0]?.phong ? (
              <div className="grid gap-4">
                <InfoItem
                  label="Tòa nhà"
                  value={student.dkphongs[0].phong.toanha.tentoanha}
                />
                <InfoItem
                  label="Phòng"
                  value={student.dkphongs[0].phong.tenphong}
                />
                <InfoItem
                  label="Loại phòng"
                  value={student.dkphongs[0].phong.loaiphong.tenloaiphong}
                />
                <InfoItem
                  label="Đơn giá"
                  value={`${formatCurrency(student.dkphongs[0].phong.loaiphong.dongia)} VNĐ`}
                />
                <InfoItem
                  label="Trạng thái phòng"
                  value={student.dkphongs[0].phong.trangthai}
                />
                <InfoItem
                  label="Ngày đăng ký"
                  value={formatDate(student.dkphongs[0].ngaydangky)}
                />
                <InfoItem
                  label="Ngày hết hạn"
                  value={formatDate(student.dkphongs[0].ngayhethan)}
                />
              </div>
            ) : (
              <p className="text-gray-400">Chưa đăng ký phòng</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper component for consistent info display
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p>{value || "---"}</p>
  </div>
);

export default StudentDetailPage;
