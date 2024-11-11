import { useState, useEffect } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useExportarDatosTable = (payload, ligaServer) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { config } = useFetchConfig();
  
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!config || !payload) {
        setLoading(true);
        return;
      }

      setLoading(true);
      try {
        const uriApi = config.apiUri;
        const token = sessionStorage.getItem('token');
        const userDataStr = localStorage.getItem('userData');
        if (!token) {
          throw new Error('Token no encontrado en sessionStorage. Por favor, inicia sesión nuevamente.');
        }

        const userData = JSON.parse(userDataStr);
        const idUser = userData.numeroDeUsuario;

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-User-Id': `${idUser}`, 
        };

        

        const response = await fetch(`${uriApi}/api/${ligaServer}/exporta`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const blob = await response.blob();

        // Crear URL para descargar el archivo
        const fileURL = window.URL.createObjectURL(blob);
        const fileName = payload.formatos === 'csv' ? 'archivo.csv' : 'archivo.txt';

        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(fileURL); // Liberar memoria
        document.body.removeChild(a);
        
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
  }, [payload]);

  return { loading, error };
};

export default useExportarDatosTable;
