//Generado Automáticamente, Versión del generador: 5.0
import { useState, useMemo,useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchCuenFid from '../services/useFetchCuenFid';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';


function GridCuenFid() {
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
	const { data: fetchData, total, loading, error }= useFetchCuenFid(numeroDeContrato,page, rowsPerPage, filters);

	const columns = useMemo(() => [
		{ id:"NumeroDeContrato",header: "Negocio Fiduciario", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id:"NombreDeContrato",header: "Negocio Fiduciario", accessorKey: "NombreDeContrato", field: "text", visibilityCol: false }
		, { id:"NumeroDeSubContrato",header: "SubContrato", accessorKey: "NumeroDeSubContrato", field: "text", visibilityCol: true }
		, { id:"NombreDeSubContrato",header: "SubContrato", accessorKey: "NombreDeSubContrato", field: "text", visibilityCol: false }
		, { id:"NombreDePais",header: "País", accessorKey: "NombreDePais", field: "text", visibilityCol: false }
		, { id:"NumeroDeClabe",header: "CLABE", accessorKey: "NumeroDeClabe", field: "text", visibilityCol: true }
		, { id:"NombreDeMoneda",header: "Moneda", accessorKey: "NombreDeMoneda", field: "text", visibilityCol: true }
		, { id:"NombreDeEstado",header: "Estado", accessorKey: "NombreDeEstado", field: "text", visibilityCol: false }
		, { id:"NombreDeBanco",header: "Banco", accessorKey: "NombreDeBanco", field: "text", visibilityCol: true }
		, { id:"NumeroDeCuenta",header: "Número de Cuenta", accessorKey: "NumeroDeCuenta", field: "text", visibilityCol: true }
		, { id:"NumeroDePlaza",header: "Plaza", accessorKey: "NumeroDePlaza", field: "text", visibilityCol: false }
		, { id:"NumeroDeSucursal",header: "Sucursal", accessorKey: "NumeroDeSucursal", field: "text", visibilityCol: false }
		, { id:"NombreDeCuenta",header: "Nombre de Cuenta", accessorKey: "NombreDeCuenta", field: "text", visibilityCol: true }
		, { id:"NumeroDeSwift",header: "SWIFT / BIC", accessorKey: "NumeroDeSwift", field: "text", visibilityCol: false }
		, { id:"NumeroDeIban",header: "IBAN", accessorKey: "NumeroDeIban", field: "text", visibilityCol: false }
		, { id:"NumeroDeAba",header: "ABA / BIN", accessorKey: "NumeroDeAba", field: "text", visibilityCol: false }
		, { id:"NumeroDeMirc",header: "MIRC", accessorKey: "NumeroDeMirc", field: "text", visibilityCol: false }
		, { id:"NumeroDeTransito",header: "Número de Transito Bancario", accessorKey: "NumeroDeTransito", field: "text", visibilityCol: false }
		, { id:"Referencia",header: "Referencia", accessorKey: "Referencia", field: "text", visibilityCol: false }
		, { id:"TextoAutorizaMovimientos",header: "Autoriza Movimientos", accessorKey: "TextoAutorizaMovimientos", field: "select", visibilityCol: false }
		, { id:"FechaAperturaCuenta",header: "Fecha de Apertura de Cuenta", accessorKey: "FechaAperturaCuenta", field: "text", visibilityCol: false }
		, { id:"FechaVencimientoCuenta",header: "Fecha de Vencimiento de Cuenta", accessorKey: "FechaVencimientoCuenta", field: "text", visibilityCol: false }
		, { id:"FechaCancelacionCuenta",header: "Fecha de Cancelación de Cuenta", accessorKey: "FechaCancelacionCuenta", field: "text", visibilityCol: false }
		, { id:"NombreTitularCuenta",header: "Nombre", accessorKey: "NombreTitularCuenta", field: "text", visibilityCol: false }
		, { id:"ApellidoPaternoTitularCuenta",header: "Apellido Paterno", accessorKey: "ApellidoPaternoTitularCuenta", field: "text", visibilityCol: false }
		, { id:"ApellidoMaternoTitularCuenta",header: "Apellido Materno", accessorKey: "ApellidoMaternoTitularCuenta", field: "text", visibilityCol: false }
		, { id:"Secuencial",header: "Secuecial", accessorKey: "Secuencial", field: "text", visibilityCol: true }
		, { id:"TextoTipoDeOrigenDeLosRecursos",header: "Tipo de Recursos", accessorKey: "TextoTipoDeOrigenDeLosRecursos", field: "select", visibilityCol: false }
		, { id:"TextoAplicaConciliacion",header: "Aplica Conciliación", accessorKey: "TextoAplicaConciliacion", field: "select", visibilityCol: false }
		, { id:"TextoAcumula",header: "Acumula Saldos", accessorKey: "TextoAcumula", field: "select", visibilityCol: false }
		, { id:"TextoEstatus",header: "Estatus", accessorKey: "TextoEstatus", field: "select", visibilityCol: false }
		, { id:"NumeroDePais",header: "País", accessorKey: "NumeroDePais", field: "text", visibilityCol: false }
		, { id:"TextoCuentaCompleta",header: "Cuenta Completa", accessorKey: "TextoCuentaCompleta", field: "text", visibilityCol: false }
		, { id:"NumeroDeMoneda",header: "Moneda", accessorKey: "NumeroDeMoneda", field: "text", visibilityCol: false }
		, { id:"CveProductoCuenta",header: "Producto Cuenta", accessorKey: "CveProductoCuenta", field: "select", visibilityCol: true }
		, { id:"SubProductoCuenta",header: "Sub Producto Cuenta", accessorKey: "SubProductoCuenta", field: "text", visibilityCol: true }
		, { id:"CuentaVista",header: "Cuenta Vista", accessorKey: "CuentaVista", field: "text", visibilityCol: true }
		, { id:"TextoAplicaCobroDeHonorarios",header: "Aplica Cobro de Honorarios", accessorKey: "TextoAplicaCobroDeHonorarios", field: "select", visibilityCol: false }
		, { id:"TextoNotificaExt",header: "Notificacion Correo en Aplicativos Externos", accessorKey: "TextoNotificaExt", field: "select", visibilityCol: false }
	], []);

	const transformedData = useMemo(() => {
		if (!fetchData) return [];
		return fetchData.map(row => {
			const cellData = row.cell;
			return {
				NumeroDeContrato : cellData[0]
				, NombreDeContrato : cellData[1]
				, NumeroDeSubContrato : cellData[2]
				, NombreDeSubContrato : cellData[3]
				, NombreDePais : cellData[4]
				, NumeroDeClabe : cellData[5]
				, NombreDeMoneda : cellData[6]
				, NombreDeEstado : cellData[7]
				, NombreDeBanco : cellData[8]
				, NumeroDeCuenta : cellData[9]
				, NumeroDePlaza : cellData[10]
				, NumeroDeSucursal : cellData[11]
				, NombreDeCuenta : cellData[12]
				, NumeroDeSwift : cellData[13]
				, NumeroDeIban : cellData[14]
				, NumeroDeAba : cellData[15]
				, NumeroDeMirc : cellData[16]
				, NumeroDeTransito : cellData[17]
				, Referencia : cellData[18]
				, TextoAutorizaMovimientos : cellData[19]
				, FechaAperturaCuenta : cellData[20]
				, FechaVencimientoCuenta : cellData[21]
				, FechaCancelacionCuenta : cellData[22]
				, NombreTitularCuenta : cellData[23]
				, ApellidoPaternoTitularCuenta : cellData[24]
				, ApellidoMaternoTitularCuenta : cellData[25]
				, Secuencial : cellData[26]
				, TextoTipoDeOrigenDeLosRecursos : cellData[27]
				, TextoAplicaConciliacion : cellData[28]
				, TextoAcumula : cellData[29]
				, TextoEstatus : cellData[30]
				, NumeroDePais : cellData[31]
				, TextoCuentaCompleta : cellData[32]
				, NumeroDeMoneda : cellData[33]
				, CveProductoCuenta : cellData[34]
				, SubProductoCuenta : cellData[35]
				, CuentaVista : cellData[36]
				, TextoAplicaCobroDeHonorarios : cellData[37]
				, TextoNotificaExt : cellData[38]
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
export default GridCuenFid;