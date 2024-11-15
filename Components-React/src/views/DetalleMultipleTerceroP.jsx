//Generado Automáticamente, Versión del generador: 5.3
import React, { useEffect, useState } from 'react';
import useFetchTerceroPInfoMultiple from '../services/useFetchTerceroPMultiple';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleTerceroPMultiple() {
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const tablaNum = 687;
	let actualkeyIncrement = 0;
	const { data, loading, error } = useFetchTerceroPInfoMultiple(numeroDeContrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [selectedTerceroP, setSelectedTerceroP] = useState(null);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	if (loading) return <p>Cargando datos...</p>;
	if (error) return <p>Error al cargar los datos: {error}</p>;
	if (!data || data.length === 0) return <p>No hay datos</p>;

	return (
		<>
			{data?.map((tercerop) => {
				let actualkey = actualkeyIncrement ++;
				const openModal = (e) => {
					setModalContentKey(e.target.value);
					setSelectedTerceroP(tercerop);
					setIsModalOpen(true);
				};

				const closeModal = () => {
					setIsModalOpen(false);
				};

				const openDocumentalModal = () => {
					setSelectedTerceroP(tercerop);
					setShowControlDocumentalModal(true);
				};

				return (
					<div key={actualkey} className="card">
						<span className="card-enc"><b>Tercero {tercerop?.numeroDeTercero}</b></span>
						<svg viewBox="0 0 1093 2" fill="none">
							<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
						</svg>
						<div className="card-content">
							<div className="cardHorizontal">
								<span><b>Nombre o Razón Social</b></span>
								<span>{displayData(tercerop?.nombreDePersona)}</span>
								<span><b>Estatus</b></span>
								<span>{displayData(tercerop?.textoEstatus)}</span>
						</div>
						<div className="buttons_container">
							<button id="openModalDocumentos" onClick={openDocumentalModal}>Documentos</button>
						</div>
					</div>
				{isModalOpen && selectedTerceroP === tercerop && (
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
				{showControlDocumentalModal && selectedTerceroP === tercerop &&  (
					<ControlDocumentalModal
						isOpen={showControlDocumentalModal}
						closeModal={() => setShowControlDocumentalModal(false)}
						tablaNum={tablaNum}
					/>
				)}
			</div>
		);
	})}
</>
	);
}

export default DetalleTerceroPMultiple;