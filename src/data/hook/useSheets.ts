import {
  sheetItemProps,
  NewSheetProps,
  newSheetItemProps,
  shortingTypes,
  NewUserProps,
  userProps,
  sheetProps,
  upadatedSheetProps,
  itemFormDataProps,
  sheetFormDataProps,
  iFormError,
} from '../../types/sheetTypes';
import _ from 'lodash';
import axios from 'axios';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSheetsCtx from './useSheetsCtx';
import variaveis from '../../model/variaveis';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function useSheets() {
  const session = useSession();
  const { BASE_URL } = variaveis;
  const { state, dispatch } = useSheetsCtx();
  const email = session.data?.user.email;
  useEffect(() => {
    if (email) {
      onChangeUser(email);
    }
  }, [email]);
  async function createNewSheet(payload: NewSheetProps) {
    const { data: sheet } = await axios.post(`${BASE_URL}/api/sheets`, {
      ...payload,
    });
    const { data: items } = await axios.post(`${BASE_URL}/api/sheets/${sheet.data.id}/items`, {
      email: sheet.data.owner,
      mode: 'GET',
    });
    const { data: users } = await axios.get(`${BASE_URL}/api/sheets/${sheet.data.id}/auth`);
    dispatch({
      type: 'create',
      payload: {
        sheet,
        items,
        users,
      },
    });
    return sheet;
  }
  async function updateSheet(updatedSheet: upadatedSheetProps) {
    const finalUpdatedSheet = {
      ...state.data,
      name: updatedSheet.name,
      totalValue: updatedSheet.totalValue,
      tiposDeGastos: updatedSheet.tiposDeGastos,
    };
    const { data: updatedsheetf } = await axios.put(`${BASE_URL}/api/sheets`, {
      email: state.currentUser,
      ...finalUpdatedSheet,
    });
    dispatch({ type: 'onUpdate', payload: updatedsheetf });
  }
  async function loadSheet(id: string) {
    const { data: sheet } = await axios.post(`${BASE_URL}/api/sheets/${id}`, {
      email: state.currentUser,
      mode: 'GET',
    });
    const { data: items } = await axios.post(`${BASE_URL}/api/sheets/${id}/items`, {
      email: state.currentUser,
      mode: 'GET',
    });
    const { data: users } = await axios.get(`${BASE_URL}/api/sheets/${id}/auth`);
    dispatch({
      type: 'refresh',
      payload: {
        sheet,
        items,
        users,
      },
    });
  }
  async function sheetReLoader(id: string, currentUser: string) {
    const { data: sheet } = await axios.post(`${BASE_URL}/api/sheets/${id}`, {
      email: currentUser,
      mode: 'GET',
    });
    const { data: items } = await axios.post(`${BASE_URL}/api/sheets/${id}/items`, {
      email: currentUser,
      mode: 'GET',
    });
    const { data: users } = await axios.get(`${BASE_URL}/api/sheets/${id}/auth`);
    dispatch({
      type: 'refresh',
      payload: {
        sheet,
        items,
        users,
      },
    });
    return sheet;
  }

  async function loadIfIsNotLoaded(sheetId: string) {
    if (!state.session.authenticated) {
      await loadSheet(sheetId);
    }
  }

  async function loadSheetByUserSeletion(seletedSheet: sheetProps): Promise<void> {
    const { data: items } = await axios.post(
      `${BASE_URL}/api/sheets/${seletedSheet.data.id}/items`,
      {
        email: state.currentUser,
        mode: 'GET',
      },
    );
    const { data: users } = await axios.get(`${BASE_URL}/api/sheets/${seletedSheet.data.id}/auth`);
    dispatch({
      type: 'refresh',
      payload: {
        sheet: seletedSheet,
        items: items,
        users: users,
      },
    });
  }
  async function refreshSheet() {
    await loadSheet(state.data.id);
  }
  async function refreshItems() {
    const { data: items } = await axios.post(`${BASE_URL}/api/sheets/${state.data.id}/items`, {
      email: state.currentUser,
      mode: 'GET',
    });
    dispatch({ type: 'refreshItems', payload: items });
  }
  async function createUser(newUser: NewUserProps) {
    const { data: users } = await axios.post(`${BASE_URL}/api/sheets/${state.data.id}/auth`, {
      ...newUser,
    });
    dispatch({ type: 'refreshUsers', payload: users });
  }
  async function updateUser(user: userProps) {
    const { data: users } = await axios.put(`${BASE_URL}/api/sheets/${state.data.id}/auth`, {
      ...user,
    });
    dispatch({ type: 'refreshUsers', payload: users });
  }
  async function deleteUser(user: userProps) {
    const { data: users } = await axios.delete(
      `${BASE_URL}/api/sheets/${state.data.id}/auth/${user.id}`,
    );
    dispatch({ type: 'refreshUsers', payload: users });
  }
  async function deleteItem(id: string) {
    const { status } = await axios.post(`${BASE_URL}/api/sheets/${state.data.id}/items/${id}`, {
      email: state.currentUser,
      mode: 'DELETE',
    });
    if (status !== 200) console.error(status);
  }
  function onChangeUser(newUser: string) {
    dispatch({ type: 'onChangeUser', payload: newUser });
  }
  async function createNewItem(newItem: newSheetItemProps) {
    const { status } = await axios.post(`${BASE_URL}/api/sheets/${state.data.id}/items`, {
      email: state.currentUser,
      mode: 'POST',
      newItem: newItem,
    });
  }
  async function updateItem(item: sheetItemProps) {
    const { status } = await axios.put(`${BASE_URL}/api/sheets/${state.data.id}/items`, {
      method: 'PUT',
      email: state.currentUser,
      item: {
        ...item,
      },
    });
  }
  function sumAllItems(): number {
    return _.sumBy(state.items, (item: sheetItemProps) =>
      typeof item.value === 'number' ? item.value : parseFloat(item.value),
    );
  }
  function getBalance() {
    return Number((state.data.totalValue - sumAllItems()).toFixed(2));
  }
  function getSortedItems(sortType: shortingTypes) {
    function sortDatesAscending(items: sheetItemProps[]) {
      let itemsReady = items.map((item) => {
        return {
          date: new Date(item.date.seconds * 1000),
          item: {
            ...item,
          },
        };
      });
      itemsReady = itemsReady.sort((a, b) => a.date.getTime() - b.date.getTime());
      return itemsReady.map(({ item }) => item);
    }
    function sortDatesDescending(items: sheetItemProps[]) {
      let itemsReady = items.map((item) => {
        return {
          date: new Date(item.date.seconds * 1000),
          item: {
            ...item,
          },
        };
      });
      itemsReady = itemsReady.sort((a, b) => b.date.getTime() - a.date.getTime());
      return itemsReady.map(({ item }) => item);
    }
    switch (sortType) {
      case 'ascending':
        return _.sortBy(state.items, (item: sheetItemProps) => Number(item.value));
      case 'descending':
        return _.sortBy(state.items, (item: sheetItemProps) => -Number(item.value));
      case 'date ascending': // ordena datas que estão mais longe da data atual
        return sortDatesAscending(state.items);
      case 'date descending':
        return sortDatesDescending(state.items); // ordena datas que estão mais perto da data atual
      default:
        return _.sortBy(state.items, (item: sheetItemProps) => -Number(item.value));
    }
  }
  function filterByName(name: string, currentItems?: sheetItemProps[]) {
    const items = currentItems !== undefined ? currentItems : state.items;
    if (name.trim().length === 0) return items;
    return items.filter((item: sheetItemProps) => {
      const nameReady = name.toLowerCase().replace(/\s+/g, '');
      const currentNameReady = item.name.toLowerCase().replace(/\s+/g, '');
      return currentNameReady.includes(nameReady);
    });
  }
  function filterByDescription(description: string, currentItems?: sheetItemProps[]) {
    const items = currentItems !== undefined ? currentItems : state.items;
    if (description.trim().length === 0) return items;
    return items.filter((item: sheetItemProps) => {
      if (item.description.trim().length === 0) return false;
      const descriptionReady = description.toLowerCase().replace(/\s+/g, '');
      const currentDescriptionReady = item.description.toLowerCase().replace(/\s+/g, '');
      return currentDescriptionReady.includes(descriptionReady);
    });
  }
  function filterBySpentType(spentType: string, currentItems?: sheetItemProps[]) {
    return _.filter(currentItems ?? state.items, (item: sheetItemProps) =>
      item.type.includes(spentType),
    );
  }
  function getStats() {
    const objAgrupado = _.groupBy(state.items, (item: sheetItemProps) => item.type);
    let total = sumAllItems();
    const arrayAgrupado = Object.entries(objAgrupado);
    return arrayAgrupado.map((type) => {
      let sumOfSpents = 0;
      type[1].forEach((item) => (sumOfSpents += item.value));
      return {
        name: type[0],
        value: Number(sumOfSpents.toFixed(2)),
        length: type[1].length,
        percentOfSpents: parseFloat(((sumOfSpents / total) * 100).toFixed(2)),
      };
    });
  }
  async function deleteSheet() {
    const resp = await axios.post(`${BASE_URL}/api/sheets/${state.data.id}`, {
      email: state.currentUser,
      mode: 'DELETE',
    });
    dispatch({ type: 'onDeleteSheet' });
  }
  async function cloneForeignItems(foreignId) {
    const { status } = await axios.post(`${BASE_URL}/api/sheets/${state.data.id}/items/clone`, {
      email: state.currentUser,
      foreignId: foreignId,
    });
  }

  interface IvalidateStatus {
    validated: boolean;
    errors: iFormError[];
  }
  function validateItemForm(formItemData: itemFormDataProps, isUpdated: boolean) {
    let status: IvalidateStatus = {
      validated: false,
      errors: [],
    };
    console.log(formItemData);
    if (isUpdated) {
      if (formItemData.id === undefined || formItemData.id === null || formItemData.id.length < 0) {
        status.errors.push({
          errorCode: 'invalid_id',
          message: 'Id invalido!',
        });
      }
    }
    if (formItemData.description === undefined || formItemData.description === null) {
      status.errors.push({
        errorCode: 'invalid_description',
        message: 'Descrição invalida!',
      });
    }
    if (
      formItemData.name.length <= 0 ||
      formItemData.name === undefined ||
      formItemData.name === null
    ) {
      status.errors.push({
        errorCode: 'invalid_name',
        message: 'Nome invalido!',
      });
    }
    if (
      formItemData.type.length <= 0 ||
      formItemData.type === undefined ||
      formItemData.type === null
    ) {
      status.errors.push({
        errorCode: 'invalid_type',
        message: 'Tipo invalido!',
      });
    }
    if (
      formItemData.value <= 0 ||
      formItemData.value === undefined ||
      formItemData.value === null
    ) {
      status.errors.push({
        errorCode: 'value_type',
        message: 'Valor invalido!',
      });
    }
    return {
      ...status,
      validated: !(status.errors.length > 0),
    };
  }

  function validateSheetForm(formSheetData: sheetFormDataProps, isUpdated: boolean) {
    let status: IvalidateStatus = {
      validated: false,
      errors: [],
    };

    if (isUpdated) {
      if (
        formSheetData.id.length < 0 ||
        formSheetData.id === undefined ||
        formSheetData.id === null
      ) {
        status.errors.push({
          errorCode: 'invalid_id',
          message: 'Id invalido!',
        });
      }
    }

    if (
      formSheetData.name.length <= 0 ||
      formSheetData.name === undefined ||
      formSheetData.name === null
    ) {
      status.errors.push({
        errorCode: 'invalid_name',
        message: 'Nome invalido!',
      });
    }

    if (formSheetData.tiposDeGastos === undefined || formSheetData.tiposDeGastos === null) {
      status.errors.push({
        errorCode: 'invalid_spentTypes',
        message: 'Tipos de gastos invalidos!',
      });
    } else if (formSheetData.tiposDeGastos.length < 1) {
      status.errors.push({
        errorCode: 'empty_spentTypes',
        message: 'Lista de tipos de gastos está vazia!',
      });
    }

    if (formSheetData.totalValue === undefined || formSheetData.totalValue === null) {
      status.errors.push({
        errorCode: 'invalid_totalValue',
        message: 'Valor total invalido!',
      });
    } else if (formSheetData.totalValue <= 0) {
      status.errors.push({
        errorCode: 'totalValue_equal_to_zero',
        message: 'Valor total não pode ser zero!',
      });
    }

    return {
      ...status,
      validated: !(status.errors.length > 0),
    };
  }
  interface IvalidateOptions {
    callBack: (payload: sheetFormDataProps) => Promise<void>;
    handler: (errors: iFormError[]) => void;
    isUpdate: boolean;
  }

  async function validateSheetAndRun(
    paylod: sheetFormDataProps,
    validateOptions: IvalidateOptions,
  ): Promise<any> {
    const { isUpdate, callBack, handler } = validateOptions;
    const validation = validateSheetForm(paylod, isUpdate);
    if (validation.validated) {
      return await callBack(paylod);
    } else {
      handler(validation.errors);
    }
  }

  function refreshItemsFromListener() {
    if (!!state.data.id) {
      const q = query(collection(db, `planilhas/${state.data.id}/items`));
      const unsubscribe = onSnapshot(q, (updatedItems) => {
        const items = [];
        updatedItems.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        console.log(items);
        dispatch({ type: 'refreshItems', payload: items });
      });
      return unsubscribe;
    }
  }

  return {
    sheet: state,
    createNewSheet,
    deleteSheet,
    refreshSheet,
    onChangeUser,
    dispatch,
    refreshItems,
    loadSheet,
    loadSheetByUserSeletion,
    deleteItem,
    createNewItem,
    sumAllItems,
    getBalance,
    getSortedItems,
    updateItem,
    filterByName,
    filterByDescription,
    createUser,
    updateUser,
    deleteUser,
    filterBySpentType,
    getStats,
    updateSheet,
    sheetReLoader,
    cloneForeignItems,
    validateItemForm,
    validateSheetForm,
    validateSheetAndRun,
    refreshItemsFromListener,
  };
}
