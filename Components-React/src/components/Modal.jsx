import React from 'react';
import '../assets/styles/style.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content __long">
                <div className='modal-content-head'>
                    <h2>Encabezado de la modal</h2>
                    <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                </div>

                <div className="container__field">
                    <span>Informacion de la modal</span>
                </div>
            </div>
        </div>
    );
};

export default Modal;
