import React, { useState } from 'react';
import { IconPDF, IconErrorModal } from '../components/Icons';
import useEnvioInstruction from '../services/useFetchSendCartaInstruccion';

function CartaInstruccion() {
    const [file, setFile] = useState(null);
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const { sendFile, error } = useEnvioInstruction();  // Usa el hook actualizado

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorDetail, setErrorDetail] = useState('');
    const [isModalExitoOpen, setisModalExitoOpen] = useState(false);
    const [msjExito, setMsjExito] = useState('');  // Estado para el mensaje de éxito

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openModalExito = () => {
        setisModalExitoOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorDetail('');
    };

    const closeModalExito = () => {
        setisModalExitoOpen(false);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsFileLoaded(true);
        }
    };

    const handleSendFile = async () => {
        if (file) {
            try {
                const response = await sendFile(file);  // Recibir la respuesta del servicio

                // Concatenar el mensaje de éxito con el folio
                const mensajeExito = `${response.mensaje} con folio ${response.folioReferenciaR}`;
                setMsjExito(mensajeExito);  // Establecer el mensaje de éxito

                // Retrasar la apertura del modal de éxito por 2 segundos
                setTimeout(() => {
                    openModalExito();
                }, 2000);

            } catch (error) {
                console.error('Error al enviar el archivo:', error);
                setErrorDetail(error.message || 'Error desconocido al enviar el archivo.');
                openModal();
            }
        } else {
            alert('Por favor, selecciona un archivo antes de enviar.');
        }
    };

    return (
        <>
            <div className="card">
                <span className="card-enc"><b>Envío de Carta Instrucción</b></span>
                <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                    <path d="M0 1H1093" stroke="#007AFF" strokeWidth="2" />
                </svg>
                <div className="card-content">
                    <div className='cardHorizontal'>
                        <div className="container__load__file">
                            <p> Carga tu documento de Carta Instrucción.</p>
                            <input
                                type="file"
                                id="subirArchivoPDF"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="subirArchivoPDF"
                                className={`uploadComponent ${isFileLoaded ? '--uploadFile' : ''}`}
                            >
                                <IconPDF />
                                <span>Carga tu archivo .pdf</span>
                            </label>
                            <button
                                id='SendFile'
                                className='btn --btn-azul'
                                onClick={handleSendFile}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content --sm-modal">
                        <div className='modal-content-head ---end-align'>
                            <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="container__content__ModalErr">
                            <IconErrorModal />
                            <span className="msjError">Error al Enviar el documento</span>
                            <span className="detailError">{errorDetail}</span>
                        </div>
                    </div>
                </div>
            )}
            {isModalExitoOpen && (
                <div className="modal">
                    <div className="modal-content --sm-modal">
                        <div className='modal-content-head ---end-align'>
                            <button type='button' className="close-button" onClick={closeModalExito}>&times;</button>
                        </div>
                        <div className="container__content__ModalErr">
                            <span className="msjExito">{msjExito}</span>  {/* Mostrar el mensaje de éxito */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CartaInstruccion;
