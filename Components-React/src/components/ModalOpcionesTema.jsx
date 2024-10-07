

const ModalOpcionesTema = () => {
    return (
        <div className="modal">
        <div className="modal-content">
            <div className='modal-content-head'>
                <h2>Selección de colores</h2>
                <button type='button' className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="card-content">
                <div className="cardHorizontal __cardColor">
                    <div className="card-form">
                        <span>Color Primario</span>
                        <input type="color" value="#007AFF" oninput="colorhex1.value=value"></input>
                        <output id="colorhex1">#007AFF</output>
                    </div>
                    <div className="card-form">
                        <span>Color Secundario</span>
                        <input type="color" value="#062C62" oninput="colorhex2.value=value"></input>
                        <output id="colorhex2">#062C62</output>
                    </div>
                </div>
                <div className="cardHorizontal __cardColor">
                    <div className="card-form">
                        <span>Color Texto</span>
                        <input type="color" value="#000000" oninput="colorhex3.value=value"></input>
                        <output id="colorhex3">#000000</output>
                    </div>
                    <div className="card-form">
                        <span>Color Iconos</span>
                        <input type="color" value="#007AFF" oninput="colorhex4.value=value"></input>
                        <output id="colorhex4">#007AFF</output>
                    </div>
                </div>
            </div>
            <button className="btn">Guardar y aplicar</button>
        </div>
    </div>
    );
}

export default ModalOpcionesTema