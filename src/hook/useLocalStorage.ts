export interface IUseLocalStorage {
  saveToLocalStorage: (key: string, value: any) => void;
  getFromLocalStorage: (key: string) => any | null;
  removeFromLocalStorage: (key: string) => void;
}

// a hook to save JSON data in the local storage
export default function useLocalStorage(): IUseLocalStorage {
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
}
