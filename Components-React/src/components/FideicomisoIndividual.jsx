import { IconGoFideicomisoDetalle, IconFideicomisoListRow } from "./Icons";
import FideicomisosCard from "../services/useFetchFideicomisosCard";
import { useLocation } from 'wouter';

function FideicomisoHome() {
  // Obtener el id del localStorage
  const numeroDeUsuario = localStorage.getItem("numeroDeUsuario");
  const id = numeroDeUsuario ? parseInt(numeroDeUsuario, 10) : 21; // Usar 21 como valor por defecto si no se encuentra el valor en localStorage

  // Usar el ID para hacer el fetch
  const { data, loading, error } = FideicomisosCard(id);

  // Obtener navigate de wouter
  const [location, navigate] = useLocation();


  if (loading) {
    return <div>Cargando los datos de los fideicomisos...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error}</div>;
  }

  // Verificar si `data` tiene elementos
  if (!data || data.length === 0) {
    return <div>No hay contratos disponibles.</div>;
  }

  // Manejar el clic en `IngresoFidei`
  const handleIngresoClick = (numeroDeContrato) => {
    navigate(`/home/fideicomiso-info/${numeroDeContrato}`);
  };

  return (
    <div>
      {data.map((contrato) => (
        <div key={contrato.numeroDeContrato} className="selecFideicomiso">
          <div className="FideiSVG">
            <IconFideicomisoListRow />
          </div>
          <div className="FideiInfo">
            <span className="InfoNombre">
              Fideicomiso: {contrato.numeroDeContrato}
            </span>
            <span className="InfoTipo">
              {contrato.textoClasificacionDeProducto}
            </span>
            <span
              className={`InfoStatus ${
                contrato.textoEstatus === "ACTIVO"
                  ? "--statusActivo"
                  : "--statusPendiente"
              }`}
            >
              {contrato.textoEstatus}
            </span>
          </div>
          <div
            className="IngresoFidei"
            onClick={() => handleIngresoClick(contrato.numeroDeContrato)}
            style={{ cursor: 'pointer' }} // Añadir un puntero para indicar que es clicable
          >
            <IconGoFideicomisoDetalle />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FideicomisoHome;
