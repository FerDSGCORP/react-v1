import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import MainComponent from './TableView';
//Contrato
import DetalleFideicomiso from './DetalleFideicomiso';
import MisFIdeicomisosCrd from '../components/MisFideicomisos';
import FideicomisosCard from '../services/useFetchFideicomisosCard';
//Cuentas
import GridCuenFid from './IndexCuenFid';
import cuenFidMultiple from '../services/useFetchCuenFidMultiple';
import DetalleMultipleCuenFid from './DetalleMultipleCuenFid';
import DetalleCuenFid from './DetalleCuenFid'
//Contrato de Inversion
import GridCInterFid from './IndexCInterFid';
import cInterFidMultiple from '../services/useFetchCInterFidMultiple';
import DetalleMultipleCInterFid from './DetalleMultipleCInterFid';
import DetalleCInterFid from './DetalleCInterFid'
//Fideicomitentes
import GridFideicomitenteP from './IndexFideicomitenteP';
import fideicomitentePMultiple from '../services/useFetchFideicomitentePMultiple';
import DetalleMultipleFideicomitenteP from './DetalleMultipleFideicomitenteP';
import DetalleFideicomitenteP from './DetalleFideicomitenteP'
//Fideicomisarios
import GridFideicomisarioP from './IndexFideicomisarioP';
import fideicomisarioPMultiple from '../services/useFetchFideicomisarioPMultiple';
import DetalleMultipleFideicomisarioP from './DetalleMultipleFideicomisarioP';
import DetalleFideicomisarioP  from './DetalleFideicomisarioP'
//Terceros
import GridTerceroP from './IndexTerceroP';
import terceroPMultiple from '../services/useFetchTerceroPMultiple';
import DetalleMultipleTerceroP from './DetalleMultipleTerceroP';
import DetalleTerceroP  from './DetalleTerceroP'
//Bienes fideicomitidos
import GridBienFide from './IndexBienFide';
import bienFideMultiple from '../services/useFetchBienFideMultiple';
import DetalleMultipleBienFide from './DetalleMultipleBienFide';
import DetalleBienFide  from './DetalleBienFide'
//Instrucciones de Pago
import GridInstruccionPagoConcilia from './IndexInstruccionPagoConcilia';
import DetalleInstruccionPagoConcilia   from './DetalleInstruccionPagoConcilia'
import CartaInstruccion from './CartaInstruccion';


function getNumContratoLocalST() {
  return localStorage.getItem('idFidSelect');
}


function CuenFidInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingCuenFid, error: errorCuenFid } = cuenFidMultiple(numeroDeContrato);

  if (loadingCuenFid) return <div>Loading...</div>;
  if (errorCuenFid) return <div>Error: {errorCuenFid.message}</div>;

  return data?.length >= 11
    ? <GridCuenFid numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleCuenFid numeroDeContrato={numeroDeContrato} />;
}

function CInterFidInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingCInterFid, error: errorCInterFid } = cInterFidMultiple(numeroDeContrato);

  if (loadingCInterFid) return <div>Loading...</div>;
  if (errorCInterFid) return <div>Error: {errorCInterFid.message}</div>;

  return data?.length >= 11
    ? <GridCInterFid numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleCInterFid numeroDeContrato={numeroDeContrato} />;
}

function FideicomitentePInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingFideicomitenteP, error: errorFideicomitenteP } = fideicomitentePMultiple(numeroDeContrato);

  if (loadingFideicomitenteP) return <div>Loading...</div>;
  if (errorFideicomitenteP) return <div>Error: {errorFideicomitenteP.message}</div>;

  return data?.length >= 11
    ? <GridFideicomitenteP numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleFideicomitenteP numeroDeContrato={numeroDeContrato} />;
}

function FideicomisarioPInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingFideicomisarioP, error: errorFideicomisarioP } = fideicomisarioPMultiple(numeroDeContrato);

  if (loadingFideicomisarioP) return <div>Loading...</div>;
  if (errorFideicomisarioP) return <div>Error: {errorFideicomisarioP.message}</div>;

  return data?.length >= 11
    ? <GridFideicomisarioP numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleFideicomisarioP numeroDeContrato={numeroDeContrato} />;
}

function TerceroPInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingTerceroP, error: errorTerceroP } = terceroPMultiple(numeroDeContrato);

  if (loadingTerceroP) return <div>Loading...</div>;
  if (errorTerceroP) return <div>Error: {errorTerceroP.message}</div>;

  return data?.length >= 11
    ? <GridTerceroP numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleTerceroP numeroDeContrato={numeroDeContrato} />;
}

function BienFideInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingBienFid, error: errorBienFid } = bienFideMultiple(numeroDeContrato);

  if (loadingBienFid) return <div>Loading...</div>;
  if (errorBienFid) return <div>Error: {errorTerceroP.message}</div>;

  return data?.length >= 11
    ? <GridBienFide numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleBienFide numeroDeContrato={numeroDeContrato} />;
}


function ContentRenderView() {
  const [, navigate] = useLocation();

  const userData = localStorage.getItem('userData');
  const { numeroDeUsuario } = userData ? JSON.parse(userData) : {};

  const { records, loading, error } = FideicomisosCard(numeroDeUsuario);
  useEffect(() => {
    localStorage.removeItem('filtroAvanzado');
  }, [location]);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!numeroDeUsuario) {
      console.error('Número de usuario no encontrado. Asegúrate de haber iniciado sesión.');
    }
  }, [numeroDeUsuario]);

  if (loading) {
    return <p>Cargando información...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='bodyView'>
      <Switch>
        <Route path="/home">
          {() => (records > 11 ? <MainComponent /> : <MisFIdeicomisosCrd />)}
        </Route>
        <Route path="/home/contrato-info/:idFid">
          {params => <DetalleFideicomiso idFid={params.idFid} />}
        </Route>
        <Route path="/home/instruccionpagoconcilia-envio/:idFid">
          {params => <CartaInstruccion idFid={params.idFid} />}
        </Route>
        <Route path="/home/cuenfid-info/:numeroDeContrato" component={CuenFidInfoRoute} />
        <Route path="/home/cuenfid-detalle/:numeroDeContrato/subcontrato/:numeroDeSubContrato/pais/:numeroDePais/moneda/:numeroDeMoneda/cuenta/:numeroDeCuenta/cta/:cveProductoCuenta/cta/:subProductoCuenta/vista/:cuentaVista/secuencial/:secuencial">
          {params => {
            return <DetalleCuenFid {...params} />;
          }}
        </Route>
        <Route path="/home/cinterfid-info/:numeroDeContrato" component={CInterFidInfoRoute} />
        <Route path="/home/cinterfid-detalle/:numeroDeContrato/subcontrato/:numeroDeSubContrato/intermediario/:numeroDeIntermediario/moneda/:numeroDeMoneda/cintermediacion/:contratoIntermediacion">
          {params => {
            return <DetalleCInterFid {...params} />;
          }}
        </Route>
        <Route path="/home/fideicomitentep-info/:numeroDeContrato" component={FideicomitentePInfoRoute} />
        <Route path="/home/fideicomitentep-detalle/:numeroDeContrato/fideicom/:numeroDeFideicomitente">
          {params => {
            return <DetalleFideicomitenteP {...params} />;
          }}
        </Route>
        <Route path="/home/fideicomisariop-info/:numeroDeContrato" component={FideicomisarioPInfoRoute} />
            <Route path="/home/fideicomisariop-detalle/:numeroDeContrato/fidsario/:numeroDeFideicomisario">
              {params => {
                return <DetalleFideicomisarioP {...params} />;
              }}
        </Route>
        <Route path="/home/tercerop-info/:numeroDeContrato" component={TerceroPInfoRoute} />
        <Route path="/home/tercerop-detalle/:numeroDeContrato/tercero/:numeroDeTercero">
          {params => {
            return <DetalleTerceroP {...params} />;
          }}
        </Route>
        <Route path="/home/bienfide-info/:numeroDeContrato" component={BienFideInfoRoute} />
        <Route path="/home/bienfide-detalle/:idBien/contrato/:numeroDeContrato/subcontrato/:numeroDeSubcontrato">
          {params => {
            return <DetalleBienFide {...params} />;
          }}
        </Route>
        <Route path="/home/instruccionpagoconcilia-index/:idFidSelect">
             {params => <GridInstruccionPagoConcilia />}
        </Route>
        <Route path="/home/instruccionpagoconcilia-detalle/:folioInstruccionDePago/archivo/:secuencialArchivo/layout/:secuencialLayout">
          {params => {
            return <DetalleInstruccionPagoConcilia {...params} />;
          }}
        </Route>
      </Switch>
    </div>
  );
}
export { CuenFidInfoRoute,CInterFidInfoRoute,FideicomitentePInfoRoute,FideicomisarioPInfoRoute,TerceroPInfoRoute,BienFideInfoRoute };
export default ContentRenderView;
