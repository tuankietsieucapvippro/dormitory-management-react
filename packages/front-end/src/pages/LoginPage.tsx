import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tendangnhap: "",
    matkhau: "",
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (invalidFields.includes(name)) {
      setInvalidFields((prev) => prev.filter((field) => field !== name));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInvalidFields: string[] = [];

    // Kiểm tra trường trống
    if (!formData.tendangnhap) newInvalidFields.push("tendangnhap");
    if (!formData.matkhau) newInvalidFields.push("matkhau");

    if (newInvalidFields.length > 0) {
      setInvalidFields(newInvalidFields);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/taikhoan/login",
        formData,
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/building");
      }
    } catch (error: any) {
      setInvalidFields(["tendangnhap", "matkhau"]);

      // Hiển thị thông báo lỗi từ API
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Có lỗi xảy ra khi đăng nhập");
      }
    }
  };

  return (
    <div className="grid h-screen place-content-center bg-[#1b172e] text-[#e1dce4]">
      <div className="grid h-full w-full place-items-center gap-5 rounded-xl bg-[#130f21] p-20">
        <img src="" alt="" />
        <h5 className="text-2xl font-bold">Sign in to your account</h5>
        <input
          type="text"
          name="tendangnhap"
          placeholder="Tên đăng nhập"
          value={formData.tendangnhap}
          onChange={handleInputChange}
          className={`border-2 border-solid ${
            invalidFields.includes("tendangnhap")
              ? "border-red-500"
              : "border-indigo-600"
          } w-full rounded-xl bg-[#130f21] px-2 py-2`}
        />
        <input
          type="password"
          name="matkhau"
          placeholder="Mật khẩu"
          value={formData.matkhau}
          onChange={handleInputChange}
          className={`border-2 border-solid ${
            invalidFields.includes("matkhau")
              ? "border-red-500"
              : "border-indigo-600"
          } w-full rounded-xl bg-[#130f21] px-2 py-2`}
        />
        <div className="flex w-full justify-between">
          <button>
            <p>Remember me on this device</p>
          </button>
          <button>
            <p>Forgot password?</p>
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-[#1b172e] py-2 hover:bg-[#201b39]"
        >
          Login
        </button>
        <div>
          <p>Create account?</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
