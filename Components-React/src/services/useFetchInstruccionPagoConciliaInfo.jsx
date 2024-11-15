//Generado Automáticamente, Versión del generador: 5.2
import { useState, useEffect } from 'react';
import {useFetchConfig} from './useFetchConfig';
const useFetchInstruccionPagoConciliaInfo = (folioInstruccionDePago, secuencialArchivo, secuencialLayout) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { config } = useFetchConfig();
	useEffect(() => {
		if(!folioInstruccionDePago&&!secuencialArchivo&&!secuencialLayout||!config){
			setLoading(true);
			return;
		}
		const fetchData = async () => {
			setLoading(true);
			try {
				const uriApi=config.apiUri;
				const token = sessionStorage.getItem('token');
				if (!token) {
					throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
				}

				const userData = localStorage.getItem('userData');
				if (!userData) {
					throw new Error('Datos del usuario no encontrados. Por favor, inicia sesión nuevamente.');
				}
				const { numeroDeUsuario } = JSON.parse(userData);
				if (!numeroDeUsuario) {
					throw new Error('Número de usuario no encontrado. Por favor, verifica los datos de usuario.');
				}

				const headers = {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
					'X-User-Id': numeroDeUsuario,
				};
				// Hacer la petición GET al servidor con los headers y la URL adecuada
				const response = await fetch(`${uriApi}/api/instruccionpagoconcilia/info/${folioInstruccionDePago}/archivo/${secuencialArchivo}/layout/${secuencialLayout}`, {
					method: 'GET',
					headers: headers,
				});

				if (!response.ok) {
					throw new Error('Error en la respuesta del servidor');
				}

				const jsonData = await response.json();
				setData(jsonData);  // Guardamos los datos obtenidos
			} catch (err) {
				setError(err.message);  // Capturamos el error
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [folioInstruccionDePago, secuencialArchivo, secuencialLayout, config]);

	return { data, loading, error };

};

export default useFetchInstruccionPagoConciliaInfo;