import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import DeleteModal from "../components/DeleteModal";

const TypeRoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loaiphong, setLoaiphong] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    phongid: null as number | null,
    tenphong: "",
  });

  useEffect(() => {
    const fetchTypeRoom = async () => {
      try {
        const response = await api.get(`/loaiphong/${id}`);
        setLoaiphong(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin loại phòng:", error);
        alert("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchTypeRoom();
  }, [id]);

  const handleDelete = async () => {
    if (!deleteModal.phongid) return;

    try {
      await api.delete(`/phong/${deleteModal.phongid}`);
      // Refresh data
      const response = await api.get(`/loaiphong/${id}`);
      setLoaiphong(response.data);
      setDeleteModal({ isOpen: false, phongid: null, tenphong: "" });
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa phòng:", error);
      alert("Có lỗi xảy ra khi xóa phòng");
    }
  };

  const getTrangThaiClass = (trangthai: string | null | undefined): string => {
    if (!trangthai) {
      return "inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800";
    }

    const status = trangthai.toLowerCase();

    switch (status) {
      case "còn trống":
        return "inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800";
      case "đã đầy":
        return "inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800";
      case "đang sửa chữa":
        return "inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800";
      default:
        return "inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800";
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
        <div className="-mt-5 mb-2 flex items-center justify-between p-5">
          <button
            onClick={() => navigate("/type-room")}
            className="rounded-lg bg-gray-500 px-4 py-2 hover:bg-gray-600"
          >
            Quay lại
          </button>
          <h1 className="text-center text-3xl font-bold uppercase">
            {loaiphong.tenloaiphong}
          </h1>
          <div className="w-[100px]"></div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="grid gap-8">
            {/* Thông tin cơ bản */}
            <div className="rounded-lg bg-[#201b39] p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Thông tin loại phòng
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-gray-400">Tên loại phòng</p>
                  <p>{loaiphong.tenloaiphong}</p>
                </div>
                <div>
                  <p className="text-gray-400">Đơn giá</p>
                  <p>{loaiphong.dongia.toLocaleString()} VNĐ</p>
                </div>
                <div>
                  <p className="text-gray-400">Giới tính</p>
                  <p>{loaiphong.gioitinh}</p>
                </div>
                <div>
                  <p className="text-gray-400">Mô tả</p>
                  <p>{loaiphong.mota || "Không có mô tả"}</p>
                </div>
                <div>
                  <p className="text-gray-400">Số phòng</p>
                  <p>{loaiphong.phongs?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Danh sách phòng */}
            <div className="rounded-lg bg-[#201b39] p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Danh sách phòng ({loaiphong.phongs?.length || 0})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-600">
                  <thead>
                    <tr className="bg-[#130f21]">
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        Tên phòng
                      </th>
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        Tòa nhà
                      </th>
                      <th className="border border-gray-600 px-4 py-2 text-left">
                        Tầng
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
                    {loaiphong.phongs?.length ? (
                      loaiphong.phongs.map((phong: any) => (
                        <tr key={phong.phongid}>
                          <td className="border border-gray-600 px-4 py-2">
                            {phong.tenphong}
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            {phong.toanha?.tentoanha || "---"}
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            {phong.tang}
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            {phong.sinhviens?.length || 0}
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            <span
                              className={getTrangThaiClass(phong?.trangthai)}
                            >
                              {phong?.trangthai || "---"}
                            </span>
                          </td>
                          <td className="border border-gray-600 px-4 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/room/${phong.phongid}`)
                                }
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
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="border border-gray-600 px-4 py-2 text-center"
                        >
                          Chưa có phòng nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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

export default TypeRoomDetailPage;
