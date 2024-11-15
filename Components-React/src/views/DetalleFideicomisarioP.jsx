//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchFideicomisarioPInfo from '../services/useFetchFideicomisarioPInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleFideicomisarioP({numeroDeContrato, numeroDeFideicomisario}) {
	const tablaNum = 686;
	const { data, loading, error } = useFetchFideicomisarioPInfo(numeroDeContrato, numeroDeFideicomisario);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	const modalContentData = {
		informacionGral: {
			modalTitle: "Información General",
			modalContent: [
				{ campoTexto: "Cesión de Derechos", campoValor: displayData(data?.cesionDeDerechos), isGroup: true, positionDiv: [0] }
				,{ campoTexto: "Porcentaje de Derechos de Participación", campoValor: displayData(data?.procentajeDeDerechos), isGroup: true, positionDiv: [1] }
				,{ campoTexto: "Observaciones", campoValor: displayData(data?.observacion), isGroup: true, positionDiv: [2] }
				,{ campoTexto: "Calidad", campoValor: displayData(data?.textoCalidadDePersona), isGroup: true, positionDiv: [3] }
				,{ campoTexto: "Maneja IVA", campoValor: displayData(data?.textoManejaIVA), isGroup: true, positionDiv: [4] }
				,{ campoTexto: "Maneja ISR", campoValor: displayData(data?.textoManejaISR), isGroup: true, positionDiv: [5] }
			]
		}
	}
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
				<span className="card-enc"><b>Fideicomisario {data?.numeroDeFideicomisario}</b></span>
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
						<button onClick={openModal} id="botoninformacionGral" value="informacionGral">Información general</button>
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

export default DetalleFideicomisarioP;