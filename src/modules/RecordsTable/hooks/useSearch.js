import { useMemo } from "react";

export const useSearch = (records, searchText) => {
  const filterRecords = (records, searchValue) => {
    if (!searchValue) return records;

    const lowerSearchValue = searchValue.toLowerCase();

    return records.filter((record) => {
      return Object.values(record).some((value) => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearchValue);
      });
    });
  };

  const filteredRecords = useMemo(() => {
    return filterRecords(records, searchText);
  }, [records, searchText]);

  return {
    filteredRecords,
  };
};