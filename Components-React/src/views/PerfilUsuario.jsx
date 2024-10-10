import React, { useState } from 'react';
import imagenUsuario from '../assets/img/User.png';

function PerfilUserInfo() {
    return(
        <div className="card">
            <span className="card-enc"><b>Información de Perfil</b></span>
            <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
            </svg>
            <div className='card-content'>
                <div className='cardHorizontal'>
                    <form className="card-50">
                        <img src={imagenUsuario} alt="Imagen de usuario" />
                        <div className='card-form'>
                            <span>Cambiar imagen de perfil</span>
                            <button className='btn --btn-azul'> Seleccionar archivo</button>
                        </div>
                        <div className='card-form'>
                            <span>Cambiar alias de usuario</span>
                            <input type="text" name="" id="uploadAlias" />
                        </div>
                    </form>
                    <form className="card-50">
                        <span className='tiempo-psw'>Último cambio de contraseña hace 38 días</span>
                        <div className='card-form'>
                            <span>Antigua contraseña</span>
                            <input type="text" name="" id="psw-antique" />
                        </div>
                        <div className='card-form'>
                            <span>Nueva contraseña</span>
                            <input type="text" name="" id="uploadpsw" />
                        </div>
                        <div className='card-form'>
                            <span>Confirmar nueva contraseña</span>
                            <input type="text" name="" id="uploadpsw-confirm" />
                        </div>
                        <div className='card-button'>
                            <button className='btn --btn-azul'>Confirmar cambio</button>
                        </div>
                    </form>
                </div>
                <div className='card-button'>
                    <button className='btn'>Guardar cambios</button>
                </div>
            </div>
        </div>
    )
}

export default PerfilUserInfo