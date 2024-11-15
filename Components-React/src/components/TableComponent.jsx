import React, { useState, useEffect } from 'react';
import MenuColumns from './MenuColumns.jsx';
import ModalFiltersAdvanced from './ModalFiltersAdvanced.jsx';
import useExportarDatosTable from '../services/useFetchExportarDatosTable.jsx';
import { useLocation } from 'wouter';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { IconActualizarTabla, IconBtnExportar, IconColumnsSelect, IconFiltersCom, IconTableCLose, IconTableNext, IconTablePrevious,IconReload } from './Icons.jsx';

const TableComponent = ({ data, columns, total, page, setPage, filters, setFilters, columnFilters, handleFilterChange, onTableReady,handleRowClick,reloadTable, ligaServer }) => {
    const [location, navigate] = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalExportarOpen, setModalExportarOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [exportPayload, setExportPayload] = useState(null); 
 
    
    const closeModalExport = () => {
        setModalExportarOpen(false);
    };

    const [columnVisibility, setColumnVisibility] = useState(() =>
        columns.reduce((acc, col) => ({ ...acc, [col.id]: col.visibilityCol }), {})
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: 'onChange',
    });

    const handleExportarDatos = () => {
        const formato = document.getElementById('formatoExportar').value;
        const filtro = document.getElementById('tableFilterSelectExport').value;
        const columnas = document.getElementById('tableColumnSelectExport').value;
    
        let busquedaJQgrid = '';
        let filtrosVal = 0;
        let columnasJQgrid = '';
        let columnasVal = 0;
    
        if (filtro === 'tableEmpty') {
            filtrosVal = 1;
            busquedaJQgrid = '';
        } else if (filtro === 'tableFiltersHeader') {
            let busquedaJQgridObj = {
                groupOp: 'AND',
                rules: [],
            };
    
            const filtroAvanzado = localStorage.getItem('filtroAvanzado');
            if (filtroAvanzado) {
                const filtroAvanzadoObj = JSON.parse(filtroAvanzado);
                busquedaJQgridObj.rules = busquedaJQgridObj.rules.concat(filtroAvanzadoObj.rules || []);
            }
    
            if (columnFilters) {
                Object.entries(columnFilters).forEach(([columnId, value]) => {
                    if (value) {
                        busquedaJQgridObj.rules.push({
                            field: columnId,
                            op: 'cn',
                            data: value,
                        });
                    }
                });
            }
    
            busquedaJQgrid = JSON.stringify(busquedaJQgridObj);
            filtrosVal = 2;
        }
    
        if (columnas === 'allTableData') {
            columnasJQgrid = columns.map(col => col.accessorKey).join(',');
            columnasVal = 1;
        } else if (columnas === 'activeColumnTableData') {
            columnasJQgrid = Object.keys(columnVisibility)
                .filter(key => columnVisibility[key])
                .join(',');
            columnasVal = 2;
        }
    
        const payload = {
            formatos: formato,
            busquedaJQgrid,
            filtros: filtrosVal,
            columnasJQgrid,
            columnas: columnasVal,
            campoDeOrdenJQgrid: '',
            tipoDeOrdenJQgrid: ''
        };
    
        setExportPayload(payload);
    };
    

    const { data: exportData, loading: exportLoading, error: exportError } = useExportarDatosTable(exportPayload, ligaServer);

    useEffect(() => {
        if (onTableReady && data.length > 0) {
            onTableReady({
                columns,
                setColumnVisibility,
                columnVisibility,
            });
        }
    }, [onTableReady, data, columns, columnVisibility]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= total) {
            setPage(newPage);
        }
    };

    return (
        <div className='container__tbl'>
            <div className='container_tbl_buttons'>
                <button id='reloadtable'  onClick={reloadTable}><IconReload/>Actualizar tabla</button>
                <button onClick={() => setIsModalOpen(true)}><IconColumnsSelect />Orden y columnas</button>
                <button onClick={() => setIsFilterModalOpen(true)}><IconFiltersCom />Filtros Avanzados</button>
                <button onClick={() => setModalExportarOpen(true)}><IconBtnExportar/>Exportar</button>
            </div>

            <div className='container__tbl_table'>
                <table>
                   <thead>
                    <tr>
                        {table.getHeaderGroups().map(headerGroup =>
                        headerGroup.headers.map(header => (
                            <th key={header.id}>
                            {header.column.columnDef.header}
                            
                            {header.column.columnDef.field === "text" && (
                                <input
                                type="text"
                                placeholder={`Filtrar ${header.column.columnDef.header}`}
                                value={columnFilters[header.column.id] || ''}
                                onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                                />
                            )}
                            
                            {header.column.columnDef.field === "select" && (
                                <select
                                className='container__tbl_select'
                                value={columnFilters[header.column.id] || ''}
                                onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                                >
                                <option value="">Seleccione</option>
                                {data.length > 0 && [...new Set(data.map((row) => row[header.column.id]).filter(Boolean))]
                                    .map((uniqueValue, index) => (
                                    <option key={`${header.column.id}-${index}`} value={uniqueValue}>
                                        {uniqueValue}
                                    </option>
                                    ))}
                                </select>
                            )}

                            <div
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className="resizer"
                                style={{
                                transform: header.column.getIsResizing() ? 'scaleX(2)' : '',
                                }}
                            />
                            </th>
                        ))
                        )}
                    </tr>
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} onClick={() => handleRowClick(row.original)}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    <IconTablePrevious />
                </button>
                <span>Página <b>{page}</b> de <b>{total}</b></span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === total}>
                    <IconTableNext />
                </button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-content-head'>
                            <h2>Configurar Columnas</h2>
                            <button onClick={() => setIsModalOpen(false)}><IconTableCLose /></button>
                        </div>
                        <MenuColumns
                            columns={columns}
                            setColumnVisibility={setColumnVisibility}
                            columnVisibility={columnVisibility}
                        />
                    </div>
                </div>
            )}
            {isModalExportarOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-content-head'>
                            <h2>Exportar Datos</h2>
                            <button type='button' className="close-button" onClick={closeModalExport}>&times;</button>
                        </div>

                        <div className="container__field">
                            <p>Formato</p>
                            <select name="Formato" id='formatoExportar'>
                                <option value="csv">Archivo separado por comas (.CSV)</option>
                                <option value="txt">Archivo de texto (.TXT)</option>
                            </select>
                        </div>
                        <div className="container__field">
                            <p>Filtros</p>
                            <select name="Filtros" id='tableFilterSelectExport'>
                                <option value="tableEmpty">Toda la información</option>
                                <option value="tableFiltersHeader">Los mismos filtros que el grid</option>
                            </select>
                        </div>
                        <div className="container__field">
                            <p>Columnas</p>
                            <select name="Columnas" id='tableColumnSelectExport'>
                                <option value="allTableData">Todos los campos disponibles</option>
                                <option value="activeColumnTableData">Sólo los campos que muestran en el grid</option>
                            </select>
                        </div>
                        <button onClick={handleExportarDatos}>Realizar exportación</button>
                    </div>
                </div>
            )}
            {isFilterModalOpen && (
                <ModalFiltersAdvanced
                    visibleColumns={columns}
                    isOpen={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    onSave={setFilters}
                />
            )}
        </div>
    );
};

export default TableComponent;
