import { useState } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useRecuperaPass = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { config, loadingConfig, errorConfig } = useFetchConfig();

    const recuperaPsw = async ({ passwordActual, passwordNuevo, passwordNuevoConfirm }) => {
        if (!config) {
            setError('La configuración no ha sido cargada aún.');
            return { success: false, error: 'La configuración no ha sido cargada aún.' };
        }
        setLoading(true);
        setError(null);

        try {
            const uriApi = config.apiUri;
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('Token no encontrado en sessionStorage. Por favor, inicia sesión nuevamente.');
            }
            const userDataStr = localStorage.getItem('userData');
            if (!userDataStr) {
                throw new Error('Datos de usuario no encontrados. Asegúrate de haber iniciado sesión.');
            }

            const userData = JSON.parse(userDataStr);
            const idUser = userData.numeroDeUsuario;
            const response = await fetch(`${uriApi}/api/usuario/cambioPass/${idUser}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ passwordActual, passwordNuevo, passwordNuevoConfirm })
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                return { success: true, data };
            } else {
                setLoading(false);
                setError(data);
                return { success: false, data };
            }
        } catch (err) {
            setLoading(false);
            setError(err);
            return { success: false, error: err };
        }
    };

    return { recuperaPsw, loading, error };
};

export default useRecuperaPass;
