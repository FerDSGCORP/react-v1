import React from 'react';
import { Route, Switch,useLocation  } from 'wouter';
import RenderView from './views/Renderview'
import LogIn from './views/LogIn';
import DetalleFideicomiso from "./views/DetalleFideicomiso"


function App() {
  // const [location, navigate] = useLocation();

  // // Verificar si existe el token en el sessionStorage
  // React.useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   if (token) {
  //     // Si hay un token, redirigir a /home
  //     navigate('/home/');
  //   }
  // }, [navigate]);

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
