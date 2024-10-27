import { useState, useEffect } from 'react';

export const useFetchConfig = () => {
  const [config, setConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [errorConfig, setErrorConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error(`Error al obtener la configuración: ${response.statusText}`);
        }
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        setErrorConfig(error.message || 'Error desconocido al obtener la configuración');
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loadingConfig, errorConfig };
};
