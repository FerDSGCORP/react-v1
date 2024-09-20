import {IconGoFideicomisoDetalle,IconFideicomisoListRow} from "./Icons"

function FideicomisoHome() {
    return (
        <div className="selecFideicomiso">
            <div className="FideiSVG">
             <IconFideicomisoListRow/>
            </div>
            <div className="FideiInfo">
                <span className="InfoNombre">Fideicomiso:3</span>
                <span className="InfoTipo">Fideicomiso Administración</span>
                <span className="InfoStatus --statusActivo">Activo</span>
            </div>
            <div className="IngresoFidei">
            <IconGoFideicomisoDetalle/>
            </div>
        </div>
    );
}

export default FideicomisoHome