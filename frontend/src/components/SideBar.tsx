import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaUserCircle} from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";
import { FaFileAlt, FaExclamationCircle, FaChartLine, FaCog } from 'react-icons/fa'; // O FaFileLines, FaRegFileAlt para Comprobantes
import { GiMeal } from "react-icons/gi";

interface Menu {
  label: string;
  link: string;
  icon: React.ElementType;
  click?: boolean;
}

export default function SidebarLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // <-- colapsable

  const menus: Menu[] = [
    { label: "Home", link: "/home", icon: FaUserCircle },
    { label: "Comprobantes", link: "/comprobantes", icon: FaFileAlt }, 
    { label: "Reclamos", link: "/reclamos", icon: FaExclamationCircle }, 
    { label: "Mejoras IA", link: "/mejoras-ia", icon: FaChartLine },
    { label: "Configuración", link: "/configuracion", icon: FaCog },
    { label: "Cerrar sesión", link: "/", icon: MdLogout, click: true },
  ];

  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    auth.signOut();
    navigate("/login");
  }

  if (location.pathname === "/signup" || location.pathname === "/login")
    return null;

  return (
    <div className="flex bg-gray-100">
      <div
        className={`
          h-screen bg-white py-6 px-3 flex flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-60"}
        `}
      >
        {/* Header + Toggle Button */}
        <div className="flex items-center justify-between px-2 mb-6">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500 text-white rounded-xl flex items-center justify-center text-lg">
                📄
              </div>
              <span className="text-xl font-semibold text-gray-700">
                FacturIA
              </span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaBars />
          </button>
        </div>

        {/* Menú */}
        <nav className="flex flex-col gap-1">
          {menus.map((menu, idx) => {
            const isActive = location.pathname === menu.link;

            return (
              <Link
                key={idx}
                to={menu.link}
                onClick={menu.click ? handleSignOut : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition 
                  ${isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"}
                `}
              >
                {React.createElement(menu.icon, {
                  size: 22,
                  className: isActive ? "text-indigo-600" : "text-gray-500",
                })}

                {/* Hide text when collapsed */}
                {!collapsed && (
                  <span className="text-sm font-medium">{menu.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
