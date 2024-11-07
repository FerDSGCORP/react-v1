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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredData = (data || []).filter((documento) =>
    documento.nombreDeDocumento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    documento.nombreDeElemento.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2>Cargando...</h2>
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
          {filteredData.length > 0 && (
            <div className="container__actions">
              <div className="searchopt">
                {/* Campo de búsqueda */}
                <input
                  type="text"
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
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
                    disabled={currentPage === totalPages || totalPages === 1}
                  >
                    <PaginacionNext />
                  </button>
                  <button
                    id='last-Page'
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 1}
                  >
                    <PaginacionUltima />
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredData.length === 0 && (
            <div className="--text-center --pd-05">
              <p>No hay documentos cargados</p>
            </div>
          )}

          {filteredData.length > 0 && (
            <div className="container_list">
              <ul>
                {currentItems.map((documento, index) => {
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
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ControlDocumentalModal;
