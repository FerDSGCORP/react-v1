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
      clearStorage();  // Limpia localStorage y sessionStorage si hay error
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
        clearStorage();  // Limpia localStorage y sessionStorage si la sesión ha expirado
      } else {
        setIsSessionValid(true);
      }
    }
  }, [data, error]);

  // Función para limpiar localStorage y sessionStorage
  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/"); // Redirigir al login
  };

  // Validar si hubo un error 401 Unauthorized
  useEffect(() => {
    if (error && error.includes('401')) {
      clearStorage();  // Limpia localStorage y sessionStorage si es un error 401
    }
  }, [error]);

  if (isSessionValid === null || loading) {
    return <div>Loading...</div>; // Mientras se espera la respuesta del servicio
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
