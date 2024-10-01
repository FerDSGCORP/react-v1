import { useState, useEffect } from 'react';

const useFetchContrato = (page = 1, rows = 80, filters = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener el token de sessionStorage
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
        }

        // Obtener el numeroDeUsuario de localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
          throw new Error('Datos del usuario no encontrados. Por favor, inicia sesión nuevamente.');
        }

        const { numeroDeUsuario } = JSON.parse(userData);
        if (!numeroDeUsuario) {
          throw new Error('Número de usuario no encontrado. Por favor, verifica los datos de usuario.');
        }

        // Configurar los headers, incluyendo Authorization y X-User-Id
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-User-Id': numeroDeUsuario, // Incluir el número de usuario en el header
        };

        // Si se reciben filtros, los convertimos en JSON y los añadimos al header
        if (filters) {
          headers['filters'] = JSON.stringify(filters);
        }

        // Hacer la petición GET al servidor con los headers y la URL adecuada
        const response = await fetch(
          `http://win-k3v3h0qliq2:8112/api/contrato/sidx/NumeroDeContrato/sord/asc/page/${page}/rows/${rows}`, 
          {
            method: 'GET',
            headers: headers,
          }
        );

        if (!response.ok) {
          // Registrar el error y la respuesta completa para mayor detalle
          console.error('Error en la respuesta del servidor', response);
          throw new Error(`Error en la respuesta del servidor: ${response.status} - ${response.statusText}`);
        }

        const jsonData = await response.json();
        setData(jsonData.rows);
        setTotal(Math.ceil(jsonData.records / rows)); // Total de páginas
        setRecords(jsonData.records); // Total de registros
      } catch (err) {
        // Registrar el error capturado para inspección
        console.error('Error en la solicitud:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, rows, filters]); // Reaccionar a los cambios en page, rows o filters

  return { data, total, records, loading, error };
};

export default useFetchContrato;
