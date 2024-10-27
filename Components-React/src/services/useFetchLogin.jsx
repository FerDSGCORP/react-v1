import { useState } from 'react';
import {useFetchConfig} from './useFetchConfig';
const useFetchLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { config, loadingConfig, errorConfig } = useFetchConfig();

    const login = async ({ nombreDeUsuario, password }) => {
        if (!config) {
            setError('La configuración no ha sido cargada aún.');
            return { success: false, error: 'La configuración no ha sido cargada aún.' };
        }
        setLoading(true);
        setError(null);

        try {
            
            const uriApi=config.apiUri;
            const response = await fetch(`${uriApi}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombreDeUsuario, password })
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                return { success: true, data };
            } else {
                setLoading(false);
                setError(data);
                return { success: false, data };
            }
        } catch (err) {
            setLoading(false);
            setError(err); 
            return { success: false, error: err };
        }
    };

    return { login, loading, error };
};

export default useFetchLogin;
