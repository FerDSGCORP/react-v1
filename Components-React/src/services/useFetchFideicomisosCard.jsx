import { useState, useEffect } from 'react';
import {useFetchConfig} from './useFetchConfig';


const FideicomisosCard = (idFid) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!idFid) return;

      setLoading(true);
      try {
        // Obtener el token de sessionStorage
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }

        // Configurar los headers, incluyendo Authorization
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
        const config=await useFetchConfig();
        const uriApi=config.apiUri;
        // Hacer la petición GET con el token en los headers
        const response = await fetch(`${uriApi}/api/contrato/card/${idFid}`, {  
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData.contratos);
          setRecords(jsonData.records || 0); // Obtener el número de registros desde la respuesta
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
      isMounted = false;  // Limpieza: marcar el componente como desmontado.
    };
  }, [idFid]);

  return { data, records, loading, error };
};

export default FideicomisosCard;
