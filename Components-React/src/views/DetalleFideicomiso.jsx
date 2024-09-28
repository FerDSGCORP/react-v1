import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchContratoInfo from '../services/useFetchContratoInfo';

function DetalleFideicomiso() {
    const { idFid } = useParams(); // Obtener el idFid desde la URL
    const { data, loading, error } = useFetchContratoInfo(idFid); // Obtener datos desde el hook
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estados locales para almacenar los datos del fideicomiso
    const [fideicomisoInfo, setFideicomisoInfo] = useState({
        NumeroDeContrato: '',
        NombreDeContrato: '',
        NombreDeCliente: '',
        TextoTipoDeNegocio: '',
        TextoInformativaSAT: '',
        TxtReporteTransferenciaInternacional: '',
        TextoOmiteRequeridos: '',
        TextoSaldoEstadoFinanciero: '',
        TextoFormaDeManejo: '',
        TextoGerencia: '',
        NombreDeActividad: '',
        TextoSubContrato: ''
    });

    // Actualizar los estados con los datos recibidos
    useEffect(() => {
        if (data) {
            setFideicomisoInfo({
                NumeroDeContrato: data.NumeroDeContrato || '',
                NombreDeContrato: data.NombreDeContrato || '',
                NombreDeCliente: data.NombreDeCliente || '',
                TextoTipoDeNegocio: data.TextoTipoDeNegocio || '',
                TextoInformativaSAT: data.TextoInformativaSAT || '',
                TxtReporteTransferenciaInternacional: data.TxtReporteTransferenciaInternacional || '',
                TextoOmiteRequeridos: data.TextoOmiteRequeridos || '',
                TextoSaldoEstadoFinanciero: data.TextoSaldoEstadoFinanciero || '',
                TextoFormaDeManejo: data.TextoFormaDeManejo || '',
                TextoGerencia: data.TextoGerencia || '',
                NombreDeActividad: data.NombreDeActividad || '',
                TextoSubContrato: data.TextoSubContrato || ''
            });
        }
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar la modal
    const closeModal = () => {
        setIsModalOpen(false);
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
                    <span id='numeroDeContrato'></span>
                    <span><b>Nombre de contrato</b></span>
                    <span id='nombreDeContrato'></span>
                    <span><b>Cliente</b></span>
                    <span id='nombreDeCliente'></span>
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
                    <p>Tipo de negocio<span id='textoTipoDeNegocio'></span></p>
                    <p>Clasificación de producto<span id='textoClasificacionDeProducto'></span></p>
                </div>
                <div className="container__field">
                    <p>Producto<span id='nombreDeProducto'></span></p>
                    <p>Comité técnico<span id='textoComiteTecnico'></span></p>
                </div>
                <div className="container__field">
                    <p>Actividad empresarial<span id='textoActividadEmpresarial'></span></p>
                    <p>RFC<span id='rfcActividadEmpresarial'></span></p>
                </div>
                <div className="container__field">
                    <p>Reglas de operación<span id='textoReglasDeOperacion'></span></p>
                    <p>Fecha de apertura<span id='fechaDeApertura'></span></p>
                </div>
                <div className="container__field">
                    <p>Fecha de extinción<span id='fechaDeCancelacion'></span></p>
                    <p>Administración delegada<span id='textoDeTipoDeAdministracion'></span></p>
                </div>
                <div className="container__field">
                    <p>Centro de costos<span id='textoCentroDeCosto'></span></p>
                    <p>Registro público de la propiedad<span id='registroPublicoDeLaPropiedad'></span></p>
                </div>
                <div className="container__field">
                    <p>Tiene Clave del Registro Presupuestal<span id='textoRegistroPresupuestal'></span></p>
                    <p>Clave del Registro Presupuestal<span id='registroPresupuestal'></span></p>
                </div>
                <div className="container__field">
                    <p>Tiene Renovación de la Clave Presupuestal<span id='textoRenovacionRegPresupuestal'></span></p>
                    <p>Renovación Clave Presupuestal<span id='renovacionRegPresupuestal'></span></p>
                </div>
                <div className="container__field">
                    <p>Sucursal<span id='textoSucursal'></span></p>
                </div>
                <div className="container__field">
                    <p>¿El contrato es una Sustitución?<span id='textoEsSustitucion'></span></p>
                    <p>Número de Fideicomiso Sustituido<span id='contratoSustitucion'></span></p>
                </div>
                <div className="container__field">
                    <p>Institución Financiera de Origen<span id='nombreDeIntermediarioOrg'></span></p>
                </div>

                <div className="buttons_container">
                    <button onClick={openModal}>Características Adicionales</button>
                    <button>Características escritura pública</button>
                    <button>Documentos</button>
                </div>
            </div>
        </div>

        {/* Modal para mostrar los campos adicionales */}
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={closeModal}>&times;</span>
                    <h2>Características Adicionales</h2>
                    
                    {/* Adicionales */}
                    <div className="container__field">
                        <p>Genera Informativa 32b<span id='textoInformativaSAT'></span></p>
                        <p>Genera Reporte Transferencias Internacionales<span id='txtReporteTransferenciaInternacional'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Omite Requeridos<span id='textoOmiteRequeridos'></span></p>
                        <p>Carga Saldos Mediante Estados de Financieros<span id='textoSaldoEstadoFinanciero'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Forma de manejo<span id='textoFormaDeManejo'></span></p>
                        <p>Tipo de actividad<span id='textoGerencia'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Actividad económica<span id='nombreDeActividadnombreDeActividad'></span></p>
                        <p>Maneja SubContrato<span id='textoSubContrato'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Revocable<span id='textoRevocable'></span></p>
                        <p>Regional<span id='textoRegional'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Aplica Cobro Automático<span id='textoAplicaCobroA'></span></p>
                        <p>Institución donde se apertura<span id='textoInstApertura'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Plaza<span id='textoPlaza'></span></p>
                        <p>No. Per. S.R.E.<span id='noPerSre'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Fecha Per. S.R.E.<span id='fechaPerSre'></span></p>
                        <p>Actividad de riesgo<span id='textoActividadRiesgo'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Oficio de Exención<span id='oficioExencion'></span></p>
                        <p>Reg. Nal. Inv. Ex.<span id='regNalInvEx'></span></p>
                    </div>
                    <div className="container__field">
                        <p>GIIN<span id='textoActividadRiesgo'></span></p>
                        <p>Tiene Reg. Gob. DF<span id='textoGobDF'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Tipo de Cliente<span id='textoTipoDeCliente'></span></p>
                        <p>Tipo de contrato<span id='textoTipoDeContrato'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Estatus<span id='textoEstatus'></span></p>
                    </div>
                    <div className="container__field">
                        <p>Dirección Fiscal<span id='direccionFIscalCompleto'></span></p>
                    </div>
                    {/* Fin Adicionales */}
                </div>
            </div>
        )}
    </>
    );
}

export default DetalleFideicomiso;
