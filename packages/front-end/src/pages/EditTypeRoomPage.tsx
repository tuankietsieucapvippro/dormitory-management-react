import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { typeRoomApi } from "../services/api";

interface TypeRoom {
  loaiphongid: number;
  tenloaiphong: string;
  dongia: number;
  gioitinh: string;
  mota: string;
}

const EditTypeRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tenloaiphong: "",
    dongia: "",
    gioitinh: "",
    mota: "",
  });

  useEffect(() => {
    const fetchTypeRoom = async () => {
      try {
        const response = await typeRoomApi.getById(Number(id));
        const typeRoom = response.data;
        setFormData({
          tenloaiphong: typeRoom.tenloaiphong,
          dongia: typeRoom.dongia.toString(),
          gioitinh: typeRoom.gioitinh,
          mota: typeRoom.mota || "",
        });
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin loại phòng:", error);
        alert("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchTypeRoom();
  }, [id]);

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
      await typeRoomApi.update(Number(id), {
        ...formData,
        dongia: parseInt(formData.dongia),
      });
      navigate("/type-room");
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật loại phòng:", error);
      alert("Có lỗi xảy ra khi cập nhật loại phòng");
    }
  };

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
      <div className="flex h-full flex-col bg-[#130f21] text-[#e1dce4]">
        <h1 className="-mt-5 mb-2 p-5 text-center text-3xl font-bold uppercase">
          Sửa thông tin loại phòng
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
                Đơn giá
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
              <label htmlFor="mota" className="text-lg font-medium">
                Mô tả
              </label>
              <textarea
                id="mota"
                name="mota"
                value={formData.mota}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập mô tả"
                rows={4}
              />
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/type-room")}
                className="rounded bg-gray-500 px-4 py-2 hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditTypeRoomPage;
