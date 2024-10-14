import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useEnvioInstruction = (file) => {
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

        console.log('Token encontrado:', token);

        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const formData = new FormData();
        formData.append('file', file);  // Se agrega el archivo al FormData

        const config = await useFetchConfig();
        const uriApi = config.apiUri;
        console.log('URI de la API:', uriApi);

        const response = await fetch(`${uriApi}/upload`, {
          method: 'POST',
          // Content-Type': 'multipart/form-data',  fetch lo maneja automaticamente con FormData
          headers: headers, 
          body: formData,
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

    if (file) {  // Solo hacer la solicitud si se proporciona un archivo
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [file]);

  return { data, records, loading, error };
};

export default useEnvioInstruction;
