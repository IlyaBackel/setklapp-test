import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const RecordsContext = createContext();

const STORAGE_KEY = "app_records";

const DEFAULT_DATA = [
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

const loadFromStorage = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData;
    }
    return DEFAULT_DATA;
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return DEFAULT_DATA;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const loadedData = loadFromStorage();
        setRecords(loadedData);
        setInitialized(true);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (initialized) {
      saveToStorage(records);
    }
  }, [records, initialized]);

  const addRecord = useCallback((record) => {
    console.log('create')
    const newRecord = {
      key: Date.now().toString(),
      ...record,
    };
    setRecords((prev) => {
      const newRecords = [newRecord, ...prev];
      return newRecords;
    });
  }, []);

  const updateRecord = useCallback((key, updatedRecord) => {
    setRecords((prev) => {
      const newRecords = prev.map((record) =>
        record.key === key ? { ...updatedRecord, key } : record,
      );
      return newRecords;
    });
  }, []);

  const deleteRecord = useCallback((key) => {
    setRecords((prev) => {
      const newRecords = prev.filter((record) => record.key !== key);
      return newRecords;
    });
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
export function useRecords() {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within RecordsProvider");
  }
  return context;
}