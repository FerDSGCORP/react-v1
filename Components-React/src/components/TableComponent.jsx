
import React, { useState, useMemo, useEffect } from 'react';
import MenuColumns from './MenuColumns.jsx';
import ModalFiltersAdvanced from './ModalFiltersAdvanced.jsx';
import SelectFilterComponent from '../hooks/Filters.jsx';
import useFetchContrato from '../services/useFetchContrato.jsx'
import useExportarDatosTable from '../services/useFetchExportarDatosTable.jsx'
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
    const [isModalExportarOpen, setModalExportarOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState(null);
    const [exportPayload, setExportPayload] = useState(null); // Estado para el payload de exportación

    const { data, total, records, loading, error } = useFetchContrato(page, rowsPerPage, filters);

    const handleRowClick = (NumeroDeContrato) => {
        navigate(`/home/contrato-info/${NumeroDeContrato}`);
    };

    const closeModalExport = () => {
        setModalExportarOpen(false);
    };

    const columns = useMemo(() => [
        { header: "NumeroDeContrato", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true },
        { header: "NombreDeContrato", accessorKey: "NombreDeContrato", field: "select", visibilityCol: true },
        { header: "OficioExencion", accessorKey: "OficioExencion", field: "select", visibilityCol: true },
        { header: "RegSHCP", accessorKey: "RegSHCP", field: "select", visibilityCol: true },
        { header: "RegGobDF", accessorKey: "RegGobDF", field: "select", visibilityCol: true },
        { header: "TextoRegional", accessorKey: "TextoRegional", field: "select", visibilityCol: true },
        { header: "Escritura", accessorKey: "Escritura", field: "select", visibilityCol: true },
        { header: "TextoSucursal", accessorKey: "TextoSucursal", field: "select", visibilityCol: true },
        { header: "FechaDeRegistroPublico", accessorKey: "FechaDeRegistroPublico", field: "select", visibilityCol: true },
        { header: "FechaDeApertura", accessorKey: "FechaDeApertura", field: "select", visibilityCol: true },
        { header: "FechaDeCancelacion", accessorKey: "FechaDeCancelacion", field: "select", visibilityCol: true },
        { header: "FechaDeInscripcionRegNalInvEx", accessorKey: "FechaDeInscripcionRegNalInvEx", field: "select", visibilityCol: true },
        { header: "NombreDeCliente", accessorKey: "NombreDeCliente", field: "select", visibilityCol: true },
        { header: "TextoESustitucion", accessorKey: "TextoESustitucion", field: "select", visibilityCol: true },
        { header: "TextoSustitucion", accessorKey: "TextoSustitucion", field: "select", visibilityCol: true },
        { header: "TextoESustitucionEje", accessorKey: "TextoESustitucionEje", field: "select", visibilityCol: true },
        { header: "TextoNombreDeContratoEje", accessorKey: "TextoNombreDeContratoEje", field: "select", visibilityCol: true },
        { header: "TextoTipoDeNegocio", accessorKey: "TextoTipoDeNegocio", field: "select", visibilityCol: true },
        { header: "TextoClasificacionDeProducto", accessorKey: "TextoClasificacionDeProducto", field: "select", visibilityCol: true },
        { header: "TextoNombreDeProducto", accessorKey: "TextoNombreDeProducto", field: "select", visibilityCol: true },
        { header: "TextoFormaDeManejo", accessorKey: "TextoFormaDeManejo", field: "select", visibilityCol: true },
        { header: "TextoComiteTecnico", accessorKey: "TextoComiteTecnico", field: "select", visibilityCol: true },
        { header: "TextoRevocable", accessorKey: "TextoRevocable", field: "select", visibilityCol: true },
        { header: "TextoSHCP", accessorKey: "TextoSHCP", field: "select", visibilityCol: true },
        { header: "TextoGobDF", accessorKey: "TextoGobDF", field: "select", visibilityCol: true },
        { header: "TextoTipoDeCliente", accessorKey: "TextoTipoDeCliente", field: "select", visibilityCol: true },
        { header: "TextoTipoDeContratoPublico", accessorKey: "TextoTipoDeContratoPublico", field: "select", visibilityCol: true },
        { header: "TextoTipoDeContrato", accessorKey: "TextoTipoDeContrato", field: "select", visibilityCol: true },
        { header: "TextoSubContrato", accessorKey: "TextoSubContrato", field: "select", visibilityCol: true },
        { header: "TextoNombreDeNotario", accessorKey: "TextoNombreDeNotario", field: "select", visibilityCol: false },
        { header: "TextoDeTipoDeAdministracion", accessorKey: "TextoDeTipoDeAdministracion", field: "select", visibilityCol: false },
        { header: "TextoCentroDeCostos", accessorKey: "TextoCentroDeCostos", field: "select", visibilityCol: false },
        { header: "TextoActividadEmpresarial", accessorKey: "TextoActividadEmpresarial", field: "select", visibilityCol: false },
        { header: "TextoPatrimonio", accessorKey: "TextoPatrimonio", field: "select", visibilityCol: false },
        { header: "TextoRegLasDeOperacion", accessorKey: "TextoRegLasDeOperacion", field: "select", visibilityCol: false },
        { header: "TextoNombreDeActividad", accessorKey: "TextoNombreDeActividad", field: "select", visibilityCol: false },
        { header: "RFCActividadEmpresarial", accessorKey: "RFCActividadEmpresarial", field: "select", visibilityCol: false },
        { header: "TextoGerencia", accessorKey: "TextoGerencia", field: "select", visibilityCol: false },
        { header: "TextoClasificacionProducto", accessorKey: "TextoClasificacionProducto", field: "select", visibilityCol: false },
        { header: "RegistroPublicoDeLaPropiedad", accessorKey: "RegistroPublicoDeLaPropiedad", field: "select", visibilityCol: false },
        { header: "TextoRegistroPresupuestal", accessorKey: "TextoRegistroPresupuestal", field: "select", visibilityCol: false },
        { header: "TextoRenovacionRegPresupuestal", accessorKey: "TextoRenovacionRegPresupuestal", field: "select", visibilityCol: false },
        { header: "RenovacionRegPresupuestal", accessorKey: "RenovacionRegPresupuestal", field: "select", visibilityCol: false },
        { header: "TextoInformativaSAT", accessorKey: "TextoInformativaSAT", field: "select", visibilityCol: false },
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
        columns.reduce((acc, col) => ({ ...acc, [col.accessorKey]: col.visibilityCol }), {})
    );

    const table = useReactTable({
        data: transformedData,
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
        let filtros = 0;
        let columnasJQgrid = '';
        let columnasVal = 0;
    
        // Manejo de filtros
        if (filtro === 'tableEmpty') {
            filtros = 1;
            busquedaJQgrid = '';
        } else if (filtro === 'tableFiltersHeader') {
            const filtroAvanzado = localStorage.getItem('filtroAvanzado');
            if (filtroAvanzado) {
                busquedaJQgrid = filtroAvanzado;
            } else {
                busquedaJQgrid = '';
            }
            filtros = 2;
        }
    
        // Manejo de columnas
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
            filtros,
            columnasJQgrid,
            columnas: columnasVal,
            campoDeOrdenJQgrid: '',
            tipoDeOrdenJQgrid: ''
        };
    
        setExportPayload(payload);  // Actualiza el payload para disparar el hook de exportación
    };

    // Usar el hook de exportación cuando haya un payload disponible
    const { data: exportData, loading: exportLoading, error: exportError } = useExportarDatosTable(exportPayload);

    useEffect(() => {
        if (onTableReady && data.length > 0) {
            onTableReady({
                columns,
                setColumnVisibility,
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
                <button onClick={() => setModalExportarOpen(true)}>Exportar</button>
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
                                <option value="tableFiltersHeader">Los mismo filtros que el grid</option>
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