import React from 'react';
import {
 
    IconTema
} from '../components/Icons'


function ContentBodyRender() {
    return (
        <div className='container__body'>
            <div className="subHeader">
                <div className="infoSystem">
                    <div><label id="saludo">Buenas Tardes</label>&nbsp;<span id="userName">Fernando Contreras</span></div>
                </div>
                <div className="changeColorModal">
                    <i><IconTema/></i>
                    <span>Opciones de Tema</span>
                </div>
            </div>
        </div>
    );
}

export default ContentBodyRender