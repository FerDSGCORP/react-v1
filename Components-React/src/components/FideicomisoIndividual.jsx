

function FideicomisoHome() {
    return (
        <div className="selecFideicomiso">
            <div className="FideiSVG">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M2.5 26.25V3.75H15V8.75H27.5V26.25H2.5ZM5 23.75H12.5V21.25H5V23.75ZM5 18.75H12.5V16.25H5V18.75ZM5 13.75H12.5V11.25H5V13.75ZM5 8.75H12.5V6.25H5V8.75ZM15 23.75H25V11.25H15V23.75ZM17.5 16.25V13.75H22.5V16.25H17.5ZM17.5 21.25V18.75H22.5V21.25H17.5Z" fill="#007AFF"/>
                </svg>
            </div>
            <div className="FideiInfo">
                <span className="InfoNombre">Fideicomiso:3</span>
                <span className="InfoTipo">Fideicomiso Administración</span>
                <span className="InfoStatus --statusActivo">Activo</span>
            </div>
            <div className="IngresoFidei">
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M20.7188 16.25H5.5V13.75H20.7188L13.7188 6.75L15.5 5L25.5 15L15.5 25L13.7188 23.25L20.7188 16.25Z" fill="#007AFF"/>
                </svg>
            </div>
        </div>
    );
}

export default FideicomisoHome