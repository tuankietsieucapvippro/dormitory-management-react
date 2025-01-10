import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

interface Loaiphong {
  loaiphongid: number;
  tenloaiphong: string;
  dongia: number;
  gioitinh: string;
  mota: string;
  phongs: any[];
}

interface TypeRoomTableProps {
  searchTerm: string;
}

const TypeRoomTable = ({ searchTerm }: TypeRoomTableProps) => {
  const [loaiphongs, setLoaiphongs] = useState<Loaiphong[]>([]);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    loaiphongid: null as number | null,
    tenloaiphong: "",
  });

  useEffect(() => {
    fetchLoaiphongs();
  }, []);

  const fetchLoaiphongs = () => {
    axios
      .get("http://localhost:3000/loaiphong")
      .then((response) => {
        setLoaiphongs(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      });
  };

  const handleDelete = async () => {
    if (!deleteModal.loaiphongid) return;

    try {
      await axios.delete(
        `http://localhost:3000/loaiphong/${deleteModal.loaiphongid}`,
      );
      setDeleteModal({ isOpen: false, loaiphongid: null, tenloaiphong: "" });
      fetchLoaiphongs(); // Refresh danh sách sau khi xóa
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa loại phòng:", error);
      alert("Có lỗi xảy ra khi xóa loại phòng");
    }
  };

  const filteredLoaiphongs = loaiphongs.filter(
    (loaiphong) =>
      loaiphong.tenloaiphong
        .toLowerCase()
        .includes(searchTerm?.toLowerCase() || "") ||
      loaiphong.gioitinh
        .toLowerCase()
        .includes(searchTerm?.toLowerCase() || "") ||
      (loaiphong.mota?.toLowerCase() || "").includes(
        searchTerm?.toLowerCase() || "",
      ) ||
      loaiphong.dongia.toString().includes(searchTerm || ""),
  );

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#201b39] text-left">
            <th className="border border-gray-300 px-4 py-2">Tên loại phòng</th>
            <th className="border border-gray-300 px-4 py-2">Đơn giá</th>
            <th className="border border-gray-300 px-4 py-2">Giới tính</th>
            <th className="border border-gray-300 px-4 py-2">Mô tả</th>
            <th className="border border-gray-300 px-4 py-2">Số phòng</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoaiphongs.map((loaiphong) => (
            <tr key={loaiphong.loaiphongid}>
              <td className="border border-gray-300 px-4 py-2">
                {loaiphong.tenloaiphong}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loaiphong.dongia.toLocaleString()} VNĐ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span className={`rounded-full px-2 py-1 text-sm`}>
                  {loaiphong.gioitinh}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loaiphong.mota || "Không có mô tả"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loaiphong.phongs?.length || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/type-room/edit/${loaiphong.loaiphongid}`)
                    }
                    className="text-yellow-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/type-room/${loaiphong.loaiphongid}`)
                    }
                    className="text-blue-500"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        loaiphongid: loaiphong.loaiphongid,
                        tenloaiphong: loaiphong.tenloaiphong,
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
        message={`Bạn có chắc chắn muốn xóa loại phòng "${deleteModal.tenloaiphong}" không? Hành động này không thể hoàn tác.`}
        onClose={() =>
          setDeleteModal({ isOpen: false, loaiphongid: null, tenloaiphong: "" })
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TypeRoomTable;
