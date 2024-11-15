//Generado Automáticamente, Versión del generador: 5.2
import { useState, useMemo,useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchTerceroP from '../services/useFetchTerceroP';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';
import { IconEye } from '../components/Icons';

function GridTerceroP() {
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

	const ligaServer = "tercerop"
	const navigateURL = "/home/tercerop-detalle/";
	const handleRowClick = (rowData) => {
		const {
			NumeroDeContrato: numeroDeContrato
			, NumeroDeTercero: numeroDeTercero
		} = rowData;
		localStorage.setItem('idFidSelect', numeroDeContrato);
		window.dispatchEvent(new CustomEvent('fidSelectChange', { detail: numeroDeContrato }));
		navigate(`${navigateURL}${numeroDeContrato}/tercero/${numeroDeTercero}`);
	};
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const { data: fetchData, total, loading, error }= useFetchTerceroP(numeroDeContrato,page, rowsPerPage, filters);

	const columns = useMemo(() => [
		{ id:"NumeroDeContrato",header: "Número de Negocio Fiduciario", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id:"NumeroDeTercero",header: "Número de Tercero", accessorKey: "NumeroDeTercero", field: "text", visibilityCol: false }
		, { id:"NumeroDePersona",header: "Persona", accessorKey: "NumeroDePersona", field: "text", visibilityCol: false }
		, { id:"NombreDeContrato",header: "Nombre de Negocio Fiduciario", accessorKey: "NombreDeContrato", field: "text", visibilityCol: true }
		, { id:"TextoTipoPersona",header: "Tipo de Persona Fiscal", accessorKey: "TextoTipoPersona", field: "text", visibilityCol: false }
		, { id:"NombreDePersona",header: "Nombre o Razón Social", accessorKey: "NombreDePersona", field: "text", visibilityCol: true }
		, { id:"ApellidoPaternoPersona",header: "Apellido Paterno", accessorKey: "ApellidoPaternoPersona", field: "text", visibilityCol: true }
		, { id:"ApellidoMaternoPersona",header: "Apellido Materno", accessorKey: "ApellidoMaternoPersona", field: "text", visibilityCol: true }
		, { id:"RFC",header: "RFC", accessorKey: "RFC", field: "text", visibilityCol: false }
		, { id:"NombreDePais",header: "País", accessorKey: "NombreDePais", field: "text", visibilityCol: false }
		, { id:"NombreDeActividad",header: "Actividad Económica", accessorKey: "NombreDeActividad", field: "text", visibilityCol: false }
		, { id:"TextoMigratoria",header: "Calidad Migratoria", accessorKey: "TextoMigratoria", field: "text", visibilityCol: false }
		, { id:"TextoSexo",header: "Sexo", accessorKey: "TextoSexo", field: "text", visibilityCol: false }
		, { id:"NombreNacionalidad",header: "Nacionalidad", accessorKey: "NombreNacionalidad", field: "text", visibilityCol: false }
		, { id:"CURP",header: "CURP", accessorKey: "CURP", field: "text", visibilityCol: false }
		, { id:"TextoTratamiento",header: "Tratamiento", accessorKey: "TextoTratamiento", field: "text", visibilityCol: false }
		, { id:"TextoFormaDeUso",header: "Forma de Uso", accessorKey: "TextoFormaDeUso", field: "text", visibilityCol: false }
		, { id:"TextoEstatus",header: "Estatus", accessorKey: "TextoEstatus", field: "select", visibilityCol: true }
		,{ id: "iconColumn", header: "", accessorKey: "iconColumn", field: "icon", visibilityCol: true, cell: () => <IconEye/>}
	], []);

	const transformedData = useMemo(() => {
		if (!fetchData) return [];
		return fetchData.map(row => {
			const cellData = row.cell;
			return {
				NumeroDeContrato : cellData[0]
				, NumeroDeTercero : cellData[1]
				, NumeroDePersona : cellData[2]
				, NombreDeContrato : cellData[3]
				, TextoTipoPersona : cellData[4]
				, NombreDePersona : cellData[5]
				, ApellidoPaternoPersona : cellData[6]
				, ApellidoMaternoPersona : cellData[7]
				, RFC : cellData[8]
				, NombreDePais : cellData[9]
				, NombreDeActividad : cellData[10]
				, TextoMigratoria : cellData[11]
				, TextoSexo : cellData[12]
				, NombreNacionalidad : cellData[13]
				, CURP : cellData[14]
				, TextoTratamiento : cellData[15]
				, TextoFormaDeUso : cellData[16]
				, TextoEstatus : cellData[17]
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
export default GridTerceroP;