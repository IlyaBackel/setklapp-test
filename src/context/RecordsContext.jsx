import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loadFromStorage, saveToStorage } from "./utils/storage";

const RecordsValueContext = createContext();
const RecordsMethodsContext = createContext();

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(records);
  }, [records]);

  const addRecord = useCallback((record) => {
    const newRecord = { key: Date.now().toString(), ...record };
    setRecords((prev) => [newRecord, ...prev]);
  }, []);

  const updateRecord = useCallback((key, updatedRecord) => {
    setRecords((prev) => {
      return prev.map((record) =>
        record.key === key ? { ...updatedRecord, key } : record,
      );
    });
  }, []);

  const deleteRecord = useCallback((key) => {
    setRecords((prev) => {
      return prev.filter((record) => record.key !== key);
    });
  }, []);

  const methods = useMemo(
    () => ({ addRecord, updateRecord, deleteRecord }),
    [addRecord, deleteRecord, updateRecord],
  );

  return (
    <RecordsValueContext.Provider value={records}>
      <RecordsMethodsContext.Provider value={methods}>
        {children}
      </RecordsMethodsContext.Provider>
    </RecordsValueContext.Provider>
  );
};

export function useRecordsValue() {
  const context = useContext(RecordsValueContext);
  if (!context) {
    throw new Error("useRecordsValue must be used within RecordsValueProvider");
  }
  return context;
}

export function useRecordsMethods() {
  const context = useContext(RecordsMethodsContext);
  if (!context) {
    throw new Error(
      "useRecordsMethods must be used within RecordsMethodsProvider",
    );
  }
  return context;
}
