import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();

    console.log(auth);

    async function loginUser() {
        try {
            // const response = await fetch('http://localhost:8000/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password,
            //     }),
            // });
            // if (response.ok) {
            if (1) {
                console.log("Inicio exitoso");
                setErrorResponse('');

                // const userData = await response.json();
                auth.saveUser({
                    id: 1,
                    name: "fede",
                    surname:"solari",
                    username: "fede",
                    email: "fede@gmail.com",
                    status: true,
                });
                // auth.saveUser({
                //     id: userData.id,
                //     name: userData.name,
                //     surname: userData.surname,
                //     username: userData.username,
                //     email: userData.email,
                //     status: userData.status,
                // });
            } else {
                // const json = await response.json();
                // setErrorResponse(json.message || "Credenciales incorrectas.");
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            setErrorResponse("Error al iniciar sesión, su email y/o contraseña son incorrectos");
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        loginUser();
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/home"></Navigate>;
    }

    return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12 
                        bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">

            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
                    Bienvenido a 
                    {/* 1. Cambiado a 'inline-flex' para que "Factur" e "IA" no se separen.
                    2. Añadido 'items-baseline' para alinear verticalmente el texto.
                    */}
                    <span className="inline-flex items-baseline text-blue-600 font-extrabold text-5xl"> {/* ml-2 para un espacio */}
                    Factur
                    <span className="inline-block bg-blue-600 text-white px-1.5 py-0.5 ml-0.5 leading-none rounded-md">
                        IA
                    </span>
                    </span>
                </h1>

                <p className="mt-4 text-lg text-gray-700 font-medium">
                    ACA PONEMOS UN TEXTO LINDO
                </p>
                <p className="text-lg text-gray-700 font-medium mt-2">
                    ¡Inicia sesión para comenzar!
                </p>
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex justify-center mb-3">
                    {/* <img
                        width="80"
                        height="80"
                        className="drop-shadow"
                        // --- CAMBIO DE LA URL DE LA IMAGEN AQUÍ ---
                        src="https://img.icons8.com/ios-filled/80/document.png" // Icono de documento/comprobante
                        // Puedes probar con este si quieres algo más específico de recibo:
                        // src="https://img.icons8.com/ios-filled/80/receipt.png" 
                        // ------------------------------------------
                        alt="icono-comprobante" // Cambia el alt text para que sea más descriptivo
                    /> */}

                    <img
                        width="80"
                        height="80"
                        className="drop-shadow"
                        src="/docu_img.apng"
                        alt="icono-comprobante-animado"
                    />

                    {/* <img
                        width="80"
                        height="80"
                        className="drop-shadow"
                        src="/doc_img.gif" 
                        alt="icono-comprobante-animado"
                    />  */}

                </div>

                <h2 className="text-2xl font-bold text-gray-900 text-center">
                    Inicie sesión con email
                </h2>

                <div className="mt-6">
                    {!!errorResponse && (
                        <div className="mb-3 bg-red-100 py-2 rounded-lg">
                            <p className="text-red-600 text-center font-semibold">
                                {errorResponse}
                            </p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                className="w-full pl-3 py-2 rounded-lg border border-gray-300 
                                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                           transition-all shadow-sm"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ej. jperez@fi.uba.ar"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-semibold">
                                    Olvidó su contraseña?
                                </a>
                            </div>

                            <input
                                className="w-full pl-3 py-2 rounded-lg border border-gray-300 
                                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                           transition-all shadow-sm"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                required
                            />
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 
                                       text-white font-semibold rounded-lg shadow-md 
                                       transition-all text-sm"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        ¿Aún no tienes una cuenta?{" "}
                        <Link to="/" className="text-blue-600 hover:text-blue-500 font-semibold">
                            Registrarse
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}