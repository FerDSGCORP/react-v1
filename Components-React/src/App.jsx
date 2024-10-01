import React from 'react';
import { Route, Switch,useLocation  } from 'wouter';
import RenderView from './views/Renderview'
import LogIn from './views/LogIn';
import DetalleFideicomiso from "./views/DetalleFideicomiso"


function App() {
  const [location, navigate] = useLocation();

  // Verificar si existe el token en el sessionStorage
  React.useEffect(() => {
    const expiraEn = sessionStorage.getItem('expiraEn');
    if (expiraEn) {
       const fechaActual = new Date();
       const hora = fechaActual.getHours();
       const minuto = fechaActual.getMinutes();
       const segundo = fechaActual.getSeconds();
       const fechaCompara=new Date();
       fechaCompara.setHours(hora, minuto, segundo || 0);
       const [horas, minutos, segundos] = expiraEn.split(" ")[1].split(':').map(Number);
      // const [horas, minutos, segundos] =expiraEn.split(':').map(Number);
      const fechaExpiracion=new Date();
      fechaExpiracion.setHours(horas, minutos, segundos || 0);
      console.log(fechaExpiracion);
      console.log(fechaCompara);
      if(fechaCompara>fechaExpiracion){
        console.log("Regresa Home");
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <Switch>
      {/* Ruta para Login */}
      <Route path="/" component={LogIn} />

      {/* Ruta para RenderView (que incluye todo el contenido después del login) */}
      <Route path="/home/*" component={RenderView} />
    </Switch>
  );
}

export default App;
