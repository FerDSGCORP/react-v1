import React from 'react';
import { IconRedPDF, IconDownload } from './Icons';
import useControlDocumental from '../services/useFetchControlDocumental';

function ControlDocumentalModal({ isOpen, closeModal, tablaNum }) {
  const { data, loading, error } = useControlDocumental(tablaNum);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-content-head">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-content-head">
            <h2>Error: {error}</h2>
            <button
              type="button"
              className="close-button"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-head">
          <h2>Control documental</h2>
          <button
            type="button"
            className="close-button"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <div className="modal_body">
          <div className="container__actions"></div>
          <div className="container_list">
            <ul>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((documento, index) => (
                  <li className="itemContainer" key={index}>
                    <i id="extension">
                      <IconRedPDF />
                    </i>
                    <span id="nombreDeDocumento">
                      {documento.nombreDeDocumento}
                    </span>
                    <span id="nombreDeElemento">
                      {documento.nombreDeElemento}
                    </span>
                    <a
                      className="download_btn"
                      href={documento.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconDownload />
                      Descargar
                    </a>
                  </li>
                ))
              ) : (
                <li>No documents found.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlDocumentalModal;
