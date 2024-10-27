import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, Redirect } from 'wouter';
import RenderView from './views/Renderview';
import LogIn from './views/LogIn';
import useFetchObtenFechaActual from './services/useFetchObtenFechaActual';

function App() {
  const [location, navigate] = useLocation();
  const [isSessionValid, setIsSessionValid] = useState(null);
  const { data, loading, error } = useFetchObtenFechaActual();

  useEffect(() => {
    const expiraEn = sessionStorage.getItem('expiraEn');

    if (!expiraEn || error) {
      setIsSessionValid(false);
      clearStorage();
      return;
    }

    if (data && data.fechaActual) {
      const [fechaExp, horaExp] = expiraEn.split(' ');
      const [diaExp, mesExp, añoExp] = fechaExp.split('/').map(Number);
      const [horasExp, minutosExp, segundosExp] = horaExp.split(':').map(Number);
      const fechaExpiracion = new Date(añoExp, mesExp - 1, diaExp, horasExp, minutosExp, segundosExp);

      const [fechaAct, horaAct] = data.fechaActual.split(' ');
      const [diaAct, mesAct, añoAct] = fechaAct.split('/').map(Number);
      const [horasAct, minutosAct, segundosAct] = horaAct.split(':').map(Number);
      const fechaActualObj = new Date(añoAct, mesAct - 1, diaAct, horasAct, minutosAct, segundosAct);

      if (fechaActualObj > fechaExpiracion) {
        setIsSessionValid(false);
        clearStorage();
      } else {
        setIsSessionValid(true);
      }
    }
  }, [data, error]);

  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (error && error.includes('401')) {
      clearStorage();
    }
  }, [error]);

  if (isSessionValid === null || loading) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/">
        {isSessionValid ? <Redirect to="/home/" /> : <LogIn />}
      </Route>
      <Route path="/home/*" component={RenderView} />
    </Switch>
  );
}

export default App;
