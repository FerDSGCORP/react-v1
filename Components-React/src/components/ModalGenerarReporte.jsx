

const ModalGenerarReporte = () => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className='modal-content-head'>
                    <h2>Generar Reporte</h2>
                    <button type='button' className="close-button" onClick={closeModal}>&times;</button>
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
                <div className="container__field">
                    <label>Versión Web</label><input type="radio" id="VWeb"/>
                    <label>Versión PDF</label><input type="radio" id="VPDF"/>
                </div>
                <button>Realizar exportación</button>
            </div>
        </div>
    );
}

export default ModalGenerarReporte