import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaClock } from 'react-icons/fa';
import Layout from '../components/Layout';

const SupportPage: React.FC = () => {
  return (
    <Layout>
        <div className="container mx-auto px-4 py-8 bg-[#130f21] text-[#e1dce4] h-full">
      <h1 className="text-3xl font-bold text-center mb-2 -mt-5 uppercase">
        Liên Hệ Với Chúng Tôi
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className=" rounded-lg shadow-lg p-6  ">
          <h2 className="text-xl font-semibold mb-6">
            Thông Tin Liên Hệ
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <MdEmail className="text-2xl mr-4 text-blue-600" />
              <span>Email: tuankiet2962003@gmail.com</span>
            </div>
            
            <div className="flex items-center">
              <MdPhone className="text-2xl mr-4 text-blue-600" />
              <span>Điện thoại: (84) 523-059-456</span>
            </div>
            
            <div className="flex items-center">
              <MdLocationOn className="text-2xl mr-4 text-blue-600" />
              <span>Địa chỉ: 2 Nguyễn Đình Chiểu, Vĩnh Thọ, Nha Trang</span>
            </div>
            
            <div className="flex items-center">
              <FaLinkedin className="text-2xl mr-4 text-blue-600" />
              <span>LinkedIn: linkedin.com/company/example</span>
            </div>
          </div>
        </div>
        
        <div className=" rounded-lg shadow-lg p-6  ">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaClock className="text-2xl mr-2 text-blue-600" />
              Giờ Làm Việc
            </h2>
            <div className="space-y-2">
              <p>Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
              <p>Thứ Bảy: 8:00 - 12:00</p>
              <p>Chủ Nhật: Nghỉ</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Về Chúng Tôi
            </h2>
            <p className="text-gray-600">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn. 
              Đừng ngần ngại liên hệ với chúng tôi qua các kênh trên để được tư vấn 
              và hỗ trợ tốt nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default SupportPage;
