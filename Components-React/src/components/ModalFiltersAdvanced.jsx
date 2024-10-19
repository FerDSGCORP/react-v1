import React, { useState, useEffect } from 'react';

const ModalFiltersAdvanced = ({ visibleColumns, isOpen, onClose, onSave }) => {
    // Estado inicial para las reglas y grupos
    const [groupOp, setGroupOp] = useState('AND'); // Valor por defecto AND/OR
    const [rules, setRules] = useState([{ field: '', op: '', data: '' }]); // Una regla inicial
    const [groups, setGroups] = useState([]); // Grupos adicionales de reglas

    // Manejo del cambio en el operador del grupo (AND/OR)
    const handleGroupOpChange = (e) => {
        setGroupOp(e.target.value);
    };

    // Manejo del cambio en una columna específica dentro de una regla
    const handleColumnChange = (index, e) => {
        const newRules = [...rules];
        newRules[index].field = e.target.value;
        setRules(newRules);
    };

    // Manejo del cambio en una condición específica dentro de una regla
    const handleConditionChange = (index, e) => {
        const newRules = [...rules];
        newRules[index].op = e.target.value;
        setRules(newRules);
    };

    // Manejo del valor dentro de una regla
    const handleValueChange = (index, e) => {
        const newRules = [...rules];
        newRules[index].data = e.target.value;
        setRules(newRules);
    };

    // Añadir una nueva regla
    const addNewRule = () => {
        setRules([...rules, { field: '', op: '', data: '' }]);
    };

    // Añadir un nuevo grupo (que podría tener múltiples reglas)
    const addNewGroup = () => {
        setGroups([...groups, { groupOp: 'AND', rules: [{ field: '', op: '', data: '' }] }]);
    };

    // Construir la estructura del filtro completo (con reglas y grupos)
    const filters = {
        groupOp: groupOp,
        rules: rules,
        groups: groups,
    };

    // Actualizar el console.log dinámicamente cada vez que cambian los valores
    useEffect(() => {
        console.log("Filters updated:", filters);
    }, [groupOp, rules, groups]);

    // Manejo de guardar filtros o cerrar el modal
    const handleSaveFilters = () => {
        localStorage.setItem("filtroAvanzado", JSON.stringify(filters));
        onSave(filters);
        onClose(); // Cerrar modal después de guardar
    };

    if (!isOpen) return null; // No mostrar nada si el modal está cerrado

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='modal-content-head'>
                    <h2>Filtros Avanzados</h2>
                    <button onClick={onClose}>X</button>
                </div>

                {/* Operador del grupo AND/OR */}
                <div className="containerFilterdiv">
                    <div className="conditionGroup">
                        <select
                            name="contional"
                            id="insertConditional"
                            className="condition"
                            onChange={handleGroupOpChange}
                            value={groupOp}
                        >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </select>
                        <button id="nuevoGrupo" onClick={addNewGroup}>+G</button> {/* Añadir grupo */}
                        <button id='nuevaCondicionG' onClick={addNewRule}>+</button> {/* Añadir regla */}
                    </div>

                    {/* Iterar sobre todas las reglas para renderizarlas */}
                    {rules.map((rule, index) => (
                        <div className="generalCondition" key={index}>
                            <select
                                name=""
                                id="SelectColumna"
                                onChange={(e) => handleColumnChange(index, e)}
                                value={rule.field}
                            >
                                <option value="">Selecciona Columna</option>
                                {visibleColumns.map((col) => (
                                    <option key={col.accessorKey} value={col.accessorKey}>
                                        {col.header}
                                    </option>
                                ))}
                            </select>

                            <select
                                name=""
                                id="selectConditionGeneral"
                                onChange={(e) => handleConditionChange(index, e)}
                                value={rule.op}
                            >
                                <option value="cn">contiene</option>
                                <option value="eq">igual a</option>
                                <option value="ne">no igual a</option>
                                <option value="gt">Mayor que</option>
                                <option value="lt">Menor que</option>
                                <option value="bw">empieza con</option>
                                <option value="bn">no empiece con</option>
                                <option value="in">está en</option>
                                <option value="ni">no está en</option>
                                <option value="ew">termina con</option>
                                <option value="en">no termina con</option>
                                <option value="nc">no contiene</option>
                                <option value="nu">es nulo</option>
                                <option value="nn">no es nulo</option>
                            </select>

                            <input
                                type="text"
                                id="SelectValor"
                                placeholder="Valor"
                                value={rule.data}
                                onChange={(e) => handleValueChange(index, e)}
                            />
                        </div>
                    ))}

                    {/* Si hay grupos adicionales, se renderizan aquí */}
                    {groups.map((group, groupIndex) => (
                        <div key={groupIndex} className="groupCondition">
                            <h3>Grupo {groupIndex + 1}</h3>
                            <select
                                name={`groupOp_${groupIndex}`}
                                id={`groupOp_${groupIndex}`}
                                value={group.groupOp}
                                onChange={(e) => {
                                    const newGroups = [...groups];
                                    newGroups[groupIndex].groupOp = e.target.value;
                                    setGroups(newGroups);
                                }}
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                            {group.rules.map((rule, ruleIndex) => (
                                <div key={ruleIndex} className="generalCondition">
                                    <select
                                        name=""
                                        id={`groupSelectColumna_${groupIndex}_${ruleIndex}`}
                                        value={rule.field}
                                        onChange={(e) => {
                                            const newGroups = [...groups];
                                            newGroups[groupIndex].rules[ruleIndex].field = e.target.value;
                                            setGroups(newGroups);
                                        }}
                                    >
                                        <option value="">Selecciona Columna</option>
                                        {visibleColumns.map((col) => (
                                            <option key={col.accessorKey} value={col.accessorKey}>
                                                {col.header}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name=""
                                        id={`groupSelectCondition_${groupIndex}_${ruleIndex}`}
                                        value={rule.op}
                                        onChange={(e) => {
                                            const newGroups = [...groups];
                                            newGroups[groupIndex].rules[ruleIndex].op = e.target.value;
                                            setGroups(newGroups);
                                        }}
                                    >
                                        <option value="cn">contiene</option>
                                        <option value="eq">igual a</option>
                                        <option value="ne">no igual a</option>
                                        <option value="gt">Mayor que</option>
                                        <option value="lt">Menor que</option>
                                        <option value="bw">empieza con</option>
                                        <option value="bn">no empiece con</option>
                                        <option value="in">está en</option>
                                        <option value="ni">no está en</option>
                                        <option value="ew">termina con</option>
                                        <option value="en">no termina con</option>
                                        <option value="nc">no contiene</option>
                                        <option value="nu">es nulo</option>
                                        <option value="nn">no es nulo</option>
                                    </select>

                                    <input
                                        type="text"
                                        id={`groupSelectValor_${groupIndex}_${ruleIndex}`}
                                        value={rule.data}
                                        onChange={(e) => {
                                            const newGroups = [...groups];
                                            newGroups[groupIndex].rules[ruleIndex].data = e.target.value;
                                            setGroups(newGroups);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <button onClick={handleSaveFilters}>Guardar Filtros</button>
                
            </div>
        </div>
    );
};

export default ModalFiltersAdvanced;
