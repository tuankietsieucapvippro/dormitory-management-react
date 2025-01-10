import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { elecWaterApi } from "../services/api";

interface ElecWater {
  diennuocid: number;
  phongid: number;
  thang: number;
  nam: number;
  chisodien: number;
  chisonuoc: number;
  phong?: {
    tenphong: string;
    toanha?: {
      tentoanha: string;
    };
  };
}

const EditElecWaterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [elecWater, setElecWater] = useState<ElecWater | null>(null);
  const [formData, setFormData] = useState({
    chisodien: "",
    chisonuoc: "",
    thang: "",
    nam: "",
  });

  useEffect(() => {
    const fetchElecWater = async () => {
      try {
        const response = await elecWaterApi.getById(Number(id));
        const diennuoc = response.data;

        setElecWater(diennuoc);
        setFormData({
          chisodien: diennuoc.chisodien.toString(),
          chisonuoc: diennuoc.chisonuoc.toString(),
          thang: diennuoc.thang.toString(),
          nam: diennuoc.nam.toString(),
        });
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin điện nước:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchElecWater();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await elecWaterApi.update(Number(id), {
        ...formData,
        chisodien: parseInt(formData.chisodien),
        chisonuoc: parseInt(formData.chisonuoc),
      });
      navigate("/elec-water");
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật chỉ số điện nước:", error);
      alert("Có lỗi xảy ra khi cập nhật chỉ số điện nước");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center bg-[#130f21] text-[#e1dce4]">
          <div className="text-lg">Đang tải...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center bg-[#130f21] text-[#e1dce4]">
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-full flex-col bg-[#130f21] text-[#e1dce4]">
        <h1 className="-mt-5 mb-2 p-5 text-center text-3xl font-bold uppercase">
          Sửa chỉ số điện nước
        </h1>

        <div className="mx-auto w-full max-w-2xl flex-1 px-8">
          <div className="mb-6 rounded-lg bg-[#201b39] p-4">
            <h2 className="mb-2 text-xl font-semibold">Thông tin phòng</h2>
            <p className="mb-1">
              <span className="font-medium">Phòng:</span>{" "}
              {elecWater?.phong?.tenphong || "---"}
            </p>
            <p className="mb-1">
              <span className="font-medium">Tòa nhà:</span>{" "}
              {elecWater?.phong?.toanha?.tentoanha || "---"}
            </p>
            <p>
              <span className="font-medium">Thời gian:</span> Tháng{" "}
              {elecWater?.thang}/{elecWater?.nam}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              />
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/elec-water")}
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

export default EditElecWaterPage;
