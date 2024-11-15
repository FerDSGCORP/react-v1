//Generado Automáticamente, Versión del generador: 5.2
import { useState, useEffect } from 'react';
import {useFetchConfig} from './useFetchConfig';

const useFetchBienFide = (numeroDeContrato, page = 1, rows = 80, filters = null) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [total, setTotal] = useState(0);
	const [records, setRecords] = useState(0);
	const { config } = useFetchConfig();


	useEffect(() => {
		if (!config) {
			setLoading(true);
			return;
		}
		const fetchData = async () => {
			setLoading(true);
			try {
				const uriApi = config.apiUri;
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

				if (filters) {
					headers['filters'] = JSON.stringify(filters);
				}

				const response = await fetch(
					`${uriApi}/api/bienfide/sidx/IdBien/sord/asc/page/${page}/rows/${rows}/${numeroDeContrato}`,
					{
						method: 'GET',
						 headers: headers,
					}
				);

				if (response.status === 204) {
					setTotal(0); // Total de páginas
					setRecords(0); // Total de registros
					return;
				}

				if (!response.ok) {
				throw new Error(`Error en la respuesta del servidor: ${response.status} - ${response.statusText}`);
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
	}, [config, numeroDeContrato, page, rows, filters]);
	return { data, total, records, loading, error };
};
export default useFetchBienFide;