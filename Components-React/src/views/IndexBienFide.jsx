//Generado Automáticamente, Versión del generador: 5.2
import { useState, useMemo,useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchBienFide from '../services/useFetchBienFide';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';
import { IconEye } from '../components/Icons';

function GridBienFide() {
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

	const ligaServer = "bienfide"
	const navigateURL = "/home/bienfide-detalle/";
	const handleRowClick = (rowData) => {
		const {
			IdBien: idBien
			, NumeroDeContrato: numeroDeContrato
			, NumeroDeSubcontrato: numeroDeSubcontrato
		} = rowData;
		localStorage.setItem('idFidSelect', numeroDeContrato);
		window.dispatchEvent(new CustomEvent('fidSelectChange', { detail: numeroDeContrato }));
		navigate(`${navigateURL}${idBien}/contrato/${numeroDeContrato}/subcontrato/${numeroDeSubcontrato}`);
	};
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const { data: fetchData, total, loading, error }= useFetchBienFide(numeroDeContrato,page, rowsPerPage, filters);

	const columns = useMemo(() => [
		{ id:"NumeroDeContrato",header: "Número de Negocio Fiduciario", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id:"NombreDeContrato",header: "Negocio Fiduciario", accessorKey: "NombreDeContrato", field: "text", visibilityCol: false }
		, { id:"NumeroDeSubcontrato",header: "Número de Subcontrato o Subfiso", accessorKey: "NumeroDeSubcontrato", field: "text", visibilityCol: false }
		, { id:"TextoTipoBien",header: "Tipo de Bien", accessorKey: "TextoTipoBien", field: "select", visibilityCol: true }
		, { id:"NombreDeSubcontrato",header: "Subcontrato o Subfiso", accessorKey: "NombreDeSubcontrato", field: "text", visibilityCol: false }
		, { id:"TextoBien",header: "Bien", accessorKey: "TextoBien", field: "select", visibilityCol: true }
		, { id:"IdBien",header: "Identificador del Bien", accessorKey: "IdBien", field: "text", visibilityCol: false }
		, { id:"DescripcionEntrada",header: "Descripción del Bien", accessorKey: "DescripcionEntrada", field: "text", visibilityCol: false }
		, { id:"ImporteBien",header: "Importe del Bien", accessorKey: "ImporteBien", field: "text", visibilityCol: true }
		, { id:"NombreDeMoneda",header: "Moneda", accessorKey: "NombreDeMoneda", field: "text", visibilityCol: true }
		, { id:"UltimoImporte",header: "Último Importe del Bien", accessorKey: "UltimoImporte", field: "text", visibilityCol: true }
		, { id:"TextoPeriodicidad",header: "Periodicidad de Re-valuación", accessorKey: "TextoPeriodicidad", field: "select", visibilityCol: true }
		, { id:"TextoCustodiadoEnBoveda",header: "Custodiado en Bóveda", accessorKey: "TextoCustodiadoEnBoveda", field: "select", visibilityCol: true }
		, { id:"TextoEnGarantia",header: "En garantía", accessorKey: "TextoEnGarantia", field: "select", visibilityCol: false }
		, { id:"TextoEstatus",header: "Estatus", accessorKey: "TextoEstatus", field: "select", visibilityCol: true }
		, { id:"NombreDeOperacionEntrada",header: "Nombre de Operación", accessorKey: "NombreDeOperacionEntrada", field: "text", visibilityCol: false }
		, { id:"NombreDeOperacionSalida",header: "Nombre de Operación de Salida", accessorKey: "NombreDeOperacionSalida", field: "text", visibilityCol: false }
		, { id:"FechaDeEntrada",header: "Fecha de Entrada del Bien", accessorKey: "FechaDeEntrada", field: "text", visibilityCol: false }
		, { id:"FechaDeSalida",header: "Fecha de Salida del Bien", accessorKey: "FechaDeSalida", field: "text", visibilityCol: false }
		, { id:"PenultimoImporte",header: "Penúltimo Importe del Bien", accessorKey: "PenultimoImporte", field: "text", visibilityCol: false }
		, { id:"ValorCatastral",header: "Valor Catastral del Bien", accessorKey: "ValorCatastral", field: "text", visibilityCol: false }
		, { id:"TextoEmisorAportacion",header: "Emisor de la Aportación", accessorKey: "TextoEmisorAportacion", field: "text", visibilityCol: false }
		, { id:"TipoCambio",header: "Tipo de Cambio", accessorKey: "TipoCambio", field: "text", visibilityCol: false }
		, { id:"Medidas",header: "Medidas del Bien", accessorKey: "Medidas", field: "text", visibilityCol: false }
		, { id:"DescripcionSalida",header: "Descripción de Salida del Bien", accessorKey: "DescripcionSalida", field: "text", visibilityCol: false }
		, { id:"Comentario",header: "Comentario", accessorKey: "Comentario", field: "text", visibilityCol: false }
		, { id:"TextoPolizaSeguro",header: "Póliza de Seguro", accessorKey: "TextoPolizaSeguro", field: "select", visibilityCol: false }
		, { id:"TextoConstruccion",header: "Construcción", accessorKey: "TextoConstruccion", field: "select", visibilityCol: false }
		, { id:"NombreDesarrollo",header: "Nombre del Desarrollo", accessorKey: "NombreDesarrollo", field: "text", visibilityCol: false }
		, { id:"FechaDeAportacion",header: "Fecha de Aportación del Bien", accessorKey: "FechaDeAportacion", field: "text", visibilityCol: false }
		, { id:"FechaDeVencimiento",header: "Fecha de Vencimiento del Bien", accessorKey: "FechaDeVencimiento", field: "text", visibilityCol: false }
		, { id:"EmisorAportacion",header: "Emisor de la Aportación", accessorKey: "EmisorAportacion", field: "text", visibilityCol: false }
		, { id:"CveMotivoRechazo",header: "Motivo de Rechazo", accessorKey: "CveMotivoRechazo", field: "select", visibilityCol: false }
		, { id:"ComentarioMotivoRechazoOtro",header: "Comentario Otro Motivo de Rechazo", accessorKey: "ComentarioMotivoRechazoOtro", field: "text", visibilityCol: false }
		, { id:"ComentarioMotivoRechazo",header: "Comentario Motivo de Rechazo", accessorKey: "ComentarioMotivoRechazo", field: "text", visibilityCol: false }
		, { id:"DescripcionMotivoRechazo",header: "Decripcion Motivo de rechazo", accessorKey: "DescripcionMotivoRechazo", field: "select", visibilityCol: false }
		,{ id: "iconColumn", header: "", accessorKey: "iconColumn", field: "icon", visibilityCol: true, cell: () => <IconEye/>}
	], []);

	const transformedData = useMemo(() => {
		if (!fetchData) return [];
		return fetchData.map(row => {
			const cellData = row.cell;
			return {
				NumeroDeContrato : cellData[0]
				, NombreDeContrato : cellData[1]
				, NumeroDeSubcontrato : cellData[2]
				, TextoTipoBien : cellData[3]
				, NombreDeSubcontrato : cellData[4]
				, TextoBien : cellData[5]
				, IdBien : cellData[6]
				, DescripcionEntrada : cellData[7]
				, ImporteBien : cellData[8]
				, NombreDeMoneda : cellData[9]
				, UltimoImporte : cellData[10]
				, TextoPeriodicidad : cellData[11]
				, TextoCustodiadoEnBoveda : cellData[12]
				, TextoEnGarantia : cellData[13]
				, TextoEstatus : cellData[14]
				, NombreDeOperacionEntrada : cellData[15]
				, NombreDeOperacionSalida : cellData[16]
				, FechaDeEntrada : cellData[17]
				, FechaDeSalida : cellData[18]
				, PenultimoImporte : cellData[19]
				, ValorCatastral : cellData[20]
				, TextoEmisorAportacion : cellData[21]
				, TipoCambio : cellData[22]
				, Medidas : cellData[23]
				, DescripcionSalida : cellData[24]
				, Comentario : cellData[25]
				, TextoPolizaSeguro : cellData[26]
				, TextoConstruccion : cellData[27]
				, NombreDesarrollo : cellData[28]
				, FechaDeAportacion : cellData[29]
				, FechaDeVencimiento : cellData[30]
				, EmisorAportacion : cellData[31]
				, CveMotivoRechazo : cellData[32]
				, ComentarioMotivoRechazoOtro : cellData[33]
				, ComentarioMotivoRechazo : cellData[34]
				, DescripcionMotivoRechazo : cellData[35]
		,iconColumn: ''
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
			ligaServer = {ligaServer}
		/>
		</div>
	);
};
export default GridBienFide;