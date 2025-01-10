import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTypeRoomPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenloaiphong: "",
    dongia: "",
    gioitinh: "",
    mota: "",
    sogiuong: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/loaiphong", {
        ...formData,
        dongia: parseInt(formData.dongia),
        sogiuong: parseInt(formData.sogiuong),
      });
      navigate("/type-room");
    } catch (error) {
      console.error("Có lỗi xảy ra khi tạo loại phòng:", error);
      alert("Có lỗi xảy ra khi tạo loại phòng");
    }
  };

  return (
    <Layout>
      <div className="flex h-full flex-col bg-[#130f21] text-[#e1dce4]">
        <h1 className="-mt-5 mb-2 p-5 text-center text-3xl font-bold uppercase">
          Thêm loại phòng
        </h1>

        <div className="mx-auto w-full max-w-2xl flex-1 px-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="tenloaiphong" className="text-lg font-medium">
                Tên loại phòng
              </label>
              <input
                type="text"
                id="tenloaiphong"
                name="tenloaiphong"
                value={formData.tenloaiphong}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập tên loại phòng"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dongia" className="text-lg font-medium">
                Đơn giá (VNĐ)
              </label>
              <input
                type="number"
                id="dongia"
                name="dongia"
                value={formData.dongia}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập đơn giá"
                required
                min="0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="gioitinh" className="text-lg font-medium">
                Giới tính
              </label>
              <select
                id="gioitinh"
                name="gioitinh"
                value={formData.gioitinh}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sogiuong" className="text-lg font-medium">
                Số giường
              </label>
              <input
                type="number"
                id="sogiuong"
                name="sogiuong"
                value={formData.sogiuong}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập số giường"
                required
                min="1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="mota" className="text-lg font-medium">
                Mô tả
              </label>
              <textarea
                id="mota"
                name="mota"
                value={formData.mota}
                onChange={handleInputChange}
                className="h-32 rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập mô tả cho loại phòng"
              />
            </div>

            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-2 font-medium hover:bg-blue-600"
              >
                Thêm mới
              </button>
              <button
                type="button"
                onClick={() => navigate("/type-room")}
                className="rounded-lg bg-gray-500 px-6 py-2 font-medium hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTypeRoomPage;
