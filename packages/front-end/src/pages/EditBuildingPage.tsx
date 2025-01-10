import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { buildingApi } from "../services/api";

const EditBuildingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tentoanha: "",
    mota: "",
  });

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await buildingApi.getById(Number(id));
        const { tentoanha, mota } = response.data;
        setFormData({ tentoanha, mota });
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin tòa nhà:", error);
        alert("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      await buildingApi.update(Number(id), formData);
      navigate("/building");
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật tòa nhà:", error);
      alert("Có lỗi xảy ra khi cập nhật tòa nhà");
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
          Sửa thông tin tòa nhà
        </h1>

        <div className="mx-auto w-full max-w-2xl flex-1 px-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="tentoanha" className="text-lg font-medium">
                Tên tòa nhà
              </label>
              <input
                type="text"
                id="tentoanha"
                name="tentoanha"
                value={formData.tentoanha}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-600 bg-[#201b39] px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Nhập tên tòa nhà"
                required
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
                placeholder="Nhập mô tả cho tòa nhà"
              />
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
                onClick={() => navigate("/building")}
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

export default EditBuildingPage;
