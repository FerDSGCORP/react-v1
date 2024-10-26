import { useState, useEffect } from 'react';


const useControlDocumental = (tablaNum) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const numContrato = localStorage.getItem('idFidSelect');

    if (!tablaNum || !numContrato) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const userDataStr = localStorage.getItem('userData');
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }
        const userData = JSON.parse(userDataStr);
        const idUser = userData.numeroDeUsuario;

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-User-Id': `${idUser}`,
        };


        const response = await fetch(`http://win-k3v3h0qliq2:8112/api/hojacontroldet/documentos/numeroDeTabla/${tablaNum}/liga/${numContrato}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const jsonData = await response.json();

        setData(Array.isArray(jsonData.documentos) ? jsonData.documentos : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tablaNum]);

  return { data, loading, error };
};

export default useControlDocumental;
