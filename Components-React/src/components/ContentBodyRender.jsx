import React, { useEffect, useState } from 'react';
import ContentRenderView from '../views/ContentRenderView'
import ModalOpcionesTema from './ModalOpcionesTema';
import {

    IconTema
} from './Icons'


function ContentBodyRender() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName = userData.nombreDeUsuario;
    const openModal =() =>{
        setIsModalOpen(true)
    }
    return (
        <>
            <div className='container__body'>
                <div className="subHeader">
                    <div className="infoSystem">
                        <div><label id="saludo">Buenas Tardes</label>&nbsp;<span id="userName">{userName}</span></div>
                    </div>
                    <div className="changeColorModal" onClick={openModal}>
                        <i><IconTema /></i>
                        <span>Opciones de Tema</span>
                    </div>
                </div>
                <ContentRenderView />
            </div>


            {isModalOpen && (
                <ModalOpcionesTema
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

export default ContentBodyRender