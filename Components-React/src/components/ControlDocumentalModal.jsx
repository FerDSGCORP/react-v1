import React, { useState, useEffect } from 'react';
import {
  IconPDF,
  IconCSV,
  IconXLSX,
  IconJPG,
  IconPNG,
  IconRAR,
  IconDOCX,
  IconXML,
  IconXLS,
  IconTXT,
  IconMSG,
  IconJPEG,
  IconFILEGEN,
  IconDownload,
  PaginacionPrimera,
  PaginacionPrev,
  PaginacionNext,
  PaginacionUltima,
} from './Icons';
import useControlDocumental from '../services/useFetchControlDocumental';

function ControlDocumentalModal({ isOpen, closeModal, tablaNum }) {
  const { data, loading, error } = useControlDocumental(tablaNum);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  const totalPages = Math.ceil((data && data.length ? data.length : 0) / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);

  const iconExtension = {
    IconPDF,
    IconCSV,
    IconXLSX,
    IconJPG,
    IconPNG,
    IconRAR,
    IconDOCX,
    IconXML,
    IconXLS,
    IconTXT,
    IconMSG,
    IconJPEG,
  };

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
          <div className="container__actions">
            <div className="searchopt">
            </div>
            <div className="pagination">
              <div className="container__Buttons__paginations">
                <button
                  id='first-Page'
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <PaginacionPrimera />
                </button>
                <button
                  id='prev-Page'
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <PaginacionPrev />
                </button>
              </div>

              <span>Página <b>{currentPage}</b> de <b>{totalPages}</b></span>

              <div className="container__Buttons__paginations">
                <button
                  id='next-Page'
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <PaginacionNext />
                </button>
                <button
                  id='last-Page'
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <PaginacionUltima />
                </button>
              </div>
            </div>
          </div>
          <div className="container_list">
            <ul>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((documento, index) => {
                  const extension = documento.extension.toUpperCase();
                  const iconName = `Icon${extension}`;
                  const ExtensionIcon = iconExtension[iconName] || IconFILEGEN;

                  return (
                    <li className="itemContainer" key={index}>
                      <i id="extension">
                        <ExtensionIcon />
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
                  );
                })
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
