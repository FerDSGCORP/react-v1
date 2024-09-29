import { useState, useEffect } from 'react';

const FideicomisosCard = (idFid) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!idFid) return;

      setLoading(true);
      try {
        const response = await fetch(`http://win-k3v3h0qliq2:8112/api/contrato/card/${idFid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
        }
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
      isMounted = false;  // Limpieza: marcar el componente como desmontado.
    };
  }, [idFid]);

  return { data, loading, error };
};

export default FideicomisosCard;
