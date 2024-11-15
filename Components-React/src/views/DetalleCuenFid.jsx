//Generado Automáticamente, Versión del generador: 5.2
import React, { useEffect, useState } from 'react';
import useFetchCuenFidInfo from '../services/useFetchCuenFidInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleCuenFid({numeroDeContrato, numeroDeSubContrato, numeroDePais, numeroDeMoneda, numeroDeCuenta, cveProductoCuenta, subProductoCuenta, cuentaVista, secuencial}) {
	const tablaNum = 17;
	const { data, loading, error } = useFetchCuenFidInfo(numeroDeContrato, numeroDeSubContrato, numeroDePais, numeroDeMoneda, numeroDeCuenta, cveProductoCuenta, subProductoCuenta, cuentaVista, secuencial);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
	const [modalContentKey, setModalContentKey] = useState('estadoInicial');

	const displayData = useReplaceEmptyValue();

	const modalContentData = {
		detalleCuenta: {
			modalTitle: "Información de la cuenta",
			modalContent: [
				{ campoTexto: "Número de Cuenta", campoValor: displayData(data?.numeroDeCuenta), isGroup: false, positionDiv: [0] }
				,{ campoTexto: "CLABE", campoValor: displayData(data?.numeroDeClabe), isGroup: false, positionDiv: [1] }
				,{ campoTexto: "Plaza", campoValor: displayData(data?.numeroDePlaza), isGroup: false, positionDiv: [2] }
				,{ campoTexto: "Sucursal", campoValor: displayData(data?.numeroDeSucursal), isGroup: false, positionDiv: [3] }
				,{ campoTexto: "Nombre de Cuenta", campoValor: displayData(data?.nombreDeCuenta), isGroup: true, positionDiv: [4] }
				,{ campoTexto: "País", campoValor: displayData(data?.nombreDePais), isGroup: false, positionDiv: [5] }
				,{ campoTexto: "Moneda", campoValor: displayData(data?.nombreDeMoneda), isGroup: false, positionDiv: [6] }
				,{ campoTexto: "Estado", campoValor: displayData(data?.nombreDeEstado), isGroup: false, positionDiv: [7] }
				,{ campoTexto: "Banco", campoValor: displayData(data?.nombreDeBanco), isGroup: false, positionDiv: [8] }
			]
		},
		configuracionAd: {
			modalTitle: "Información para movimientos internacionales",
			modalContent: [
				{ campoTexto: "SWIFT / BIC", campoValor: displayData(data?.numeroDeSwift), isGroup: false, positionDiv: [0] }
				,{ campoTexto: "IBAN", campoValor: displayData(data?.numeroDeIban), isGroup: false, positionDiv: [1] }
				,{ campoTexto: "ABA / BIN", campoValor: displayData(data?.numeroDeAba), isGroup: false, positionDiv: [2] }
				,{ campoTexto: "MIRC", campoValor: displayData(data?.numeroDeMirc), isGroup: false, positionDiv: [3] }
				,{ campoTexto: "Número de Transito Bancario", campoValor: displayData(data?.numeroDeTransito), isGroup: false, positionDiv: [4] }
				,{ campoTexto: "Referencia", campoValor: displayData(data?.referencia), isGroup: false, positionDiv: [5] }
				,{ campoTexto: "Fecha de Apertura de Cuenta", campoValor: displayData(data?.fechaAperturaCuenta), isGroup: false, positionDiv: [6] }
				,{ campoTexto: "Fecha de Vencimiento de Cuenta", campoValor: displayData(data?.fechaVencimientoCuenta), isGroup: false, positionDiv: [7] }
				,{ campoTexto: "Fecha de Cancelación de Cuenta", campoValor: displayData(data?.fechaCancelacionCuenta), isGroup: false, positionDiv: [8] }
				,{ campoTexto: "Autoriza Movimientos", campoValor: displayData(data?.textoAutorizaMovimientos), isGroup: false, positionDiv: [9] }
			]
		},
		titular: {
			modalTitle: "Titular de la cuenta",
			modalContent: [
				{ campoTexto: "Nombre", campoValor: displayData(data?.nombreTitularCuenta), isGroup: false, positionDiv: [0] }
				,{ campoTexto: "Apellido Paterno", campoValor: displayData(data?.apellidoPaternoTitularCuenta), isGroup: false, positionDiv: [1] }
				,{ campoTexto: "Apellido Materno", campoValor: displayData(data?.apellidoMaternoTitularCuenta), isGroup: false, positionDiv: [2] }
				,{ campoTexto: "Tipo de Recursos", campoValor: displayData(data?.textoTipoDeOrigenDeLosRecursos), isGroup: false, positionDiv: [3] }
				,{ campoTexto: "Aplica Conciliación", campoValor: displayData(data?.textoAplicaConciliacion), isGroup: false, positionDiv: [4] }
				,{ campoTexto: "Acumula Saldos", campoValor: displayData(data?.textoAcumula), isGroup: false, positionDiv: [5] }
				,{ campoTexto: "Aplica Cobro de Honorarios", campoValor: displayData(data?.textoAplicaCobroDeHonorarios), isGroup: false, positionDiv: [6] }
				,{ campoTexto: "Estatus", campoValor: displayData(data?.textoEstatus), isGroup: false, positionDiv: [7] }
			]
		},
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
				<span className="card-enc"><b>Información de la cuenta {data?.numeroDeCuenta}</b></span>
				<svg viewBox="0 0 1093 2" fill="none">
					<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
				</svg>
				<div className="card-content">
					<div className="cardHorizontal">
						<span><b>Número de Cuenta</b></span>
						<span>{displayData(data?.numeroDeCuenta)}</span>
						<span><b>Nombre de Cuenta</b></span>
						<span>{displayData(data?.nombreDeCuenta)}</span>
						<span><b>Banco</b></span>
						<span>{displayData(data?.nombreDeBanco)}</span>
					</div>
					<div className="buttons_container">
						<button onClick={openModal} id="botondetalleCuenta" value="detalleCuenta">Detalle de la cuenta</button>
						<button onClick={openModal} id="botonconfiguracionAd" value="configuracionAd">Configuración internacional</button>
						<button onClick={openModal} id="botontitular" value="titular">Titular</button>
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

export default DetalleCuenFid;