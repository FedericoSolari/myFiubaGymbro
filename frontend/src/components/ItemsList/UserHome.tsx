
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
            path: '/diets-recommendation',
        }
    ];

    return (
        <div className="h-full p-6 bg-white text-black">
            <h2 className="text-3xl font-bold mb-8">¡Hola {auth.getUserName()}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            navigate(cat.path);
                        }}
                        className={`relative overflow-hidden cursor-pointer rounded-2xl shadow-lg bg-gradient-to-r ${cat.colorFrom} ${cat.colorTo} text-white p-6 flex flex-col md:flex-row items-center gap-6
                                   hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02]}`}
                    >
                        <div className="flex flex-col flex-1 z-10">
                            <h3 className="text-2xl font-semibold mb-2">{cat.title}</h3>
                            <p className="mb-4 text-sm opacity-90">{cat.description}</p>
                            {
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        navigate(cat.path);
                                    }}
                                    className="self-start bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-shadow shadow-sm hover:shadow-md flex items-center gap-1"
                                >
                                    Ir <FiArrowRight />
                                </button>
                            }
                        </div>

                        {
                            <div className="flex-shrink-0 order-2 md:order-2 z-10">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-32 h-32 rounded-xl object-cover shadow-lg"
                                />
                            </div>
                       }
                    </div>
                ))}
            </div>
        </div >
    );
};