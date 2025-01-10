import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { buildingApi } from "../services/api";
import { api, roomApi } from "../services/api";

interface Toanha {
  toanhaid: number;
  tentoanha: string;
}

interface Loaiphong {
  loaiphongid: number;
  tenloaiphong: string;
  dongia: number;
  gioitinh: string;
}

const EditRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toanhas, setToanhas] = useState<Toanha[]>([]);
  const [loaiphongs, setLoaiphongs] = useState<Loaiphong[]>([]);

  const [formData, setFormData] = useState({
    tenphong: "",
    toanhaid: "",
    loaiphongid: "",
    tang: "",
    trangthai: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomResponse, buildingResponse, typeResponse] =
          await Promise.all([
            roomApi.getById(Number(id)),
            buildingApi.getAll(),
            api.get("/loaiphong"),
          ]);

        setFormData(roomResponse.data);
        setToanhas(buildingResponse.data);
        setLoaiphongs(typeResponse.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
        alert("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
      await roomApi.update(Number(id), {
        ...formData,
        tang: parseInt(formData.tang),
        toanhaid: parseInt(formData.toanhaid),
        loaiphongid: parseInt(formData.loaiphongid),
      });
      navigate("/room");
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật phòng:", error);
      alert("Có lỗi xảy ra khi cập nhật phòng");
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
          Sửa thông tin phòng
        </h1>

        <div className="mx-auto w-full max-w-2xl flex-1 px-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="tenphong" className="text-lg font-medium">
                Tên phòng
              </label>
              <input
                type="text"
                id="tenphong"
                name="tenphong"
                value={formData.tenphong}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập tên phòng"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tang" className="text-lg font-medium">
                Tầng
              </label>
              <input
                type="number"
                id="tang"
                name="tang"
                value={formData.tang}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập số tầng"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="toanhaid" className="text-lg font-medium">
                Tòa nhà
              </label>
              <select
                id="toanhaid"
                name="toanhaid"
                value={formData.toanhaid}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Chọn tòa nhà</option>
                {toanhas.map((toanha) => (
                  <option key={toanha.toanhaid} value={toanha.toanhaid}>
                    {toanha.tentoanha}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="loaiphongid" className="text-lg font-medium">
                Loại phòng
              </label>
              <select
                id="loaiphongid"
                name="loaiphongid"
                value={formData.loaiphongid}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Chọn loại phòng</option>
                {loaiphongs.map((loaiphong) => (
                  <option
                    key={loaiphong.loaiphongid}
                    value={loaiphong.loaiphongid}
                  >
                    {loaiphong.tenloaiphong} - {loaiphong.gioitinh} -{" "}
                    {loaiphong.dongia.toLocaleString()} VNĐ
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="trangthai" className="text-lg font-medium">
                Trạng thái
              </label>
              <select
                id="trangthai"
                name="trangthai"
                value={formData.trangthai}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Chọn trạng thái</option>
                <option value="Còn trống">Còn trống</option>
                <option value="Đã đầy">Đã đầy</option>
                <option value="Đang sửa chữa">Đang sửa chữa</option>
              </select>
            </div>

            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-2 font-medium hover:bg-blue-600"
              >
                Cập nhật
              </button>
              <button
                type="button"
                onClick={() => navigate("/room")}
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

export default EditRoomPage;
