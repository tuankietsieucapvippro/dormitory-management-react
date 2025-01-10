-- Bảng ToaNha
CREATE TABLE ToaNha (
    ToaNhaID SERIAL PRIMARY KEY,
    TenToaNha VARCHAR(30) NOT NULL UNIQUE,
    MoTa VARCHAR(255)
);

-- Bảng LoaiPhong
CREATE TABLE LoaiPhong (
    LoaiPhongID SERIAL PRIMARY KEY,
    TenLoaiPhong VARCHAR(30) NOT NULL,
    DonGia FLOAT CHECK (DonGia >= 0),
    MoTa VARCHAR(255),
    GioiTinh VARCHAR(10) CHECK (GioiTinh IN ('Nam', 'Nữ'))
);

-- Bảng Phong
CREATE TABLE Phong (
    PhongID SERIAL PRIMARY KEY,
    ToaNhaID INT REFERENCES ToaNha(ToaNhaID) ON DELETE CASCADE,
    LoaiPhongID INT REFERENCES LoaiPhong(LoaiPhongID) ON DELETE CASCADE,
    TenPhong VARCHAR(30) NOT NULL,
    TinhTrang VARCHAR(30),
    SoLuongGiuong INT,
    UNIQUE (TenPhong, ToaNhaID)
);

-- Bảng TaiKhoan
CREATE TABLE TaiKhoan (
    TaiKhoanID SERIAL PRIMARY KEY,
    TenDangNhap VARCHAR(20) NOT NULL UNIQUE,
    MatKhau VARCHAR(255) NOT NULL,
    VaiTro VARCHAR(50) NOT NULL
);

-- Bảng SinhVien
CREATE TABLE SinhVien (
    SinhVienID SERIAL PRIMARY KEY,
    HotenSV VARCHAR(70) NOT NULL,
    MSSV VARCHAR(10) NOT NULL UNIQUE,
    Lop VARCHAR(30),
    GioiTinh VARCHAR(10) CHECK (GioiTinh IN ('Nam', 'Nữ')),
    NgaySinh DATE CHECK (NgaySinh <= CURRENT_DATE),
    NoiSinh VARCHAR(100),
    DiaChi VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    SoDienThoai VARCHAR(10) UNIQUE,
    SoCCCD VARCHAR(20)
);

-- Bảng DKSinhVien
CREATE TABLE DKSinhVien (
    DKSinhVienID SERIAL PRIMARY KEY,
    HotenSV VARCHAR(70) NOT NULL,
    MSSV VARCHAR(10) NOT NULL UNIQUE,
    Lop VARCHAR(30),
    GioiTinh VARCHAR(10) CHECK (GioiTinh IN ('Nam', 'Nữ')),
    NgaySinh DATE CHECK (NgaySinh <= CURRENT_DATE),
    NoiSinh VARCHAR(100),
    DiaChi VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    SoDienThoai VARCHAR(10) UNIQUE,
    SoCCCD VARCHAR(20)
);



-- Bảng DKPhong
CREATE TABLE DKPhong (
    DKPhongID SERIAL PRIMARY KEY,
    SinhVienID INT REFERENCES SinhVien(SinhVienID) ON DELETE CASCADE,
    PhongID INT REFERENCES Phong(PhongID) ON DELETE CASCADE,
    NgayDK DATE,
    NgayTra DATE CHECK (NgayTra >= NgayDK)
);

-- Bảng DienNuoc
CREATE TABLE DienNuoc (
    DienNuocID SERIAL PRIMARY KEY,
    PhongID INT REFERENCES Phong(PhongID) ON DELETE CASCADE,
    TuNgay DATE NOT NULL,
    DenNgay DATE NOT NULL,
    ChiSoDienCu INT NOT NULL CHECK (ChiSoDienMoi >= ChiSoDienCu),
    ChiSoDienMoi INT NOT NULL,
    ChiSoNuocCu INT NOT NULL CHECK (ChiSoNuocMoi >= ChiSoNuocCu),
    ChiSoNuocMoi INT NOT NULL,
    DonGiaDien FLOAT NOT NULL CHECK (DonGiaDien >= 0),
    DonGiaNuoc FLOAT NOT NULL CHECK (DonGiaNuoc >= 0)
);

-- Bảng HoaDon
CREATE TABLE HoaDon (
    HoaDonID SERIAL PRIMARY KEY,
    PhongID INT REFERENCES Phong(PhongID),
    DienNuocID INT REFERENCES DienNuoc(DienNuocID),
    NgayLapHD DATE NOT NULL,
    TinhTrang VARCHAR(30) NOT NULL
);

-- Bảng AuditLog
CREATE TABLE AuditLog (
    LogID SERIAL PRIMARY KEY,
    ActionName VARCHAR(50) NOT NULL,
    TableName VARCHAR(50) NOT NULL,  
    RecordID INT NOT NULL, 
    ActionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Description TEXT,  
    UserID INT, 
    FOREIGN KEY (UserID) REFERENCES TaiKhoan(TaiKhoanID)
);



