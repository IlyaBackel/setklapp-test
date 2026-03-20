import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const RecordsContext = createContext();

const INITIAL_DATA = [
  {
    key: "1",
    name: "Иван Петров",
    date: "2024-01-15",
    number: 42,
  },
  {
    key: "2",
    name: "Мария Сидорова",
    date: "2024-02-20",
    number: 37,
  },
  {
    key: "3",
    name: "Алексей Иванов",
    date: "2024-03-10",
    number: 55,
  },
];

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setLoading(true);

      const loadInitialData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setRecords(INITIAL_DATA);
          setInitialized(true);
        } finally {
          setLoading(false);
        }
      };

      loadInitialData();
    }
  }, [initialized]); 

  const addRecord = useCallback((record) => {
    const newRecord = {
        key: Date.now().toString(),
        ...record,
    };
    setRecords((prev) => [newRecord, ...prev]);
  }, []);

  const updateRecord = useCallback((key, updatedRecord) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.key === key ? { ...updatedRecord, key } : record,
      ),
    );
  }, []);

  const deleteRecord = useCallback((key) => {
    setRecords((prev) => prev.filter((record) => record.key !== key));
  }, []);

  const value = {
    records,
    loading,
    addRecord,
    updateRecord,
    deleteRecord,
  };

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export function useRecords () {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within RecordsProvider");
  }
  return context;
};
