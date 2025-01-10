import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

interface Phong {
  phongid: number;
  tenphong: string;
  tang: number;
  trangthai: string;
  toanha: {
    tentoanha: string;
  };
  loaiphong: {
    tenloaiphong: string;
    dongia: number;
    gioitinh: string;
  };
  sinhviens: any[];
}

interface RoomTableProps {
  searchTerm: string;
}

const RoomTable = ({ searchTerm }: RoomTableProps) => {
  const navigate = useNavigate();
  const [phongs, setPhongs] = useState<Phong[]>([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    phongid: null as number | null,
    tenphong: "",
  });

  useEffect(() => {
    fetchPhongs();
  }, []);

  const fetchPhongs = () => {
    axios
      .get("http://localhost:3000/phong")
      .then((response) => {
        setPhongs(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      });
  };

  const handleDelete = async () => {
    if (!deleteModal.phongid) return;

    try {
      await axios.delete(`http://localhost:3000/phong/${deleteModal.phongid}`);
      setDeleteModal({ isOpen: false, phongid: null, tenphong: "" });
      fetchPhongs(); // Refresh danh sách sau khi xóa
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa phòng:", error);
      alert("Có lỗi xảy ra khi xóa phòng");
    }
  };

  const getTrangThaiClass = (trangthai: string) => {
    switch (trangthai) {
      case "Còn trống":
        return "text-green-500";
      case "Đã đầy":
        return "text-red-500";
      case "Đang sửa chữa":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredPhongs = phongs.filter(
    (phong) =>
      phong.tenphong.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
      phong.toanha?.tentoanha
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase() || "") ||
      phong.loaiphong?.tenloaiphong
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase() || "") ||
      phong.trangthai?.toLowerCase().includes(searchTerm?.toLowerCase() || ""),
  );

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#201b39] text-left">
            <th className="border border-gray-300 px-4 py-2">Tên phòng</th>
            <th className="border border-gray-300 px-4 py-2">Tòa nhà</th>
            <th className="border border-gray-300 px-4 py-2">Loại phòng</th>
            <th className="border border-gray-300 px-4 py-2">Giới tính</th>
            <th className="border border-gray-300 px-4 py-2">Đơn giá</th>
            <th className="border border-gray-300 px-4 py-2">Số giường</th>
            <th className="border border-gray-300 px-4 py-2">Đang thuê</th>
            <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredPhongs.map((phong) => (
            <tr key={phong.phongid}>
              <td className="border border-gray-300 px-4 py-2">
                {phong.tenphong}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {phong.toanha?.tentoanha}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {phong.loaiphong?.tenloaiphong}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {phong.loaiphong?.gioitinh}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {phong.loaiphong?.dongia?.toLocaleString()} VNĐ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {phong.sinhviens?.length || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {phong.sinhviens?.length || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span className={getTrangThaiClass(phong.trangthai)}>
                  {phong.trangthai}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/room/edit/${phong.phongid}`)}
                    className="text-yellow-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => navigate(`/room/${phong.phongid}`)}
                    className="text-blue-500"
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
        message={`Bạn có chắc chắn muốn xóa phòng "${deleteModal.tenphong}" không? Hành động này không thể hoàn tác.`}
        onClose={() =>
          setDeleteModal({ isOpen: false, phongid: null, tenphong: "" })
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default RoomTable;
