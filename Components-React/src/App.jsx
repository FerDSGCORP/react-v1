import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, Redirect } from 'wouter';
import RenderView from './views/Renderview';
import LogIn from './views/LogIn';
import DetalleFideicomiso from "./views/DetalleFideicomiso";

function App() {
  const [location, navigate] = useLocation();
  const [isSessionValid, setIsSessionValid] = useState(null);

  useEffect(() => {
    const expiraEn = sessionStorage.getItem('expiraEn');
    const fechaActual = sessionStorage.getItem('fechaActual');

    if (expiraEn && fechaActual) {
      const [fechaExp, horaExp] = expiraEn.split(' ');
      const [diaExp, mesExp, añoExp] = fechaExp.split('/').map(Number);
      const [horasExp, minutosExp, segundosExp] = horaExp.split(':').map(Number);
      const fechaExpiracion = new Date(añoExp, mesExp - 1, diaExp, horasExp, minutosExp, segundosExp);

      const [fechaAct, horaAct] = fechaActual.split(' ');
      const [diaAct, mesAct, añoAct] = fechaAct.split('/').map(Number);
      const [horasAct, minutosAct, segundosAct] = horaAct.split(':').map(Number);
      const fechaActualObj = new Date(añoAct, mesAct - 1, diaAct, horasAct, minutosAct, segundosAct);

      if (fechaActualObj > fechaExpiracion) {
        setIsSessionValid(false);
      } else {
        setIsSessionValid(true);
      }
    } else {
      setIsSessionValid(false);
    }
  }, []);

  if (isSessionValid === null) {
    return null;
  }

  return (
    // <Switch>
    //   <Route path="/">
    //     {isSessionValid ? <Redirect to="/home/" /> : <LogIn />}
    //   </Route>
    //   <Route path="/home/*" component={RenderView} />
    // </Switch>
    <RenderView/>
  );
}

export default App;
