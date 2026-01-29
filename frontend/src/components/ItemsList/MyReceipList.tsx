import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiAlertCircle,
  FiTrendingUp,
  FiSettings,
  FiUser,
  FiFilter,
  FiDownload,
  FiEye,
  FiLink,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiActivity,
  FiHome,
} from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa6"; // Icono específico de PDF
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";


// --- Tipos de datos para la tabla ---
type ComprobanteStatus = "Procesado" | "Pendiente" | "Error" | "Aprendizaje";

interface ComprobanteData {
  id: number;
  archivo: string;
  emisor: string;
  cuit: string;
  tipo: string;
  estado: ComprobanteStatus;
  fecha: string;
}

// --- Datos de Ejemplo (Mock Data) basados en la imagen ---
const comprobantesData: ComprobanteData[] = [
  { id: 1, archivo: "factura_enero_2025.pdf", emisor: "Empresa ABC S.A.", cuit: "30-12345678-9", tipo: "Factura", estado: "Procesado", fecha: "14/1/2025" },
  { id: 2, archivo: "recibo_servicios_17.pdf", emisor: "Fede S.A.", cuit: "33-98765432-1", tipo: "Recibo", estado: "Procesado", fecha: "13/1/2025" },
  { id: 3, archivo: "comprobante_compra.pdf", emisor: "Comercio 123", cuit: "30-55555555-5", tipo: "Comprobante", estado: "Pendiente", fecha: "12/1/2025" },
  { id: 4, archivo: "ticket_003421.pdf", emisor: "Retail Store", cuit: "30-11111111-1", tipo: "Ticket", estado: "Error", fecha: "9/1/2025" },
  { id: 5, archivo: "factura_servicio_001.pdf", emisor: "Tech Solutions", cuit: "30-99999999-9", tipo: "Factura", estado: "Aprendizaje", fecha: "7/1/2025" },
  { id: 6, archivo: "nota_credito_456.pdf", emisor: "Empresa ABC S.A.", cuit: "30-12345678-9", tipo: "Nota de Crédito", estado: "Procesado", fecha: "4/1/2025" },
] as any; // "as any" usado para simplificar el ejemplo con campos opcionales como "servicios" vs "emisor"

