import React from 'react';
import { Route, Switch } from 'wouter';
import AsideMenu from '../components/Aside';
import ContentBodyRender from '../components/ContentBodyRender';
import MenuNotifications from '../components/NotificationMenu';
import Footer from '../components/Footer';
import ReportarProblema from '../components/reportarProblema';
import DetalleFideicomiso from './DetalleFideicomiso';
import CartaInstruccion from './CartaInstruccion'
import '../assets/styles/style.css';

function RenderView() {
  return (
    <>
      <main className='container__render'>
        <div className="header">
          <div className='header-img'></div>
        </div>
        <div className="container__aside">
          <AsideMenu />
        </div>
        <div className="container__bodyRender">
          <Switch>
            {/* Ruta para mostrar el componente principal de home */}
            <Route path="/home" component={ContentBodyRender} />

            {/* Ruta para mostrar detalles de fideicomiso */}
            <Route path="/home/fideicomiso-info/:idFid">
              {params => <DetalleFideicomiso idFid={params.idFid} />}
            </Route>
            <Route path="/home/Carta-instruccion">
            {params => <CartaInstruccion/>}
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
