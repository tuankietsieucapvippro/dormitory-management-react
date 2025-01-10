import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import BuildingPage from "./pages/BuildingPage";
import RoomPage from "./pages/RoomPage";
import TypeRoomPage from "./pages/TypeRoomPage";
import ElecWaterPage from "./pages/ElecWaterPage";
import StudentPage from "./pages/StudentPage";
import RegisterPage from "./pages/RegisterPage";
import SupportPage from "./pages/SupportPage";
import CreateBuildingPage from "./pages/CreateBuildingPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import CreateTypeRoomPage from "./pages/CreateTypeRoomPage";
import CreateElecWaterPage from "./pages/CreateElecWaterPage";
import CreateStudentPage from "./pages/CreateStudentPage";
import BuildingDetailPage from "./pages/BuildingDetailPage";
import EditBuildingPage from "./pages/EditBuildingPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import EditRoomPage from "./pages/EditRoomPage";
import TypeRoomDetailPage from "./pages/TypeRoomDetailPage";
import EditTypeRoomPage from "./pages/EditTypeRoomPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import EditStudentPage from "./pages/EditStudentPage";
import EditElecWaterPage from "./pages/EditElecWaterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/room"
          element={
            <PrivateRoute>
              <RoomPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/building"
          element={
            <PrivateRoute>
              <BuildingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/type-room"
          element={
            <PrivateRoute>
              <TypeRoomPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/elec-water"
          element={
            <PrivateRoute>
              <ElecWaterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/support"
          element={
            <PrivateRoute>
              <SupportPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student"
          element={
            <PrivateRoute>
              <StudentPage />
            </PrivateRoute>
          }
        />
        <Route path="/building/create" element={<CreateBuildingPage />} />
        <Route path="/room/create" element={<CreateRoomPage />} />
        <Route path="/type-room/create" element={<CreateTypeRoomPage />} />
        <Route path="/elec-water/create" element={<CreateElecWaterPage />} />
        <Route path="/student/create" element={<CreateStudentPage />} />
        <Route path="/building/:id" element={<BuildingDetailPage />} />
        <Route path="/building/edit/:id" element={<EditBuildingPage />} />
        <Route path="/room/:id" element={<RoomDetailPage />} />
        <Route path="/room/edit/:id" element={<EditRoomPage />} />
        <Route path="/type-room/:id" element={<TypeRoomDetailPage />} />
        <Route path="/type-room/edit/:id" element={<EditTypeRoomPage />} />
        <Route path="/student/:id" element={<StudentDetailPage />} />
        <Route path="/student/edit/:id" element={<EditStudentPage />} />
        <Route path="/elec-water/edit/:id" element={<EditElecWaterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
