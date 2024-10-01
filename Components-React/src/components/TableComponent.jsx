
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
        navigate(`/home/fideicomiso-info/${NumeroDeContrato}`); // Redireccionar usando wouter
    };
    // Define las columnas con los headers y accessorKeys proporcionados
    const columns = useMemo(() => [
        { header: "NumeroDeContrato", accessorKey: "NumeroDeContrato" },
        { header: "NombreDeContrato", accessorKey: "NombreDeContrato" },
        { header: "OficioExencion", accessorKey: "OficioExencion" },
        { header: "RegSHCP", accessorKey: "RegSHCP" },
        { header: "RegGobDF", accessorKey: "RegGobDF" },
        { header: "TextoRegional", accessorKey: "TextoRegional" },
        { header: "Escritura", accessorKey: "Escritura" },
        { header: "TextoSucursal", accessorKey: "TextoSucursal" },
        { header: "FechaDeRegistroPublico", accessorKey: "FechaDeRegistroPublico" },
        { header: "FechaDeApertura", accessorKey: "FechaDeApertura" },
        { header: "FechaDeCancelacion", accessorKey: "FechaDeCancelacion" },
        { header: "FechaDeInscripcionRegNalInvEx", accessorKey: "FechaDeInscripcionRegNalInvEx" },
        { header: "NombreDeCliente", accessorKey: "NombreDeCliente" },
        { header: "TextoESustitucion", accessorKey: "TextoESustitucion" },
        { header: "TextoSustitucion", accessorKey: "TextoSustitucion" },
        { header: "TextoESustitucionEje", accessorKey: "TextoESustitucionEje" },
        { header: "TextoNombreDeContratoEje", accessorKey: "TextoNombreDeContratoEje" },
        { header: "TextoTipoDeNegocio", accessorKey: "TextoTipoDeNegocio" },
        { header: "TextoClasificacionDeProducto", accessorKey: "TextoClasificacionDeProducto" },
        { header: "TextoNombreDeProducto", accessorKey: "TextoNombreDeProducto" },
        { header: "TextoFormaDeManejo", accessorKey: "TextoFormaDeManejo" },
        { header: "TextoComiteTecnico", accessorKey: "TextoComiteTecnico" },
        { header: "TextoRevocable", accessorKey: "TextoRevocable" },
        { header: "TextoSHCP", accessorKey: "TextoSHCP" },
        { header: "TextoGobDF", accessorKey: "TextoGobDF" },
        { header: "TextoTipoDeCliente", accessorKey: "TextoTipoDeCliente" },
        { header: "TextoTipoDeContratoPublico", accessorKey: "TextoTipoDeContratoPublico" },
        { header: "TextoTipoDeContrato", accessorKey: "TextoTipoDeContrato" },
        { header: "TextoSubContrato", accessorKey: "TextoSubContrato" },
        { header: "TextoNombreDeNotario", accessorKey: "TextoNombreDeNotario" },
        { header: "TextoDeTipoDeAdministracion", accessorKey: "TextoDeTipoDeAdministracion" },
        { header: "TextoCentroDeCostos", accessorKey: "TextoCentroDeCostos" },
        { header: "TextoActividadEmpresarial", accessorKey: "TextoActividadEmpresarial" },
        { header: "TextoPatrimonio", accessorKey: "TextoPatrimonio" },
        { header: "TextoRegLasDeOperacion", accessorKey: "TextoRegLasDeOperacion" },
        { header: "TextoNombreDeActividad", accessorKey: "TextoNombreDeActividad" },
        { header: "RFCActividadEmpresarial", accessorKey: "RFCActividadEmpresarial" },
        { header: "TextoGerencia", accessorKey: "TextoGerencia" },
        { header: "TextoClasificacionProducto", accessorKey: "TextoClasificacionProducto" },
        { header: "RegistroPublicoDeLaPropiedad", accessorKey: "RegistroPublicoDeLaPropiedad" },
        { header: "TextoRegistroPresupuestal", accessorKey: "TextoRegistroPresupuestal" },
        { header: "TextoRenovacionRegPresupuestal", accessorKey: "TextoRenovacionRegPresupuestal" },
        { header: "RenovacionRegPresupuestal", accessorKey: "RenovacionRegPresupuestal" },
        { header: "TextoInformativaSAT", accessorKey: "TextoInformativaSAT" },
    ], []);
    handleRowClick 
    // Transformar los datos para adaptarlos a las columnas dinámicas
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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleSaveFilters = (filters) => {
        setFilters(filters);
        setIsFilterModalOpen(false);
    };

    return (
        <div className='container__tbl'>
            <div className='container_tbl_buttons'>
                <button onClick={toggleModal}><IconColumnsSelect /> Abrir filtros</button>
                <button onClick={toggleFilterModal}><IconFiltersCom />Filtros Avanzados</button>
            </div>

            <table>
                <thead>
                    <tr>
                        {table.getHeaderGroups().map(headerGroup =>
                            headerGroup.headers.map(header => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize(), position: 'relative' }}>
                                    {header.column.columnDef.header}
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
                        <tr key={row.id} onClick={() => handleRowClick(row.original.NumeroDeContrato)}> {/* Añadir onClick */}
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
                            <button onClick={toggleModal}><IconTableCLose /></button>
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
                    onClose={toggleFilterModal}
                    onSave={handleSaveFilters}
                />
            )}
        </div>
    );
};
export default TableComponent;