-- Xóa tất cả dữ liệu trong bảng audit_log
--DELETE FROM audit_log;
--
-- Xóa tất cả dữ liệu trong bảng HoaDon
--DELETE FROM HoaDon;
--
-- Xóa tất cả dữ liệu trong bảng DienNuoc
--DELETE FROM DienNuoc;
--
-- Xóa tất cả dữ liệu trong bảng DKPhong
--DELETE FROM DKPhong;
--
-- Xóa tất cả dữ liệu trong bảng SinhVien
--DELETE FROM SinhVien;
--
-- Xóa tất cả dữ liệu trong bảng TaiKhoan	
--DELETE FROM TaiKhoan;
--
-- Xóa tất cả dữ liệu trong bảng Phong
--DELETE FROM Phong;
--
-- Xóa tất cả dữ liệu trong bảng LoaiPhong
--DELETE FROM LoaiPhong;
--
-- Xóa tất cả dữ liệu trong bảng ToaNha
--DELETE FROM ToaNha;
--
-- Reset sequence của từng bảng
--ALTER SEQUENCE toanha_toanhaid_seq RESTART WITH 1;
--ALTER SEQUENCE loaiphong_loaiphongid_seq RESTART WITH 1;
--ALTER SEQUENCE phong_phongid_seq RESTART WITH 1;
--ALTER SEQUENCE taikhoan_taikhoanid_seq RESTART WITH 1;
--ALTER SEQUENCE sinhvien_sinhvienid_seq RESTART WITH 1;
--ALTER SEQUENCE dkphong_dkphongid_seq RESTART WITH 1;
--ALTER SEQUENCE diennuoc_diennuocid_seq RESTART WITH 1;
--ALTER SEQUENCE hoadon_hoadonid_seq RESTART WITH 1;
--ALTER SEQUENCE audit_log_logid_seq RESTART WITH 1;


INSERT INTO ToaNha (TenToaNha, MoTa)
VALUES 
('K1', 'Tòa nhà K1'),
('K2', 'Tòa nhà K2'),
('K3', 'Tòa nhà K3'),
('K4', 'Tòa nhà K4'),
('K5', 'Tòa nhà K5'),
('K6', 'Tòa nhà K6'),
('K7', 'Tòa nhà K7'),
('K8', 'Tòa nhà K8');


INSERT INTO LoaiPhong (TenLoaiPhong, DonGia, MoTa, GioiTinh)
VALUES 
('Phòng 5 người Nam', 2000000, 'Phòng cho 5 nam sinh viên', 'Nam'),
('Phòng 5 người Nữ', 2000000, 'Phòng cho 5 nữ sinh viên', 'Nữ'),
('Phòng 8 người Nam', 2000000, 'Phòng cho 8 nam sinh viên', 'Nam'),
('Phòng 8 người Nữ', 2000000, 'Phòng cho 8 nữ sinh viên', 'Nữ'),
('Phòng 2 người Nam', 2000000, 'Phòng cho 2 nam sinh viên', 'Nam'),
('Phòng 2 người Nữ', 2000000, 'Phòng cho 2 nữ sinh viên', 'Nữ');


INSERT INTO Phong (ToaNhaID, LoaiPhongID, TenPhong, TinhTrang, SoLuongGiuong)
VALUES
-- Tòa nhà K1: 5 tầng, mỗi tầng 4 phòng
(1, 1, '101', 'Trống', 2), (1, 1, '102', 'Trống', 2), (1, 2, '103', 'Trống', 2), (1, 2, '104', 'Trống', 2),
(1, 1, '201', 'Trống', 2), (1, 1, '202', 'Trống', 2), (1, 2, '203', 'Trống', 2), (1, 2, '204', 'Trống', 2),
(1, 1, '301', 'Trống', 2), (1, 1, '302', 'Trống', 2), (1, 2, '303', 'Trống', 2), (1, 2, '304', 'Trống', 2),
(1, 1, '401', 'Trống', 2), (1, 1, '402', 'Trống', 2), (1, 2, '403', 'Trống', 2), (1, 2, '404', 'Trống', 2),
(1, 1, '501', 'Trống', 2), (1, 1, '502', 'Trống', 2), (1, 2, '503', 'Trống', 2), (1, 2, '504', 'Trống', 2),

-- Tòa nhà K2: 5 tầng, mỗi tầng 12 phòng
(2, 1, '101', 'Trống', 5), (2, 1, '102', 'Trống', 5), (2, 2, '103', 'Trống', 5), (2, 2, '104', 'Trống', 5), 
(2, 1, '105', 'Trống', 5), (2, 2, '106', 'Trống', 5), (2, 1, '107', 'Trống', 5), (2, 2, '108', 'Trống', 5), 
(2, 1, '109', 'Trống', 5), (2, 2, '110', 'Trống', 5), (2, 1, '111', 'Trống', 5), (2, 2, '112', 'Trống', 5),

(2, 1, '201', 'Trống', 5), (2, 1, '202', 'Trống', 5), (2, 2, '203', 'Trống', 5), (2, 2, '204', 'Trống', 5), 
(2, 1, '205', 'Trống', 5), (2, 2, '206', 'Trống', 5), (2, 1, '207', 'Trống', 5), (2, 2, '208', 'Trống', 5), 
(2, 1, '209', 'Trống', 5), (2, 2, '210', 'Trống', 5), (2, 1, '211', 'Trống', 5), (2, 2, '212', 'Trống', 5),

