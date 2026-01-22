import React, { useState } from "react";
import { FiUpload, FiFileText } from "react-icons/fi";

export const ComprobantesPage = () => {
  const [files, setFiles] = useState<File[]>([]);

  const comprobantes = [
    { name: "factura_enero_2025.pdf", date: "14/1/2025", status: "Procesado" },
    { name: "recibo_servicios_12.pdf", date: "13/1/2025", status: "Procesado" },
    { name: "comprobante_compra.pdf", date: "12/1/2025", status: "Pendiente" },
    { name: "ticket_003421.pdf", date: "9/1/2025", status: "Error" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Procesado":
        return "bg-green-100 text-green-700";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-700";
      case "Error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-8 py-6">
      <div className="flex flex-col gap-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Subir comprobantes
          </h1>
          <p className="text-gray-500">
            Cargá tus facturas en PDF y nosotros hacemos el resto.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">

          {/* UPLOAD - IZQUIERDA */}
          <div className="bg-white rounded-2xl shadow p-10 w-full">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 hover:border-indigo-400 transition">
              <FiUpload className="text-5xl text-indigo-500" />
              <p className="text-gray-600 font-medium">
                Arrastrá el archivo PDF aquí
              </p>
              <p className="text-gray-400 text-sm">
                o seleccioná uno desde tu computadora
              </p>

              <label className="mt-4 cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold shadow cursor-pointer">
                  Seleccionar archivo
                </span>
              </label>
            </div>
          </div>

          {/* HISTORIAL - DERECHA */}
          <div className="bg-white rounded-2xl shadow p-8 w-full flex flex-col">
            <h2 className="text-xl font-semibold mb-6">
              Últimos comprobantes subidos
            </h2>

            <div className="divide-y flex-1">
              {comprobantes.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <FiFileText className="text-indigo-500 text-xl" />
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-gray-400">{c.date}</p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTÓN VER MÁS */}
            <div className="flex justify-end mt-6">
              <button
                className="
                  px-5 py-2
                  rounded-full
                  border border-gray-200
                  text-sm font-medium text-gray-600
                  bg-white
                  hover:bg-gray-50
                  hover:border-gray-300
                  hover:text-gray-800
                  transition
                "
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