// --- Componente Auxiliar para el Badge de Estado ---
const StatusBadge = ({ status }: { status: ComprobanteStatus }) => {
  const getStatusStyles = (status: ComprobanteStatus) => {
    switch (status) {
      case "Procesado":
        return { container: "bg-green-50 text-green-700 border-green-200", icon: <FiCheckCircle /> };
      case "Pendiente":
        return { container: "bg-orange-50 text-orange-700 border-orange-200", icon: <FiClock /> };
      case "Error":
        return { container: "bg-red-50 text-red-700 border-red-200", icon: <FiXCircle /> };
      case "Aprendizaje":
        // Usamos un morado/azul similar al de la imagen para aprendizaje
        return { container: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: <FiActivity /> };
      default:
        return { container: "bg-gray-50 text-gray-600 border-gray-200", icon: null };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles.container}`}>
      {styles.icon}
      {status}
    </span>
  );
};


// --- COMPONENTE PRINCIPAL DE PÁGINA ---
export const MyReceip = () => {
  const [estadoFiltro, setEstadoFiltro] = useState<ComprobanteStatus | "Todos">("Todos");
  const [tipoFiltro, setTipoFiltro] = useState<string>("Todos");
  const navigate = useNavigate();

  
  const comprobantesFiltrados = comprobantesData.filter((item) => {
    const coincideEstado =
      estadoFiltro === "Todos" || item.estado === estadoFiltro;
  
    const coincideTipo =
      tipoFiltro === "Todos" || item.tipo === tipoFiltro;
  
    return coincideEstado && coincideTipo;
  });


  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-700 flex flex-col">
      
      
      {/* Volver */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6"
            >
              <FiArrowLeft />
              Volver
            </button>


        {/* --- ÁREA DE CONTENIDO PRINCIPAL (Derecha) --- */}
        <main className="flex-1 md:ml-64 p-6 lg:p-10 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-800 mb-6">Historial de comprobantes</h1>

                {/* BARRA DE FILTROS */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 font-medium px-2">
                        <FiFilter size={18} />
                        <span>Filtros:</span>
                    </div>
                    {/* Dropdowns simulados */}
                    <select
                      value={estadoFiltro}
                      onChange={(e) => setEstadoFiltro(e.target.value as any)}
                      className="bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer rounded-lg px-4 py-2 text-sm text-slate-700 min-w-[180px] outline-none"
                    >
                      <option value="Todos">Todos los estados</option>
                      <option value="Procesado">Procesado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Error">Error</option>
                      <option value="Aprendizaje">Aprendizaje</option>
                    </select>

                    <select
                      value={tipoFiltro}
                      onChange={(e) => setTipoFiltro(e.target.value)}
                      className="bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer rounded-lg px-4 py-2 text-sm text-slate-700 min-w-[180px] outline-none"
                    >
                      <option value="Todos">Todos los tipos</option>
                      <option value="Factura">Factura</option>
                      <option value="Recibo">Recibo</option>
                      <option value="Comprobante">Comprobante</option>
                      <option value="Ticket">Ticket</option>
                      <option value="Nota de Crédito">Nota de Crédito</option>
                    </select>

                </div>


                {/* TABLA DE DATOS */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="px-6 py-5">Archivo</th>
                                    <th className="px-6 py-5">Emisor</th>
                                    <th className="px-6 py-5">CUIT</th>
                                    <th className="px-6 py-5">Tipo</th>
                                    <th className="px-6 py-5">Estado</th>
                                    <th className="px-6 py-5">Fecha de procesamiento</th>
                                    <th className="px-6 py-5 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {comprobantesFiltrados.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors text-sm text-slate-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 font-medium text-slate-800">
                                                <FaRegFilePdf className="text-red-400 text-lg flex-shrink-0" />
                                                <span className="truncate max-w-[200px]" title={item.archivo}>{item.archivo}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {item.emisor}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                            {item.cuit}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {item.tipo}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={item.estado} />
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {item.fecha}
                                        </td>
                                        <td className="px-6 py-4">
                                          <div className="flex items-center justify-center gap-4 text-slate-400">

                                            {/* Descargar MODIFICAR LINK */}
                                            <button
                                              onClick={() => navigate(`/comprobantes/${item.id}/descargar`)}
                                              className="hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition"
                                              title="Descargar"
                                            >
                                              <FiDownload size={18} />
                                            </button>

                                            {/* Ver */}
                                            <button
                                              // onClick={() => navigate(`/comprobantes/${item.id}/ver`)}
                                              onClick={() => navigate(`/file_view`)}
                                              className="hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition"
                                              title="Ver comprobante"
                                            >
                                              <FiEye size={18} />
                                            </button>

                                            {/* Compartir */}
                                            <button
                                              onClick={() => navigate(`/comprobantes/${item.id}/compartir`)}
                                              className="hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-md transition"
                                              title="Compartir"
                                            >
                                              <FiLink size={18} />
                                            </button>

                                          </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     {/* Paginación simple inferior (opcional, para completar el look de tabla) */}
                     <div className="px-6 py-4 border-t border-slate-100 text-sm text-slate-500 flex justify-between items-center bg-slate-50/30">
                        <p>Mostrando 6 de 45 resultados</p>
                        <div className="flex gap-2">
                             <button className="px-3 py-1 border rounded bg-white disabled:opacity-50" disabled>Anterior</button>
                             <button className="px-3 py-1 border rounded bg-white hover:bg-slate-50">Siguiente</button>
                        </div>
                     </div>
                </div>
            </div>
        </main>
      </div>
  );
};