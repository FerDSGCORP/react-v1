import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useControlDocumental = (tablaNum) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const config = useFetchConfig();

  useEffect(() => {
    const numContrato = localStorage.getItem('idFidSelect');

    if (!tablaNum || !numContrato) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const userDataStr = localStorage.getItem('userData');
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }
        const userData = JSON.parse(userDataStr);
        const idUser = userData.numeroDeUsuario;

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-User-Id': `${idUser}`,
        };

        if (!config || !config.apiUri) {
          throw new Error('Configuración de API no disponible');
        }

        const uriApi = config.apiUri;
        const response = await fetch(`${uriApi}/api/hojacontroldet/documentos/numeroDeTabla/${tablaNum}/liga/${numContrato}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tablaNum, config]);

  return { data, loading, error };
};

export default useControlDocumental;
