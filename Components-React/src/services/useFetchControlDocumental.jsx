import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useControlDocumental = (tablaNum) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { config } = useFetchConfig();

  useEffect(() => {
    const numContrato = localStorage.getItem('idFidSelect');
    if (!config) {
      setLoading(true);
      return;
    }
    if (!tablaNum || !numContrato) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const uriApi = config.apiUri;
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

        const response = await fetch(`${uriApi}/api/hojacontroldet/documentos/numeroDeTabla/${tablaNum}/liga/${numContrato}`, {
          method: 'GET',
          headers: headers,
        });

        if (response.status === 204) {
          setData([]);
        } else if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        } else {
          const jsonData = await response.json();
          setData(Array.isArray(jsonData.documentos) ? jsonData.documentos : []);
        }
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
