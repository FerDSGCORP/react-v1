import React,{useState} from 'react';
import { IconRedPDF, IconDownload } from './Icons'



function ControlDocumentalModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-content-head'>
                            <h2>Control documental</h2>
                            <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal_body">
                            <div className="container__actions">

                            </div>
                            <div className="container_list">
                                <ul>
                                    <li className="itemContainer">
                                        <IconRedPDF />
                                        <span id="nombreArchivo">
                                            jdhskshjdiehemnsmeler.pdf
                                        </span>
                                        <span id="clasificacionArchivo">
                                            Factura
                                        </span>
                                        <button className='download_btn'>
                                            <IconDownload />
                                            Descargar Archivo
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ControlDocumentalModal