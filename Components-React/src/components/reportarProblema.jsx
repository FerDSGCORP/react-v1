import React, { useState } from "react";

function ReportarProblema() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="problema">
                <div className="problema-card">
                    <span><b>¿Tienes un problema?</b></span>
                    <span><b>¡Podemos ayudarte!<br /><br />Escríbenos</b></span>
                </div>
                <div className="problema-img" onClick={openModal}></div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content --sm-modal">
                        <div className='modal-content-head ---end-align --border-none'>
                            <button type='button' className="close-button" onClick={closeModal}>&times;</button>

                        </div>
                        <div className="bannerTitle">
                            <p>Describe tu problema en el siguiente formulario y <br />
                                a la brevedad le daremos una respuesta <br />
                                / solución al problema que nos reportas</p>
                        </div>
                        <div className="container__content">
                            <form className="frm_reportar" action="">
                                <div className="container__field">
                                    <span>Reporte del problema:</span>
                                    <select name="selectProblema" id="selectProblema">
                                        <option value="" selected>Selecciona una opción</option>
                                        <option value="Conexion">Conexión</option>
                                        <option value="Subida de archivo">Subida de archivo</option>
                                        <option value="Pantalla no visible">Pantalla no visible</option>
                                        <option value="Falta de informacion">Falta de información</option>
                                        <option value="Información errónea">Información errónea</option>
                                        <option value="Error">Error</option>
                                    </select>
                                </div>
                                <div className="container__field">
                                    <span>Descripción del problema:</span>
                                    <textarea name="" id="" rows="5"></textarea>
                                </div>
                                <div className="container__field">
                                    <input type="file" name="" id="uploadFileProblem" />
                                    <label htmlFor="uploadFileProblem" className="btn --btn-azul --btn-sm" id="btn-upload-file-problem">Seleccionar archivo</label>
                                    <span>En caso de no tener imagen del error dejar este campo vacío</span>
                                </div>
                                <div className="container__field container__btn">
                                    <button className="btn --btn-azul">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            )}
        </>

    );
}

export default ReportarProblema