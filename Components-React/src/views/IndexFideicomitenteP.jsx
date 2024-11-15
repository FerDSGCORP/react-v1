//Generado Automáticamente, Versión del generador: 5.2
import { useState, useMemo,useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchFideicomitenteP from '../services/useFetchFideicomitenteP';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';
import { IconEye } from '../components/Icons';

function GridFideicomitenteP() {
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

	const ligaServer = "fideicomitentep"
	const navigateURL = "/home/fideicomitentep-detalle/";
	const handleRowClick = (rowData) => {
		const {
			NumeroDeContrato: numeroDeContrato
			, NumeroDeFideicomitente: numeroDeFideicomitente
		} = rowData;
		localStorage.setItem('idFidSelect', numeroDeContrato);
		window.dispatchEvent(new CustomEvent('fidSelectChange', { detail: numeroDeContrato }));
		navigate(`${navigateURL}${numeroDeContrato}/fideicom/${numeroDeFideicomitente}`);
	};
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const { data: fetchData, total, loading, error }= useFetchFideicomitenteP(numeroDeContrato,page, rowsPerPage, filters);

	const columns = useMemo(() => [
		{ id:"NumeroDeContrato",header: "Negocio Fiduciario", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id:"NumeroDeFideicomitente",header: "Número de Fideicomitente", accessorKey: "NumeroDeFideicomitente", field: "text", visibilityCol: false }
		, { id:"TextoCalidadDePersona",header: "Calidad", accessorKey: "TextoCalidadDePersona", field: "select", visibilityCol: false }
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
		, { id:"TextoTratamiento",header: "Tratamiento", accessorKey: "TextoTratamiento", field: "text", visibilityCol: false }
		, { id:"CveManejaIVA",header: "Maneja IVA", accessorKey: "CveManejaIVA", field: "select", visibilityCol: false }
		, { id:"CveManejaISR",header: "Maneja ISR", accessorKey: "CveManejaISR", field: "select", visibilityCol: false }
		, { id:"TextoAdherente",header: "Adherente", accessorKey: "TextoAdherente", field: "select", visibilityCol: true }
		, { id:"TextoFiDRol",header: "Rol", accessorKey: "TextoFiDRol", field: "select", visibilityCol: true }
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
				, NumeroDeFideicomitente : cellData[1]
				, TextoCalidadDePersona : cellData[2]
				, ProcentajeDeDerechos : cellData[3]
				, Observacion : cellData[4]
				, NumeroDePersona : cellData[5]
				, NombreDeContrato : cellData[6]
				, TextoTipoPersona : cellData[7]
				, NombreDePersona : cellData[8]
				, ApellidoPaternoPersona : cellData[9]
				, ApellidoMaternoPersona : cellData[10]
				, RFC : cellData[11]
				, NombreDePais : cellData[12]
				, NombreDeActividad : cellData[13]
				, TextoMigratoria : cellData[14]
				, TextoSexo : cellData[15]
				, FechaDeNacimiento : cellData[16]
				, NombreNacionalidad : cellData[17]
				, CURP : cellData[18]
				, TextoTratamiento : cellData[19]
				, CveManejaIVA : cellData[20]
				, CveManejaISR : cellData[21]
				, TextoAdherente : cellData[22]
				, TextoFiDRol : cellData[23]
				, TextoManejaIVA : cellData[24]
				, TextoManejaISR : cellData[25]
				, TextoEstatus : cellData[26]
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
export default GridFideicomitenteP;