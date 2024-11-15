//Generado Automáticamente, Versión del generador: 5.3
import React, { useEffect, useState } from 'react';
import useFetchTerceroPInfo from '../services/useFetchTerceroPInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleTerceroP({numeroDeContrato, numeroDeTercero}) {
	const tablaNum = 687;
	const { data, loading, error } = useFetchTerceroPInfo(numeroDeContrato, numeroDeTercero);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	const openModal = (e) => {
		setModalContentKey(e.target.value);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openDocumentalModal = () => {
		setShowControlDocumentalModal(true);
	};

	if (loading) return <p>Cargando datos...</p>;

	if (error) return <p>Error al cargar los datos: {error}</p>;

	return (
		<>
			<div className="card">
				<span className="card-enc"><b>Tercero {data?.numeroDeTercero}</b></span>
				<svg viewBox="0 0 1093 2" fill="none">
					<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
				</svg>
				<div className="card-content">
					<div className="cardHorizontal">
						<span><b>Nombre o Razón Social</b></span>
						<span>{displayData(data?.nombreDePersona)}</span>
						<span><b>Estatus</b></span>
						<span>{displayData(data?.textoEstatus)}</span>
					</div>
					<div className="buttons_container">
						<button id="openModalDocumentos" onClick={openDocumentalModal}>Documentos</button>
					</div>
				</div>
			</div>
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

export default DetalleTerceroP;