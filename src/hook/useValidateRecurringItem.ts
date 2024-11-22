import { useEffect } from 'react';

import { getDifferenceInHours, toggleJsonToDate } from '@/utils/datefunctions';
import axios from 'axios';

import useLocalStorage from './useLocalStorage';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function useValidateRecurringItem(sheetId: string | null) {
  const { getFromLocalStorage, saveToLocalStorage } = useLocalStorage();

  const setLastValidation = (d: Date | null): void => {
    saveToLocalStorage('last-recurring-item-validation', d ? d.toJSON() : null);
  };

  const getLastValidation = (): Date | null => {
    const lastValidation = getFromLocalStorage('last-recurring-item-validation');
    return lastValidation ? toggleJsonToDate(lastValidation) : null;
  };

  const handleValidation = async (shid: string) => {
    const lastValidation = getLastValidation();

    const reqValidation = async () => {
      const tempValidation = getLastValidation();

      try {
        setLastValidation(new Date());

        await axios.post(`${api}/recurring-items/check-recurring-items?sheetId=${shid}`);
      } catch (err) {
        console.error('Error checking for recurring items:', err);

        setLastValidation(tempValidation);
      }
    };

    if (!lastValidation) {
      await reqValidation();
      return;
    }

    const difference = getDifferenceInHours(new Date(), lastValidation);

    if (difference >= 24) {
      await reqValidation();
      return;
    }
  };

  useEffect(() => {
    if (!sheetId) return;

    handleValidation(sheetId);
  }, [sheetId]);
}
