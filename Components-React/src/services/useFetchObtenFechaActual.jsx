import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useFetchObtenFechaActual = () => {
    const [data, setData] = useState(null);  // Guardará la información del contrato
    const [loading, setLoading] = useState(true);  // Estado de carga
    const [error, setError] = useState(null);  // Estado de error si ocurre

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Obtener el token de sessionStorage
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
                }

                // Configurar los headers, incluyendo el Authorization con el Bearer token
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                const config = await useFetchConfig();
                const uriApi = config.apiUri;

                // Hacer la petición GET al servidor con los headers y la URL adecuada
                const response = await fetch(`${uriApi}/api/general/obtenFechaActual`, {
                    method: 'GET',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                const jsonData = await response.json();
                setData(jsonData);  // Guardamos los datos obtenidos
            } catch (err) {
                setError(err.message);  // Capturamos el error
            } finally {
                setLoading(false);  // Terminamos la carga
            }
        };

        fetchData();

    }, []);  // Ejecutar solo una vez al montar el componente

    return { data, loading, error };
};

export default useFetchObtenFechaActual;
