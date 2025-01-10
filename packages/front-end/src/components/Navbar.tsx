import { HiOutlineDocumentText } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { TbLayoutNavbar } from "react-icons/tb";
import ShinImage from "../assets/shin.jpg";
import { FaRegBuilding, FaSchool } from "react-icons/fa";
import { LuDoorOpen } from "react-icons/lu";
import { RiWaterFlashLine } from "react-icons/ri";
import { MdPersonOutline, MdSupportAgent } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    tendangnhap: string;
    vaitro: string;
  } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-[#201b39] rounded-lg" : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col justify-between bg-[#1b172e] p-4 text-[#e1dce4]">
      <div className="col-start-1 grid gap-10">
        <div className="flex justify-between">
          <FaSchool className="size-10" />
          <button>
            <TbLayoutNavbar className="size-7 -rotate-90" />
          </button>
        </div>
        <div className="grid gap-2">
          <p className="text-gray-500">Favorites</p>
          <ul className="ml-5 grid gap-4">
            <li className={`p-2 ${isActive("/building")}`}>
              <Link to="/building" className="flex items-center gap-2">
                <FaRegBuilding />
                <div>Quản lý tòa nhà</div>
              </Link>
            </li>
            <li className={`p-2 ${isActive("/room")}`}>
              <Link to="/room" className="flex items-center gap-2">
                <LuDoorOpen />
                <div>Quản lý phòng</div>
              </Link>
            </li>
            <li className={`p-2 ${isActive("/type-room")}`}>
              <Link to="/type-room" className="flex items-center gap-2">
                <HiOutlineDocumentText />
                <div>Quản lý loại phòng</div>
              </Link>
            </li>
            <li className={`p-2 ${isActive("/elec-water")}`}>
              <Link to="/elec-water" className="flex items-center gap-2">
                <RiWaterFlashLine />
                <div>Quản lý điện nước</div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid gap-2">
          <p className="text-gray-500">Main menu</p>
          <ul className="ml-5 grid gap-4">
            <li className={`p-2 ${isActive("/student")}`}>
              <Link to="/student" className="flex items-center gap-2">
                <MdPersonOutline />
                <div>Quản lý sinh viên</div>
              </Link>
            </li>
            <li className={`p-2 ${isActive("/support")}`}>
              <Link to="/support" className="flex items-center gap-2">
                <MdSupportAgent />
                <p>Trợ giúp</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img src={ShinImage} alt="" className="h-10 rounded-full" />
          <div>
            <p>{user?.tendangnhap || "Guest"}</p>
            <p className="text-gray-500">{user?.vaitro || "No role"}</p>
          </div>
        </div>
        <button onClick={handleLogout}>
          <IoLogOutOutline className="size-7" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
