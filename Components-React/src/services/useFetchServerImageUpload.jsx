import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useUploadServerImg = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
        setLoading(true);
        try {      
          const token = sessionStorage.getItem('token');
          if (!token) {
            throw new Error('Token no encontrado en sessionStorage. Por favor, inicia sesión nuevamente.');
          }
      
      
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
      
          const config = await useFetchConfig();
          const uriApi = config.apiUri;
      
          const response = await fetch(`${uriApi}/upload`, {
            method: 'GET',
            headers: headers,
          });
      
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
      
          const jsonData = await response.json();
      
          if (isMounted) {
            setData(jsonData.menu);
            setRecords(jsonData.records || 0);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
      

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, records, loading, error };
};

export default useUploadServerImg;
