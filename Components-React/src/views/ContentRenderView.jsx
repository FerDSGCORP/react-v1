import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import MainComponent from './TableView';
import DetalleFideicomiso from './DetalleFideicomiso';
import MisFIdeicomisosCrd from '../components/MisFideicomisos';
import FideicomisosCard from '../services/useFetchFideicomisosCard';
import CartaInstruccion from './CartaInstruccion';
import GridCuenFid from './IndexCuenFid';
import cuenFidMultiple from '../services/useFetchCuenFidMultiple';
import DetalleMultipleCuenFid from './DetalleMultipleCuenFid';

function getNumContratoLocalST() {
  return localStorage.getItem('idFidSelect');
}


function CuenFidInfoRoute({ params }) {
  const numeroDeContrato = params.numeroDeContrato || getNumContratoLocalST() || '';
  const { data, loading: loadingCuenFid, error: errorCuenFid } = cuenFidMultiple(numeroDeContrato);

  if (loadingCuenFid) return <div>Loading...</div>;
  if (errorCuenFid) return <div>Error: {errorCuenFid.message}</div>;

  return data?.length > 11
    ? <GridCuenFid numeroDeContrato={numeroDeContrato} />
    : <DetalleMultipleCuenFid numeroDeContrato={numeroDeContrato} />;
}


function ContentRenderView() {
  const [, navigate] = useLocation();

  const userData = localStorage.getItem('userData');
  const { numeroDeUsuario } = userData ? JSON.parse(userData) : {};

  const { records, loading, error } = FideicomisosCard(numeroDeUsuario);
 
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
            {params => <CartaInstruccion idFid={params.idFid}/>}
        </Route>
        <Route path="/home/cuenfid-info/:numeroDeContrato" component={CuenFidInfoRoute} />

        <Route path="/home/cinterfid-info/:numeroDeContrato">
          {params => <GridCInterFid numeroDeContrato={params.idFid}/>}
        </Route>
      </Switch>
    </div>
  );
}
export { CuenFidInfoRoute };
export default ContentRenderView;
