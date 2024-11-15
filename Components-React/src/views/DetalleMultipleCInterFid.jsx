//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchCInterFidInfoMultiple from '../services/useFetchCInterFidMultiple';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleCInterFidMultiple() {
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const tablaNum = 156;
	let actualkeyIncrement = 0;
	const { data, loading, error } = useFetchCInterFidInfoMultiple(numeroDeContrato);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [selectedCInterFid, setSelectedCInterFid] = useState(null);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	if (loading) return <p>Cargando datos...</p>;
	if (error) return <p>Error al cargar los datos: {error}</p>;
	if (!data || data.length === 0) return <p>No hay datos</p>;

	return (
		<>
			{data?.map((cinterfid) => {
				let actualkey = actualkeyIncrement ++;
				const modalContentData = {
					informacionDelContrato: {
						modalTitle: "Información del contrato de inversión",
							modalContent: [
								{ campoTexto: "Número de Contrato de Inversión", campoValor: displayData(cinterfid.contratoIntermediacion), isGroup: true, positionDiv: [0] }
								,{ campoTexto: "Contrato de Inversión (ALIAS)", campoValor: displayData(cinterfid.contratoDeInversionAlias), isGroup: true, positionDiv: [1] }
								,{ campoTexto: "Referencia", campoValor: displayData(cinterfid.referencia), isGroup: true, positionDiv: [2] }
								,{ campoTexto: "Convenio CIE", campoValor: displayData(cinterfid.convenioCIE), isGroup: true, positionDiv: [3] }
								,{ campoTexto: "Fecha de Apertura del Contrato", campoValor: displayData(cinterfid.fechaAperturaCuenta), isGroup: true, positionDiv: [4] }
								,{ campoTexto: "Fecha de Vencimiento de Contrato", campoValor: displayData(cinterfid.fechaVencimientoCuenta), isGroup: true, positionDiv: [5] }
								,{ campoTexto: "Tipo De Institución", campoValor: displayData(cinterfid.textoTipoDeInstitucion), isGroup: true, positionDiv: [6] }
								,{ campoTexto: "Intermediario", campoValor: displayData(cinterfid.nombreDeIntermediario), isGroup: true, positionDiv: [7] }
								,{ campoTexto: "País", campoValor: displayData(cinterfid.nombreDePais), isGroup: true, positionDiv: [8] }
								,{ campoTexto: "Moneda", campoValor: displayData(cinterfid.nombreDeMoneda), isGroup: true, positionDiv: [9] }
								,{ campoTexto: "Origen de los Recursos", campoValor: displayData(cinterfid.textoOrigenDeLosRecursos), isGroup: true, positionDiv: [10] }
								,{ campoTexto: "Forma de Manejo", campoValor: displayData(cinterfid.textoFormaDeManejo), isGroup: true, positionDiv: [11] }
								,{ campoTexto: "Forma de Liquidación", campoValor: displayData(cinterfid.textoFormaDeLiquidacion), isGroup: true, positionDiv: [12] }
								,{ campoTexto: "Tipo de Firma de Cuenta", campoValor: displayData(cinterfid.textoTipoDeFirmaDeCuenta), isGroup: true, positionDiv: [13] }
								,{ campoTexto: "Sujeto a Retención de ISR", campoValor: displayData(cinterfid.textoSujetoAISR), isGroup: true, positionDiv: [14] }
								,{ campoTexto: "Tipo de Recursos", campoValor: displayData(cinterfid.textoTipoDeOrigenDeLosRecursos), isGroup: true, positionDiv: [15] }
								,{ campoTexto: "Aplica Conciliación", campoValor: displayData(cinterfid.textoAplicaConciliacion), isGroup: true, positionDiv: [16] }
								,{ campoTexto: "Acumula en Saldos", campoValor: displayData(cinterfid.textoAcumula), isGroup: true, positionDiv: [17] }
								,{ campoTexto: "Aplica Cobro de Honorarios", campoValor: displayData(cinterfid.textoAplicaCobroHonorarios), isGroup: true, positionDiv: [18] }
								,{ campoTexto: "Estatus", campoValor: displayData(cinterfid.textoEstatus), isGroup: true, positionDiv: [19] }
								,{ campoTexto: "Perfil de Inversión", campoValor: displayData(cinterfid.textoPerfilDeInversion), isGroup: true, positionDiv: [20] }
							]
						}
				}
				const openModal = (e) => {
					setModalContentKey(e.target.value);
					setSelectedCInterFid(cinterfid);
					setIsModalOpen(true);
				};

				const closeModal = () => {
					setIsModalOpen(false);
				};

				const openDocumentalModal = () => {
					setSelectedCInterFid(cinterfid);
					setShowControlDocumentalModal(true);
				};

				return (
					<div key={actualkey} className="card">
						<span className="card-enc"><b>Información de la inversión {cinterfid?.contratoDeInversionAlias}</b></span>
						<svg viewBox="0 0 1093 2" fill="none">
							<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
						</svg>
						<div className="card-content">
							<div className="cardHorizontal">
								<span><b>Número de Contrato de Inversión</b></span>
								<span>{displayData(cinterfid?.contratoIntermediacion)}</span>
								<span><b>Intermediario</b></span>
								<span>{displayData(cinterfid?.nombreDeIntermediario)}</span>
						</div>
						<div className="buttons_container">
							<button onClick={openModal} id="botoninformacionDelContrato" value="informacionDelContrato">Información del contrato</button>
							<button id="openModalDocumentos" onClick={openDocumentalModal}>Documentos</button>
						</div>
					</div>
					
				{isModalOpen && selectedCInterFid === cinterfid && (
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
				{showControlDocumentalModal && selectedCInterFid === cinterfid &&  (
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

export default DetalleCInterFidMultiple;