

const ModalExportarDatos = () => {
    return (
        <div className="modal">
        <div className="modal-content">
            <div className='modal-content-head'>
                <h2>Exportar Datos</h2>
                <button type='button' className="close-button" onClick={closeModal}>&times;</button>
            </div>

            <div className="container__field">
                <p>Formato</p>
                <select name="Formato">
                    <option value="1">Archivo separado por comas (.CSV)</option>
                    <option value="2">Archivo de texto (.TXT)</option>
                </select>
            </div>
            <div className="container__field">
                <p>Filtros</p>
                <select name="Filtros">
                    <option value="1">Toda la información</option>
                    <option value="2">Los mismo filtros que el grid</option>
                </select>
            </div>
            <div className="container__field">
                <p>Columnas</p>
                <select name="Columnas">
                    <option value="1">Todos los campos disponibles</option>
                    <option value="2">Sólo los campos que muestran en el grid</option>
                </select>
            </div>
            <button>Realizar exportación</button>
        </div>
    </div>
    );
}

export default ModalExportarDatos