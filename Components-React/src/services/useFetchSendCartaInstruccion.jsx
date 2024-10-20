import { useState } from 'react';
import { useFetchConfig } from './useFetchConfig';

const useEnvioInstruction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState(0);

  const sendFile = async (file) => {
    setLoading(true);
    try {
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
  
      // Extraer el número de contrato desde la URL
      const pathArray = window.location.pathname.split('/');
      const numeroDeContrato = pathArray[pathArray.length - 1];
  
      if (!numeroDeContrato) {
        throw new Error('No se pudo obtener el número de contrato de la URL.');
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,
        'X-User-Id': `${idUser}`,
      };
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('numeroDeContrato', numeroDeContrato);
  
      const config = await useFetchConfig();
      const uriApi = config.apiUri;
  
      const response = await fetch(`${uriApi}/api/cartaIns/uploadFile`, {
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
  
      // Devuelve el jsonData al componente para que maneje la respuesta
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

export default useEnvioInstruction;
