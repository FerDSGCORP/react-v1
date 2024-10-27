import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useMenuService = () => {
  const [data, setData] = useState(null);
  const [records, setRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { config } = useFetchConfig();

  useEffect(() => {
    if (!config) {
      setLoading(true);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const uriApi = config.apiUri;
        const userDataStr = localStorage.getItem('userData');
        if (!userDataStr) {
          throw new Error('userData no encontrado en localStorage');
        }

        const userData = JSON.parse(userDataStr);
        const idUser = userData.numeroDePerfil;
        if (!idUser) {
          throw new Error('ID de usuario no encontrado en userData');
        }
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado en sessionStorage. Por favor, inicia sesión nuevamente.');
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(`${uriApi}/api/menu/modulo/10/perfil/${idUser}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error en la respuesta del servidor');
        }

        const jsonData = await response.json();

        if (isMounted) {
          setData(jsonData.menu);
          setRecords(jsonData.records || 0);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error al obtener el menú:', err.message);
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
  }, [config]);

  return { data, records, loading, error };
};

export default useMenuService;
