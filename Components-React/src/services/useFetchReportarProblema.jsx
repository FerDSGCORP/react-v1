import { useState } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useReportarProblema = () => {
  const [data, setData] = useState(null);
  const [records, setRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { config } = useFetchConfig();

  const sendFile = async (files, asunto, descripcion) => {
    setLoading(true);
    setError(null);
    try {
      if (!config) {
        throw new Error('Configuración no disponible.');
      }

      const uriApi = config.apiUri;
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado en sessionStorage. Por favor, inicia sesión nuevamente.');
      }

      const userDataStr = localStorage.getItem('userData');
      if (!userDataStr) {
        throw new Error('Datos de usuario no encontrados. Asegúrate de haber iniciado sesión.');
      }

      const userData = JSON.parse(userDataStr);
      const idUser = userData.numeroDeUsuario;

      const headers = {
        'Authorization': `Bearer ${token}`,
        'X-User-Id': `${idUser}`,
      };

      const formData = new FormData();
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('file', file);
        });
      }
      formData.append('asunto', asunto);
      formData.append('descripcion', descripcion);

      const response = await fetch(`${uriApi}/api/rebug/Reporte`, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error del servidor: ${errorResponse.message || 'Respuesta no válida'}`);
      }

      const jsonData = await response.json();
      setData(jsonData.menu);
      setRecords(jsonData.records || 0);

      return jsonData;

    } catch (err) {
      console.error('Error al enviar el archivo:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendFile, data, records, loading, error };
};

export default useReportarProblema;
