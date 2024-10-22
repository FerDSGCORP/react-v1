import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useFideicomisosCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idFid, setIdFid] = useState(null);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {

        const token = sessionStorage.getItem('token');
        const userDataStr = localStorage.getItem('userData');
        

        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }
        if (!userDataStr) {
          throw new Error('Datos de usuario no encontrados.');
        }

        const userData = JSON.parse(userDataStr);
        const idUser = userData.numeroDeUsuario;

        setIdFid(idUser);


        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-User-Id': `${idUser}`, 
        };


        const config = await useFetchConfig();
        const uriApi = config.apiUri;




        const response = await fetch(`${uriApi}/api/contrato/card/${idUser}`, {
          method: 'GET',
          headers: headers,
        });
        if (response.status === 204) {
          return;
        }

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(`Error en la respuesta del servidor: ${response.status} - ${response.statusText}`);
        }


        const jsonData = await response.json();

        if (isMounted) {
          setData(jsonData.contratos);
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

  return { data, records, loading, error, idFid };
};

export default useFideicomisosCard;
