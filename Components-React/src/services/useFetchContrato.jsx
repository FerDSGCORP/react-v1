import { useState, useEffect } from 'react';
import {useFetchConfig} from './useFetchConfig';

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
        //console.log(uriApi.apiUrl);
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
        
        //const uriApi=data.config.API_URL;
        // Hacer la petición GET al servidor con los headers y la URL adecuada
        const config=await useFetchConfig();
        const uriApi=config.apiUri;
        const response = await fetch(
          `${uriApi}/api/contrato/sidx/NumeroDeContrato/sord/asc/page/${page}/rows/${rows}`, 
          {
            method: 'GET',
            headers: headers,
          }
        );
        if (response.status === 204) {
          setData("Sin registros");
          setTotal(0); // Total de páginas
          setRecords(0); // Total de registros
          return null;
        }
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
