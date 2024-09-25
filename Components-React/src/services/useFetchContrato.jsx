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
        const headers = {
          'Content-Type': 'application/json',
        };

        // Si se reciben filtros, los convertimos en JSON
        if (filters) {
          headers['filters'] = JSON.stringify(filters);
        }

        const response = await fetch(
          `http://win-k3v3h0qliq2:8112/api/contrato/sidx/NumeroDeContrato/sord/asc/page/${page}/rows/${rows}`,
          {
            method: 'GET',
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error('Error en la respuesta');
        }

        const jsonData = await response.json();
        setData(jsonData.rows);
        setTotal(Math.ceil(jsonData.records / rows)); // Total de páginas
        setRecords(jsonData.records); // Total de registros
      } catch (err) {
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
