import React, { useState } from 'react';

const MenuColumns = ({ columns, setColumnVisibility, columnVisibility }) => {
    const [filterText, setFilterText] = useState('');

    const activeColumns = columns.filter(
        (col) => columnVisibility[col.accessorKey] // Filtra columnas visibles
    );

    const inactiveColumns = columns.filter(
        (col) => !columnVisibility[col.accessorKey] // Filtra columnas no visibles
    );

    const filteredColumns = inactiveColumns.filter((col) =>
        col.header.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddColumn = (accessorKey) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [accessorKey]: true, // Marca la columna como visible
        }));
    };

    const handleRemoveColumn = (accessorKey) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [accessorKey]: false, // Marca la columna como no visible
        }));
    };

    const handleRemoveAllColumns = () => {
        setColumnVisibility(
            columns.reduce((acc, col) => {
                acc[col.accessorKey] = false; // Todas las columnas no visibles
                return acc;
            }, {})
        );
    };

    const handleAddAllColumns = () => {
        setColumnVisibility(
            columns.reduce((acc, col) => {
                acc[col.accessorKey] = true; // Todas las columnas visibles
                return acc;
            }, {})
        );
    };

    return (
        <div className="container__menu">
            <div className="rowsInTable">
                <div className="header__rowsInTable">
                    <span className="rowsInTable__numSelected">
                        <p>Elementos Seleccionados</p>
                    </span>
                    <button id="eliminatedAll" onClick={handleRemoveAllColumns}>
                        Quitar todos
                    </button>
                </div>
                <div className="listColumnsActive">
                    {activeColumns.map((col) => (
                        <div key={col.accessorKey}>
                            {col.header}
                            <button onClick={() => handleRemoveColumn(col.accessorKey)}>
                                -
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rowsByAdd">
                <div className="header__rowsByAdd">
                    <div className="container__options">
                        <input
                            type="text"
                            id="filterInCols"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder="Buscar columnas..."
                            disabled={inactiveColumns.length === 0}
                        />
                        <button
                            id="addAll"
                            onClick={handleAddAllColumns}
                            disabled={inactiveColumns.length === 0}
                        >
                            Agregar todas
                        </button>
                    </div>
                </div>
                <div className="listColumnsAdd">
                    {filteredColumns.map((col) => (
                        <div key={col.accessorKey}>
                            {col.header}
                            <button onClick={() => handleAddColumn(col.accessorKey)}>
                                +
                            </button>
                        </div>
                    ))}
                    {filteredColumns.length === 0 && <p>No se encontraron columnas</p>}
                </div>
            </div>
        </div>
    );
};

export default MenuColumns;
