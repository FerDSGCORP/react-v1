import React, { useState } from 'react';
import { IconPDF } from '../components/Icons';
import useEnvioInstruction from '../services/useFetchSendInstruccionPago';

function CartaInstruccion() {
    const [file, setFile] = useState(null);
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const sendInstruccionPago = useEnvioInstruction();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsFileLoaded(true);
        }
    };

    const handleSendFile = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                await sendInstruccionPago(formData);
                alert('Archivo enviado exitosamente.');
            } catch (error) {
                console.error('Error al enviar el archivo:', error);
                alert('Error al enviar el archivo.');
            }
        } else {
            alert('Por favor, selecciona un archivo antes de enviar.');
        }
    };

    return (
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
    );
}

export default CartaInstruccion;
