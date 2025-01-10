import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { buildingApi } from "../services/api";

interface Toanha {
  toanhaid: number;
  tentoanha: string;
  mota: string;
  phongs: {
    phongid: number;
  }[];
}

interface BuildingTableProps {
  searchTerm: string;
}

const BuildingTable = ({ searchTerm }: BuildingTableProps) => {
  const navigate = useNavigate();
  const [toanhas, setToanhas] = useState<Toanha[]>([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    toanhaid: null as number | null,
    tentoanha: "",
  });

  useEffect(() => {
    fetchToanhas();
  }, []);

  const fetchToanhas = async () => {
    try {
      const response = await buildingApi.getAll();
      setToanhas(response.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.toanhaid) return;

    try {
      await buildingApi.delete(deleteModal.toanhaid);
      setDeleteModal({ isOpen: false, toanhaid: null, tentoanha: "" });
      fetchToanhas();
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa tòa nhà:", error);
      alert("Có lỗi xảy ra khi xóa tòa nhà");
    }
  };

  const filteredToanhas = toanhas.filter(
    (toanha) =>
      toanha.tentoanha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (toanha.mota?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#201b39] text-left">
            <th className="border border-gray-300 px-4 py-2">Tên tòa nhà</th>
            <th className="border border-gray-300 px-4 py-2">Mô tả</th>
            <th className="border border-gray-300 px-4 py-2">Số lượng phòng</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredToanhas.map((toanha) => (
            <tr key={toanha.toanhaid}>
              <td className="border border-gray-300 px-4 py-2">
                {toanha.tentoanha}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {toanha.mota}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {toanha.phongs?.length || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/building/edit/${toanha.toanhaid}`)
                    }
                    className="text-yellow-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => navigate(`/building/${toanha.toanhaid}`)}
                    className="text-blue-500"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        toanhaid: toanha.toanhaid as unknown as null,
                        tentoanha: toanha.tentoanha,
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
        message={`Bạn có chắc chắn muốn xóa tòa nhà "${deleteModal.tentoanha}" không? Hành động này không thể hoàn tác.`}
        onClose={() =>
          setDeleteModal({ isOpen: false, toanhaid: null, tentoanha: "" })
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default BuildingTable;
