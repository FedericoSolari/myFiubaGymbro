import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { HomePage } from "../pages/Home";
import { UploadFile } from "../pages/UploadFile";
import { MyReceipPage } from "../pages/MyReceip";



export const AppRouter = () => {
  return ( // en el protectedRouted ahi dice a donde se dirige al principio, dado que todas las rutas son protegidas
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route path="/home" element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/upload_file" element={<ProtectedRoute />}>
        <Route path="/upload_file" element={<UploadFile />} />
      </Route>

      <Route path="/my_receipts" element={<ProtectedRoute />}>
        <Route path="/my_receipts" element={<MyReceipPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/*" element={<Navigate to="/signup" />} />
    </Routes >
  )
}
