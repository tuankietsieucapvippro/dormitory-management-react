import React, { useEffect, useState } from "react";
import axios from "axios";
import { auditLogApi } from "../services/api";

interface User {
  taikhoanid: number;
  tendangnhap: string;
  matkhau: string;
  vaitro: string;
}

interface AuditLogItem {
  logid: number;
  actionname: string;
  tablename: string;
  recordid: number;
  actiondate: string;
  description: string;
  user: User;
}

const AuditLog = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await auditLogApi.getAll();
        setAuditLogs(response.data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
        alert("Có lỗi xảy ra khi tải nhật ký");
      }
    };

    fetchAuditLogs();
  }, []);

  return (
    <div className="h-screen w-1/6 bg-[#1b172e] p-4 text-[#e1dce4]">
      <p className="mb-10 text-gray-500">Recent Action</p>
      <ul className="grid gap-2">
        {auditLogs.map((log) => (
          <li key={log.logid}>
            <p className="font-bold">{log.actionname}</p>
            <p>{log.description}</p>
            <p className="text-gray-500">
              {/* Format lại thời gian theo cách bạn muốn */}
              {new Date(log.actiondate).toLocaleString()}{" "}
              {/* Hiển thị thời gian */}
            </p>
            <p className="text-gray-400">
              {/* Hiển thị thông tin người dùng */}
              Thực hiện bởi: {log.user.tendangnhap} - Vai trò: {log.user.vaitro}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditLog;
