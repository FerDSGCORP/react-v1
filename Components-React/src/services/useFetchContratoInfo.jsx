import { useState, useEffect } from 'react';
import {useFetchConfig} from './useFetchConfig';

const useFetchContratoInfo = (idFid) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { config } = useFetchConfig();

  useEffect(() => {
    if (!idFid || !config) {
      setLoading(true);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const uriApi=config.apiUri;
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        
        const response = await fetch(`${uriApi}/api/contrato/info/${idFid}`, {
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
  }, [idFid,config]);

  return { data, loading, error };
};

export default useFetchContratoInfo;
