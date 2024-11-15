//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchBienFideInfoMultiple from '../services/useFetchBienFideMultiple';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleBienFideMultiple() {
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const tablaNum = 394;
	let actualkeyIncrement = 0;
	const { data, loading, error } = useFetchBienFideInfoMultiple(numeroDeContrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [selectedBienFide, setSelectedBienFide] = useState(null);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	if (loading) return <p>Cargando datos...</p>;
	if (error) return <p>Error al cargar los datos: {error}</p>;
	if (!data || data.length === 0) return <p>No hay datos</p>;

	return (
		<>
			{data?.map((bienfide) => {
				let actualkey = actualkeyIncrement ++;
				const modalContentData = {
					detalleDelBien: {
						modalTitle: "Bien fideicomitido",
							modalContent: [
								{ campoTexto: "Número de Operación", campoValor: displayData(bienfide.numeroDeOperacionEntrada), isGroup: true, positionDiv: [0] }
								,{ campoTexto: "Fecha de Entrada del Bien", campoValor: displayData(bienfide.fechaDeEntrada), isGroup: true, positionDiv: [1] }
								,{ campoTexto: "Importe del Bien", campoValor: displayData(bienfide.importeBien), isGroup: true, positionDiv: [2] }
								,{ campoTexto: "Penúltimo Importe del Bien", campoValor: displayData(bienfide.penultimoImporte), isGroup: true, positionDiv: [3] }
								,{ campoTexto: "Último Importe del Bien", campoValor: displayData(bienfide.ultimoImporte), isGroup: true, positionDiv: [4] }
								,{ campoTexto: "Tipo de Cambio", campoValor: displayData(bienfide.tipoCambio), isGroup: true, positionDiv: [5] }
								,{ campoTexto: "Descripción del Bien", campoValor: displayData(bienfide.descripcionEntrada), isGroup: true, positionDiv: [6] }
								,{ campoTexto: "Moneda", campoValor: displayData(bienfide.nombreDeMoneda), isGroup: true, positionDiv: [7] }
								,{ campoTexto: "Custodiado en Bóveda", campoValor: displayData(bienfide.textoCustodiadoEnBoveda), isGroup: true, positionDiv: [8] }
								,{ campoTexto: "En garantía", campoValor: displayData(bienfide.textoEnGarantia), isGroup: true, positionDiv: [9] }
								,{ campoTexto: "Periodicidad de Re-valuación", campoValor: displayData(bienfide.textoPeriodicidad), isGroup: true, positionDiv: [10] }
								,{ campoTexto: "Estatus", campoValor: displayData(bienfide.textoEstatus), isGroup: true, positionDiv: [11] }
							]
						}
				}
				const openModal = (e) => {
					setModalContentKey(e.target.value);
					setSelectedBienFide(bienfide);
					setIsModalOpen(true);
				};

				const closeModal = () => {
					setIsModalOpen(false);
				};

				const openDocumentalModal = () => {
					setSelectedBienFide(bienfide);
					setShowControlDocumentalModal(true);
				};

				return (
					<div key={actualkey} className="card">
						<span className="card-enc"><b>Bien fideicomitido {bienfide?.idBien}</b></span>
						<svg viewBox="0 0 1093 2" fill="none">
							<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
						</svg>
						<div className="card-content">
							<div className="cardHorizontal">
								<span><b>Nombre del Desarrollo</b></span>
								<span>{displayData(bienfide?.nombreDesarrollo)}</span>
								<span><b>Tipo de Bien</b></span>
								<span>{displayData(bienfide?.textoTipoBien)}</span>
								<span><b>Bien</b></span>
								<span>{displayData(bienfide?.textoBien)}</span>
								<span><b>Estatus</b></span>
								<span>{displayData(bienfide?.textoEstatus)}</span>
						</div>
						<div className="buttons_container">
							<button onClick={openModal} id="botondetalleDelBien" value="detalleDelBien">Detalles del Bien</button>
							<button id="openModalDocumentos" onClick={openDocumentalModal}>Documentos</button>
						</div>
					</div>
				{isModalOpen && selectedBienFide === bienfide && (
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
				{showControlDocumentalModal && selectedBienFide === bienfide &&  (
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

export default DetalleBienFideMultiple;