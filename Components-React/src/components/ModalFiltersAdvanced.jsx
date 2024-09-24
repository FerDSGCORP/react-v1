

const FiltroAvanzado = () =>{
    <div className="containerFilterdiv">
        <div className="conditionGroup">
            <select name="contional" id="" className="condition">
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
            <button id="nuevoGrupo">+"{}"</button>
            <button>+</button>
        </div>
        <div className="generalCondition">
            <select name="" id="SelectColumna">
                <option value=""></option>
            </select>
            <select name="" id="selectConditionGeneral">
                <option value=""></option>
            </select>
            <select name="" id="SelectValor">
                <option value=""></option>
            </select>
        </div>
    </div>
}