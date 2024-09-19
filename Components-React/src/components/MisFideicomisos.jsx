import FideicomisoHome from "./FideicomisoIndividual";

function MisFIdeicomisos() {
    return (
        <div className="card --short">
            <span className="card-enc"><b>Mis Fideicomisos</b></span>
            <svg width="100%" height="2" viewBox="0 0 1093 2" fill="none">
                <path d="M0 1H1093" stroke="#007AFF" strokeWidth="3" />
            </svg>
            <div className="card-content">
                <FideicomisoHome/>
                <FideicomisoHome/>
                <FideicomisoHome/>
            </div>
        </div>
    );
}

export default MisFIdeicomisos