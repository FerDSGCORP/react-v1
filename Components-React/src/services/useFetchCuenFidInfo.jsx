//Generado Autom�ticamente, Versi�n del generador: 4.2
import { useState, useEffect } from 'react';
import {useFetchConfig} from './useFetchConfig';
const useFetchCuenFidInfo = (numeroDeContrato, numeroDeSubContrato, numeroDePais, numeroDeMoneda, numeroDeCuenta, cveProductoCuenta, subProductoCuenta, cuentaVista, secuencial) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		if (!numeroDeContrato&&!numeroDeSubContrato&&!numeroDePais&&!numeroDeMoneda&&!numeroDeCuenta&&!cveProductoCuenta&&!subProductoCuenta&&!cuentaVista&&!secuencial) return;
		const fetchData = async () => {
			setLoading(true);
			try {
				const uriApi=config.apiUri;
				const token = sessionStorage.getItem('token');
				if (!token) {
					throw new Error('Token no encontrado. Por favor, inicia sesi�n nuevamente.');
				}
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
					'X-User-Id': numeroDeUsuario,
				};
				// Hacer la petici�n GET al servidor con los headers y la URL adecuada
				const response = await fetch(`${uriApi}/api/CuenFid/info/${numeroDeContrato}/subcontrato/${numeroDeSubContrato}/pais/${numeroDePais}/moneda/${numeroDeMoneda}/cuenta/${numeroDeCuenta}/cta/${cveProductoCuenta}/cta/${subProductoCuenta}/vista/${cuentaVista}/secuencial/${secuencial}`, 
					{
						method: 'GET',
						headers: headers,
					}
				);
				if(!response.ok) {
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
	}, [numeroDeContrato, numeroDeSubContrato, numeroDePais, numeroDeMoneda, numeroDeCuenta, cveProductoCuenta, subProductoCuenta, cuentaVista, secuencial]);

	return { data, loading, error };

};

export default useFetchCuenFidInfo;