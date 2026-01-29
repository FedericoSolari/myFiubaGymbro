
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface CampoReclamo {
  key: string;
  label: string;
  value: string;
}

export const FileViewList = () => {
  const navigate = useNavigate();

  // 🔧 Simula JSON que vendrá del backend
  const [campos, setCampos] = useState<CampoReclamo[]>([
    { key: "tipo", label: "Tipo de Comprobante", value: "Factura" },
    { key: "numero", label: "Número de Comprobante", value: "001-00003421" },
    { key: "fecha", label: "Fecha de Emisión", value: "2025-01-15" },
    { key: "emisor", label: "Emisor / Razón Social", value: "Empresa ABC S.A." },
    { key: "cuit", label: "CUIT Emisor", value: "30-12345678-9" },
    { key: "direccion", label: "Dirección", value: "Av. Corrientes 1234, CABA" },
    { key: "iva", label: "Condición IVA", value: "Responsable Inscripto" },
    { key: "subtotal", label: "Subtotal", value: "$ 120.000" },
    { key: "ivaMonto", label: "IVA", value: "$ 25.200" },
    { key: "total", label: "Total", value: "$ 145.200" }
  ]);

  const handleChange = (index: number, newValue: string) => {
    const copia = [...campos];
    copia[index].value = newValue;
    setCampos(copia);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 lg:p-10">

      {/* Volver */}
      <div className="sticky top-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/80 backdrop-blur border border-slate-200
            text-slate-600 font-medium text-sm
            shadow-sm hover:shadow-md
            hover:text-indigo-600 hover:border-indigo-200
            transition-all duration-200
            group
          "
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">

        {/* ================== VISTA PDF ================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Vista del comprobante
          </h2>

          <div className="flex-1 border rounded-xl bg-slate-50 flex flex-col items-center justify-center gap-3">

            <div className="bg-red-100 text-red-500 p-4 rounded-full">
              <FaRegFilePdf size={28} />
            </div>

            <p className="text-sm font-medium text-slate-700">
              factura_enero_2025.pdf
            </p>

            <p className="text-xs text-slate-400">
              Vista previa del PDF
            </p>

          </div>

          {/* Estado */}
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200">
              ● Procesado
            </span>
          </div>
        </div>

        {/* ================== RECLAMO DINÁMICO ================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">

          <h2 className="text-lg font-semibold text-slate-800 mb-1">
            Cargar reclamo
          </h2>

          <p className="text-sm text-slate-500 mb-4">
            Revisá y corregí los campos extraídos por la IA. 
            Los campos modificados serán enviados como reclamos automáticamente.
          </p>

          {/* CONTENEDOR CON SCROLL */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">

            {campos.map((campo, index) => (
              <div key={campo.key} className="flex flex-col gap-1">

                <label className="text-sm text-slate-600 font-medium">
                  {campo.label}
                </label>

                <input
                  type="text"
                  value={campo.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>
            ))}

          </div>

          {/* BOTONES */}
          <div className="mt-6 flex gap-4">

            <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2.5 rounded-full transition">
              Enviar reclamos
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-slate-200 hover:bg-slate-50 text-sm py-2.5 rounded-full transition"
            >
              Cancelar
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