(2, 1, '301', 'Trống', 5), (2, 1, '302', 'Trống', 5), (2, 2, '303', 'Trống', 5), (2, 2, '304', 'Trống', 5), 
(2, 1, '305', 'Trống', 5), (2, 2, '306', 'Trống', 5), (2, 1, '307', 'Trống', 5), (2, 2, '308', 'Trống', 5), 
(2, 1, '309', 'Trống', 5), (2, 2, '310', 'Trống', 5), (2, 1, '311', 'Trống', 5), (2, 2, '312', 'Trống', 5),

(2, 1, '401', 'Trống', 5), (2, 1, '402', 'Trống', 5), (2, 2, '403', 'Trống', 5), (2, 2, '404', 'Trống', 5), 
(2, 1, '405', 'Trống', 5), (2, 2, '406', 'Trống', 5), (2, 1, '407', 'Trống', 5), (2, 2, '408', 'Trống', 5), 
(2, 1, '409', 'Trống', 5), (2, 2, '410', 'Trống', 5), (2, 1, '411', 'Trống', 5), (2, 2, '412', 'Trống', 5),

(2, 1, '501', 'Trống', 5), (2, 1, '502', 'Trống', 5), (2, 2, '503', 'Trống', 5), (2, 2, '504', 'Trống', 5), 
(2, 1, '505', 'Trống', 5), (2, 2, '506', 'Trống', 5), (2, 1, '507', 'Trống', 5), (2, 2, '508', 'Trống', 5), 
(2, 1, '509', 'Trống', 5), (2, 2, '510', 'Trống', 5), (2, 1, '511', 'Trống', 5), (2, 2, '512', 'Trống', 5),

-- Tòa nhà K3: 5 tầng, mỗi tầng 12 phòng
(3, 1, '101', 'Trống', 8), (3, 1, '102', 'Trống', 8), (3, 2, '103', 'Trống', 8), (3, 2, '104', 'Trống', 8), 
(3, 1, '105', 'Trống', 8), (3, 2, '106', 'Trống', 8), (3, 1, '107', 'Trống', 8), (3, 2, '108', 'Trống', 8), 
(3, 1, '109', 'Trống', 8), (3, 2, '110', 'Trống', 8), (3, 1, '111', 'Trống', 8), (3, 2, '112', 'Trống', 8),

(3, 1, '201', 'Trống', 8), (3, 1, '202', 'Trống', 8), (3, 2, '203', 'Trống', 8), (3, 2, '204', 'Trống', 8), 
(3, 1, '205', 'Trống', 8), (3, 2, '206', 'Trống', 8), (3, 1, '207', 'Trống', 8), (3, 2, '208', 'Trống', 8), 
(3, 1, '209', 'Trống', 8), (3, 2, '210', 'Trống', 8), (3, 1, '211', 'Trống', 8), (3, 2, '212', 'Trống', 8),

(3, 1, '301', 'Trống', 8), (3, 1, '302', 'Trống', 8), (3, 2, '303', 'Trống', 8), (3, 2, '304', 'Trống', 8), 
(3, 1, '305', 'Trống', 8), (3, 2, '306', 'Trống', 8), (3, 1, '307', 'Trống', 8), (3, 2, '308', 'Trống', 8), 
(3, 1, '309', 'Trống', 8), (3, 2, '310', 'Trống', 8), (3, 1, '311', 'Trống', 8), (3, 2, '312', 'Trống', 8),

(3, 1, '401', 'Trống', 8), (3, 1, '402', 'Trống', 8), (3, 2, '403', 'Trống', 8), (3, 2, '404', 'Trống', 8), 
(3, 1, '405', 'Trống', 8), (3, 2, '406', 'Trống', 8), (3, 1, '407', 'Trống', 8), (3, 2, '408', 'Trống', 8), 
(3, 1, '409', 'Trống', 8), (3, 2, '410', 'Trống', 8), (3, 1, '411', 'Trống', 8), (3, 2, '412', 'Trống', 8),

(3, 1, '501', 'Trống', 8), (3, 1, '502', 'Trống', 8), (3, 2, '503', 'Trống', 8), (3, 2, '504', 'Trống', 8), 
(3, 1, '505', 'Trống', 8), (3, 2, '506', 'Trống', 8), (3, 1, '507', 'Trống', 8), (3, 2, '508', 'Trống', 8), 
(3, 1, '509', 'Trống', 8), (3, 2, '510', 'Trống', 8), (3, 1, '511', 'Trống', 8), (3, 2, '512', 'Trống', 8),

-- Tòa nhà K4: 5 tầng, mỗi tầng 12 phòng
(4, 1, '101', 'Trống', 5), (4, 1, '102', 'Trống', 5), (4, 2, '103', 'Trống', 5), (4, 2, '104', 'Trống', 5), 
(4, 1, '105', 'Trống', 5), (4, 2, '106', 'Trống', 5), (4, 1, '107', 'Trống', 5), (4, 2, '108', 'Trống', 5), 
(4, 1, '109', 'Trống', 5), (4, 2, '110', 'Trống', 5), (4, 1, '111', 'Trống', 5), (4, 2, '112', 'Trống', 5),

