
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { AiOutlineSync } from 'react-icons/ai';
import upload from '../../images/upluad.webp';
import dietas from '../../images/historial.png';
import smartwatch from '../../images/smartwatch.png';
import garmin from '../../images/garmin.png';


export interface UserHomeProps {
    updateHome: boolean;
    onUpdateHome: (value: boolean) => void;
}

export const UserHome = ({ updateHome, onUpdateHome }: UserHomeProps) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const user_id = auth.getUserId();

    const [synced, setSynced] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);

    const categories = [
        {
            title: 'Cargar Comprobante ',
            description: 'Subi tu comprobante en formato PDF y del resto nos encargamos nosotros.',
            colorFrom: 'from-orange-600',
            colorTo: 'to-orange-400',
            image: upload,
            path: '/upload_file',
        },
        {
            title: 'Mis comprobantes',
            description: 'Ver un registro historico de los comprobantes cargados.',
            colorFrom: 'from-emerald-800',
            colorTo: 'to-emerald-500',
            image: dietas,
            path: '/my_receipts',
        }
    ];

    return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">

    <div className="max-w-5xl w-full">

      {/* HERO */}
      <div className="text-center mb-16">

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Hola {auth.getUserName()} 👋
        </h1>

        <p className="text-slate-500 text-lg">
          Gestioná tus comprobantes de forma inteligente con IA
        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* SUBIR COMPROBANTE (PRINCIPAL) */}
        <div
          onClick={() => navigate('/upload_file')}
          className="
            relative group cursor-pointer rounded-3xl p-10
            bg-gradient-to-br from-indigo-600 to-purple-600
            text-white shadow-xl hover:shadow-2xl
            transition-all duration-300
            hover:-translate-y-2
            overflow-hidden
          "
        >

          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-white blur-3xl" />

          <div className="relative z-10 flex flex-col h-full">

            <div className="text-6xl mb-6">📤</div>

            <h2 className="text-3xl font-semibold mb-3">
              Subir comprobante
            </h2>

            <p className="opacity-90 mb-8">
              Cargá tu PDF y dejá que la IA procese toda la información por vos.
            </p>

            <div className="mt-auto flex items-center gap-3 font-semibold text-lg">
              Comenzar
              <FiArrowRight />
            </div>

          </div>
        </div>

        {/* HISTORIAL */}
        <div
          onClick={() => navigate('/my_receipts')}
          className="
            relative group cursor-pointer rounded-3xl p-10
            bg-white backdrop-blur
            border border-slate-100
            shadow-lg hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-2
          "
        >

          <div className="flex flex-col h-full">

            <div className="text-6xl mb-6">📑</div>

            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              Mis comprobantes
            </h2>

            <p className="text-slate-500 mb-8">
              Revisá el historial de archivos cargados y su estado de procesamiento.
            </p>

            <div className="mt-auto flex items-center gap-3 text-indigo-600 font-semibold">
              Ver historial
              <FiArrowRight />
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER MINI INFO */}
      <div className="mt-16 text-center text-sm text-slate-400">
        Procesamiento automático • Reclamos inteligentes • Descargas rápidas
      </div>

    </div>
  </div>
);




}