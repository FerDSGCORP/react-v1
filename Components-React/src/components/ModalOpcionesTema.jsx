// ModalOpcionesTema.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/theme'
import { IconTableCLose } from './Icons';

function ModalOpcionesTema({ isOpen, closeModal }) {
  const {
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    textColor,
    setTextColor,
    iconColor,
    setIconColor,
    saveColorsToCookies,
    resetColors,
  } = useContext(ThemeContext);

  const saveAndClose = () =>{
    saveColorsToCookies();
    closeModal();
  } 
  const resetValues = () => {
    resetColors();
    closeModal();
  }
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content-head">
              <h2>Selección de colores</h2>
              <button type="button" className="close-button" onClick={closeModal}>
                <IconTableCLose/>
              </button>
            </div>
            <div className="card-content">
              <div className="cardHorizontal __cardColor">
                <div className="card-form">
                  <span>Color Primario</span>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                  />
                  <output>{primaryColor}</output>
                </div>
                <div className="card-form">
                  <span>Color Secundario</span>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                  />
                  <output>{secondaryColor}</output>
                </div>
              </div>
              <div className="cardHorizontal __cardColor">
                <div className="card-form">
                  <span>Color Texto</span>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                  <output>{textColor}</output>
                </div>
                <div className="card-form">
                  <span>Color Iconos</span>
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                  />
                  <output>{iconColor}</output>
                </div>
              </div>
            </div>
            <button className="btn" onClick={saveAndClose}>
              Guardar y aplicar
            </button>
            <button className="btn" onClick={resetValues}>
              Reestablecer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalOpcionesTema;
