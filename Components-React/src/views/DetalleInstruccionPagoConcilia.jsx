//Generado Automáticamente, Versión del generador: 5.3
import React, { useEffect, useState } from 'react';
import useFetchInstruccionPagoConciliaInfo from '../services/useFetchInstruccionPagoConciliaInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleInstruccionPagoConcilia({folioInstruccionDePago, secuencialArchivo, secuencialLayout}) {
	const tablaNum = 896;
	const { data, loading, error } = useFetchInstruccionPagoConciliaInfo(folioInstruccionDePago, secuencialArchivo, secuencialLayout);
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
		<div className="bodyCard">
		      <div className="card --short">
				<span className="card-enc"><b>General</b></span>
				<svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                <path d="M0 1H1093" stroke="#007AFF" strokeWidth="3" />
            </svg>
				<div id="card-content">
					<div className="container__field __Reg_indiv">
						<p>Folio de Instrucción de Pago</p><span>{displayData(data?.folioInstruccionDePago)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Fecha Valor</p><span>{displayData(data?.fechaValor)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Comentarios</p><span>{displayData(data?.comentario)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Usuario</p><span>{displayData(data?.nombreDeUsuario)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Forma de Pago</p><span>{displayData(data?.textoFormaDePago)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Tipo de Pago</p><span>{displayData(data?.textoTipoDePago)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Pago Prioritario</p><span>{displayData(data?.textoPagoPrioritario)}</span>
					</div>
					<div className="buttons_container">
					</div>
				</div>
			</div>
			</div>
			<div className="bodyCard">
			<div className="card --short">
				<span className="card-enc"><b>Datos cuenta cargo</b></span>
				<svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                <path d="M0 1H1093" stroke="#007AFF" strokeWidth="3" />
            </svg>
				<div id="card-content">
					<div className="container__field __Reg_indiv">
						<p>Titular Cuenta Cargo</p><span>{displayData(data?.titularCuentaCargo)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Cuenta Cargo</p><span>{displayData(data?.numeroDeCuentaCargo)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Tipo de Cuenta Cargo</p><span>{displayData(data?.textoTipoDeCuentaCargo)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Banco Cargo</p><span>{displayData(data?.nombreDeBancoCargo)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Moneda de Cuenta Cargo</p><span>{displayData(data?.nombreDeMonedaCargo)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Moneda Cargo</p><span>{displayData(data?.nombreDeMonedaCargoAuxiliar)}</span>
					</div>
					<div className="buttons_container">
					</div>
				</div>
			</div>
			</div>
			<div className="card mt-5">
				<span className="card-enc"><b>Datos de Cuenta de Abono</b></span>
				<svg viewBox="0 0 1093 2" fill="none">
					<path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
				</svg>
				<div id="frm_infoInstruccionPagoConcilia">
					<div className="container__field">
						<p>Nombre Beneficiario</p><span>{displayData(data?.titularCuentaAbono)}</span>
						<p>Beneficiario</p><span>{displayData(data?.beneficiario)}</span>
					</div>
					<div className="container__field">
						<p>CURP</p><span>{displayData(data?.curp)}</span>
						<p>BIC o SWIFT del Banco Beneficiario</p><span>{displayData(data?.swift)}</span>
					</div>
					<div className="container__field">
						<p>IBAN</p><span>{displayData(data?.iban)}</span>
						<p>Datos del Intermediario</p><span>{displayData(data?.datosBancoIntermediario)}</span>
					</div>
					<div className="container__field">
						<p>CLABE</p><span>{displayData(data?.clabe)}</span>
						<p>Dependencia</p><span>{displayData(data?.dependencia)}</span>
					</div>
					<div className="container__field">
						<p>Clave de Referencia</p><span>{displayData(data?.claveReferencia)}</span>
						<p>Cadena de la Dependencia</p><span>{displayData(data?.cadenaDependencia)}</span>
					</div>
					<div className="container__field">
						<p>IVA Actos Accidentales1</p><span>{displayData(data?.ivaImporteDPA)}</span>
						<p>Parte Actualizada</p><span>{displayData(data?.parteActualizada)}</span>
					</div>
					<div className="container__field">
						<p>Recargos</p><span>{displayData(data?.recargos)}</span>
						<p>IVA Actos Accidentales3</p><span>{displayData(data?.ivaRecargos)}</span>
					</div>
					<div className="container__field">
						<p>IVA Actos Accidentales4</p><span>{displayData(data?.ivaMultaFiscal)}</span>
						<p>Compensaciones</p><span>{displayData(data?.compensaciones)}</span>
					</div>
					<div className="container__field">
						<p>IVA Total Actos Accidentales</p><span>{displayData(data?.ivaImporteTotal)}</span>
						<p>Cuenta del Pago Referenciado</p><span>{displayData(data?.convenioCie)}</span>
					</div>
					<div className="container__field">
						<p>Referencia</p><span>{displayData(data?.referencia)}</span>
						<p>Dirección</p><span>{displayData(data?.direccion)}</span>
					</div>
					<div className="container__field">
						<p>Detalle de Pago</p><span>{displayData(data?.detalleDePago)}</span>
						<p>Cajón Indeval</p><span>{displayData(data?.cajonIndeval)}</span>
					</div>
					<div className="container__field">
						<p>Clave de Pizarra</p><span>{displayData(data?.clavePizarra)}</span>
						<p>Serie</p><span>{displayData(data?.serie)}</span>
					</div>
					<div className="container__field">
						<p>Precio de Adquisición</p><span>{displayData(data?.precioDeAdquisicion)}</span>
						<p>Fecha limite de autorización para fideicomiso bloqueado</p><span>{displayData(data?.fechaLimAutFidBloq)}</span>
					</div>
					<div className="container__field">
						<p>Moneda Abono</p><span>{displayData(data?.nombreDeMonedaAbono)}</span>
						<p>País del Banco Beneficiario</p><span>{displayData(data?.nombreDePais)}</span>
					</div>
					<div className="container__field">
						<p>Tipo de Cuenta</p><span>{displayData(data?.textoTipoDeCuenta)}</span>
						<p>Periodo</p><span>{displayData(data?.textoPeriodo)}</span>
					</div>
					<div className="container__field __Reg_indiv">
						<p>Pago Programado</p><span>{displayData(data?.textoPagoProgramado)}</span>
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

export default DetalleInstruccionPagoConcilia;