(4, 1, '201', 'Trống', 5), (4, 1, '202', 'Trống', 5), (4, 2, '203', 'Trống', 5), (4, 2, '204', 'Trống', 5), 
(4, 1, '205', 'Trống', 5), (4, 2, '206', 'Trống', 5), (4, 1, '207', 'Trống', 5), (4, 2, '208', 'Trống', 5), 
(4, 1, '209', 'Trống', 5), (4, 2, '210', 'Trống', 5), (4, 1, '211', 'Trống', 5), (4, 2, '212', 'Trống', 5),

(4, 1, '301', 'Trống', 5), (4, 1, '302', 'Trống', 5), (4, 2, '303', 'Trống', 5), (4, 2, '304', 'Trống', 5), 
(4, 1, '305', 'Trống', 5), (4, 2, '306', 'Trống', 5), (4, 1, '307', 'Trống', 5), (4, 2, '308', 'Trống', 5), 
(4, 1, '309', 'Trống', 5), (4, 2, '310', 'Trống', 5), (4, 1, '311', 'Trống', 5), (4, 2, '312', 'Trống', 5),

(4, 1, '401', 'Trống', 5), (4, 1, '402', 'Trống', 5), (4, 2, '403', 'Trống', 5), (4, 2, '404', 'Trống', 5), 
(4, 1, '405', 'Trống', 5), (4, 2, '406', 'Trống', 5), (4, 1, '407', 'Trống', 5), (4, 2, '408', 'Trống', 5), 
(4, 1, '409', 'Trống', 5), (4, 2, '410', 'Trống', 5), (4, 1, '411', 'Trống', 5), (4, 2, '412', 'Trống', 5),

(4, 1, '501', 'Trống', 5), (4, 1, '502', 'Trống', 5), (4, 2, '503', 'Trống', 5), (4, 2, '504', 'Trống', 5), 
(4, 1, '505', 'Trống', 5), (4, 2, '506', 'Trống', 5), (4, 1, '507', 'Trống', 5), (4, 2, '508', 'Trống', 5), 
(4, 1, '509', 'Trống', 5), (4, 2, '510', 'Trống', 5), (4, 1, '511', 'Trống', 5), (4, 2, '512', 'Trống', 5),

-- Tòa nhà K5: 5 tầng, mỗi tầng 12 phòng
(5, 1, '101', 'Trống', 8), (5, 1, '102', 'Trống', 8), (5, 2, '103', 'Trống', 8), (5, 2, '104', 'Trống', 8), 
(5, 1, '105', 'Trống', 8), (5, 2, '106', 'Trống', 8), (5, 1, '107', 'Trống', 8), (5, 2, '108', 'Trống', 8), 
(5, 1, '109', 'Trống', 8), (5, 2, '110', 'Trống', 8), (5, 1, '111', 'Trống', 8), (5, 2, '112', 'Trống', 8),

(5, 1, '201', 'Trống', 8), (5, 1, '202', 'Trống', 8), (5, 2, '203', 'Trống', 8), (5, 2, '204', 'Trống', 8), 
(5, 1, '205', 'Trống', 8), (5, 2, '206', 'Trống', 8), (5, 1, '207', 'Trống', 8), (5, 2, '208', 'Trống', 8), 
(5, 1, '209', 'Trống', 8), (5, 2, '210', 'Trống', 8), (5, 1, '211', 'Trống', 8), (5, 2, '212', 'Trống', 8),

(5, 1, '301', 'Trống', 8), (5, 1, '302', 'Trống', 8), (5, 2, '303', 'Trống', 8), (5, 2, '304', 'Trống', 8), 
(5, 1, '305', 'Trống', 8), (5, 2, '306', 'Trống', 8), (5, 1, '307', 'Trống', 8), (5, 2, '308', 'Trống', 8), 
(5, 1, '309', 'Trống', 8), (5, 2, '310', 'Trống', 8), (5, 1, '311', 'Trống', 8), (5, 2, '312', 'Trống', 8),

(5, 1, '401', 'Trống', 8), (5, 1, '402', 'Trống', 8), (5, 2, '403', 'Trống', 8), (5, 2, '404', 'Trống', 8), 
(5, 1, '405', 'Trống', 8), (5, 2, '406', 'Trống', 8), (5, 1, '407', 'Trống', 8), (5, 2, '408', 'Trống', 8), 
(5, 1, '409', 'Trống', 8), (5, 2, '410', 'Trống', 8), (5, 1, '411', 'Trống', 8), (5, 2, '412', 'Trống', 8),

(5, 1, '501', 'Trống', 8), (5, 1, '502', 'Trống', 8), (5, 2, '503', 'Trống', 8), (5, 2, '504', 'Trống', 8), 
(5, 1, '505', 'Trống', 8), (5, 2, '506', 'Trống', 8), (5, 1, '507', 'Trống', 8), (5, 2, '508', 'Trống', 8), 
(5, 1, '509', 'Trống', 8), (5, 2, '510', 'Trống', 8), (5, 1, '511', 'Trống', 8), (5, 2, '512', 'Trống', 8),

-- Tòa nhà K7: 5 tầng, mỗi tầng 12 phòng
(7, 1, '101', 'Trống', 8), (7, 1, '102', 'Trống', 8), (7, 2, '103', 'Trống', 8), (7, 2, '104', 'Trống', 8), 
(7, 1, '105', 'Trống', 8), (7, 2, '106', 'Trống', 8), (7, 1, '107', 'Trống', 8), (7, 2, '108', 'Trống', 8), 
(7, 1, '109', 'Trống', 8), (7, 2, '110', 'Trống', 8), (7, 1, '111', 'Trống', 8), (7, 2, '112', 'Trống', 8),

