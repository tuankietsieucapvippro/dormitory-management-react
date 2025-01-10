import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

interface DienNuoc {
  diennuocid: number;
  phong: {
    phongid: number;
    tenphong: string;
    toanha?: {
      tentoanha: string;
    };
  };
  tungay: string;
  denngay: string;
  chisodiencu: number;
  chisodienmoi: number;
  chisonuoccu: number;
  chisonuocmoi: number;
  dongiadien: number;
  dongianuoc: number;
}

const ElecWaterTable = () => {
  const navigate = useNavigate();
  const [diennuocs, setDiennuocs] = useState<DienNuoc[]>([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    diennuocid: null as number | null,
  });

  useEffect(() => {
    fetchDienNuoc();
  }, []);

  const fetchDienNuoc = async () => {
    try {
      const response = await axios.get("http://localhost:3000/diennuoc");
      setDiennuocs(response.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.diennuocid) return;

    try {
      await axios.delete(
        `http://localhost:3000/diennuoc/${deleteModal.diennuocid}`,
      );
      setDeleteModal({ isOpen: false, diennuocid: null });
      fetchDienNuoc();
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa chỉ số điện nước:", error);
      alert("Có lỗi xảy ra khi xóa chỉ số điện nước");
    }
  };

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#201b39] text-left">
            <th className="border border-gray-300 px-4 py-2">Phòng</th>
            <th className="border border-gray-300 px-4 py-2">Tòa nhà</th>
            <th className="border border-gray-300 px-4 py-2">Từ ngày</th>
            <th className="border border-gray-300 px-4 py-2">Đến ngày</th>
            <th className="border border-gray-300 px-4 py-2">Chỉ số điện</th>
            <th className="border border-gray-300 px-4 py-2">Chỉ số nước</th>
            <th className="border border-gray-300 px-4 py-2">Đơn giá điện</th>
            <th className="border border-gray-300 px-4 py-2">Đơn giá nước</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {diennuocs.map((diennuoc) => (
            <tr key={diennuoc.diennuocid}>
              <td className="border border-gray-300 px-4 py-2">
                {diennuoc.phong?.tenphong}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {diennuoc.phong?.toanha?.tentoanha}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(diennuoc.tungay).toLocaleDateString("vi-VN")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(diennuoc.denngay).toLocaleDateString("vi-VN")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {diennuoc.chisodiencu} - {diennuoc.chisodienmoi}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {diennuoc.chisonuoccu} - {diennuoc.chisonuocmoi}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {diennuoc.dongiadien.toLocaleString()} VNĐ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {diennuoc.dongianuoc.toLocaleString()} VNĐ
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/elec-water/edit/${diennuoc.diennuocid}`)
                    }
                    className="text-yellow-500"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        diennuocid: diennuoc.diennuocid,
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
        message="Bạn có chắc chắn muốn xóa chỉ số điện nước này không?"
        onClose={() => setDeleteModal({ isOpen: false, diennuocid: null })}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ElecWaterTable;
