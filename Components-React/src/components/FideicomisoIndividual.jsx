import {IconGoFideicomisoDetalle,IconFideicomisoListRow} from "./Icons"
import FideicomisosCard from "../services/useFetchFideicomisosCard"

function FideicomisoHome() {
    const { data, loading, error } = FideicomisosCard(21); // Aquí puedes pasar el id necesario para el fetch
  
    if (loading) {
      return <div>Cargando los datos de los fideicomisos...</div>;
    }
  
    if (error) {
      return <div>Error al cargar los datos: {error}</div>;
    }
  
    return (
      <div>
        {data?.contratos?.map((contrato) => (
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
                  contrato.textoEstatus === 'ACTIVO'
                    ? '--statusActivo'
                    : '--statusPendiente'
                }`}
              >
                {contrato.textoEstatus}
              </span>
            </div>
            <div className="IngresoFidei">
              <IconGoFideicomisoDetalle />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default FideicomisoHome;