(7, 1, '201', 'Trống', 8), (7, 1, '202', 'Trống', 8), (7, 2, '203', 'Trống', 8), (7, 2, '204', 'Trống', 8), 
(7, 1, '205', 'Trống', 8), (7, 2, '206', 'Trống', 8), (7, 1, '207', 'Trống', 8), (7, 2, '208', 'Trống', 8), 
(7, 1, '209', 'Trống', 8), (7, 2, '210', 'Trống', 8), (7, 1, '211', 'Trống', 8), (7, 2, '212', 'Trống', 8),

(7, 1, '301', 'Trống', 8), (7, 1, '302', 'Trống', 8), (7, 2, '303', 'Trống', 8), (7, 2, '304', 'Trống', 8), 
(7, 1, '305', 'Trống', 8), (7, 2, '306', 'Trống', 8), (7, 1, '307', 'Trống', 8), (7, 2, '308', 'Trống', 8), 
(7, 1, '309', 'Trống', 8), (7, 2, '310', 'Trống', 8), (7, 1, '311', 'Trống', 8), (7, 2, '312', 'Trống', 8),

(7, 1, '401', 'Trống', 8), (7, 1, '402', 'Trống', 8), (7, 2, '403', 'Trống', 8), (7, 2, '404', 'Trống', 8), 
(7, 1, '405', 'Trống', 8), (7, 2, '406', 'Trống', 8), (7, 1, '407', 'Trống', 8), (7, 2, '408', 'Trống', 8), 
(7, 1, '409', 'Trống', 8), (7, 2, '410', 'Trống', 8), (7, 1, '411', 'Trống', 8), (7, 2, '412', 'Trống', 8),

(7, 1, '501', 'Trống', 8), (7, 1, '502', 'Trống', 8), (7, 2, '503', 'Trống', 8), (7, 2, '504', 'Trống', 8), 
(7, 1, '505', 'Trống', 8), (7, 2, '506', 'Trống', 8), (7, 1, '507', 'Trống', 8), (7, 2, '508', 'Trống', 8), 
(7, 1, '509', 'Trống', 8), (7, 2, '510', 'Trống', 8), (7, 1, '511', 'Trống', 8), (7, 2, '512', 'Trống', 8),

-- Tòa nhà K8: 7 tầng, mỗi tầng 12 phòng
(8, 1, '101', 'Trống', 8), (8, 1, '102', 'Trống', 8), (8, 2, '103', 'Trống', 8), (8, 2, '104', 'Trống', 8), 
(8, 1, '105', 'Trống', 8), (8, 2, '106', 'Trống', 8), (8, 1, '107', 'Trống', 8), (8, 2, '108', 'Trống', 8), 
(8, 1, '109', 'Trống', 8), (8, 2, '110', 'Trống', 8), (8, 1, '111', 'Trống', 8), (8, 2, '112', 'Trống', 8),

(8, 1, '201', 'Trống', 8), (8, 1, '202', 'Trống', 8), (8, 2, '203', 'Trống', 8), (8, 2, '204', 'Trống', 8), 
(8, 1, '205', 'Trống', 8), (8, 2, '206', 'Trống', 8), (8, 1, '207', 'Trống', 8), (8, 2, '208', 'Trống', 8), 
(8, 1, '209', 'Trống', 8), (8, 2, '210', 'Trống', 8), (8, 1, '211', 'Trống', 8), (8, 2, '212', 'Trống', 8),

(8, 1, '301', 'Trống', 8), (8, 1, '302', 'Trống', 8), (8, 2, '303', 'Trống', 8), (8, 2, '304', 'Trống', 8), 
(8, 1, '305', 'Trống', 8), (8, 2, '306', 'Trống', 8), (8, 1, '307', 'Trống', 8), (8, 2, '308', 'Trống', 8), 
(8, 1, '309', 'Trống', 8), (8, 2, '310', 'Trống', 8), (8, 1, '311', 'Trống', 8), (8, 2, '312', 'Trống', 8),

(8, 1, '401', 'Trống', 8), (8, 1, '402', 'Trống', 8), (8, 2, '403', 'Trống', 8), (8, 2, '404', 'Trống', 8), 
(8, 1, '405', 'Trống', 8), (8, 2, '406', 'Trống', 8), (8, 1, '407', 'Trống', 8), (8, 2, '408', 'Trống', 8), 
(8, 1, '409', 'Trống', 8), (8, 2, '410', 'Trống', 8), (8, 1, '411', 'Trống', 8), (8, 2, '412', 'Trống', 8),

(8, 1, '501', 'Trống', 8), (8, 1, '502', 'Trống', 8), (8, 2, '503', 'Trống', 8), (8, 2, '504', 'Trống', 8), 
(8, 1, '505', 'Trống', 8), (8, 2, '506', 'Trống', 8), (8, 1, '507', 'Trống', 8), (8, 2, '508', 'Trống', 8), 
(8, 1, '509', 'Trống', 8), (8, 2, '510', 'Trống', 8), (8, 1, '511', 'Trống', 8), (8, 2, '512', 'Trống', 8),

