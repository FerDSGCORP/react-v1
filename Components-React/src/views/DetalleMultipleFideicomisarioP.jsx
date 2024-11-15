//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchFideicomisarioPInfoMultiple from '../services/useFetchFideicomisarioPMultiple';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleFideicomisarioPMultiple() {
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const tablaNum = 686;
	let actualkeyIncrement = 0;
	const { data, loading, error } = useFetchFideicomisarioPInfoMultiple(numeroDeContrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [selectedFideicomisarioP, setSelectedFideicomisarioP] = useState(null);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	if (loading) return <p>Cargando datos...</p>;
	if (error) return <p>Error al cargar los datos: {error}</p>;
	if (!data || data.length === 0) return <p>No hay datos</p>;

	return (
		<>
			{data?.map((fideicomisariop) => {
				let actualkey = actualkeyIncrement ++;
				const modalContentData = {
					informacionGral: {
						modalTitle: "Información General",
							modalContent: [
								{ campoTexto: "Cesión de Derechos", campoValor: displayData(fideicomisariop.cesionDeDerechos), isGroup: true, positionDiv: [0] }
								,{ campoTexto: "Porcentaje de Derechos de Participación", campoValor: displayData(fideicomisariop.procentajeDeDerechos), isGroup: true, positionDiv: [1] }
								,{ campoTexto: "Observaciones", campoValor: displayData(fideicomisariop.observacion), isGroup: true, positionDiv: [2] }
								,{ campoTexto: "Calidad", campoValor: displayData(fideicomisariop.textoCalidadDePersona), isGroup: true, positionDiv: [3] }
								,{ campoTexto: "Maneja IVA", campoValor: displayData(fideicomisariop.textoManejaIVA), isGroup: true, positionDiv: [4] }
								,{ campoTexto: "Maneja ISR", campoValor: displayData(fideicomisariop.textoManejaISR), isGroup: true, positionDiv: [5] }
							]
						}
				}
				const openModal = (e) => {
					setModalContentKey(e.target.value);
					setSelectedFideicomisarioP(fideicomisariop);
					setIsModalOpen(true);
				};

				const closeModal = () => {
					setIsModalOpen(false);
				};

				const openDocumentalModal = () => {
					setSelectedFideicomisarioP(fideicomisariop);
					setShowControlDocumentalModal(true);
				};

				return (
					<div key={actualkey} className="card">
						<span className="card-enc"><b>Fideicomisario {fideicomisariop?.numeroDeFideicomisario}</b></span>
						<svg viewBox="0 0 1093 2" fill="none">
							<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
						</svg>
						<div className="card-content">
							<div className="cardHorizontal">
								<span><b>Nombre o Razón Social</b></span>
								<span>{displayData(fideicomisariop?.nombreDePersona)}</span>
								<span><b>Estatus</b></span>
								<span>{displayData(fideicomisariop?.textoEstatus)}</span>
						</div>
						<div className="buttons_container">
							<button onClick={openModal} id="botoninformacionGral" value="informacionGral">Información general</button>
							<button id="openModalDocumentos" onClick={openDocumentalModal}>Documentos</button>
						</div>
					</div>
				{isModalOpen && selectedFideicomisarioP === fideicomisariop && (
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
				{showControlDocumentalModal && selectedFideicomisarioP === fideicomisariop &&  (
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

export default DetalleFideicomisarioPMultiple;