import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useEnvioInstruction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
        setLoading(true);
        try {
          // Obtener userData del localStorage y parsear el JSON
          const userDataStr = localStorage.getItem('userData');
          if (!userDataStr) {
            throw new Error('userData no encontrado en localStorage');
          }
      
          const userData = JSON.parse(userDataStr);
          const idUser = userData.numeroDeUsuario;
          if (!idUser) {
            throw new Error('ID de usuario no encontrado en userData');
          }
      
          console.log('ID de usuario obtenido del localStorage:', idUser); // Verificar el valor de idUser
      
          // Obtener el token de sessionStorage
          const token = sessionStorage.getItem('token');
          if (!token) {
            throw new Error('Token no encontrado en sessionStorage. Por favor, inicia sesión nuevamente.');
          }
      
          console.log('Token encontrado:', token); // Verificar que el token se haya obtenido
      
          // Configurar los headers, incluyendo Authorization
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
      
          // Obtener configuración de la API
          const config = await useFetchConfig();
          const uriApi = config.apiUri;
          console.log('URI de la API:', uriApi); // Verificar la URI de la API
      
          // Hacer la petición GET con el token en los headers
          console.log('Haciendo fetch a:', `${uriApi}/api/menu/modulo/10/perfil/${idUser}`);
          const response = await fetch(`${uriApi}/api/menu/modulo/10/perfil/${idUser}`, {
            method: 'GET',
            headers: headers,
          });
      
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
      
          const jsonData = await response.json();
          console.log('Respuesta del menú:', jsonData); // Verificar la respuesta
      
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
      isMounted = false; // Limpieza: marcar el componente como desmontado.
    };
  }, []);

  return { data, records, loading, error };
};

export default useEnvioInstruction;