(8, 1, '601', 'Trống', 8), (8, 1, '602', 'Trống', 8), (8, 2, '603', 'Trống', 8), (8, 2, '604', 'Trống', 8), 
(8, 1, '605', 'Trống', 8), (8, 2, '606', 'Trống', 8), (8, 1, '607', 'Trống', 8), (8, 2, '608', 'Trống', 8), 
(8, 1, '609', 'Trống', 8), (8, 2, '610', 'Trống', 8), (8, 1, '611', 'Trống', 8), (8, 2, '612', 'Trống', 8),

(8, 1, '701', 'Trống', 8), (8, 1, '702', 'Trống', 8), (8, 2, '703', 'Trống', 8), (8, 2, '704', 'Trống', 8), 
(8, 1, '705', 'Trống', 8), (8, 2, '706', 'Trống', 8), (8, 1, '707', 'Trống', 8), (8, 2, '708', 'Trống', 8), 
(8, 1, '709', 'Trống', 8), (8, 2, '710', 'Trống', 8), (8, 1, '711', 'Trống', 8), (8, 2, '712', 'Trống', 8);

INSERT INTO SinhVien (HotenSV, MSSV, Lop, GioiTinh, NgaySinh, NoiSinh, DiaChi, Email, SoDienThoai, SoCCCD)
VALUES
    ('Nguyễn Minh Tuấn', '63130094', '63.CNTT-1', 'Nam', '2001-03-03', 'Nha Trang', '789 Đường Lê Lợi', 'tuan.nmt.63cntt@ntu.edu.vn', '0934567890', '112233445'),
    ('Phạm Thanh Hoài', '63130095', '63.CNTT-1', 'Nữ', '2001-04-04', 'Nha Trang', '321 Đường Trần Quang Khải', 'hoai.pt.63cntt@ntu.edu.vn', '0966123456', '223344556'),
    ('Trần Hoàng Sơn', '63130096', '63.CNTT-1', 'Nam', '2001-05-05', 'Nha Trang', '654 Đường Phan Chu Trinh', 'son.th.63cntt@ntu.edu.vn', '0912345678', '334455667'),
    ('Đặng Thiên Lý', '63130097', '63.CNTT-1', 'Nữ', '2001-06-06', 'Nha Trang', '987 Đường Hồ Tùng Mậu', 'ly.dt.63cntt@ntu.edu.vn', '0978123456', '445566778'),
    ('Võ Thành Tâm', '63130098', '63.CNTT-1', 'Nam', '2001-07-07', 'Nha Trang', '123 Đường Lý Tự Trọng', 'tam.vt.63cntt@ntu.edu.vn', '0906123457', '556677889'),
    ('Lê Thị Lan', '63130099', '63.CNTT-1', 'Nữ', '2001-08-08', 'Nha Trang', '654 Đường Nguyễn Huệ', 'lan.lt.63cntt@ntu.edu.vn', '0967123458', '667788990'),
    ('Hoàng Thị Bích', '63130100', '63.CNTT-1', 'Nữ', '2001-09-09', 'Nha Trang', '234 Đường Hoàng Diệu', 'bich.ht.63cntt@ntu.edu.vn', '0912765433', '778899001'),
    ('Ngô Phương Đông', '63130101', '63.CNTT-1', 'Nam', '2001-10-10', 'Nha Trang', '876 Đường Bạch Đằng', 'dong.npd.63cntt@ntu.edu.vn', '0932334456', '889900112'),
    ('Phan Đoàn Trân', '63130102', '63.CNTT-1', 'Nữ', '2001-11-11', 'Nha Trang', '345 Đường Hùng Vương', 'tran.pdt.63cntt@ntu.edu.vn', '0972345679', '990011223'),
    ('Dương Thị Ngọc', '63130103', '63.CNTT-1', 'Nữ', '2001-12-12', 'Nha Trang', '567 Đường Phạm Ngọc Thạch', 'ngoc.dt.63cntt@ntu.edu.vn', '0913456789', '101112233'),
    ('Trần Hải Yến', '63130104', '63.CNTT-1', 'Nữ', '2001-01-13', 'Nha Trang', '987 Đường Lê Văn Tám', 'yen.th.63cntt@ntu.edu.vn', '0981122335', '112233445'),
    ('Lê Trung Hải', '63130105', '63.CNTT-1', 'Nam', '2001-02-14', 'Nha Trang', '654 Đường Nguyễn Khang', 'hai.lt.63cntt@ntu.edu.vn', '0912345679', '223344556'),
    ('Nguyễn Ngọc Quân', '63130106', '63.CNTT-1', 'Nam', '2001-03-15', 'Nha Trang', '432 Đường Cộng Hòa', 'quan.ngn.63cntt@ntu.edu.vn', '0966123458', '334455667'),
    ('Vũ Minh Châu', '63130107', '63.CNTT-1', 'Nữ', '2001-04-16', 'Nha Trang', '876 Đường Trương Định', 'chau.vm.63cntt@ntu.edu.vn', '0903456790', '445566778'),
    ('Nguyễn Hoài Thu', '63130108', '63.CNTT-1', 'Nữ', '2001-05-17', 'Nha Trang', '345 Đường Đinh Tiên Hoàng', 'thu.nht.63cntt@ntu.edu.vn', '0971234571', '556677889'),
    ('Đoàn Minh Cường', '63130109', '63.CNTT-1', 'Nam', '2001-06-18', 'Nha Trang', '234 Đường Nguyễn Thị Minh Khai', 'cuong.dmc.63cntt@ntu.edu.vn', '0912345671', '667788990'),
    ('Trương Quang Minh', '63130110', '63.CNTT-1', 'Nam', '2001-07-19', 'Nha Trang', '765 Đường Mai Thị Lựu', 'minh.tqm.63cntt@ntu.edu.vn', '0987654322', '778899001'),
    ('Bùi Minh Tài', '63130111', '63.CNTT-1', 'Nam', '2001-08-20', 'Nha Trang', '321 Đường Võ Thị Sáu', 'tai.bmt.63cntt@ntu.edu.vn', '0967123459', '889900112'),
    ('Phan Quốc Bảo', '63130112', '63.CNTT-1', 'Nam', '2001-09-21', 'Nha Trang', '654 Đường Lê Lợi', 'bao.pqb.63cntt@ntu.edu.vn', '0978765433', '990011223'),
    ('Trần Thị Hương', '63130113', '63.CNTT-1', 'Nữ', '2001-10-22', 'Nha Trang', '987 Đường Trần Quốc Toản', 'huong.tth.63cntt@ntu.edu.vn', '0912345670', '101112233'),
    ('Nguyễn Tấn Lực', '63130114', '63.CNTT-1', 'Nam', '2001-11-23', 'Nha Trang', '543 Đường Tân Kỳ Tân Quý', 'luc.ntl.63cntt@ntu.edu.vn', '0967334456', '223344556'),
    ('Vũ Quang Trung', '63130115', '63.CNTT-1', 'Nam', '2001-12-24', 'Nha Trang', '678 Đường Lê Quang Định', 'trung.vqt.63cntt@ntu.edu.vn', '0931122335', '334455667'),
    ('Lê Hương Giang', '63130116', '63.CNTT-1', 'Nữ', '2001-01-25', 'Nha Trang', '987 Đường Thanh Niên', 'giang.lhg.63cntt@ntu.edu.vn', '0969234570', '445566778'),
    ('Nguyễn Thiên Kim', '63130117', '63.CNTT-1', 'Nữ', '2001-02-26', 'Nha Trang', '432 Đường Nguyễn Khánh Toàn', 'kim.ntk.63cntt@ntu.edu.vn', '0912345680', '556677889'),
    ('Đoàn Thị Lành', '63130118', '63.CNTT-1', 'Nữ', '2001-03-27', 'Nha Trang', '765 Đường Phan Huy Chú', 'lan.dtl.63cntt@ntu.edu.vn', '0987654332', '667788990'),
    ('Phạm Thị Thảo', '63130119', '63.CNTT-1', 'Nữ', '2001-04-28', 'Nha Trang', '123 Đường Nguyễn Tất Thành', 'thao.ptt.63cntt@ntu.edu.vn', '0934567891', '778899001'),
    ('Trần Quốc Duy', '63130120', '63.CNTT-1', 'Nam', '2001-05-29', 'Nha Trang', '876 Đường Mạc Đĩnh Chi', 'duy.tqd.63cntt@ntu.edu.vn', '0972345699', '889900112'),
    ('Lê Thị Mai', '63130121', '63.CNTT-1', 'Nữ', '2001-06-30', 'Nha Trang', '234 Đường Nguyễn Trãi', 'mai.ltm.63cntt@ntu.edu.vn', '0913456790', '990011223');



