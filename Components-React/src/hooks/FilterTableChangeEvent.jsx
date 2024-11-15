import { useState } from 'react';

const useFilterTableChangeEvent = () => {
  const [columnFilters, setColumnFilters] = useState({});
  const [filters, setFilters] = useState(null);

  const handleFilterChange = (accessorKey, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [accessorKey]: value,
    }));

    const newRule = {
      field: accessorKey,
      op: 'eq',
      data: value,
    };

    setFilters((prev) => {
      const updatedFilters = {
        groupOp: 'AND',
        rules: [],
        groups: [],
      };

      const updatedRules = prev?.rules?.filter((rule) => rule.field !== accessorKey) || [];

      if (value !== '') {
        updatedRules.push(newRule);
      }

      updatedFilters.rules = updatedRules;

      return updatedFilters;
    });
  };

  const reloadTable = () => {
    setFilters({
      groupOp: "AND",
      rules: [],
      groups: []
    });
    setColumnFilters({});
    localStorage.removeItem('filtroAvanzado');
  };

  return {
    columnFilters,
    setColumnFilters,
    filters,
    setFilters,
    handleFilterChange,
    reloadTable,
  };
};

export default useFilterTableChangeEvent;
