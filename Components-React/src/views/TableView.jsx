import React, { useState, useMemo, useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns';
import useFetchContrato from '../services/useFetchContrato';
import useFilterTableChangeEvent from '../hooks/FilterTableChangeEvent';

const MainComponent = () => {
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
  
  
  
  const { data: fetchData, total, loading, error } = useFetchContrato(page, rowsPerPage, filters);


  const columns = useMemo(() => [
    { id:"NumeroDeContrato",header: "NumeroDeContrato", accessorKey: "NumeroDeContrato", field: "text", visibilityCol: true },
    { id:"NombreDeContrato",header: "NombreDeContrato", accessorKey: "NombreDeContrato", field: "select", visibilityCol: true },
    { id:"OficioExencion",header: "OficioExencion", accessorKey: "OficioExencion", field: "select", visibilityCol: true },
    { id:"RegSHCP",header: "RegSHCP", accessorKey: "RegSHCP", field: "select", visibilityCol: true },
    { id:"RegGobDF",header: "RegGobDF", accessorKey: "RegGobDF", field: "select", visibilityCol: true },
    { id:"TextoRegional",header: "TextoRegional", accessorKey: "TextoRegional", field: "select", visibilityCol: true },
    { id:"Escritura",header: "Escritura", accessorKey: "Escritura", field: "select", visibilityCol: true },
    { id:"TextoSucursal",header: "TextoSucursal", accessorKey: "TextoSucursal", field: "select", visibilityCol: true },
    { id:"FechaDeRegistroPublico",header: "FechaDeRegistroPublico", accessorKey: "FechaDeRegistroPublico", field: "select", visibilityCol: true },
    { id:"FechaDeApertura",header: "FechaDeApertura", accessorKey: "FechaDeApertura", field: "select", visibilityCol: true },
    { id:"FechaDeCancelacion",header: "FechaDeCancelacion", accessorKey: "FechaDeCancelacion", field: "select", visibilityCol: true },
    { id:"FechaDeInscripcionRegNalInvEx",header: "FechaDeInscripcionRegNalInvEx", accessorKey: "FechaDeInscripcionRegNalInvEx", field: "select", visibilityCol: true },
    { id:"NombreDeCliente",header: "NombreDeCliente", accessorKey: "NombreDeCliente", field: "select", visibilityCol: true },
    { id:"TextoESustitucion",header: "TextoESustitucion", accessorKey: "TextoESustitucion", field: "select", visibilityCol: true },
    { id:"TextoSustitucion",header: "TextoSustitucion", accessorKey: "TextoSustitucion", field: "select", visibilityCol: true },
    { id:"TextoESustitucionEje",header: "TextoESustitucionEje", accessorKey: "TextoESustitucionEje", field: "select", visibilityCol: true },
    { id:"TextoNombreDeContratoEje",header: "TextoNombreDeContratoEje", accessorKey: "TextoNombreDeContratoEje", field: "select", visibilityCol: true },
    { id:"TextoTipoDeNegocio",header: "TextoTipoDeNegocio", accessorKey: "TextoTipoDeNegocio", field: "select", visibilityCol: true },
    { id:"TextoClasificacionDeProducto",header: "TextoClasificacionDeProducto", accessorKey: "TextoClasificacionDeProducto", field: "select", visibilityCol: true },
    { id:"TextoNombreDeProducto",header: "TextoNombreDeProducto", accessorKey: "TextoNombreDeProducto", field: "select", visibilityCol: true },
    { id:"TextoFormaDeManejo",header: "TextoFormaDeManejo", accessorKey: "TextoFormaDeManejo", field: "select", visibilityCol: true },
    { id:"TextoComiteTecnico",header: "TextoComiteTecnico", accessorKey: "TextoComiteTecnico", field: "select", visibilityCol: true },
    { id:"TextoRevocable",header: "TextoRevocable", accessorKey: "TextoRevocable", field: "select", visibilityCol: true },
    { id:"TextoSHCP",header: "TextoSHCP", accessorKey: "TextoSHCP", field: "select", visibilityCol: true },
    { id:"TextoGobDF",header: "TextoGobDF", accessorKey: "TextoGobDF", field: "select", visibilityCol: true },
    { id:"TextoTipoDeCliente",header: "TextoTipoDeCliente", accessorKey: "TextoTipoDeCliente", field: "select", visibilityCol: true },
    { id:"TextoTipoDeContratoPublico",header: "TextoTipoDeContratoPublico", accessorKey: "TextoTipoDeContratoPublico", field: "select", visibilityCol: true },
    { id:"TextoTipoDeContrato",header: "TextoTipoDeContrato", accessorKey: "TextoTipoDeContrato", field: "select", visibilityCol: true },
    { id:"TextoSubContrato",header: "TextoSubContrato", accessorKey: "TextoSubContrato", field: "select", visibilityCol: true },
    { id:"TextoNombreDeNotario",header: "TextoNombreDeNotario", accessorKey: "TextoNombreDeNotario", field: "select", visibilityCol: false },
    { id:"TextoDeTipoDeAdministracion",header: "TextoDeTipoDeAdministracion", accessorKey: "TextoDeTipoDeAdministracion", field: "select", visibilityCol: false },
    { id:"TextoCentroDeCostos",header: "TextoCentroDeCostos", accessorKey: "TextoCentroDeCostos", field: "select", visibilityCol: false },
    { id:"TextoActividadEmpresarial",header: "TextoActividadEmpresarial", accessorKey: "TextoActividadEmpresarial", field: "select", visibilityCol: false },
    { id:"TextoPatrimonio",header: "TextoPatrimonio", accessorKey: "TextoPatrimonio", field: "select", visibilityCol: false },
    { id:"TextoRegLasDeOperacion",header: "TextoRegLasDeOperacion", accessorKey: "TextoRegLasDeOperacion", field: "select", visibilityCol: false },
    { id:"TextoNombreDeActividad",header: "TextoNombreDeActividad", accessorKey: "TextoNombreDeActividad", field: "select", visibilityCol: false },
    { id:"RFCActividadEmpresarial",header: "RFCActividadEmpresarial", accessorKey: "RFCActividadEmpresarial", field: "select", visibilityCol: false },
    { id:"TextoGerencia",header: "TextoGerencia", accessorKey: "TextoGerencia", field: "select", visibilityCol: false },
    { id:"TextoClasificacionProducto",header: "TextoClasificacionProducto", accessorKey: "TextoClasificacionProducto", field: "select", visibilityCol: false },
    { id:"RegistroPublicoDeLaPropiedad",header: "RegistroPublicoDeLaPropiedad", accessorKey: "RegistroPublicoDeLaPropiedad", field: "select", visibilityCol: false },
    { id:"TextoRegistroPresupuestal",header: "TextoRegistroPresupuestal", accessorKey: "TextoRegistroPresupuestal", field: "select", visibilityCol: false },
    { id:"TextoRenovacionRegPresupuestal",header: "TextoRenovacionRegPresupuestal", accessorKey: "TextoRenovacionRegPresupuestal", field: "select", visibilityCol: false },
    { id:"RenovacionRegPresupuestal",header: "RenovacionRegPresupuestal", accessorKey: "RenovacionRegPresupuestal", field: "select", visibilityCol: false },
    { id:"TextoInformativaSAT",header: "TextoInformativaSAT", accessorKey: "TextoInformativaSAT", field: "select", visibilityCol: false },
  ], []);

  
  const transformedData = useMemo(() => {
    if (!fetchData) return [];
    return fetchData.map(row => {
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
      />

    </div>
  );
};

export default MainComponent;
