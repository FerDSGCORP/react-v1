import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import AsideMenu from '../components/Aside';
import ContentBodyRender from '../components/ContentBodyRender';
import MenuNotifications from '../components/NotificationMenu';
import Footer from '../components/Footer';
import ReportarProblema from '../components/reportarProblema';
import DetalleFideicomiso from './DetalleFideicomiso';
import CartaInstruccion from './CartaInstruccion';
import PerfilUserInfo from './PerfilUsuario';
import '../assets/styles/style.css';
import useFideicomisosCard from "../services/useFetchFideicomisosCard";
import { IconFIdeicomisoSelect } from '../components/Icons';

function RenderView() {
  const { data: fideicomisos, loading, error, idFid } = useFideicomisosCard();
  const [location, setLocation] = useLocation();

  useEffect(() => {

  }, [fideicomisos, idFid, location]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {

      setLocation(`/home/fideicomiso-info/${selectedValue}`);
    }
  };


  const normalizedLocation = location.toLowerCase().replace(/\/$/, ''); 
  const shouldHideSelectHeader = normalizedLocation === '/home' || normalizedLocation === '/home/user-perfil';

  return (
    <>
      <main className='container__render'>
        <div className="header">
          <div className='header-img'></div>
          <div className={`container__selectHeader ${shouldHideSelectHeader ? 'hide' : ''}`}>
            {loading ? (
              <p>Cargando fideicomisos...</p>
            ) : error ? (
              <p>Error al cargar fideicomisos: {error}</p>
            ) : (
              <div className="select_Fideicomiso">
                <IconFIdeicomisoSelect/>
                <select className="Fideicomiso_select" name="selectHeader" id="selectHeader" onChange={handleSelectChange}>
                  <option value="">SELECCIONE UN CONTRATO</option>
                  {fideicomisos && fideicomisos.map(contrato => (
                    <option key={contrato.numeroDeContrato} value={contrato.numeroDeContrato}>
                      {contrato.nombreDeContratoU}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="container__aside">
          <AsideMenu />
        </div>
        <div className="container__bodyRender">
          <Switch>
            <Route path="/home" component={ContentBodyRender} />
            <Route path="/home/fideicomiso-info/:idFid">
              {params => <DetalleFideicomiso idFid={params.idFid} />}
            </Route>
            <Route path="/home/Carta-instruccion">
              {params => <CartaInstruccion idFid={idFid} />}
            </Route>
            <Route path="/home/user-perfil">
              {params => <PerfilUserInfo idFid={idFid} />}
            </Route>
          </Switch>
        </div>
        <div className="container__notifications">
          <MenuNotifications />
        </div>
      </main>
      <ReportarProblema />
      <Footer />
    </>
  );
}

export default RenderView;
