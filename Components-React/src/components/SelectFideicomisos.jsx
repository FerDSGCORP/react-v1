import { IconBusqueda, IconFIdeicomisoSelect, IconSelectDown } from "./Icons";

const SelectFideicomisos = () => {
    return (
        <>
        <div className="select_Fideicomiso">
            <IconFIdeicomisoSelect/>
            <span className="Fideicomiso_select">Fideicomiso: 1</span>
            <IconSelectDown/>
        </div>
        <div className="Fideicomiso_options">
            <span className="select_busqueda"> 
                <IconBusqueda/>
                Búsqueda</span>
            <span className="select_option">Fideicomiso: 1</span>
            <span className="select_option">Fideicomiso: 2</span>
        </div>
     </>
    );
}

export default SelectFideicomisos