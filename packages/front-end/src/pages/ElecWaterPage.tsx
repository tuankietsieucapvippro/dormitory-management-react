import Layout from "../components/Layout";
import { TbBuildingPlus } from "react-icons/tb";
import ElecWaterTable from "../components/ElecWaterTable";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ElecWaterPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex h-full flex-col bg-[#130f21] text-[#e1dce4]">
        <h1 className="-mt-5 mb-2 p-5 text-center text-3xl font-bold uppercase">
          Điện nước
        </h1>

        <div className="px-8">
          <div className="flex justify-between gap-5">
            <div className="flex gap-4">
              <div>
                <select name="" id="" className="bg-[#130f21]">
                  <option value="">Tất cả Tòa nhà</option>
                  <option value="">Tòa nhà 1</option>
                  <option value="">Tòa nhà 2</option>
                </select>
              </div>
              <div>
                <select name="" id="" className="bg-[#130f21]">
                  <option value="">Tất cả tầng</option>
                  <option value="">Tầng 1</option>
                  <option value="">Tầng 2</option>
                </select>
              </div>
              <div className="relative w-full max-w-sm">
                <div className="relative">
                  <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm phòng..."
                    className="w-full bg-[#130f21] pl-10 pr-4 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/elec-water/create")}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              <TbBuildingPlus />
              <span>Thêm chỉ số</span>
            </button>
          </div>
        </div>

        <div className="scrollbar-hidden mt-5 flex-1 overflow-auto p-8 pt-5">
          <ElecWaterTable />
        </div>
      </div>
    </Layout>
  );
};

export default ElecWaterPage;
