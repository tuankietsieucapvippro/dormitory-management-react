import { Link } from "react-router-dom";
import { useState } from "react";

interface FormData {
  ho: string;
  ten: string;
  sodienthoai: string;
  email: string;
  ngaysinh: string;
  gioitinh: string;
  cmnd: string;
  toanha: string;
  phong: string;
  ngaybatdau: string;
  ngayketthuc: string;
  loaiphong: string;
}

const RegisterPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ho: "",
    ten: "",
    sodienthoai: "",
    email: "",
    ngaysinh: "",
    gioitinh: "",
    cmnd: "",
    toanha: "",
    phong: "",
    ngaybatdau: "",
    ngayketthuc: "",
    loaiphong: "",
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Xóa trường khỏi danh sách invalid khi người dùng bắt đầu nhập
    if (invalidFields.includes(name)) {
      setInvalidFields((prev) => prev.filter((field) => field !== name));
    }
  };

  const validateForm = () => {
    const newInvalidFields: string[] = [];

    // Kiểm tra từng trường
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newInvalidFields.push(key);
      }
    });

    setInvalidFields(newInvalidFields);
    return newInvalidFields.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const renderInput = (
    name: keyof FormData,
    label: string,
    type: string = "text",
  ) => (
    <div className="flex items-center gap-2">
      <label
        htmlFor={name}
        className={`w-32 ${invalidFields.includes(name) ? "text-red-500" : ""}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={label}
        className={`w-full rounded-lg bg-[#130f21] p-2 ${
          invalidFields.includes(name)
            ? "border-2 border-red-500"
            : "border-2 border-transparent"
        }`}
      />
    </div>
  );

  return (
    <div className="flex h-screen flex-col gap-10 bg-[#130f21] p-5 text-[#e1dce4]">
      <div className="flex items-center justify-between">
        <div className="w-screen text-center text-3xl font-bold uppercase">
          Đăng ký lưu trú tại ký túc xá
        </div>
        <Link to="/building" className="rounded-lg bg-[#1b172e] p-2">
          Admin
        </Link>
      </div>

      <div className="flex gap-5">
        <div className="w-1/2 rounded-xl bg-[#1b172e] p-5">
          <h1 className="text-center text-2xl font-bold">Thông tin cá nhân</h1>
          <form className="mt-4 flex flex-col gap-3">
            {renderInput("ho", "Họ")}
            {renderInput("ten", "Tên")}
            {renderInput("sodienthoai", "Số điện thoại")}
            {renderInput("email", "Email", "email")}
            {renderInput("ngaysinh", "Ngày sinh", "date")}
            {renderInput("gioitinh", "Giới tính")}
            {renderInput("cmnd", "CMND")}
          </form>
        </div>

        <div className="w-1/2 rounded-xl bg-[#1b172e] p-5">
          <h1 className="text-center text-2xl font-bold">Đăng ký ký túc xá</h1>
          <form className="mt-4 flex flex-col gap-3">
            {renderInput("toanha", "Tòa nhà")}
            {renderInput("phong", "Phòng")}
            {renderInput("ngaybatdau", "Ngày bắt đầu", "date")}
            {renderInput("ngayketthuc", "Ngày kết thúc", "date")}
            {renderInput("loaiphong", "Loại phòng")}
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <p>
            Tôi hoàn toàn chịu trách nhiệm và tính chính xác của thông tin trên
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className={`rounded-lg bg-[#1b172e] p-2 ${!isChecked ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isChecked}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
