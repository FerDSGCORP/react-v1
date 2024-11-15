//Generado Automáticamente, Versión del generador: 5.3
import { useState, useMemo,useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchInstruccionPagoConcilia from '../services/useFetchInstruccionPagoConcilia';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';
import { useLocation } from 'wouter';
import { IconEye } from '../components/Icons';
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

function GridInstruccionPagoConcilia() {
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

	const ligaServer = "instruccionpagoconcilia"
	const navigateURL = "/home/instruccionpagoconcilia-detalle/";
	const handleRowClick = (rowData) => {
		const {
			FolioInstruccionDePago: folioInstruccionDePago
			, SecuencialArchivo: secuencialArchivo
			, SecuencialLayout: secuencialLayout
		} = rowData;
		navigate(`${navigateURL}${folioInstruccionDePago}/archivo/${secuencialArchivo}/layout/${secuencialLayout}`);
	};
	const numeroDeContrato = localStorage.getItem('idFidSelect');
	const { data: fetchData, total, loading, error }= useFetchInstruccionPagoConcilia(numeroDeContrato,page, rowsPerPage, filters);

	const columns = useMemo(() => [
		 { id:"FolioInstruccionDePago",header: "Folio de Instrucción de Pago", accessorKey: "FolioInstruccionDePago", field: "text", visibilityCol: true }
		, { id:"SecuencialLayout",header: "Secuencial por Layout", accessorKey: "SecuencialLayout", field: "text", visibilityCol: false }
		, { id:"NombreDeUsuario",header: "Usuario", accessorKey: "NombreDeUsuario", field: "text", visibilityCol: true }
		, { id:"NumeroDeContrato",header: "Fideicomiso", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true }
		, { id:"NombreAliasDeContrato",header: "Alias de Fideicomiso", accessorKey: "NombreAliasDeContrato", field: "text", visibilityCol: false }
		, { id:"TextoFormaDePago",header: "Forma de Pago", accessorKey: "TextoFormaDePago", field: "select", visibilityCol: true }
		, { id:"TextoTipoDePago",header: "Tipo de Pago", accessorKey: "TextoTipoDePago", field: "select", visibilityCol: true }
		, { id:"FechaValor",header: "Fecha Valor", accessorKey: "FechaValor", field: "text", visibilityCol: true }
		, { id:"TextoPagoPrioritario",header: "Pago Prioritario", accessorKey: "TextoPagoPrioritario", field: "select", visibilityCol: false }
		, { id:"Comentario",header: "Comentarios", accessorKey: "Comentario", field: "text", visibilityCol: false }
		, { id:"TitularCuentaCargo",header: "Titular Cuenta Cargo", accessorKey: "TitularCuentaCargo", field: "text", visibilityCol: false }
		, { id:"TextoAplicaCallBack",header: "Aplica CallBack", accessorKey: "TextoAplicaCallBack", field: "select", visibilityCol: false }
		, { id:"NombreDeBancoCargo",header: "Banco Cargo", accessorKey: "NombreDeBancoCargo", field: "text", visibilityCol: true }
		, { id:"NumeroDeCuentaCargo",header: "Cuenta Cargo", accessorKey: "NumeroDeCuentaCargo", field: "text", visibilityCol: true }
		, { id:"NombreDeMonedaCargo",header: "Moneda de Cuenta Cargo", accessorKey: "NombreDeMonedaCargo", field: "text", visibilityCol: false }
		, { id:"TitularCuentaAbono",header: "Nombre Beneficiario", accessorKey: "TitularCuentaAbono", field: "text", visibilityCol: false }
		, { id:"NombreDePais",header: "País del Banco Beneficiario", accessorKey: "NombreDePais", field: "text", visibilityCol: false }
		, { id:"Rfc",header: "RFC o Número de Identificación Fiscal", accessorKey: "Rfc", field: "text", visibilityCol: false }
		, { id:"NombreBancoAbono",header: "Banco de Beneficiario", accessorKey: "NombreBancoAbono", field: "text", visibilityCol: true }
		, { id:"Swift",header: "BIC o SWIFT del Banco Beneficiario", accessorKey: "Swift", field: "text", visibilityCol: false }
		, { id:"Aba",header: "ABA o Routing Number del Banco Beneficiario", accessorKey: "Aba", field: "text", visibilityCol: false }
		, { id:"Iban",header: "IBAN", accessorKey: "Iban", field: "text", visibilityCol: false }
		, { id:"DatosBancoIntermediario",header: "Datos del Intermediario", accessorKey: "DatosBancoIntermediario", field: "text", visibilityCol: false }
		, { id:"NumeroDeCuentaAbono",header: "Cuenta / TDD / Celular", accessorKey: "NumeroDeCuentaAbono", field: "text", visibilityCol: true }
		, { id:"Clabe",header: "CLABE", accessorKey: "Clabe", field: "text", visibilityCol: false }
		, { id:"LineaDeCaptura",header: "Línea de Captura", accessorKey: "LineaDeCaptura", field: "text", visibilityCol: false }
		, { id:"Importe",header: "Importe a Pagar", accessorKey: "Importe", field: "text", visibilityCol: true }
		, { id:"IvaImporteTotal",header: "IVA Total Actos Accidentales", accessorKey: "IvaImporteTotal", field: "text", visibilityCol: false }
		, { id:"ConvenioCie",header: "Cuenta del Pago Referenciado", accessorKey: "ConvenioCie", field: "text", visibilityCol: false }
		, { id:"NombreDeMonedaAbono",header: "Moneda Abono", accessorKey: "NombreDeMonedaAbono", field: "text", visibilityCol: true }
		, { id:"Concepto",header: "Concepto", accessorKey: "Concepto", field: "text", visibilityCol: true }
		, { id:"Referencia",header: "Referencia", accessorKey: "Referencia", field: "text", visibilityCol: false }
		, { id:"Direccion",header: "Dirección", accessorKey: "Direccion", field: "text", visibilityCol: false }
		, { id:"Ffc",header: "FFC", accessorKey: "Ffc", field: "text", visibilityCol: false }
		, { id:"DetalleDePago",header: "Detalle de Pago", accessorKey: "DetalleDePago", field: "text", visibilityCol: false }
		, { id:"TextoEstatus",header: "Estatus", accessorKey: "TextoEstatus", field: "select", visibilityCol: true , cell: ({ row }) => { const value = row.original.TextoEstatus || ''; if (activoStatuses.includes(value)) return <IconStatusActivo />; if (canceladoStatuses.includes(value)) return <IconStatusCancelado />; if (operacionStatuses.includes(value)) return <IconStatusOperacion />; } }
		, { id:"FechaRealConciliacion",header: "Fecha Real de Conciliación", accessorKey: "FechaRealConciliacion", field: "text", visibilityCol: false }
		, { id:"FechaRealNoConciliacion",header: "Fecha Real de No Conciliación", accessorKey: "FechaRealNoConciliacion", field: "text", visibilityCol: false }
		, { id:"FechaConciliacion",header: "Fecha de Conciliación", accessorKey: "FechaConciliacion", field: "text", visibilityCol: false }
		, { id:"FechaNoConciliacion",header: "Fecha de No Conciliación", accessorKey: "FechaNoConciliacion", field: "text", visibilityCol: false }
		, { id:"ObservacionNoConciliacion",header: "Observaciones de No Conciliación", accessorKey: "ObservacionNoConciliacion", field: "text", visibilityCol: false }
		, { id:"SecuencialArchivo",header: "Secuencial de Archivo", accessorKey: "SecuencialArchivo", field: "text", visibilityCol: false }
		, { id:"NumeroDeUsuario",header: "Usuario", accessorKey: "NumeroDeUsuario", field: "text", visibilityCol: false }
		, { id:"NombreDeContrato",header: "Fideicomiso", accessorKey: "NombreDeContrato", field: "text", visibilityCol: false }
		, { id:"CveFormaDePago",header: "Forma de Pago", accessorKey: "CveFormaDePago", field: "select", visibilityCol: false }
		, { id:"CveTipoDePago",header: "Tipo de Pago", accessorKey: "CveTipoDePago", field: "select", visibilityCol: false }
		, { id:"CvePagoPrioritario",header: "Pago Prioritario", accessorKey: "CvePagoPrioritario", field: "select", visibilityCol: false }
		, { id:"NumBancoCargo",header: "Banco Cargo", accessorKey: "NumBancoCargo", field: "text", visibilityCol: false }
		, { id:"NumeroDeMonedaCargo",header: "Moneda de Cuenta Cargo", accessorKey: "NumeroDeMonedaCargo", field: "text", visibilityCol: false }
		, { id:"NumeroDePais",header: "País del Banco Beneficiario", accessorKey: "NumeroDePais", field: "text", visibilityCol: false }
		, { id:"NumBancoAbono",header: "Banco de Beneficiario", accessorKey: "NumBancoAbono", field: "text", visibilityCol: false }
		, { id:"NumeroDeMonedaAbono",header: "Moneda Abono", accessorKey: "NumeroDeMonedaAbono", field: "text", visibilityCol: false }
		, { id:"CveAplicacionContable",header: "Aplicación Contable", accessorKey: "CveAplicacionContable", field: "select", visibilityCol: false }
		, { id:"CveEstatus",header: "Estatus", accessorKey: "CveEstatus", field: "select", visibilityCol: false }
		, { id:"TextoPagoProgramado",header: "Pago Programado", accessorKey: "TextoPagoProgramado", field: "select", visibilityCol: false }
		, { id:"NumeroDeMonedaCargoAuxiliar",header: "Moneda Cargo", accessorKey: "NumeroDeMonedaCargoAuxiliar", field: "text", visibilityCol: false }
		, { id:"CveTipoDeCuenta",header: "Tipo de Cuenta", accessorKey: "CveTipoDeCuenta", field: "select", visibilityCol: false }
		, { id:"Beneficiario",header: "Beneficiario", accessorKey: "Beneficiario", field: "text", visibilityCol: false }
		, { id:"Curp",header: "CURP", accessorKey: "Curp", field: "text", visibilityCol: false }
		, { id:"Dependencia",header: "Dependencia", accessorKey: "Dependencia", field: "text", visibilityCol: false }
		, { id:"CvePeriodo",header: "Periodo", accessorKey: "CvePeriodo", field: "select", visibilityCol: false }
		, { id:"ComentarioAlPeriodo",header: "Comentario al Periodo", accessorKey: "ComentarioAlPeriodo", field: "text", visibilityCol: false }
		, { id:"ClaveReferencia",header: "Clave de Referencia", accessorKey: "ClaveReferencia", field: "text", visibilityCol: false }
		, { id:"CadenaDependencia",header: "Cadena de la Dependencia", accessorKey: "CadenaDependencia", field: "text", visibilityCol: false }
		, { id:"ImporteDPA",header: "Importe", accessorKey: "ImporteDPA", field: "text", visibilityCol: false }
		, { id:"IvaImporteDPA",header: "IVA Actos Accidentales1", accessorKey: "IvaImporteDPA", field: "text", visibilityCol: false }
		, { id:"ParteActualizada",header: "Parte Actualizada", accessorKey: "ParteActualizada", field: "text", visibilityCol: false }
		, { id:"IvaParteActualizada",header: "IVA Actos Accidentales2", accessorKey: "IvaParteActualizada", field: "text", visibilityCol: false }
		, { id:"Recargos",header: "Recargos", accessorKey: "Recargos", field: "text", visibilityCol: false }
		, { id:"IvaRecargos",header: "IVA Actos Accidentales3", accessorKey: "IvaRecargos", field: "text", visibilityCol: false }
		, { id:"MultaFiscal",header: "Multa por Corrección Fiscal", accessorKey: "MultaFiscal", field: "text", visibilityCol: false }
		, { id:"IvaMultaFiscal",header: "IVA Actos Accidentales4", accessorKey: "IvaMultaFiscal", field: "text", visibilityCol: false }
		, { id:"Compensaciones",header: "Compensaciones", accessorKey: "Compensaciones", field: "text", visibilityCol: false }
		, { id:"NombreDeMonedaCargoAuxiliar",header: "Moneda Cargo", accessorKey: "NombreDeMonedaCargoAuxiliar", field: "text", visibilityCol: false }
		, { id:"TextoTipoDeCuenta",header: "Tipo de Cuenta", accessorKey: "TextoTipoDeCuenta", field: "select", visibilityCol: false }
		, { id:"TextoPeriodo",header: "Periodo", accessorKey: "TextoPeriodo", field: "select", visibilityCol: false }
		, { id:"TextoAplicacionContable",header: "Aplicación Contable", accessorKey: "TextoAplicacionContable", field: "select", visibilityCol: false }
		, { id:"Titulos",header: "Números de Titulos", accessorKey: "Titulos", field: "text", visibilityCol: false }
		, { id:"ClavePizarra",header: "Clave de Pizarra", accessorKey: "ClavePizarra", field: "text", visibilityCol: false }
		, { id:"Serie",header: "Serie", accessorKey: "Serie", field: "text", visibilityCol: false }
		, { id:"CostoFiscal",header: "Costo Fiscal", accessorKey: "CostoFiscal", field: "text", visibilityCol: false }
		, { id:"PrecioDeAdquisicion",header: "Precio de Adquisición", accessorKey: "PrecioDeAdquisicion", field: "text", visibilityCol: false }
		, { id:"FechaLimAutFidBloq",header: "Fecha limite de autorización para fideicomiso bloqueado", accessorKey: "FechaLimAutFidBloq", field: "text", visibilityCol: false }
		, { id:"CajonIndeval",header: "Cajón Indeval", accessorKey: "CajonIndeval", field: "text", visibilityCol: false }
		, { id:"CveTipoDeCuentaCargo",header: "Tipo de Cuenta Cargo", accessorKey: "CveTipoDeCuentaCargo", field: "select", visibilityCol: false }
		, { id:"TextoTipoDeCuentaCargo",header: "Tipo de Cuenta Cargo", accessorKey: "TextoTipoDeCuentaCargo", field: "select", visibilityCol: false }
		,{ id: "iconColumn", header: "", accessorKey: "iconColumn", field: "icon", visibilityCol: true, cell: () => <IconEye/>}
	], []);

	const transformedData = useMemo(() => {
		if (!fetchData) return [];
		return fetchData.map(row => {
			const cellData = row.cell;
			return {
				FolioInstruccionDePago : cellData[0]
				, SecuencialLayout : cellData[1]
				, NombreDeUsuario : cellData[2]
				, NumeroDeContrato : cellData[3]
				, NombreAliasDeContrato : cellData[4]
				, TextoFormaDePago : cellData[5]
				, TextoTipoDePago : cellData[6]
				, FechaValor : cellData[7]
				, TextoPagoPrioritario : cellData[8]
				, Comentario : cellData[9]
				, TitularCuentaCargo : cellData[10]
				, TextoAplicaCallBack : cellData[11]
				, NombreDeBancoCargo : cellData[12]
				, NumeroDeCuentaCargo : cellData[13]
				, NombreDeMonedaCargo : cellData[14]
				, TitularCuentaAbono : cellData[15]
				, NombreDePais : cellData[16]
				, Rfc : cellData[17]
				, NombreBancoAbono : cellData[18]
				, Swift : cellData[19]
				, Aba : cellData[20]
				, Iban : cellData[21]
				, DatosBancoIntermediario : cellData[22]
				, NumeroDeCuentaAbono : cellData[23]
				, Clabe : cellData[24]
				, LineaDeCaptura : cellData[25]
				, Importe : cellData[26]
				, IvaImporteTotal : cellData[27]
				, ConvenioCie : cellData[28]
				, NombreDeMonedaAbono : cellData[29]
				, Concepto : cellData[30]
				, Referencia : cellData[31]
				, Direccion : cellData[32]
				, Ffc : cellData[33]
				, DetalleDePago : cellData[34]
				, TextoEstatus : cellData[35]
				, FechaRealConciliacion : cellData[36]
				, FechaRealNoConciliacion : cellData[37]
				, FechaConciliacion : cellData[38]
				, FechaNoConciliacion : cellData[39]
				, ObservacionNoConciliacion : cellData[40]
				, SecuencialArchivo : cellData[41]
				, NumeroDeUsuario : cellData[42]
				, NombreDeContrato : cellData[43]
				, CveFormaDePago : cellData[44]
				, CveTipoDePago : cellData[45]
				, CvePagoPrioritario : cellData[46]
				, NumBancoCargo : cellData[47]
				, NumeroDeMonedaCargo : cellData[48]
				, NumeroDePais : cellData[49]
				, NumBancoAbono : cellData[50]
				, NumeroDeMonedaAbono : cellData[51]
				, CveAplicacionContable : cellData[52]
				, CveEstatus : cellData[53]
				, TextoPagoProgramado : cellData[54]
				, NumeroDeMonedaCargoAuxiliar : cellData[55]
				, CveTipoDeCuenta : cellData[56]
				, Beneficiario : cellData[57]
				, Curp : cellData[58]
				, Dependencia : cellData[59]
				, CvePeriodo : cellData[60]
				, ComentarioAlPeriodo : cellData[61]
				, ClaveReferencia : cellData[62]
				, CadenaDependencia : cellData[63]
				, ImporteDPA : cellData[64]
				, IvaImporteDPA : cellData[65]
				, ParteActualizada : cellData[66]
				, IvaParteActualizada : cellData[67]
				, Recargos : cellData[68]
				, IvaRecargos : cellData[69]
				, MultaFiscal : cellData[70]
				, IvaMultaFiscal : cellData[71]
				, Compensaciones : cellData[72]
				, NombreDeMonedaCargoAuxiliar : cellData[73]
				, TextoTipoDeCuenta : cellData[74]
				, TextoPeriodo : cellData[75]
				, TextoAplicacionContable : cellData[76]
				, Titulos : cellData[77]
				, ClavePizarra : cellData[78]
				, Serie : cellData[79]
				, CostoFiscal : cellData[80]
				, PrecioDeAdquisicion : cellData[81]
				, FechaLimAutFidBloq : cellData[82]
				, CajonIndeval : cellData[83]
				, CveTipoDeCuentaCargo : cellData[84]
				, TextoTipoDeCuentaCargo : cellData[85]
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
export default GridInstruccionPagoConcilia;