import React from 'react';

const SelectFilterComponent = ({ table }) => {
    const getUniqueOptions = (columnId) => {
        return [...new Set(table.getPreFilteredRowModel().flatRows.map(row => row.getValue(columnId)))];
    };

    const handleFilterChange = (columnId, value) => {
        console.log(`Applying filter for column: ${columnId} with value: ${value}`);


        table.setColumnFilters((prevFilters) => {
            const updatedFilters = prevFilters.filter(filter => filter.id !== columnId);
            if (value !== '') {
                updatedFilters.push({ id: columnId, value });
            }
            console.log(`Updated column filters: ${JSON.stringify(updatedFilters)}`);
            return updatedFilters;
        });
    };

    return (
        <tr>
            {table.getHeaderGroups().map(headerGroup =>
                headerGroup.headers.map(header => (
                    <td key={header.id}>
                        {header.column.columnDef.type === 'text' ? (
                            <input
                                type="text"
                                onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                                placeholder={`Filter by ${header.column.columnDef.header}`}
                            />
                        ) :
                        header.column.columnDef.type === 'number' ? (
                            <input
                                type="number"
                                onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                                placeholder={`Filter by ${header.column.columnDef.header}`}
                            />
                        ) :
                        header.column.columnDef.type === 'select' ? (
                            <select
                                onChange={(e) => handleFilterChange(header.column.id, e.target.value)}
                            >
                                <option value="">All</option>
                                {getUniqueOptions(header.column.id).map((optionValue, index) => (
                                    <option key={index} value={optionValue}>
                                        {optionValue}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                    </td>
                ))
            )}
        </tr>
    );
};

export default SelectFilterComponent;
