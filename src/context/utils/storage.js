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

export const loadFromStorage = () => {
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

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};