INSERT INTO DienNuoc (PhongID, TuNgay, DenNgay, ChiSoDienCu, ChiSoDienMoi, ChiSoNuocCu, ChiSoNuocMoi, DonGiaDien, DonGiaNuoc)
VALUES
    (1, '2024-01-01', '2024-01-31', 120, 150, 30, 40, 2000, 5000),
    (2, '2024-01-01', '2024-01-31', 100, 130, 25, 35, 2000, 5000),
    (3, '2024-01-01', '2024-01-31', 150, 180, 45, 50, 2000, 5000),
    (4, '2024-01-01', '2024-01-31', 200, 220, 60, 70, 2000, 5000),
    (5, '2024-01-01', '2024-01-31', 180, 210, 55, 60, 2000, 5000),
    (6, '2024-01-01', '2024-01-31', 90, 120, 20, 30, 2000, 5000),
    (7, '2024-01-01', '2024-01-31', 130, 160, 40, 50, 2000, 5000),
    (8, '2024-01-01', '2024-01-31', 110, 140, 35, 45, 2000, 5000),
    (9, '2024-01-01', '2024-01-31', 160, 190, 50, 60, 2000, 5000),
    (10, '2024-01-01', '2024-01-31', 220, 240, 65, 75, 2000, 5000),
    (11, '2024-01-01', '2024-01-31', 140, 170, 38, 48, 2000, 5000),
    (12, '2024-01-01', '2024-01-31', 180, 210, 53, 63, 2000, 5000),
    (13, '2024-01-01', '2024-01-31', 160, 190, 47, 57, 2000, 5000),
    (14, '2024-01-01', '2024-01-31', 170, 200, 52, 62, 2000, 5000),
    (15, '2024-01-01', '2024-01-31', 140, 160, 42, 52, 2000, 5000),
    (16, '2024-01-01', '2024-01-31', 180, 210, 54, 64, 2000, 5000),
    (17, '2024-01-01', '2024-01-31', 130, 160, 40, 50, 2000, 5000),
    (18, '2024-01-01', '2024-01-31', 200, 220, 60, 70, 2000, 5000),
    (19, '2024-01-01', '2024-01-31', 90, 120, 25, 35, 2000, 5000),
    (20, '2024-01-01', '2024-01-31', 110, 140, 36, 46, 2000, 5000),
    (21, '2024-01-01', '2024-01-31', 150, 180, 45, 55, 2000, 5000),
    (22, '2024-01-01', '2024-01-31', 170, 200, 50, 60, 2000, 5000),
    (23, '2024-01-01', '2024-01-31', 120, 150, 32, 42, 2000, 5000),
    (24, '2024-01-01', '2024-01-31', 180, 210, 55, 65, 2000, 5000),
    (25, '2024-01-01', '2024-01-31', 160, 190, 50, 60, 2000, 5000),
    (26, '2024-01-01', '2024-01-31', 200, 230, 60, 72, 2000, 5000),
    (27, '2024-01-01', '2024-01-31', 140, 170, 39, 49, 2000, 5000),
    (28, '2024-01-01', '2024-01-31', 130, 160, 40, 50, 2000, 5000),
    (29, '2024-01-01', '2024-01-31', 120, 150, 30, 40, 2000, 5000),
    (30, '2024-01-01', '2024-01-31', 160, 190, 52, 62, 2000, 5000);


