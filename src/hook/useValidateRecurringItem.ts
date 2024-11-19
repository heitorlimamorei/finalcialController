import { useEffect } from 'react';

import { getDifferenceInHours, toggleJsonToDate } from '@/utils/datefunctions';
import axios from 'axios';

import useLocalStorage from './useLocalStorage';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useValidateRecurringItem(sheetId: string | null) {
  const { getFromLocalStorage, saveToLocalStorage } = useLocalStorage();

  const handleValidation = async () => {
    const ids = await axios.post(`${api}/recurring-items/check-recurring-items?sheetId=${sheetId}`);
    console.log(ids);
  };

  const setLastValidation = (): void => {
    const now = new Date();
    saveToLocalStorage('last-recurring-item-validation', now.toDateString());
  };

  const getLastValidation = (): Date | null => {
    const lastValidation = getFromLocalStorage('last-recurring-item-validation');
    return lastValidation ? toggleJsonToDate(lastValidation) : null;
  };

  useEffect(() => {
    if (!sheetId) return;

    const lastValidation = getLastValidation();

    if (!lastValidation) {
      handleValidation().then((_) => setLastValidation());

      return;
    }

    const difference = getDifferenceInHours(new Date(), lastValidation);

    if (difference >= 24) {
      handleValidation().then((_) => setLastValidation());
      return;
    }
  }, [sheetId]);
}
