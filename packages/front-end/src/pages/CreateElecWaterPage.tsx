import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buildingApi, roomApi, elecWaterApi } from "../services/api";

interface Toanha {
  toanhaid: number;
  tentoanha: string;
}

interface Phong {
  phongid: number;
  tenphong: string;
  tang: number;
}

const CreateElecWaterPage = () => {
  const navigate = useNavigate();
  const [toanhas, setToanhas] = useState<Toanha[]>([]);
  const [phongs, setPhongs] = useState<Phong[]>([]);
  const [selectedToanha, setSelectedToanha] = useState("");

  const [formData, setFormData] = useState({
    phongid: "",
    chisodien: "",
    chisonuoc: "",
    ngayghi: new Date().toISOString().split("T")[0],
    trangthai: "Chưa thanh toán",
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await buildingApi.getAll();
        setToanhas(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tòa nhà:", error);
        alert("Có lỗi xảy ra khi tải danh sách tòa nhà");
      }
    };

    fetchBuildings();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedToanha) {
        try {
          const response = await roomApi.getByBuilding(Number(selectedToanha));
          setPhongs(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phòng:", error);
          alert("Có lỗi xảy ra khi tải danh sách phòng");
        }
      } else {
        setPhongs([]);
      }
    };

    fetchRooms();
  }, [selectedToanha]);

  const handleToanhaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToanha(e.target.value);
    setFormData((prev) => ({ ...prev, phongid: "" }));
  };

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
      await elecWaterApi.create({
        ...formData,
        phongid: parseInt(formData.phongid),
        chisodien: parseInt(formData.chisodien),
        chisonuoc: parseInt(formData.chisonuoc),
      });
      navigate("/elec-water");
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm chỉ số điện nước:", error);
      alert("Có lỗi xảy ra khi thêm chỉ số điện nước");
    }
  };

  return (
    <Layout>
      <div className="flex h-full flex-col bg-[#130f21] text-[#e1dce4]">
        <h1 className="-mt-5 mb-2 p-5 text-center text-3xl font-bold uppercase">
          Thêm chỉ số điện nước
        </h1>

        <div className="mx-auto w-full max-w-2xl flex-1 px-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="toanhaid" className="text-lg font-medium">
                Tòa nhà
              </label>
              <select
                id="toanhaid"
                value={selectedToanha}
                onChange={handleToanhaChange}
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
              <label htmlFor="phongid" className="text-lg font-medium">
                Phòng
              </label>
              <select
                id="phongid"
                name="phongid"
                value={formData.phongid}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Chọn phòng</option>
                {phongs.map((phong) => (
                  <option key={phong.phongid} value={phong.phongid}>
                    {phong.tenphong} - Tầng {phong.tang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="chisodien" className="text-lg font-medium">
                Chỉ số điện
              </label>
              <input
                type="number"
                id="chisodien"
                name="chisodien"
                value={formData.chisodien}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập chỉ số điện"
                required
                min="0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="chisonuoc" className="text-lg font-medium">
                Chỉ số nước
              </label>
              <input
                type="number"
                id="chisonuoc"
                name="chisonuoc"
                value={formData.chisonuoc}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập chỉ số nước"
                required
                min="0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="ngayghi" className="text-lg font-medium">
                Ngày ghi
              </label>
              <input
                type="date"
                id="ngayghi"
                name="ngayghi"
                value={formData.ngayghi}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
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
                onClick={() => navigate("/elec-water")}
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

export default CreateElecWaterPage;
