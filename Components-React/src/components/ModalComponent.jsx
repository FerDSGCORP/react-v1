import React from 'react';

function ModalComponent({ isOpen, closeModal, modalTitle, dataLoad }) {
    const sortedData = [...dataLoad].sort((a, b) => a.positionDiv[0] - b.positionDiv[0]);

    const elements = [];
    let i = 0;

    while (i < sortedData.length) {
        const item = sortedData[i];

        if (item.isGroup) {
            const groupItems = [item];
            if (sortedData[i + 1] && sortedData[i + 1].isGroup) {
                groupItems.push(sortedData[i + 1]);
                i++;
            }
            elements.push(
                <div className="container__field __long" key={i}>
                    {groupItems.map((groupItem, idx) => (
                        <React.Fragment key={idx}>
                            <p>{groupItem.campoTexto}</p><span>{groupItem.campoValor}</span>
                        </React.Fragment>
                    ))}
                </div>
            );
        } else {
            elements.push(
                <div className="container__field" key={i}>
                    <p>{item.campoTexto}</p><span>{item.campoValor}</span>
                </div>
            );
        }
        i++;
    }

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content __long">
                        <div className='modal-content-head'>
                            <h2>{modalTitle}</h2>
                            <button type='button' className="close-button" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="data">
                            {elements}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalComponent;
