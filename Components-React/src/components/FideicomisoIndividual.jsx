import { IconGoFideicomisoDetalle, IconFideicomisoListRow } from "./Icons";
import FideicomisosCard from "../services/useFetchFideicomisosCard";
import { useLocation } from 'wouter';

function FideicomisoHome() {
  const numeroDeUsuario = localStorage.getItem("numeroDeUsuario");
  const id = numeroDeUsuario ? parseInt(numeroDeUsuario, 10) : null;

  const { data, loading, error } = FideicomisosCard(id);

  const [location, navigate] = useLocation();

  if (loading) {
    return <div>Cargando los datos de los fideicomisos...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No hay contratos disponibles.</div>;
  }

  const handleIngresoClick = (numeroDeContrato) => {
    localStorage.setItem('idFidSelect', numeroDeContrato);
    window.dispatchEvent(new CustomEvent('fidSelectChange', { detail: numeroDeContrato }));

    navigate(`/home/contrato-info/${numeroDeContrato}`);
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
              className={`InfoStatus ${contrato.textoEstatus === "ACTIVO"
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
            style={{ cursor: 'pointer' }}
          >
            <IconGoFideicomisoDetalle />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FideicomisoHome;
