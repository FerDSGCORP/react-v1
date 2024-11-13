import React, { useState } from "react";
import { IconPicture, IconPictureDelete } from "./Icons";
import useReportarProblema from "../services/useFetchReportarProblema";

function ReportarProblema() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectError, setSelectError] = useState(false);
  const [textareaError, setTextareaError] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const { sendFile, data, records, loading, error } = useReportarProblema();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectValue("");
    setTextareaValue("");
    setUploadedFiles([]);
    setSelectError(false);
    setTextareaError(false);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setUploadedFiles([...uploadedFiles, ...imageFiles]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const truncateFileName = (name) => {
    return name.length > 8 ? name.substring(0, 8) + "..." : name;
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
    if (event.target.value) {
      setSelectError(false);
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    if (event.target.value.trim()) {
      setTextareaError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!selectValue) {
      setSelectError(true);
      hasError = true;
    }
    if (!textareaValue.trim()) {
      setTextareaError(true);
      hasError = true;
    }

    if (!hasError) {
      try {
        await sendFile(uploadedFiles, selectValue, textareaValue);
        alert("Reporte enviado exitosamente.");
        closeModal();
      } catch (err) {
        alert(`Error al enviar el reporte: ${err.message}`);
      }
    }
  };

  return (
    <>
      <div className="problema">
        <div className="problema-card" onClick={openModal}>
          <span>
            <b>¿Tienes un problema?</b>
          </span>
          <span>
            <b>
              ¡Podemos ayudarte!
              <br />
              <br />
              Escríbenos
            </b>
          </span>
        </div>
        <div className="problema-img"></div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content --sm-modal __modal100">
            <div className="modal-content-head ---end-align --border-none">
              <button type="button" className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="bannerTitle">
              <p>
                Describe tu problema en el siguiente formulario y a la brevedad le daremos una respuesta / solución al
                problema que nos reportas
              </p>
            </div>
            <div className="container__content">
              <form className="frm_reportar" onSubmit={handleSubmit}>
                <div className="container__field">
                  <span>Reporte del problema:</span>
                  <select
                    name="selectProblema"
                    id="selectProblema"
                    value={selectValue}
                    onChange={handleSelectChange}
                    className={selectError ? "errorlbl" : ""}
                  >
                    <option value="">Selecciona una opción</option>
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
                  <textarea
                    rows="5"
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    className={textareaError ? "errorlbl" : ""}
                  ></textarea>
                </div>
                <div className="container__field">
                  <input
                    type="file"
                    id="uploadFileProblem"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="uploadFileProblem" className="btn --btn-azul --btn-sm" id="btn-upload-file-problem">
                    Seleccionar archivo
                  </label>
                  <div className="filesloaded">
                    {uploadedFiles.map((file, index) => (
                      <div className="fileCharge" key={index}>
                        <i className="deleteItem --ml-auto" onClick={() => handleDeleteFile(index)}>
                          <IconPictureDelete />
                        </i>
                        <i>
                          <IconPicture />
                        </i>
                        <span>{truncateFileName(file.name)}</span>
                      </div>
                    ))}
                  </div>
                  <span>En caso de no tener imagen del error dejar este campo vacío</span>
                </div>
                <div className="container__field container__btn">
                  <button className="btn --btn-azul" type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportarProblema;
