import React from 'react';
import ContentRenderView from '../views/ContentRenderView'
import {
 
    IconTema
} from './Icons'


function ContentBodyRender() {
    const userData =  JSON.parse(localStorage.getItem('userData'));
    const userName=userData.nombreDeUsuario;

    return (
        <div className='container__body'>
            <div className="subHeader">
                <div className="infoSystem">
                    <div><label id="saludo">Buenas Tardes</label>&nbsp;<span id="userName">{userName}</span></div>
                </div>
                <div className="changeColorModal">
                    <i><IconTema/></i>
                    <span>Opciones de Tema</span>
                </div>
            </div>
            <ContentRenderView/>
        </div>
    );
}

export default ContentBodyRender