INSERT INTO HoaDon (PhongID, DienNuocID, NgayLapHD, TinhTrang)
VALUES
    (1, 1, '2024-02-01', 'Chưa thanh toán'),
    (2, 2, '2024-02-01', 'Chưa thanh toán'),
    (3, 3, '2024-02-01', 'Đã thanh toán'),
    (4, 4, '2024-02-01', 'Chưa thanh toán'),
    (5, 5, '2024-02-01', 'Đã thanh toán'),
    (6, 6, '2024-02-01', 'Chưa thanh toán'),
    (7, 7, '2024-02-01', 'Đã thanh toán'),
    (8, 8, '2024-02-01', 'Chưa thanh toán'),
    (9, 9, '2024-02-01', 'Chưa thanh toán'),
    (10, 10, '2024-02-01', 'Đã thanh toán'),
    (11, 11, '2024-02-01', 'Chưa thanh toán'),
    (12, 12, '2024-02-01', 'Đã thanh toán'),
    (13, 13, '2024-02-01', 'Chưa thanh toán'),
    (14, 14, '2024-02-01', 'Đã thanh toán'),
    (15, 15, '2024-02-01', 'Chưa thanh toán'),
    (16, 16, '2024-02-01', 'Đã thanh toán'),
    (17, 17, '2024-02-01', 'Chưa thanh toán'),
    (18, 18, '2024-02-01', 'Đã thanh toán'),
    (19, 19, '2024-02-01', 'Chưa thanh toán'),
    (20, 20, '2024-02-01', 'Đã thanh toán'),
    (21, 21, '2024-02-01', 'Chưa thanh toán'),
    (22, 22, '2024-02-01', 'Đã thanh toán'),
    (23, 23, '2024-02-01', 'Chưa thanh toán'),
    (24, 24, '2024-02-01', 'Đã thanh toán'),
    (25, 25, '2024-02-01', 'Chưa thanh toán'),
    (26, 26, '2024-02-01', 'Đã thanh toán'),
    (27, 27, '2024-02-01', 'Chưa thanh toán'),
    (28, 28, '2024-02-01', 'Đã thanh toán'),
    (29, 29, '2024-02-01', 'Chưa thanh toán'),
    (30, 30, '2024-02-01', 'Đã thanh toán');


INSERT INTO TaiKhoan (TenDangNhap, MatKhau, VaiTro) 
VALUES
    ('admin1', 'password123', 'quản túc K1'),
    ('admin2', 'password123', 'quản túc K2'),
    ('admin3', 'password123', 'quản túc K3'),
    ('admin4', 'password123', 'quản túc K4'),
    ('admin5', 'password123', 'quản túc K5'),
    ('admin7', 'password123', 'quản túc K7'),
    ('admin8', 'password123', 'quản túc K8');


INSERT INTO audit_log (ActionName, TableName, RecordID, ActionDate, Description, UserID)
VALUES
--    ('add item', 'SinhVien', 63130094, '2025-01-10 08:00:00', 'Thêm sinh viên Nguyễn Minh Tuấn', 1),
--    ('update item', 'SinhVien', 63130095, '2025-01-10 09:00:00', 'Cập nhật thông tin sinh viên Phạm Thanh Hoài', 2),
    ('update item', 'SinhVien', 63130095, '2025-01-10 09:00:00', 'Cập nhật thông tin sinh viên Phạm Thanh Hoài dskfdjkđ dfkdjfdkj dfkdnfjkndjkfd dfdfd kdfkdjfkjdfjkd kdfkdn', 3);



