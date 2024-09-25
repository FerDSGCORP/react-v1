
import React, {useState, useMemo, useEffect  } from 'react';
import MenuColumns from './MenuColumns.jsx';
import SelectFilterComponent from '../hooks/Filters.jsx';
import useFetchContrato from '../services/useFetchContrato.jsx'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { IconActualizarTabla, IconColumnsSelect, IconExportarDatos, IconTableCLose, IconTableNext, IconTablePrevious } from './Icons.jsx';


const TableComponent = ({ onTableReady }) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(80);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, total, records, loading, error } = useFetchContrato(page, rowsPerPage);

    // Generar columnas dinámicas basado en los datos
    const columns = useMemo(() => {
        if (data.length === 0 || !data[0]?.cell) {
            return [];
        }

        const cellLength = data[0].cell.length;
        return Array.from({ length: cellLength }, (_, i) => ({
            accessorKey: `col${i + 1}`,
            header: `Columna ${i + 1}`,
        }));
    }, [data]);

    // Transformar los datos para adaptarlos a las columnas dinámicas
    const transformedData = useMemo(() => {
        return data.map(row => {
            const transformedRow = { id: row.id };
            row.cell.forEach((cellValue, index) => {
                transformedRow[`col${index + 1}`] = cellValue;
            });
            return transformedRow;
        });
    }, [data]);

    // Estado inicial: todas las columnas visibles
    const [columnVisibility, setColumnVisibility] = useState(() => 
        columns.reduce((acc, col) => ({ ...acc, [col.accessorKey]: true }), {})
    );

    // Estado de columnas activas (listColumnsActive)
    const [listColumnsActive, setListColumnsActive] = useState({
        list: columns, // Inicializar todas las columnas como activas
        draggingIndex: null,
    });

    // Actualizar las columnas activas cuando cambian las columnas
    useEffect(() => {
        setColumnVisibility(columns.reduce((acc, col) => ({ ...acc, [col.accessorKey]: true }), {})); // Forzar todas las columnas visibles
        setListColumnsActive({
            list: columns,
            draggingIndex: null,
        });
    }, [columns]);

    const table = useReactTable({
        data: transformedData,
        columns: listColumnsActive.list,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: 'onChange',
    });

    useEffect(() => {
        if (onTableReady && data.length > 0) {
            onTableReady({
                columns,
                setColumnVisibility,
                listColumnsActive,
                setListColumnsActive,
            });
        }
    }, [onTableReady, data, columns]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= total) {
            setPage(newPage);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='container__tbl'>
            <div className='container_tbl_buttons'>
                <button onClick={toggleModal}> <IconColumnsSelect/>Columnas</button>
                <button><IconActualizarTabla/>Actualizar tabla</button>
                <button><IconExportarDatos/>Exportar Datos</button>
            </div>

            <table>
                <thead>
                    <tr>
                        {table.getHeaderGroups().map(headerGroup =>
                            headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ width: header.getSize(), position: 'relative' }}
                                >
                                    {header.column.columnDef.header}
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    <IconTablePrevious/>
                </button>
                <span>Página <b>{page}</b> de <b>{total}</b></span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === total}>
                     <IconTableNext/>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-content-head'>
                            <h2>Configurar Columnas</h2>
                            <button onClick={toggleModal}><IconTableCLose/></button>
                        </div>
                        <MenuColumns
                            columns={columns}
                            setColumnVisibility={setColumnVisibility}
                            columnVisibility={columnVisibility}
                            listColumnsActive={listColumnsActive}
                            setListColumnsActive={setListColumnsActive}
                        />
                        
                    </div>
                </div>
            )}
        </div>
    );
};
export default TableComponent;