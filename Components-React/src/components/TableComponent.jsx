
import React, { useState, useMemo, useEffect } from 'react';
import MenuColumns from './MenuColumns.jsx';
import ModalFiltersAdvanced from './ModalFiltersAdvanced.jsx';
import SelectFilterComponent from '../hooks/Filters.jsx';
import useFetchContrato from '../services/useFetchContrato.jsx'
import { useLocation } from 'wouter';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { IconActualizarTabla, IconColumnsSelect, IconExportarDatos, IconFiltersCom, IconTableCLose, IconTableNext, IconTablePrevious } from './Icons.jsx';

const TableComponent = ({ onTableReady }) => {
    const [location, navigate] = useLocation();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(80);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState(null);

    const { data, total, records, loading, error } = useFetchContrato(page, rowsPerPage, filters);

    const handleRowClick = (NumeroDeContrato) => {
        navigate(`/home/fideicomiso-info/${NumeroDeContrato}`);
    };

 
    const columns = useMemo(() => [
        { header: "NumeroDeContrato", accessorKey: "NumeroDeContrato", field: "text" },
        { header: "NombreDeContrato", accessorKey: "NombreDeContrato", field: "select" },
        { header: "OficioExencion", accessorKey: "OficioExencion", field: "select" },
        { header: "RegSHCP", accessorKey: "RegSHCP", field: "select" },
        { header: "RegGobDF", accessorKey: "RegGobDF", field: "select" },
        { header: "TextoRegional", accessorKey: "TextoRegional", field: "select" },
        { header: "Escritura", accessorKey: "Escritura", field: "select" },
        { header: "TextoSucursal", accessorKey: "TextoSucursal", field: "select" },
        { header: "FechaDeRegistroPublico", accessorKey: "FechaDeRegistroPublico", field: "select" },
        { header: "FechaDeApertura", accessorKey: "FechaDeApertura", field: "select" },
        { header: "FechaDeCancelacion", accessorKey: "FechaDeCancelacion", field: "select" },
        { header: "FechaDeInscripcionRegNalInvEx", accessorKey: "FechaDeInscripcionRegNalInvEx", field: "select" },
        { header: "NombreDeCliente", accessorKey: "NombreDeCliente", field: "select" },
        { header: "TextoESustitucion", accessorKey: "TextoESustitucion", field: "select" },
        { header: "TextoSustitucion", accessorKey: "TextoSustitucion", field: "select" },
        { header: "TextoESustitucionEje", accessorKey: "TextoESustitucionEje", field: "select" },
        { header: "TextoNombreDeContratoEje", accessorKey: "TextoNombreDeContratoEje", field: "select" },
        { header: "TextoTipoDeNegocio", accessorKey: "TextoTipoDeNegocio", field: "select" },
        { header: "TextoClasificacionDeProducto", accessorKey: "TextoClasificacionDeProducto", field: "select" },
        { header: "TextoNombreDeProducto", accessorKey: "TextoNombreDeProducto", field: "select" },
        { header: "TextoFormaDeManejo", accessorKey: "TextoFormaDeManejo", field: "select" },
        { header: "TextoComiteTecnico", accessorKey: "TextoComiteTecnico", field: "select" },
        { header: "TextoRevocable", accessorKey: "TextoRevocable", field: "select" },
        { header: "TextoSHCP", accessorKey: "TextoSHCP", field: "select" },
        { header: "TextoGobDF", accessorKey: "TextoGobDF", field: "select" },
        { header: "TextoTipoDeCliente", accessorKey: "TextoTipoDeCliente", field: "select" },
        { header: "TextoTipoDeContratoPublico", accessorKey: "TextoTipoDeContratoPublico", field: "select" },
        { header: "TextoTipoDeContrato", accessorKey: "TextoTipoDeContrato", field: "select" },
        { header: "TextoSubContrato", accessorKey: "TextoSubContrato", field: "select" },
        { header: "TextoNombreDeNotario", accessorKey: "TextoNombreDeNotario", field: "select" },
        { header: "TextoDeTipoDeAdministracion", accessorKey: "TextoDeTipoDeAdministracion", field: "select" },
        { header: "TextoCentroDeCostos", accessorKey: "TextoCentroDeCostos", field: "select" },
        { header: "TextoActividadEmpresarial", accessorKey: "TextoActividadEmpresarial", field: "select" },
        { header: "TextoPatrimonio", accessorKey: "TextoPatrimonio", field: "select" },
        { header: "TextoRegLasDeOperacion", accessorKey: "TextoRegLasDeOperacion", field: "select" },
        { header: "TextoNombreDeActividad", accessorKey: "TextoNombreDeActividad", field: "select" },
        { header: "RFCActividadEmpresarial", accessorKey: "RFCActividadEmpresarial", field: "select" },
        { header: "TextoGerencia", accessorKey: "TextoGerencia", field: "select" },
        { header: "TextoClasificacionProducto", accessorKey: "TextoClasificacionProducto", field: "select" },
        { header: "RegistroPublicoDeLaPropiedad", accessorKey: "RegistroPublicoDeLaPropiedad", field: "select" },
        { header: "TextoRegistroPresupuestal", accessorKey: "TextoRegistroPresupuestal", field: "select" },
        { header: "TextoRenovacionRegPresupuestal", accessorKey: "TextoRenovacionRegPresupuestal", field: "select" },
        { header: "RenovacionRegPresupuestal", accessorKey: "RenovacionRegPresupuestal", field: "select" },
        { header: "TextoInformativaSAT", accessorKey: "TextoInformativaSAT", field: "select" },
    ], []);

    const [columnFilters, setColumnFilters] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.accessorKey]: "" }), {})
    );
    const handleFilterChange = (accessorKey, value) => {
        const newRule = {
            field: accessorKey,
            op: "eq",
            data: value
        };

        setFilters((prev) => {
            const updatedFilters = {
                groupOp: "AND",
                rules: [],
                groups: []
            };

            const updatedRules = prev?.rules?.filter(rule => rule.field !== accessorKey) || [];

            if (value !== "") {
                updatedRules.push(newRule);
            }

            updatedFilters.rules = updatedRules;

            return updatedFilters;
        });
    };

    const transformedData = useMemo(() => {
        return data.map(row => {
            const cellData = row.cell;

            return {
                NumeroDeContrato: cellData[0],
                NombreDeContrato: cellData[1],
                OficioExencion: cellData[2],
                RegSHCP: cellData[3],
                RegGobDF: cellData[4],
                TextoRegional: cellData[5],
                Escritura: cellData[6],
                TextoSucursal: cellData[7],
                FechaDeRegistroPublico: cellData[8],
                FechaDeApertura: cellData[9],
                FechaDeCancelacion: cellData[10],
                FechaDeInscripcionRegNalInvEx: cellData[11],
                NombreDeCliente: cellData[12],
                TextoESustitucion: cellData[13],
                TextoSustitucion: cellData[14],
                TextoESustitucionEje: cellData[15],
                TextoNombreDeContratoEje: cellData[16],
                TextoTipoDeNegocio: cellData[17],
                TextoClasificacionDeProducto: cellData[18],
                TextoNombreDeProducto: cellData[19],
                TextoFormaDeManejo: cellData[20],
                TextoComiteTecnico: cellData[21],
                TextoRevocable: cellData[22],
                TextoSHCP: cellData[23],
                TextoGobDF: cellData[24],
                TextoTipoDeCliente: cellData[25],
                TextoTipoDeContratoPublico: cellData[26],
                TextoTipoDeContrato: cellData[27],
                TextoSubContrato: cellData[28],
                TextoNombreDeNotario: cellData[29],
                TextoDeTipoDeAdministracion: cellData[30],
                TextoCentroDeCostos: cellData[31],
                TextoActividadEmpresarial: cellData[32],
                TextoPatrimonio: cellData[33],
                TextoRegLasDeOperacion: cellData[34],
                TextoNombreDeActividad: cellData[35],
                RFCActividadEmpresarial: cellData[36],
                TextoGerencia: cellData[37],
                TextoClasificacionProducto: cellData[38],
                RegistroPublicoDeLaPropiedad: cellData[39],
                TextoRegistroPresupuestal: cellData[40],
                TextoRenovacionRegPresupuestal: cellData[41],
                RenovacionRegPresupuestal: cellData[42],
                TextoInformativaSAT: cellData[43]
            };
        });
    }, [data]);
    const [columnVisibility, setColumnVisibility] = useState(() =>
        columns.reduce((acc, col) => ({ ...acc, [col.accessorKey]: true }), {})
    );

    const [listColumnsActive, setListColumnsActive] = useState({
        list: columns,
        draggingIndex: null,
    });

    useEffect(() => {
        setColumnVisibility(columns.reduce((acc, col) => ({ ...acc, [col.accessorKey]: true }), {}));
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
    return (
        <div className='container__tbl'>
            <div className='container_tbl_buttons'>
                <button onClick={() => setIsModalOpen(true)}><IconColumnsSelect />Orden y columnas</button>
                <button onClick={() => setIsFilterModalOpen(true)}><IconFiltersCom />Filtros Avanzados</button>
            </div>

            <table>
                <thead>
                    <tr>
                        {table.getHeaderGroups().map(headerGroup =>
                            headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.column.columnDef.header}
                                    {header.column.columnDef.field === "text" ? (
                                        <input
                                            type="text"
                                            placeholder={`Filtrar ${header.column.columnDef.header}`}
                                            value={columnFilters[header.column.id]}
                                            onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                                        />
                                    ) : (
                                        <select
                                            value={columnFilters[header.column.id]}
                                            onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                                        >
                                            <option value="">Seleccione</option>
                                            {data.length > 0 && data
                                                .map((row) => {
                                                    const cellIndex = header.index;
                                                   
                                                    return row.cell[cellIndex];
                                                })
                                                .filter((value, index, self) => value && self.indexOf(value) === index)
                                                .map((uniqueValue, index) => (
                                                    <option key={`${header.column.id}-${index}`} value={uniqueValue}>
                                                        {uniqueValue}
                                                    </option>
                                                ))}
                                        </select>
                                    )}



                                    <div onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} className="resizer" style={{
                                        transform: header.column.getIsResizing() ? 'scaleX(2)' : '',
                                    }} />
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} onClick={() => handleRowClick(row.original.NumeroDeContrato)}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

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
                            listColumnsActive={listColumnsActive}
                            setListColumnsActive={setListColumnsActive}
                        />
                    </div>
                </div>
            )}

            {isFilterModalOpen && (
                <ModalFiltersAdvanced
                    visibleColumns={listColumnsActive.list}
                    isOpen={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    onSave={setFilters}
                />
            )}
        </div>
    );

};
export default TableComponent;