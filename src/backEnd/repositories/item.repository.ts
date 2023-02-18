import { db } from "../../firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
interface ItemProps {
  id: string;
  name: string;
  description: string;
  date: any;
  value: number;
  author: string;
  sheetId:string;
  type: string;
}
interface newItemProps {
  name: string;
  description: string;
  value: number;
  author: string;
  sheetId:string;
  type: string;
}
async function getItems(sheetId:string){
  let normalizado = []
  const sheetRef = collection(
      db,
      `planilhas/${sheetId}/items`
  );
  let items =  await getDocs(sheetRef);
  items.forEach((item) => {
      normalizado.push({id: item.id, ...item.data()});
  })
  return normalizado;
}
async function getItemById(sheetId: string, itemId:string): Promise<ItemProps> {
  const itens = await getItems(sheetId);
  return itens.find((item) => item.id === itemId)
}
async function createItem(newItem: newItemProps) {
  const itemsRef = collection(db, `planilhas/${newItem.sheetId}/items`);
  const itemRef = await addDoc(itemsRef, {
    name: newItem.name,
    description:  newItem.description,
    value: newItem.value,
    author: newItem.author,
    sheetId:newItem.sheetId,
    date: new Date(),
    type: newItem.type
  });
  return [[...await getItems(newItem.sheetId)], await getItemById(newItem.sheetId, itemRef.id)]
}
async function createForeignItem(item: ItemProps, sheetId: string)  {
  const itemsRef = collection(db, `planilhas/${sheetId}/items`);
  const itemRef = await addDoc(itemsRef, {
    name: item.name,
    description:  item.description,
    value: item.value,
    author: item.value,
    sheetId: sheetId,
    date: item.date,
    type: item.type
  });
  return  getItems(item.sheetId)
}
async function updateItem(item:ItemProps){
  const itemRef = doc(db, `planilhas/${item.sheetId}/items/${item.id}`)
  const docRef = await updateDoc(itemRef, {
    name: item.name,
    description: item.description,
    author: item.author,
    value: item.value,
    type: item.type
  })
  return [[...await getItems(item.sheetId)], await getItemById(item.sheetId, item.id)]
}
async function itemExists(sheetId:string, itemId:string){
  const docRef = doc(db, `planilhas/${sheetId}/items/${itemId}`)
  const itemRef = await getDoc(docRef)
  return itemRef.exists()
}
async function deleteItem(sheetId: string, itemId:string){
  const itemRef = doc(db, `planilhas/${sheetId}/items/${itemId}`);
  const docRef = await deleteDoc(itemRef)
  return await getItems(sheetId)
}

export default {
  getItems,
  getItemById,
  createItem,
  updateItem,
  itemExists,
  deleteItem,
  createForeignItem
};
