import { useCallback } from 'react';

function useReplaceEmptyValue() {
  const displayData = useCallback((value) => {
    if (typeof value === 'string') {
      return value.trim() ? value : '-';
    } else if (value == null || value === '') {
      return '-';
    } else {
      return value;
    }
  }, []);

  return displayData;
}

export default useReplaceEmptyValue;