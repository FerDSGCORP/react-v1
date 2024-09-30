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
                    <div className="buttons_container">
                        <button onClick={openModal}>Características Adicionales</button>
                        <button>Características escritura pública</button>
                        <button>Documentos</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content __long">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>Características Adicionales</h2>
                        <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                            <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
                        </svg>
                        <div className="container__field">
                            <p>Genera Informativa 32b</p><span>{displayData(data?.textoInformativaSAT)}</span>
                            <p>Genera Reporte Transferencias Internacionales</p><span>{displayData(data?.txtReporteTransferenciaInternacional)}</span>
                        </div>
                        <div className="container__field">
                            <p>Omite Requeridos</p><span>{displayData(data?.textoOmiteRequeridos)}</span>
                            <p>Carga Saldos Mediante Estados de Financieros</p><span>{displayData(data?.textoSaldoEstadoFinanciero)}</span>
                        </div>
                        <div className="container__field">
                            <p>Forma de manejo</p><span>{displayData(data?.textoFormaDeManejo)}</span>
                            <p>Tipo de actividad</p><span>{displayData(data?.textoGerencia)}</span>
                        </div>
                        <div className="container__field">
                            <p>Actividad económica</p><span>{displayData(data?.nombreDeActividad)}</span>
                            <p>Maneja SubContrato</p><span>{displayData(data?.textoSubContrato)}</span>
                        </div>
                        <div className="container__field">
                            <p>Revocable</p><span>{displayData(data?.textoRevocable)}</span>
                            <p>Regional</p><span>{displayData(data?.textoRegional)}</span>
                        </div>
                        <div className="container__field">
                            <p>Aplica Cobro Automático</p><span>{displayData(data?.textoAplicaCobroA)}</span>
                            <p>Institución donde se apertura</p><span>{displayData(data?.textoInstApertura)}</span>
                        </div>
                        <div className="container__field">
                            <p>Plaza</p><span>{displayData(data?.textoPlaza)}</span>
                            <p>No. Per. S.R.E.</p><span>{displayData(data?.noPerSre)}</span>
                        </div>
                        <div className="container__field">
                            <p>Fecha Per. S.R.E.</p><span>{data?.fechaPerSre && data.fechaPerSre !== "1900-01-01T00:00:00" ? new Date(data.fechaPerSre).toLocaleDateString() : '-'}</span>
                            <p>Actividad de riesgo</p><span>{displayData(data?.textoActividadRiesgo)}</span>
                        </div>
                        <div className="container__field">
                            <p>Oficio de Exención</p><span>{displayData(data?.oficioExencion)}</span>
                            <p>Reg. Nal. Inv. Ex.</p><span>{displayData(data?.regNalInvEx)}</span>
                        </div>
                        <div className="container__field">
                            <p>GIIN</p><span>{displayData(data?.textoSHCP)}</span>
                            <p>Tiene Reg. Gob. DF</p><span>{displayData(data?.textoGobDF)}</span>
                        </div>
                        <div className="container__field">
                            <p>Tipo de Cliente</p><span>{displayData(data?.textoTipoDeCliente)}</span>
                            <p>Tipo de contrato</p><span>{displayData(data?.textoTipoDeContrato)}</span>
                        </div>
                        <div className="container__field __Reg_indiv">
                            <p>Estatu</p>s<span>{displayData(data?.textoEstatus)}</span>
                        </div>
                        <div className="container__field __Reg_indiv">
                            <p>Dirección Fiscal</p><span>{displayData(data?.direccionFiscalCompleto)}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetalleFideicomiso;
