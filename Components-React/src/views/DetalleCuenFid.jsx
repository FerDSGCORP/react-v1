//Generado Automáticamente, Versión del generador: 5.0
import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import useFetchCuenFidInfo from '../services/useFetchCuenFidInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleCuenFid() {
	// Utilizamos `useRoute` para obtener el parámetro `numeroDeContrato` de la URL
	const [match, params] = useRoute('/home/cuenfid-info/:numeroDeContrato');
	const numeroDeContrato = match ? params.numeroDeContrato : null;
	const tablaNum = 17;
	const { data, loading, error } = useFetchCuenFidInfo(numeroDeContrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	if (loading) return <p>Cargando datos...</p>;

	if (error) return <p>Error al cargar los datos: {error}</p>;

	return (
		<>
			{showControlDocumentalModal && (
				<ControlDocumentalModal
					isOpen={showControlDocumentalModal}
					closeModal={() => setShowControlDocumentalModal(false)}
					tablaNum={tablaNum}
				/>
			)}
			{isModalOpen && (
				<>
					{modalContentData[modalContentKey] && (
						<ModalComponent
							isOpen={isModalOpen}
							closeModal={() => setIsModalOpen(false)}
							modalTitle={modalContentData[modalContentKey].modalTitle}
							dataLoad={modalContentData[modalContentKey].modalContent}
						 />
					)}
				</>
			)}
		</>
	);
}

export default DetalleCuenFid;