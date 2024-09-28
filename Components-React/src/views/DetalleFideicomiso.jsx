import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchContratoInfo from '../services/useFetchContratoInfo';

function DetalleFideicomiso() {
    const { idFid } = useParams(); // Obtener el idFid desde la URL
    const { data, loading, error } = useFetchContratoInfo(idFid); // Obtener datos desde el hook
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error al cargar los datos: {error}</p>;

    // Función auxiliar para manejar los datos vacíos
    const displayData = (value) => {
        if (typeof value === 'string') {
            return value.trim() ? value : '-';
        } else if (value == null || value === "") {
            return '-';
        } else {
            return value;
        }
    };

    return (
        <>
            <div className="card">
                <span className="card-enc"><b>General</b></span>
                <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
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

            <div className="card">
                <span className="card-enc"><b>Características</b></span>
                <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                    <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
                </svg>
                <div id="frm_infoFideicomiso">
                    <div className="container__field">
                        <p>Tipo de negocio<span>{displayData(data?.textoTipoDeNegocio)}</span></p>
                        <p>Clasificación de producto<span>{displayData(data?.textoClasificacionDeProducto)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Producto<span>{displayData(data?.nombreDeProducto)}</span></p>
                        <p>Comité técnico<span>{displayData(data?.textoComiteTecnico)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Actividad empresarial<span>{displayData(data?.textoActividadEmpresarial)}</span></p>
                        <p>RFC<span>{displayData(data?.rFCActividadEmpresarial)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Reglas de operación<span>{displayData(data?.textoReglasDeOperacion)}</span></p>
                        <p>Fecha de apertura<span>{data?.fechaDeApertura ? new Date(data.fechaDeApertura).toLocaleDateString() : '-'}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Fecha de extinción<span>{data?.fechaDeCancelacion && data.fechaDeCancelacion !== "1900-01-01T00:00:00" ? new Date(data.fechaDeCancelacion).toLocaleDateString() : '-'}</span></p>
                        <p>Administración delegada<span>{displayData(data?.textoDeTipoDeAdministracion)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Centro de costos<span>{displayData(data?.textoCentroDeCostos)}</span></p>
                        <p>Registro público de la propiedad<span>{displayData(data?.registroPublicoDeLaPropiedad)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Tiene Clave del Registro Presupuestal<span>{displayData(data?.textoRegistroPresupuestal)}</span></p>
                        <p>Clave del Registro Presupuestal<span>{displayData(data?.registroPresupuestal)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Tiene Renovación de la Clave Presupuestal<span>{displayData(data?.textoRenovacionRegPresupuestal)}</span></p>
                        <p>Renovación Clave Presupuestal<span>{displayData(data?.renovacionRegPresupuestal)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Sucursal<span>{displayData(data?.textoSucursal)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>¿El contrato es una Sustitución?<span>{displayData(data?.textoEsSustitucion)}</span></p>
                        <p>Número de Fideicomiso Sustituido<span>{displayData(data?.contratoSustitucion)}</span></p>
                    </div>
                    <div className="container__field">
                        <p>Institución Financiera de Origen<span>{displayData(data?.nombreDeIntermediarioOrg)}</span></p>
                    </div>
                    <div className="buttons_container">
                        <button onClick={openModal}>Características Adicionales</button>
                        <button>Características escritura pública</button>
                        <button>Documentos</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>Características Adicionales</h2>
                        <div className="container__field">
                            <p>Genera Informativa 32b<span>{displayData(data?.textoInformativaSAT)}</span></p>
                            <p>Genera Reporte Transferencias Internacionales<span>{displayData(data?.txtReporteTransferenciaInternacional)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Omite Requeridos<span>{displayData(data?.textoOmiteRequeridos)}</span></p>
                            <p>Carga Saldos Mediante Estados de Financieros<span>{displayData(data?.textoSaldoEstadoFinanciero)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Forma de manejo<span>{displayData(data?.textoFormaDeManejo)}</span></p>
                            <p>Tipo de actividad<span>{displayData(data?.textoGerencia)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Actividad económica<span>{displayData(data?.nombreDeActividad)}</span></p>
                            <p>Maneja SubContrato<span>{displayData(data?.textoSubContrato)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Revocable<span>{displayData(data?.textoRevocable)}</span></p>
                            <p>Regional<span>{displayData(data?.textoRegional)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Aplica Cobro Automático<span>{displayData(data?.textoAplicaCobroA)}</span></p>
                            <p>Institución donde se apertura<span>{displayData(data?.textoInstApertura)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Plaza<span>{displayData(data?.textoPlaza)}</span></p>
                            <p>No. Per. S.R.E.<span>{displayData(data?.noPerSre)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Fecha Per. S.R.E.<span>{data?.fechaPerSre && data.fechaPerSre !== "1900-01-01T00:00:00" ? new Date(data.fechaPerSre).toLocaleDateString() : '-'}</span></p>
                            <p>Actividad de riesgo<span>{displayData(data?.textoActividadRiesgo)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Oficio de Exención<span>{displayData(data?.oficioExencion)}</span></p>
                            <p>Reg. Nal. Inv. Ex.<span>{displayData(data?.regNalInvEx)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>GIIN<span>{displayData(data?.textoSHCP)}</span></p>
                            <p>Tiene Reg. Gob. DF<span>{displayData(data?.textoGobDF)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Tipo de Cliente<span>{displayData(data?.textoTipoDeCliente)}</span></p>
                            <p>Tipo de contrato<span>{displayData(data?.textoTipoDeContrato)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Estatus<span>{displayData(data?.textoEstatus)}</span></p>
                        </div>
                        <div className="container__field">
                            <p>Dirección Fiscal<span>{displayData(data?.direccionFiscalCompleto)}</span></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetalleFideicomiso;
