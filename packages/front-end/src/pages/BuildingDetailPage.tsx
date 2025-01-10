import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { buildingApi, roomApi } from "../services/api";
import { formatCurrency } from "../utils/format";
import DeleteModal from "../components/DeleteModal";

interface Room {
  phongid: number;
  tenphong: string;
  tang: number;
  trangthai: string;
  loaiphong: {
    tenloaiphong: string;
    dongia: number;
  };
  sinhviens: any[];
}

interface Building {
  toanhaid: number;
  tentoanha: string;
  mota: string;
  phongs: Room[];
}

const BuildingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState<Building | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    phongid: null as number | null,
    tenphong: "",
  });

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await buildingApi.getById(Number(id));
        setBuilding(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin tòa nhà:", error);
        alert("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  const handleDelete = async () => {
    if (!deleteModal.phongid) return;

    try {
      await roomApi.delete(deleteModal.phongid);
      // Refresh building data
      const response = await buildingApi.getById(Number(id));
      setBuilding(response.data);
      setDeleteModal({ isOpen: false, phongid: null, tenphong: "" });
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa phòng:", error);
      alert("Có lỗi xảy ra khi xóa phòng");
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

  if (!building) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center bg-[#130f21] text-[#e1dce4]">
          Không tìm thấy thông tin tòa nhà
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-full flex-col gap-6 bg-[#130f21] p-6 text-[#e1dce4]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{building.tentoanha}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/building/edit/${building.toanhaid}`)}
              className="rounded bg-yellow-500 px-4 py-2 hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={() => navigate("/building")}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              Quay lại
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-[#201b39] p-6">
          <h2 className="mb-4 text-xl font-semibold">Mô tả</h2>
          <p>{building.mota || "Không có mô tả"}</p>
        </div>

        <div className="rounded-lg bg-[#201b39] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Danh sách phòng ({building.phongs?.length || 0})
            </h2>
            <button
              onClick={() => navigate("/room/create")}
              className="rounded bg-green-500 px-4 py-2 hover:bg-green-600"
            >
              Thêm phòng
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-600">
              <thead>
                <tr className="bg-[#130f21]">
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Tên phòng
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Tầng
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Loại phòng
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Đơn giá
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Số sinh viên
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Trạng thái
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {building.phongs?.map((phong) => (
                  <tr key={phong.phongid}>
                    <td className="border border-gray-600 px-4 py-2">
                      {phong.tenphong}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {phong.tang}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {phong.loaiphong?.tenloaiphong || "---"}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {phong.loaiphong
                        ? `${formatCurrency(phong.loaiphong.dongia)} VNĐ`
                        : "---"}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {phong.sinhviens?.length || 0}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {phong.trangthai}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/room/${phong.phongid}`)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              isOpen: true,
                              phongid: phong.phongid,
                              tenphong: phong.tenphong,
                            })
                          }
                          className="text-red-500 hover:text-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa phòng "${deleteModal.tenphong}" không? Hành động này không thể hoàn tác.`}
        onClose={() =>
          setDeleteModal({ isOpen: false, phongid: null, tenphong: "" })
        }
        onConfirm={handleDelete}
      />
    </Layout>
  );
};

export default BuildingDetailPage;
