import React, { useState } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns'; // Asegúrate de importar MenuColumns
import useFetchContrato from '../services/useFetchContrato';

const MainComponent = () => {
  const { data, loading, error } = useFetchContrato();
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado de la modal
  const [tableState, setTableState] = useState(null); // Aquí almacenaremos la info de las columnas

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='container_tblView'>

      {/* Modal */}
      {isModalOpen && tableState && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <MenuColumns 
              columns={tableState.columns} // Pasamos las columnas al componente MenuColumns
              setColumnVisibility={tableState.setColumnVisibility}
              columnVisibility={tableState.columnVisibility}
              listColumnsActive={tableState.listColumnsActive}
              setListColumnsActive={tableState.setListColumnsActive}
            />
          </div>
        </div>
      )}

      <TableComponent data={data} onTableReady={setTableState} />

    </div>
  );
};

export default MainComponent;
