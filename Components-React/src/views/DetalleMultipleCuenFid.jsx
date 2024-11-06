//Generado Automáticamente, Versión del generador: 5.0
import React, { useEffect, useState } from 'react';
import useFetchCuenFidInfoMultiple from '../services/useFetchCuenFidMultiple';
import ControlDocumentalModal from '../components/ControlDocumentalModal';
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleCuenFidMultiple() {
  const numeroDeContrato = localStorage.getItem('idFidSelect');
  const tablaNum = 17;
  const { data, loading, error } = useFetchCuenFidInfoMultiple(numeroDeContrato);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
  const [selectedCuenfid, setSelectedCuenfid] = useState(null); // estados para manejar el modal y almacenar la cCard (cuenfid) que se seleccioen
  const [modalContentKey, setModalContentKey] = useState('estadoInicial');

  const displayData = useReplaceEmptyValue();

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  //para ahcer dinamico modalContentData y los cards se mete en un .map todo el bloque que sera dinamico, esto hara que cada modalContentData se enlace con cada card
  return (
    <>
      {data?.map((cuenfid) => {
        // Definir modalContentData dentro del .map para acceder a cuenfid de cada card, importante para que cada modal muestre la informacion de acuerdo al seervicio
		const modalContentData = {
			detalleCuenta: {
				modalTitle: "Información de la cuenta",
				modalContent: [
					{ campoTexto: "Número de Cuenta", campoValor: displayData(cuenfid.numeroDeCuenta), isGroup: false, positionDiv: [0] } //en vez de data se usa cuenfid ya que es nuestrra key
					, { campoTexto: "CLABE", campoValor: displayData(cuenfid.numeroDeClabe), isGroup: false, positionDiv: [1] }
					, { campoTexto: "Plaza", campoValor: displayData(cuenfid.numeroDePlaza), isGroup: false, positionDiv: [2] }
					, { campoTexto: "Sucursal", campoValor: displayData(cuenfid.numeroDeSucursal), isGroup: false, positionDiv: [3] }
					, { campoTexto: "Nombre de Cuenta", campoValor: displayData(cuenfid.nombreDeCuenta), isGroup: true, positionDiv: [4] }
					, { campoTexto: "País", campoValor: displayData(cuenfid.nombreDePais), isGroup: false, positionDiv: [5] }
					, { campoTexto: "Moneda", campoValor: displayData(cuenfid.nombreDeMoneda), isGroup: false, positionDiv: [6] }
					, { campoTexto: "Estado", campoValor: displayData(cuenfid.nombreDeEstado), isGroup: false, positionDiv: [7] }
					, { campoTexto: "Banco", campoValor: displayData(cuenfid.nombreDeBanco), isGroup: false, positionDiv: [8] }
				]
			},
			configuracionAd: {
				modalTitle: "Información para movimientos internacionales",
				modalContent: [
					{ campoTexto: "SWIFT / BIC", campoValor: displayData(cuenfid.numeroDeSwift), isGroup: false, positionDiv: [0] }
					, { campoTexto: "IBAN", campoValor: displayData(cuenfid.numeroDeIban), isGroup: false, positionDiv: [1] }
					, { campoTexto: "ABA / BIN", campoValor: displayData(cuenfid.numeroDeAba), isGroup: false, positionDiv: [2] }
					, { campoTexto: "MIRC", campoValor: displayData(cuenfid.numeroDeMirc), isGroup: false, positionDiv: [3] }
					, { campoTexto: "Número de Transito Bancario", campoValor: displayData(cuenfid.numeroDeTransito), isGroup: false, positionDiv: [4] }
					, { campoTexto: "Referencia", campoValor: displayData(cuenfid.referencia), isGroup: false, positionDiv: [5] }
					, { campoTexto: "Fecha de Apertura de Cuenta", campoValor: displayData(cuenfid.fechaAperturaCuenta), isGroup: false, positionDiv: [6] }
					, { campoTexto: "Fecha de Vencimiento de Cuenta", campoValor: displayData(cuenfid.fechaVencimientoCuenta), isGroup: false, positionDiv: [7] }
					, { campoTexto: "Fecha de Cancelación de Cuenta", campoValor: displayData(cuenfid.fechaCancelacionCuenta), isGroup: false, positionDiv: [8] }
					, { campoTexto: "Autoriza Movimientos", campoValor: displayData(cuenfid.textoAutorizaMovimientos), isGroup: false, positionDiv: [9] }
				]
			},
			titular: {
				modalTitle: "Titular de la cuenta",
				modalContent: [
					{ campoTexto: "Nombre", campoValor: displayData(cuenfid.nombreTitularCuenta), isGroup: false, positionDiv: [0] }
					, { campoTexto: "Apellido Paterno", campoValor: displayData(cuenfid.apellidoPaternoTitularCuenta), isGroup: false, positionDiv: [1] }
					, { campoTexto: "Apellido Materno", campoValor: displayData(cuenfid.apellidoMaternoTitularCuenta), isGroup: false, positionDiv: [2] }
					, { campoTexto: "Tipo de Recursos", campoValor: displayData(cuenfid.textoTipoDeOrigenDeLosRecursos), isGroup: false, positionDiv: [3] }
					, { campoTexto: "Aplica Conciliación", campoValor: displayData(cuenfid.textoAplicaConciliacion), isGroup: false, positionDiv: [4] }
					, { campoTexto: "Acumula Saldos", campoValor: displayData(cuenfid.textoAcumula), isGroup: false, positionDiv: [5] }
					, { campoTexto: "Aplica Cobro de Honorarios", campoValor: displayData(cuenfid.textoAplicaCobroDeHonorarios), isGroup: false, positionDiv: [6] }
					, { campoTexto: "Estatus", campoValor: displayData(cuenfid.textoEstatus), isGroup: false, positionDiv: [7] }
				]
			},
		}


        const openModal = (e) => {
          setModalContentKey(e.target.value); // Establece la clave del contenido del modal por ejemplo el de detalle de la cuenta
          setSelectedCuenfid(cuenfid); // Guarda el cuenfid de la card seleccionada
          setIsModalOpen(true);
        };

        const openDocumentalModal = () => {
          setSelectedCuenfid(cuenfid); //pasamos cuenfid para que tambien traiga los documentos que le corresponden por key
          setShowControlDocumentalModal(true);
        };

        return (
			//SE LE PASA numeroDeCuenta como key por que NumeroDeContrato causa conflicto en la key ya que por cada card se usa el mismo numeroDeContrato y debe ser una key unica por cada card y tampoco se usa index ya que no hay un id definido en el servicio
           <div key={cuenfid.numeroDeCuenta} className="card">  
            <span className="card-enc"><b>Información de la cuenta {cuenfid?.numeroDeCuenta}</b></span>
            <svg viewBox="0 0 1093 2" fill="none">
              <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
            </svg>
            <div className="card-content">
              <div className="cardHorizontal">
                <span><b>Número de Cuenta</b></span>
                <span>{displayData(cuenfid?.numeroDeCuenta)}</span>
                <span><b>Nombre de Cuenta</b></span>
                <span>{displayData(cuenfid?.nombreDeCuenta)}</span>
                <span><b>Banco</b></span>
                <span>{displayData(cuenfid?.nombreDeBanco)}</span>
              </div>
			  {/* no es necesario pasarle id dinamicos a los botones ya que se pinta una card con su logica independiente ademas del que VDOM de react no interactua directamente con los id ni con los elementos como en el DOM de JS*/}
              <div className="buttons_container">
                <button onClick={openModal} value="detalleCuenta">Detalle de la cuenta</button>
                <button onClick={openModal} value="configuracionAd">Configuración internacional</button>
                <button onClick={openModal} value="titular">Titular</button>
                <button onClick={openDocumentalModal}>Documentos</button>
              </div>
            </div>
            {/* Renderiza el modal correspondiente a cada card validando que el estado de la modal este en true && la key sea igual al cuenfid almacenado && que la modal reciba todos los parametros*/}
            {isModalOpen && selectedCuenfid === cuenfid && (
              <ModalComponent
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                modalTitle={modalContentData[modalContentKey].modalTitle}
                dataLoad={modalContentData[modalContentKey].modalContent}
              />
            )}
            {showControlDocumentalModal && selectedCuenfid === cuenfid && (
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

export default DetalleCuenFidMultiple;
