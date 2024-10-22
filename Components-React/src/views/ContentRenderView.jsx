import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import MainComponent from './TableView';
import DetalleFideicomiso from './DetalleFideicomiso';
import MisFIdeicomisosCrd from '../components/MisFideicomisos';
import FideicomisosCard from '../services/useFetchFideicomisosCard';
import CartaInstruccion from './CartaInstruccion';
import GridCuenFid from './IndexCuenFid';


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
        <Route path="/home/cuenfid-info/">
          {params => <GridCuenFid />}
        </Route>
      </Switch>
    </div>
  );
}

export default ContentRenderView;
