import Button from "../components/Buttons";
import Logotipo from "../assets/img/Logotipo.png"
import React, {useState} from "react";
import { useLocation } from "wouter";
import useFetchLogin from "../services/useFetchLogin"

function LogIn() {
    // Estados para manejar los campos del formulario
    const [nombreDeUsuario, setNombreDeUsuario] = useState("");
    const [password, setPassword] = useState("");

    // Hook personalizado para el envío del login
    const { login, loading, error } = useFetchLogin();

    // Estado adicional para manejar errores locales del componente
    const [localError, setLocalError] = useState(null);

    // Hook de navegación para redireccionar después del login
    const [_, navigate] = useLocation(); // Hook de wouter para redirigir

    // Manejar el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "nombreDeUsuario") {
            setNombreDeUsuario(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null); // Limpiar errores previos al intentar nuevamente

        try {
            // Mandar los datos del formulario al hook de login
            const response = await login({ nombreDeUsuario, password });

            if (response.success) {
                console.log("Login exitoso");

                // Guardar los datos del login en localStorage y sessionStorage
                const { token, autentificado, mensaje, ...otherData } = response.data;

                // Guardar el token en sessionStorage
                if (token) {
                    sessionStorage.setItem("token", token);
                }

                // Guardar el resto de los datos en localStorage
                localStorage.setItem("userData", JSON.stringify(otherData));

                // Redirigir al componente RenderView después del login exitoso
                setTimeout(() => {
                    navigate('/home/'); // Asegurar que se ejecute correctamente después del login
                }, 0);
            } else {
                // Si falla la autenticación, mostrar un mensaje de error específico
                setLocalError("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            }
        } catch (err) {
            // Capturar errores que puedan ocurrir en la petición
            setLocalError("Ha ocurrido un error inesperado. Por favor, inténtalo más tarde.");
            console.error("Error en el proceso de login:", err);
        }
    };

    return (
        <div className="bg-login">
            <div className="bg-color">
                <div className="card-logIn">
                    <form className="logIn-form" onSubmit={handleSubmit}>
                        <img className="logo-cliente" src={Logotipo} alt="Logotipo" />
                        <h2 className="logIn-form_Titular">Portal cliente</h2>
                        <span className="logIn-form_enc">Identifícate</span>
                        
                        <input 
                            type="text"
                            name="nombreDeUsuario"
                            value={nombreDeUsuario}
                            onChange={handleInputChange}
                            className="logIn-form_input"
                            placeholder="Nombre"
                        />
                        
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="logIn-form_input"
                            placeholder="Contraseña"
                        />

                        <Button 
                            text={loading ? "Cargando..." : "Iniciar Sesión"} 
                            className="btn-login" 
                            type="submit"
                            disabled={loading}
                        />

                        {/* Mostrar el mensaje de error si existe */}
                        {localError && <span className="error-message">{localError}</span>}
                        {error && <span className="error-message">Error: {error.message}</span>}

                        <span className="forgot-pass">Olvidé mi contraseña</span>
                    </form>
                </div>
                <div className="footer --foot-login">
                    <div className="copyright">
                        <h6>@DSGCorp. Todos los derechos reservados.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;