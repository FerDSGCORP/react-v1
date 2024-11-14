//Generado Automáticamente, Versión del generador: 5.0
import { useState, useMemo, useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchCInterFid from '../services/useFetchCInterFid';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';
import {
	activoStatuses,
	canceladoStatuses,
	pendienteStatuses,
	operacionStatuses
} from '../hooks/Estatuses'
import {
	IconStatusActivo,
	IconStatusCancelado,
	IconStatusPendiente,
	IconStatusOperacion
} from '../components/Icons'

function GridCInterFid() {
	const [location, navigate] = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableState, setTableState] = useState(null);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(80);

	const {
		columnFilters,
		setColumnFilters,
		filters,
		setFilters,
		handleFilterChange,
	} = useFilterTableChangeEvent();

	const handleRowClick = () => {
	};
	const numeroDeContrato = localStorage.getItem('idFidSelect');//falta generador
	const { data: fetchData, total, loading, error } = useFetchCInterFid(numeroDeContrato, page, rowsPerPage, filters);
	const columns = useMemo(() => [
		{ id: "NumeroDeContrato", header: "Negocio Fiduciario", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id: "NombreDeContrato", header: "Negocio Fiduciario", accessorKey: "NombreDeContrato", field: "text", visibilityCol: true }
		, { id: "NumeroDeSubContrato", header: "Subcontrato", accessorKey: "NumeroDeSubContrato", field: "text", visibilityCol: true }
		, { id: "NombreDeSubContrato", header: "Subcontrato", accessorKey: "NombreDeSubContrato", field: "text", visibilityCol: false }
		, { id: "NombreDeIntermediario", header: "Intermediario", accessorKey: "NombreDeIntermediario", field: "text", visibilityCol: true }
		, { id: "NombreDePais", header: "País", accessorKey: "NombreDePais", field: "text", visibilityCol: false }
		, { id: "NombreDeMoneda", header: "Moneda", accessorKey: "NombreDeMoneda", field: "text", visibilityCol: true }
		, { id: "ContratoIntermediacion", header: "Número de Contrato de Inversión", accessorKey: "ContratoIntermediacion", field: "text", visibilityCol: true }
		, { id: "ContratoDeInversionAlias", header: "Contrato de Inversión (ALIAS)", accessorKey: "ContratoDeInversionAlias", field: "text", visibilityCol: false }
		, { id: "TextoOrigenDeLosRecursos", header: "Origen de los Recursos", accessorKey: "TextoOrigenDeLosRecursos", field: "select", visibilityCol: false }
		, { id: "TextoFormaDeManejo", header: "Forma de Manejo", accessorKey: "TextoFormaDeManejo", field: "select", visibilityCol: false }
		, { id: "TextoFormaDeLiquidacion", header: "Forma de Liquidación", accessorKey: "TextoFormaDeLiquidacion", field: "select", visibilityCol: false }
		, { id: "TextoTipoDeFirmaDeCuenta", header: "Tipo de Firma de Cuenta", accessorKey: "TextoTipoDeFirmaDeCuenta", field: "select", visibilityCol: false }
		, { id: "Referencia", header: "Referencia", accessorKey: "Referencia", field: "text", visibilityCol: false }
		, { id: "ConvenioCIE", header: "Convenio CIE", accessorKey: "ConvenioCIE", field: "text", visibilityCol: false }
		, { id: "TextoSujetoAISR", header: "Sujeto a Retención de ISR", accessorKey: "TextoSujetoAISR", field: "select", visibilityCol: false }
		, { id: "FechaAperturaCuenta", header: "Fecha de Apertura del Contrato", accessorKey: "FechaAperturaCuenta", field: "text", visibilityCol: true }
		, { id: "FechaVencimientoCuenta", header: "Fecha de Vencimiento de Contrato", accessorKey: "FechaVencimientoCuenta", field: "text", visibilityCol: false }
		, { id: "FechaCancelacionCuenta", header: "Fecha de Cancelación de Contrato", accessorKey: "FechaCancelacionCuenta", field: "text", visibilityCol: false }
		, { id: "TextoTipoDeOrigenDeLosRecursos", header: "Tipo de Recursos", accessorKey: "TextoTipoDeOrigenDeLosRecursos", field: "select", visibilityCol: false }
		, { id: "TextoAplicaConciliacion", header: "Aplica Conciliación", accessorKey: "TextoAplicaConciliacion", field: "select", visibilityCol: false }
		, { id: "ParametrosDeInversion", header: "Parámetros de Inversión", accessorKey: "ParametrosDeInversion", field: "text", visibilityCol: false }
		, { id: "NombreDeCuentaAsociada", header: "Nombre de la Cuenta Asociada", accessorKey: "NombreDeCuentaAsociada", field: "text", visibilityCol: false }
		, { id: "TextoAcumula", header: "Acumula en Saldos", accessorKey: "TextoAcumula", field: "select", visibilityCol: false }
		, {
			id: "TextoEstatus", header: "Estatus", accessorKey: "TextoEstatus", field: "select", visibilityCol: true,
			cell: ({ row }) => {
				const value = row.original.TextoEstatus || '';
				if (activoStatuses.includes(value)) return <IconStatusActivo />;
				if (canceladoStatuses.includes(value)) return <IconStatusCancelado />;
				if (pendienteStatuses.includes(value)) return <IconStatusPendiente />;
				if (operacionStatuses.includes(value)) return <IconStatusOperacion />;

			}

		}
		, { id: "NumeroDeIntermediario", header: "Intermediario", accessorKey: "NumeroDeIntermediario", field: "text", visibilityCol: true }
		, { id: "TextoPerfilDeInversion", header: "Perfil de Inversión", accessorKey: "TextoPerfilDeInversion", field: "select", visibilityCol: false }
		, { id: "NumeroDePais", header: "País", accessorKey: "NumeroDePais", field: "text", visibilityCol: false }
		, { id: "NumeroDeMoneda", header: "Divisa", accessorKey: "NumeroDeMoneda", field: "text", visibilityCol: true }
		, { id: "TextoAplicaCobroHonorarios", header: "Aplica Cobro de Honorarios", accessorKey: "TextoAplicaCobroHonorarios", field: "select", visibilityCol: false }
	], []);

	const transformedData = useMemo(() => {
		if (!fetchData) return [];
		return fetchData.map(row => {
			const cellData = row.cell;
			return {
				NumeroDeContrato: cellData[0]
				, NombreDeContrato: cellData[1]
				, NumeroDeSubContrato: cellData[2]
				, NombreDeSubContrato: cellData[3]
				, NombreDeIntermediario: cellData[4]
				, NombreDePais: cellData[5]
				, NombreDeMoneda: cellData[6]
				, ContratoIntermediacion: cellData[7]
				, ContratoDeInversionAlias: cellData[8]
				, TextoOrigenDeLosRecursos: cellData[9]
				, TextoFormaDeManejo: cellData[10]
				, TextoFormaDeLiquidacion: cellData[11]
				, TextoTipoDeFirmaDeCuenta: cellData[12]
				, Referencia: cellData[13]
				, ConvenioCIE: cellData[14]
				, TextoSujetoAISR: cellData[15]
				, FechaAperturaCuenta: cellData[16]
				, FechaVencimientoCuenta: cellData[17]
				, FechaCancelacionCuenta: cellData[18]
				, TextoTipoDeOrigenDeLosRecursos: cellData[19]
				, TextoAplicaConciliacion: cellData[20]
				, ParametrosDeInversion: cellData[21]
				, NombreDeCuentaAsociada: cellData[22]
				, TextoAcumula: cellData[23]
				, TextoEstatus: cellData[24]
				, NumeroDeIntermediario: cellData[25]
				, TextoPerfilDeInversion: cellData[26]
				, NumeroDePais: cellData[27]
				, NumeroDeMoneda: cellData[28]
				, TextoAplicaCobroHonorarios: cellData[29]
			};
		});
	}, [fetchData]);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='container_tblView'>

			{isModalOpen && tableState && (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={toggleModal}>&times;</span>
						<MenuColumns
							columns={tableState.columns}
							setColumnVisibility={tableState.setColumnVisibility}
							columnVisibility={tableState.columnVisibility}
						/>
					</div>
				</div>
			)}

			<TableComponent
				data={transformedData}
				columns={columns}
				total={total}
				page={page}
				setPage={setPage}
				filters={filters}
				setFilters={setFilters}
				columnFilters={columnFilters}
				handleFilterChange={handleFilterChange}
				onTableReady={setTableState}
				handleRowClick={handleRowClick}
			/>
		</div>
	);
};
export default GridCInterFid;