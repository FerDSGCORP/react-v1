import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import MainComponent from './TableView';
import DetalleFideicomiso from './DetalleFideicomiso';
import MisFIdeicomisosCrd from '../components/MisFideicomisos';
import FideicomisosCard from '../services/useFetchFideicomisosCard';
import CartaInstruccion from './CartaInstruccion'


function ContentRenderView() {
  const [, navigate] = useLocation(); // Eliminamos `location` ya que no se usa

  // Obtener `numeroDeUsuario` desde `localStorage`
  const userData = localStorage.getItem('userData');
  const { numeroDeUsuario } = userData ? JSON.parse(userData) : {};

  // Usar el hook `FideicomisosCard` para obtener `records`
  const { records, loading, error } = FideicomisosCard(numeroDeUsuario);

  // Verificar si el token está disponible, si no redirigir al Login
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/'); // Si no hay token, redirigir al login
    }
  }, [navigate]);

  useEffect(() => {
    if (!numeroDeUsuario) {
      console.error('Número de usuario no encontrado. Asegúrate de haber iniciado sesión.');
    }
  }, [numeroDeUsuario]);

  // Mostrar loading mientras se obtienen los datos
  if (loading) {
    return <p>Cargando información...</p>;
  }

  // Mostrar mensaje de error si ocurre
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='bodyView'>
      <Switch>
        {/* Ruta predeterminada para mostrar el componente principal */}
        <Route path="/home">
          {() => (records > 11 ? <MainComponent /> : <MisFIdeicomisosCrd />)}
        </Route>

        {/* Ruta para mostrar detalles de fideicomiso */}
        <Route path="/home/fideicomiso-info/:idFid">
          {params => <DetalleFideicomiso idFid={params.idFid} />}
        </Route>
        <Route path="/home/instruccionpagoconcilia-envio/:idFid">
            {params => <CartaInstruccion idFid={params.idFid}/>}
        </Route>
      </Switch>
    </div>
  );
}

export default ContentRenderView;
