
import React, {useState, useMemo, useEffect  } from 'react';
import '../assets/styles/style.css';
import MenuColumns from './MenuColumns.jsx';
import SelectFilterComponent from '../hooks/Filters.jsx';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';

const TableComponent = ({ data, onTableReady }) => {
    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'ID',
            type: 'text',
            footer: () => null,
            enableSorting: true,
            enableResizing: true,
            size: 150,
            minSize: 20,
            maxSize: 300,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            type: 'select',
            footer: () => null,
            enableSorting: true,
            enableResizing: true,
            size: 150,
            minSize: 20,
            maxSize: 300,
        },
        {
            accessorKey: 'country',
            header: 'Country',
            type: 'text',
            footer: () => null,
            enableSorting: true,
            enableResizing: true,
            size: 150,
            minSize: 20,
            maxSize: 300,
        },
    ], []);

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({
        id: true,
        name: true,
        country: true,
    });
    const [listColumnsActive, setListColumnsActive] = useState({
        list: columns,
        draggingIndex: null,
    });

    const table = useReactTable({
        data,
        columns: listColumnsActive.list,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: 'onChange',
    });

    useEffect(() => {
        if (onTableReady) {
            onTableReady({
                columns: listColumnsActive.list,
                setColumnVisibility,
                columnVisibility,
                listColumnsActive,
                setListColumnsActive
            });
        }
    }, [listColumnsActive, columnVisibility, onTableReady]);

    return (
        <div>
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
                    <SelectFilterComponent table={table} />
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                    {cell.getValue()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;

