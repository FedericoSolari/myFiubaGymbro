import React, { useState } from "react";
import { FiUpload, FiFileText, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ComprobantesPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const comprobantes = [
    { name: "factura_enero_2025.pdf", date: "14/1/2025", status: "Procesado", size: "1.2 MB" },
    { name: "recibo_servicios_12.pdf", date: "13/1/2025", status: "Procesado", size: "850 KB" },
    { name: "comprobante_compra.pdf", date: "12/1/2025", status: "Pendiente", size: "2.4 MB" },
    { name: "ticket_003421.pdf", date: "9/1/2025", status: "Error", size: "120 KB" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Procesado":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Pendiente":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Error":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Procesado": return <FiCheckCircle className="mr-1" />;
      case "Pendiente": return <FiClock className="mr-1" />;
      case "Error": return <FiAlertCircle className="mr-1" />;
      default: return null;
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 md:px-8 py-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* Volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6"
          >
          <FiArrowLeft />
          Volver
        </button>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Mis Comprobantes
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Gestioná y subí tus facturas en PDF fácilmente.
            </p>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            Mostrando últimos movimientos
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">

          {/* UPLOAD - IZQUIERDA (Ocupa 7 columnas en desktop) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 h-full">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Subir nuevo archivo</h3>
            
            <div className="h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center gap-4 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all duration-300 group cursor-pointer relative">
              
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FiUpload className="text-4xl" />
              </div>

              <div className="space-y-1">
                <p className="text-slate-700 font-semibold text-lg">
                  Arrastrá tu PDF aquí
                </p>
                <p className="text-slate-400 text-sm">
                  Soporta archivos hasta 10MB
                </p>
              </div>

              <label className="mt-4 relative z-10">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <span className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer">
                  Explorar archivos
                </span>
              </label>
            </div>
            
            {/* Pequeña lista de archivos recién seleccionados (feedback visual) */}
            {files.length > 0 && (
                <div className="mt-6 space-y-2">
                    <p className="text-sm font-semibold text-slate-500">Listos para subir:</p>
                    {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-2 rounded-lg">
                            <FiFileText className="text-indigo-500"/> {f.name}
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* HISTORIAL - DERECHA (Ocupa 5 columnas en desktop) */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 w-full flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Recientes
              </h2>
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 hover:underline">
                Filtrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-col gap-3">
                {comprobantes.map((c, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icono del archivo */}
                      <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-sm transition-colors">
                        <FiFileText className="text-2xl" />
                      </div>
                      
                      {/* Info del archivo */}
                      <div>
                        <p className="font-semibold text-slate-700 text-sm md:text-base line-clamp-1" title={c.name}>
                          {c.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span>{c.date}</span>
                          <span>•</span>
                          <span>{c.size || 'PDF'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge de Estado */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center whitespace-nowrap ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {getStatusIcon(c.status)}
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTÓN VER MÁS */}
            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all text-sm"
              >
                Ver todos los comprobantes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};