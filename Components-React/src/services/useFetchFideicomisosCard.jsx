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

        console.log('Realizando la petición a:', `${uriApi}/api/contrato/card/${idUser}`);
        console.log('Headers utilizados:', headers);


        const response = await fetch(`${uriApi}/api/contrato/card/${idUser}`, {
          method: 'GET',
          headers: headers,
        });


        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Detalles del error:', errorResponse);
          throw new Error(`Error en la respuesta del servidor: ${response.status} - ${response.statusText}`);
        }


        const jsonData = await response.json();
        console.log('Datos obtenidos:', jsonData);

        if (isMounted) {
          setData(jsonData.contratos);
          setRecords(jsonData.records || 0);
        }
      } catch (err) {
        console.error('Error al obtener fideicomisos:', err.message);
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
