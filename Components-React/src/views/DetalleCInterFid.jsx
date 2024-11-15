//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchCInterFidInfo from '../services/useFetchCInterFidInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleCInterFid({numeroDeContrato, numeroDeSubContrato, numeroDeIntermediario, numeroDeMoneda, contratoIntermediacion}) {
	const tablaNum = 156;
	const { data, loading, error } = useFetchCInterFidInfo(numeroDeContrato, numeroDeSubContrato, numeroDeIntermediario, numeroDeMoneda, contratoIntermediacion);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	const modalContentData = {
		informacionDelContrato: {
			modalTitle: "Información del contrato de inversión",
			modalContent: [
				{ campoTexto: "Número de Contrato de Inversión", campoValor: displayData(data?.contratoIntermediacion), isGroup: true, positionDiv: [0] }
				,{ campoTexto: "Contrato de Inversión (ALIAS)", campoValor: displayData(data?.contratoDeInversionAlias), isGroup: true, positionDiv: [1] }
				,{ campoTexto: "Referencia", campoValor: displayData(data?.referencia), isGroup: true, positionDiv: [2] }
				,{ campoTexto: "Convenio CIE", campoValor: displayData(data?.convenioCIE), isGroup: true, positionDiv: [3] }
				,{ campoTexto: "Fecha de Apertura del Contrato", campoValor: displayData(data?.fechaAperturaCuenta), isGroup: true, positionDiv: [4] }
				,{ campoTexto: "Fecha de Vencimiento de Contrato", campoValor: displayData(data?.fechaVencimientoCuenta), isGroup: true, positionDiv: [5] }
				,{ campoTexto: "Tipo De Institución", campoValor: displayData(data?.textoTipoDeInstitucion), isGroup: true, positionDiv: [6] }
				,{ campoTexto: "Intermediario", campoValor: displayData(data?.nombreDeIntermediario), isGroup: true, positionDiv: [7] }
				,{ campoTexto: "País", campoValor: displayData(data?.nombreDePais), isGroup: true, positionDiv: [8] }
				,{ campoTexto: "Moneda", campoValor: displayData(data?.nombreDeMoneda), isGroup: true, positionDiv: [9] }
				,{ campoTexto: "Origen de los Recursos", campoValor: displayData(data?.textoOrigenDeLosRecursos), isGroup: true, positionDiv: [10] }
				,{ campoTexto: "Forma de Manejo", campoValor: displayData(data?.textoFormaDeManejo), isGroup: true, positionDiv: [11] }
				,{ campoTexto: "Forma de Liquidación", campoValor: displayData(data?.textoFormaDeLiquidacion), isGroup: true, positionDiv: [12] }
				,{ campoTexto: "Tipo de Firma de Cuenta", campoValor: displayData(data?.textoTipoDeFirmaDeCuenta), isGroup: true, positionDiv: [13] }
				,{ campoTexto: "Sujeto a Retención de ISR", campoValor: displayData(data?.textoSujetoAISR), isGroup: true, positionDiv: [14] }
				,{ campoTexto: "Tipo de Recursos", campoValor: displayData(data?.textoTipoDeOrigenDeLosRecursos), isGroup: true, positionDiv: [15] }
				,{ campoTexto: "Aplica Conciliación", campoValor: displayData(data?.textoAplicaConciliacion), isGroup: true, positionDiv: [16] }
				,{ campoTexto: "Acumula en Saldos", campoValor: displayData(data?.textoAcumula), isGroup: true, positionDiv: [17] }
				,{ campoTexto: "Aplica Cobro de Honorarios", campoValor: displayData(data?.textoAplicaCobroHonorarios), isGroup: true, positionDiv: [18] }
				,{ campoTexto: "Estatus", campoValor: displayData(data?.textoEstatus), isGroup: true, positionDiv: [19] }
				,{ campoTexto: "Perfil de Inversión", campoValor: displayData(data?.textoPerfilDeInversion), isGroup: true, positionDiv: [20] }
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
				<span className="card-enc"><b>Información de la inversión {data?.contratoDeInversionAlias}</b></span>
				<svg viewBox="0 0 1093 2" fill="none">
					<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
				</svg>
				<div className="card-content">
					<div className="cardHorizontal">
						<span><b>Número de Contrato de Inversión</b></span>
						<span>{displayData(data?.contratoIntermediacion)}</span>
						<span><b>Intermediario</b></span>
						<span>{displayData(data?.nombreDeIntermediario)}</span>
					</div>
					<div className="buttons_container">
						<button onClick={openModal} id="botoninformacionDelContrato" value="informacionDelContrato">Información del contrato</button>
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

export default DetalleCInterFid;