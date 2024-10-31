import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import useFetchContratoInfo from '../services/useFetchContratoInfo';
import ControlDocumentalModal from '../components/ControlDocumentalModal'
import ModalComponent from '../components/ModalComponent';
import useReplaceEmptyValue from '../hooks/ReplaceEmptyValue';

function DetalleFideicomiso() {

    const [match, params] = useRoute('/home/contrato-info/:idFid');
    const idFid = match ? params.idFid : null;
    const tablaNum = 134;
    const { data, loading, error } = useFetchContratoInfo(idFid);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showControlDocumentalModal, setShowControlDocumentalModal] = useState(false);
    const [modalContentKey, setModalContentKey] = useState('estadoInicial');

    const displayData = useReplaceEmptyValue();


    const modalContentData = {
            caracteristicasAdicionales: {
                modalTitle: "Características Adicionales",
                modalContent: [
                    { campoTexto: "Genera Informativa 32b", campoValor: displayData(data?.textoInformativaSAT), isGroup: false, positionDiv: [0] },
                    { campoTexto: "Omite Requeridos", campoValor: displayData(data?.textoOmiteRequeridos), isGroup: true, positionDiv: [1] },
                    { campoTexto: "Carga Saldos Mediante Estados de Financieros", campoValor: displayData(data?.textoSaldoEstadoFinanciero), isGroup: true, positionDiv: [2] },
                    { campoTexto: "Forma de manejo", campoValor: displayData(data?.textoFormaDeManejo), isGroup: true, positionDiv: [3] },
                    { campoTexto: "Tipo de actividad", campoValor: displayData(data?.textoGerencia), isGroup: true, positionDiv: [4] },
                    { campoTexto: "Actividad económica", campoValor: displayData(data?.nombreDeActividad), isGroup: true, positionDiv: [5] },
                    { campoTexto: "Maneja SubContrato", campoValor: displayData(data?.textoSubContrato), isGroup: true, positionDiv: [6] },
                    { campoTexto: "Revocable", campoValor: displayData(data?.textoRevocable), isGroup: true, positionDiv: [7] },
                    { campoTexto: "Regional", campoValor: displayData(data?.textoRegional), isGroup: true, positionDiv: [8] },
                    { campoTexto: "Institución donde se apertura", campoValor: displayData(data?.textoInstApertura), isGroup: false, positionDiv: [9] },
                    { campoTexto: "Plaza", campoValor: displayData(data?.textoPlaza), isGroup: true, positionDiv: [10] },
                    { campoTexto: "No. Per. S.R.E.", campoValor: displayData(data?.noPerSre), isGroup: true, positionDiv: [11] },
                    { campoTexto: "Fecha Per. S.R.E.", campoValor: data?.fechaPerSre && data.fechaPerSre !== "1900-01-01T00:00:00" ? new Date(data.fechaPerSre).toLocaleDateString() : '-', isGroup: true, positionDiv: [12] },
                    { campoTexto: "Actividad de riesgo", campoValor: displayData(data?.textoActividadRiesgo), isGroup: true, positionDiv: [13] },
                    { campoTexto: "Sucursal", campoValor: "-", isGroup: true, positionDiv: [14] },
                    { campoTexto: "Tipo de Cliente", campoValor: displayData(data?.textoTipoDeCliente), isGroup: true, positionDiv: [15] },
                    { campoTexto: "Dirección Fiscal", campoValor: displayData(data?.direccionFiscalCompleto), isGroup: false, positionDiv: [16] }
                ]
            },
            caracteristicasEscrituraPublica: {
                modalTitle: "Escritura Pública",
                modalContent: [
                    { campoTexto: "Tipo de contrato Público", campoValor: displayData(data?.textoTipoDeContratoPublico), visibleField: false, isGroup: true, positionDiv: [0] },
                    { campoTexto: "Oficio de Extención", campoValor: displayData(data?.oficioExencion), visibleField: true, isGroup: true, positionDiv: [1] },
                    { campoTexto: "Reg. Nal. Inv. Ex.", campoValor: displayData(data?.regNalInvEx), visibleField: true, isGroup: true, positionDiv: [2] },
                    { campoTexto: "GIIN", campoValor: displayData(data?.textoSHCP), visibleField: true, isGroup: true, positionDiv: [3] },
                    { campoTexto: "Tiene Reg. Gob. DF", campoValor: displayData(data?.textoGobDF), visibleField: true, isGroup: true, positionDiv: [4] },
                    { campoTexto: "Fecha de inscripción Reg. Nal. Inv. Ex.", campoValor: displayData(data?.fechaDeInscripcionRegNalInvEx), visibleField: false, isGroup: true, positionDiv: [5] },
                    { campoTexto: "Número de GIIN", campoValor: displayData(data?.regSHCP), visibleField: false, isGroup: true, positionDiv: [6] },
                    { campoTexto: "Reg. Gob. DF", campoValor: displayData(data?.regGobDF), visibleField: false, isGroup: true, positionDiv: [7] },
                    { campoTexto: "Fecha de Registro Público", campoValor: displayData(data?.fechaDeRegistroPublico), visibleField: false, isGroup: true, positionDiv: [8] },
                    { campoTexto: "Escritura", campoValor: displayData(data?.escritura), visibleField: false, isGroup: true, positionDiv: [9] },
                    { campoTexto: "Notario", campoValor: displayData(data?.nombreDeNotario), visibleField: false, isGroup: false, positionDiv: [10] }
                ]
            }
        };



    useEffect(() => {
        if (data?.textoTipoDeContrato === "ESCRITURA PUBLICA") {
            const boton = document.getElementById('botonEscrituraPublica');

            if (boton) {
                boton.classList.remove('hide');
            }
        }
    }, [data]);

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
                <span className="card-enc"><b>General {data?.nombreDeProducto} {data?.textoComiteTecnico}</b></span>
                <svg viewBox="0 0 1093 2" fill="none">
                    <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
                </svg>
                <div className="card-content">
                    <div className='cardHorizontal'>
                        <span><b>Número de negocio fiduciario</b></span>
                        <span>{displayData(data?.numeroDeContrato)}</span>
                        <span><b>Nombre de contrato</b></span>
                        <span>{displayData(data?.nombreDeContrato)}</span>
                        <span><b>Cliente</b></span>
                        <span>{displayData(data?.nombreDeCliente)}</span>
                    </div>
                </div>
            </div>

            <div className="card mt-5">
                <span className="card-enc"><b>Características</b></span>
                <svg viewBox="0 0 1093 2" fill="none">
                    <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
                </svg>
                <div id="frm_infoFideicomiso">
                    <div className="container__field">
                        <p>Tipo de negocio</p><span>{displayData(data?.textoTipoDeNegocio)}</span>
                        <p>Clasificación de producto</p><span>{displayData(data?.textoClasificacionDeProducto)}</span>
                    </div>
                    <div className="container__field">
                        <p>Producto</p><span>{displayData(data?.nombreDeProducto)}</span>
                        <p>Comité técnico</p><span>{displayData(data?.textoComiteTecnico)}</span>
                    </div>
                    <div className="container__field">
                        <p>Actividad empresarial</p><span>{displayData(data?.textoActividadEmpresarial)}</span>
                        <p>RFC</p><span>{displayData(data?.rFCActividadEmpresarial)}</span>
                    </div>
                    <div className="container__field">
                        <p>Reglas de operación</p><span>{displayData(data?.textoReglasDeOperacion)}</span>
                        <p>Fecha de apertura</p><span>{data?.fechaDeApertura ? new Date(data.fechaDeApertura).toLocaleDateString() : '-'}</span>
                    </div>
                    <div className="container__field">
                        <p>Fecha de extinción</p><span>{data?.fechaDeCancelacion && data.fechaDeCancelacion !== "1900-01-01T00:00:00" ? new Date(data.fechaDeCancelacion).toLocaleDateString() : '-'}</span>
                        <p>Administración delegada</p><span>{displayData(data?.textoDeTipoDeAdministracion)}</span>
                    </div>
                    <div className="container__field">
                        <p>Centro de costos</p><span>{displayData(data?.textoCentroDeCostos)}</span>
                        <p>Registro público de la propiedad</p><span>{displayData(data?.registroPublicoDeLaPropiedad)}</span>
                    </div>
                    <div className="container__field">
                        <p>Tiene Clave del Registro Presupuestal</p><span>{displayData(data?.textoRegistroPresupuestal)}</span>
                        <p>Clave del Registro Presupuestal</p><span>{displayData(data?.registroPresupuestal)}</span>
                    </div>
                    <div className="container__field">
                        <p>Tiene Renovación de la Clave Presupuestal</p><span>{displayData(data?.textoRenovacionRegPresupuestal)}</span>
                        <p>Renovación Clave Presupuestal</p><span>{displayData(data?.renovacionRegPresupuestal)}</span>
                    </div>
                    <div className="container__field __Reg_indiv">
                        <p>Sucursal</p><span>{displayData(data?.textoSucursal)}</span>
                    </div>
                    <div className="container__field">
                        <p>¿El contrato es una Sustitución?</p><span>{displayData(data?.textoEsSustitucion)}</span>
                        <p>Número de Fideicomiso Sustituido</p><span>{displayData(data?.contratoSustitucion)}</span>
                    </div>
                    <div className="container__field __Reg_indiv">
                        <p>Institución Financiera de Origen</p><span>{displayData(data?.nombreDeIntermediarioOrg)}</span>
                    </div>
                    <div className="container__field">
                        <p>Estatus</p><span>{displayData(data?.textoEstatus)}</span>
                        <p>Tipo de contrato</p><span>{displayData(data?.textoTipoDeContrato)}</span>
                    </div>
                    <div className="buttons_container">
                        <button onClick={openModal} id='botonCaracteristicasAdicionales' value="caracteristicasAdicionales">Características Adicionales</button>
                        <button id='botonEscrituraPublica' className='hide' onClick={openModal} value="caracteristicasEscrituraPublica">Características escritura pública</button>
                        <button id='openModalDocumentos' onClick={openDocumentalModal}>Documentos</button>
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

export default DetalleFideicomiso;
