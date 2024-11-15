//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchBienFideInfo from '../services/useFetchBienFideInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleBienFide({idBien, numeroDeContrato, numeroDeSubcontrato}) {
	const tablaNum = 394;
	const { data, loading, error } = useFetchBienFideInfo(idBien, numeroDeContrato, numeroDeSubcontrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	const modalContentData = {
		detalleDelBien: {
			modalTitle: "Bien fideicomitido",
			modalContent: [
				{ campoTexto: "Número de Operación", campoValor: displayData(data?.numeroDeOperacionEntrada), isGroup: true, positionDiv: [0] }
				,{ campoTexto: "Fecha de Entrada del Bien", campoValor: displayData(data?.fechaDeEntrada), isGroup: true, positionDiv: [1] }
				,{ campoTexto: "Importe del Bien", campoValor: displayData(data?.importeBien), isGroup: true, positionDiv: [2] }
				,{ campoTexto: "Penúltimo Importe del Bien", campoValor: displayData(data?.penultimoImporte), isGroup: true, positionDiv: [3] }
				,{ campoTexto: "Último Importe del Bien", campoValor: displayData(data?.ultimoImporte), isGroup: true, positionDiv: [4] }
				,{ campoTexto: "Tipo de Cambio", campoValor: displayData(data?.tipoCambio), isGroup: true, positionDiv: [5] }
				,{ campoTexto: "Descripción del Bien", campoValor: displayData(data?.descripcionEntrada), isGroup: true, positionDiv: [6] }
				,{ campoTexto: "Moneda", campoValor: displayData(data?.nombreDeMoneda), isGroup: true, positionDiv: [7] }
				,{ campoTexto: "Custodiado en Bóveda", campoValor: displayData(data?.textoCustodiadoEnBoveda), isGroup: true, positionDiv: [8] }
				,{ campoTexto: "En garantía", campoValor: displayData(data?.textoEnGarantia), isGroup: true, positionDiv: [9] }
				,{ campoTexto: "Periodicidad de Re-valuación", campoValor: displayData(data?.textoPeriodicidad), isGroup: true, positionDiv: [10] }
				,{ campoTexto: "Estatus", campoValor: displayData(data?.textoEstatus), isGroup: true, positionDiv: [11] }
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
				<span className="card-enc"><b>Bien fideicomitido {data?.idBien}</b></span>
				<svg viewBox="0 0 1093 2" fill="none">
					<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
				</svg>
				<div className="card-content">
					<div className="cardHorizontal">
						<span><b>Nombre del Desarrollo</b></span>
						<span>{displayData(data?.nombreDesarrollo)}</span>
						<span><b>Tipo de Bien</b></span>
						<span>{displayData(data?.textoTipoBien)}</span>
						<span><b>Bien</b></span>
						<span>{displayData(data?.textoBien)}</span>
						<span><b>Estatus</b></span>
						<span>{displayData(data?.textoEstatus)}</span>
					</div>
					<div className="buttons_container">
						<button onClick={openModal} id="botondetalleDelBien" value="detalleDelBien">Detalles del Bien</button>
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

export default DetalleBienFide;