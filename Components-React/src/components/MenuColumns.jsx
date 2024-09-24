import React, { useState, useEffect } from 'react';

const MenuColumns = ({ columns, setColumnVisibility, columnVisibility, listColumnsActive, setListColumnsActive }) => {
    const [filterText, setFilterText] = useState('');

    // Al abrir el modal, sincronizar el estado de columnas activas
    useEffect(() => {
        setListColumnsActive({
            list: columns.filter(col => columnVisibility[col.accessorKey]), // Solo columnas visibles
            draggingIndex: null,
        });
    }, [columnVisibility, columns, setListColumnsActive]);

    // Columnas visibles en rowsInTable
    const activeColumns = (listColumnsActive.list || []).filter(
        (col) => columnVisibility[col.accessorKey]
    );

    // Columnas no visibles (rowsByAdd)
    const inactiveColumns = columns.filter(
        (col) => !columnVisibility[col.accessorKey]
    );

    // Filtrar columnas inactivas basado en el input
    const filteredColumns = inactiveColumns.filter((col) =>
        col.header.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddColumn = (accessorKey) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [accessorKey]: true,
        }));
    };

    const handleRemoveColumn = (accessorKey) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [accessorKey]: false,
        }));
    };

    const handleRemoveAllColumns = () => {
        setColumnVisibility(
            columns.reduce((acc, col) => {
                acc[col.accessorKey] = false;
                return acc;
            }, {})
        );
    };

    const handleAddAllColumns = () => {
        setColumnVisibility(
            columns.reduce((acc, col) => {
                acc[col.accessorKey] = true;
                return acc;
            }, {})
        );
    };

    const handleDragStart = (index) => {
        setListColumnsActive((prevOrder) => ({
            ...prevOrder,
            draggingIndex: index,
        }));
    };

    const handleDragEnter = (index) => {
        setListColumnsActive((prevOrder) => {
            const newOrder = [...prevOrder.list];
            const draggingItem = newOrder[prevOrder.draggingIndex];
            newOrder.splice(prevOrder.draggingIndex, 1);
            newOrder.splice(index, 0, draggingItem);

            return {
                list: newOrder,
                draggingIndex: index,
            };
        });
    };

    const handleDragEnd = () => {
        setListColumnsActive((prevOrder) => ({
            ...prevOrder,
            draggingIndex: null,
        }));
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
                    {activeColumns.map((col, index) => (
                        <div
                            key={col.accessorKey}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                        >
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
