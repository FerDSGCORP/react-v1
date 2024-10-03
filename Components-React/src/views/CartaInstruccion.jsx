import React from 'react';
import { IconPDF } from '../components/Icons'




function CartaInstruccion() {
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
                        <input type="file" name="" id="subirArchivoPDF" />
                        <label htmlFor="subirArchivoPDF" className='uploadComponent'>
                            <IconPDF />
                            <span>Carga tu archivo .pdf</span>
                        </label>
                        <button id='SendFile' className='btn --btn-azul'>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartaInstruccion