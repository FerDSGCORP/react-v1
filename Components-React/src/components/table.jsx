import React from 'react';
import '../assets/styles/style.css'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const MyTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        footer: () => null,
        enableSorting: true,
        enableResizing: true,
        size: 150,        
        minSize: 20,      
        maxSize: 300,     
      },
      {
        accessorKey: 'age',
        header: 'Age',
        footer: () => null,
        enableSorting: true,
        enableResizing: true,
        size: 100,
        minSize: 20,
        maxSize: 200,
      },
      {
        accessorKey: 'country',
        header: 'Country',
        footer: () => null,
        enableSorting: true,
        enableResizing: true,
        size: 150,
        minSize: 20,
        maxSize: 300,
      },
    ],
    []
  );

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnSizing, setColumnSizing] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnSizing,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            {table.getHeaderGroups().map(headerGroup => (
              headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ width: header.getSize(), position: 'relative' }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
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
            ))}
          </tr>
          <tr>
            {table.getHeaderGroups().map(headerGroup => (
              headerGroup.headers.map(header => (
                <td key={header.id}>
                  {header.column.id === 'name' ? (
                    <select
                      onChange={(e) => table.getColumn(header.id).setFilterValue(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="John">John</option>
                      <option value="Jane">Jane</option>
                      <option value="Doe">Doe</option>
                    </select>
                  ) : header.column.id === 'age' ? (
                    <input
                      type="text"
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value)) {
                          table.getColumn(header.id).setFilterValue(e.target.value);
                        }
                      }}
                      placeholder="Enter age"
                    />
                  ) : header.column.id === 'country' ? (
                    <select
                      onChange={(e) => table.getColumn(header.id).setFilterValue(e.target.value)}
                    >
                      <option value="">All</option>
                      {/* Opciones de ejemplo */}
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  ) : null}
                </td>
              ))
            ))}
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
    </div>
  );
};

export default MyTable;

