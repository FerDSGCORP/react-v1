//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchFideicomitentePInfoMultiple from '../services/useFetchFideicomitentePMultiple';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleFideicomitentePMultiple() {
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const tablaNum = 685;
	let actualkeyIncrement = 0;
	const { data, loading, error } = useFetchFideicomitentePInfoMultiple(numeroDeContrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [selectedFideicomitenteP, setSelectedFideicomitenteP] = useState(null);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	if (loading) return <p>Cargando datos...</p>;
	if (error) return <p>Error al cargar los datos: {error}</p>;
	if (!data || data.length === 0) return <p>No hay datos</p>;

	return (
		<>
			{data?.map((fideicomitentep) => {
				let actualkey = actualkeyIncrement ++;
				const modalContentData = {
					informacionGral: {
						modalTitle: "Información General",
							modalContent: [
								{ campoTexto: "Porcentaje de Derechos de Participación", campoValor: displayData(fideicomitentep.procentajeDeDerechos), isGroup: true, positionDiv: [0] }
								,{ campoTexto: "Observaciones", campoValor: displayData(fideicomitentep.observacion), isGroup: true, positionDiv: [1] }
								,{ campoTexto: "Calidad", campoValor: displayData(fideicomitentep.textoCalidadDePersona), isGroup: true, positionDiv: [2] }
								,{ campoTexto: "Maneja IVA", campoValor: displayData(fideicomitentep.textoManejaIVA), isGroup: true, positionDiv: [3] }
								,{ campoTexto: "Maneja ISR", campoValor: displayData(fideicomitentep.textoManejaISR), isGroup: true, positionDiv: [4] }
							]
						}
				}
				const openModal = (e) => {
					setModalContentKey(e.target.value);
					setSelectedFideicomitenteP(fideicomitentep);
					setIsModalOpen(true);
				};

				const closeModal = () => {
					setIsModalOpen(false);
				};

				const openDocumentalModal = () => {
					setSelectedFideicomitenteP(fideicomitentep);
					setShowControlDocumentalModal(true);
				};

				return (
					<div key={actualkey} className="card">
						<span className="card-enc"><b>Fideicomitente {fideicomitentep?.numeroDeFideicomitente}</b></span>
						<svg viewBox="0 0 1093 2" fill="none">
							<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
						</svg>
						<div className="card-content">
							<div className="cardHorizontal">
								<span><b>Nombre o Razón Social</b></span>
								<span>{displayData(fideicomitentep?.nombreDePersona)}</span>
								<span><b>Estatus</b></span>
								<span>{displayData(fideicomitentep?.textoEstatus)}</span>
						</div>
						<div className="buttons_container">
							<button onClick={openModal} id="botoninformacionGral" value="informacionGral">Información general</button>
							<button id="openModalDocumentos" onClick={openDocumentalModal}>Documentos</button>
						</div>
					</div>
				{isModalOpen && selectedFideicomitenteP === fideicomitentep && (
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
				{showControlDocumentalModal && selectedFideicomitenteP === fideicomitentep &&  (
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

export default DetalleFideicomitentePMultiple;