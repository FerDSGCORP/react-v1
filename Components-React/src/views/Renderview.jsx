import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Select from 'react-select';
import EventEmitter from '../hooks/Emitter';
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
  const { data: fideicomisos, loading, error } = useFideicomisosCard();
  const [location, setLocation] = useLocation();
  const [idFidSelect, setIdFidSelect] = useState(() => localStorage.getItem('idFidSelect') || '');


  useEffect(() => {
    const storedIdFidSelect = localStorage.getItem('idFidSelect');
    if (storedIdFidSelect) {
      
      setIdFidSelect(storedIdFidSelect);
    }
  }, [location]);

  const options = fideicomisos
    ? fideicomisos.map(contrato => ({
        value: String(contrato.numeroDeContrato),
        label: contrato.nombreDeContratoU,
      }))
    : [];

  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption ? String(selectedOption.value) : '';
    if (selectedValue) {
      setIdFidSelect(selectedValue);
      localStorage.setItem('idFidSelect', selectedValue);
      setLocation(`/home/contrato-info/${selectedValue}`);
    }
  };

  const normalizedLocation = location.toLowerCase().replace(/\/$/, '');
  const shouldHideSelectHeader = normalizedLocation === '/home' || normalizedLocation === '/home/user-perfil';

  const selectedOption = options.find(option => option.value === idFidSelect) || null;

  const colorStyles = {

    control: (style, state) => ({
      ...style,
      height: "150px",
    }),
    
    option: (styles, state) => ({
      ...styles,
      background: "#062C62",
      padding: "15px",

      "&:hover" : {
        background: "#007AFF",
      }
    }),

  }

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
                <IconFIdeicomisoSelect />
                <Select
                  unstyled
                  styles={colorStyles}            
                  className="Fideicomiso_select"
                  name="selectHeader"
                  id="selectHeader"
                  onChange={handleSelectChange}
                  value={selectedOption}
                  options={options}
                  placeholder="SELECCIONE UN CONTRATO"
                  isSearchable
                />
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
            <Route path="/home/contrato-info/:idFid">
              {params => <DetalleFideicomiso idFid={params.idFid} />}
            </Route>
            <Route path="/home/instruccionpagoconcilia-envio/:idFidSelect">
              {params => <CartaInstruccion idFidSelect={idFidSelect} />}
            </Route>
            <Route path="/home/user-perfil/:idFidSelect">
              {params => <PerfilUserInfo idFidSelect={idFidSelect} />}
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