import React, { useState } from 'react';
import TableComponent from '../components/TableComponent';
import MenuColumns from '../components/MenuColumns'; // Asegúrate de importar MenuColumns
import useFetchTableData from '../services/useFetchTableService';

const MainComponent = () => {
  const { data, loading, error } = useFetchTableData();
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado de la modal
  const [tableState, setTableState] = useState(null); // Aquí almacenaremos la info de las columnas

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button id='openModalFilters' onClick={toggleModal}>Abrir filtros</button>

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

      <style>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          position: relative;
        }
        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MainComponent;
