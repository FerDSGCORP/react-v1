import { useState } from 'react';

const useFetchLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ nombreDeUsuario, password }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://win-k3v3h0qliq2:8112/api/auth/login", {
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
