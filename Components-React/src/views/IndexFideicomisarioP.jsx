//Generado Automáticamente, Versión del generador: 5.2
import { useState, useMemo,useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchFideicomisarioP from '../services/useFetchFideicomisarioP';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';
import { IconEye } from '../components/Icons';

function GridFideicomisarioP() {
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

	const ligaServer = "fideicomisariop"
	const navigateURL = "/home/fideicomisariop-detalle/";
	const handleRowClick = (rowData) => {
		const {
			NumeroDeContrato: numeroDeContrato
			, NumeroDeFideicomisario: numeroDeFideicomisario
		} = rowData;
		localStorage.setItem('idFidSelect', numeroDeContrato);
		window.dispatchEvent(new CustomEvent('fidSelectChange', { detail: numeroDeContrato }));
		navigate(`${navigateURL}${numeroDeContrato}/fidsario/${numeroDeFideicomisario}`);
	};
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const { data: fetchData, total, loading, error }= useFetchFideicomisarioP(numeroDeContrato,page, rowsPerPage, filters);

	const columns = useMemo(() => [
		{ id:"NumeroDeContrato",header: "Negocio Fiduciario", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id:"NumeroDeFideicomisario",header: "Número de Fideicomisario", accessorKey: "NumeroDeFideicomisario", field: "text", visibilityCol: false }
		, { id:"TextoCalidadDePersona",header: "Calidad", accessorKey: "TextoCalidadDePersona", field: "select", visibilityCol: false }
		, { id:"CesionDeDerechos",header: "Cesión de Derechos", accessorKey: "CesionDeDerechos", field: "text", visibilityCol: false }
		, { id:"ProcentajeDeDerechos",header: "Porcentaje de Derechos de Participación", accessorKey: "ProcentajeDeDerechos", field: "text", visibilityCol: false }
		, { id:"Observacion",header: "Observaciones", accessorKey: "Observacion", field: "text", visibilityCol: false }
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
		, { id:"FechaDeNacimiento",header: "Fecha de Nacimiento o Constitución", accessorKey: "FechaDeNacimiento", field: "text", visibilityCol: false }
		, { id:"NombreNacionalidad",header: "Nacionalidad", accessorKey: "NombreNacionalidad", field: "text", visibilityCol: false }
		, { id:"CURP",header: "CURP", accessorKey: "CURP", field: "text", visibilityCol: false }
		, { id:"CveManejaIVA",header: "Maneja IVA", accessorKey: "CveManejaIVA", field: "select", visibilityCol: false }
		, { id:"TextoTratamiento",header: "Tratamiento", accessorKey: "TextoTratamiento", field: "text", visibilityCol: false }
		, { id:"CveManejaISR",header: "Maneja ISR", accessorKey: "CveManejaISR", field: "select", visibilityCol: false }
		, { id:"TextoCesionario",header: "Cesionario", accessorKey: "TextoCesionario", field: "select", visibilityCol: true }
		, { id:"TextoFisRol",header: "Rol", accessorKey: "TextoFisRol", field: "select", visibilityCol: true }
		, { id:"TextoManejaIVA",header: "Maneja IVA", accessorKey: "TextoManejaIVA", field: "select", visibilityCol: true }
		, { id:"TextoManejaISR",header: "Maneja ISR", accessorKey: "TextoManejaISR", field: "select", visibilityCol: true }
		, { id:"TextoEstatus",header: "Estatus", accessorKey: "TextoEstatus", field: "select", visibilityCol: true }
		,{ id: "iconColumn", header: "", accessorKey: "iconColumn", field: "icon", visibilityCol: true, cell: () => <IconEye/>}
	], []);

	const transformedData = useMemo(() => {
		if (!fetchData) return [];
		return fetchData.map(row => {
			const cellData = row.cell;
			return {
				NumeroDeContrato : cellData[0]
				, NumeroDeFideicomisario : cellData[1]
				, TextoCalidadDePersona : cellData[2]
				, CesionDeDerechos : cellData[3]
				, ProcentajeDeDerechos : cellData[4]
				, Observacion : cellData[5]
				, NumeroDePersona : cellData[6]
				, NombreDeContrato : cellData[7]
				, TextoTipoPersona : cellData[8]
				, NombreDePersona : cellData[9]
				, ApellidoPaternoPersona : cellData[10]
				, ApellidoMaternoPersona : cellData[11]
				, RFC : cellData[12]
				, NombreDePais : cellData[13]
				, NombreDeActividad : cellData[14]
				, TextoMigratoria : cellData[15]
				, TextoSexo : cellData[16]
				, FechaDeNacimiento : cellData[17]
				, NombreNacionalidad : cellData[18]
				, CURP : cellData[19]
				, CveManejaIVA : cellData[20]
				, TextoTratamiento : cellData[21]
				, CveManejaISR : cellData[22]
				, TextoCesionario : cellData[23]
				, TextoFisRol : cellData[24]
				, TextoManejaIVA : cellData[25]
				, TextoManejaISR : cellData[26]
				, TextoEstatus : cellData[27]
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
export default GridFideicomisarioP;