import { useCallback, useEffect, useMemo, useState } from "react";
import { IconeAjustes } from "../components/icons/Icones";
import Layout from "../components/template/Layout";
import ModalForm from "../components/template/ModalForm";
import useSheets from "../data/hook/useSheets";
import { useSession } from "next-auth/react";
import CardItem from "../components/CardItem";
import _ from "lodash";
import axios from "axios";
import {
  sheetItemProps,
  sheetProps,
  itemRenderOptions,
} from "../types/sheetTypes";
import FormModalContent from "../components/template/FormModalContent";
import ManageSheetProps from "../components/template/ManageSheetProps";
import Button from "../components/Button";
import ManageUsers from "../components/template/ManageUsers";
import Switch from "../components/template/Switch";
import ManageRenderOptions from "../components/template/ManageRenderOptions";
import ControllBar from "../components/template/ControllBar";

function Sheet() {
  const {
    sheet,
    loadSheet,
    createNewItem,
    getBalance,
    getSortedItems,
    updateItem,
    filterBySpentType,
    loadSheetByUserSeletion,
    filterByDescription,
    filterByName,
  } = useSheets();
  const [sheetId, setSheetId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIds, setSheetIds] = useState<string[]>([]);
  const [isOpen4, setIsOpen4] = useState(false);
  const [itemsRenderOptions, setItemsRenderOptions] =
    useState<itemRenderOptions>({
      name: "",
      type: "",
      description: "",
      sortMode: "date descending",
    });
  const [selected, setSelected] = useState<"users" | "properties">(
    "properties"
  );
  const session = useSession();
  let email = session.data?.user.email;
  let name = session.data?.user.name;
  const [currentEditingItem, setCurrentEditingItem] =
    useState<sheetItemProps>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: sheet.data.tiposDeGastos[0],
    value: 0,
    description: "",
  });
  const handleToggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);
  const handleToggleManageProps = useCallback(() => {
    setIsOpen2((current) => !current);
  }, []);
  const handleChange = useCallback((event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  }, []);
  const handleCancel = useCallback(() => {
    handleToggle();
    setFormData({
      name: "",
      type: "",
      value: 0,
      description: "",
    });
    setCurrentEditingItem(null);
  }, []);
  const setEditMode = useCallback((currentItem: sheetItemProps) => {
    setCurrentEditingItem(currentItem);
    setFormData({
      name: currentItem.name,
      type: currentItem.type,
      value: currentItem.value,
      description: currentItem.description,
    });
    setIsOpen((current) => !current);
  }, []);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!currentEditingItem) {
        createNewItem({
          ...formData,
          value: Number(formData.value),
          sheetId: sheet.data.id,
          author: sheet.currentUser,
          date: new Date(),
        });
      } else {
        updateItem({
          ...currentEditingItem,
          value: formData.value,
          description: formData.description,
          type: formData.type,
          name: formData.name,
        });
      }
      setFormData({
        name: "",
        type: "",
        value: 0,
        description: "",
      });
      setCurrentEditingItem(null);
      handleToggle();
    },
    [currentEditingItem, formData, sheet]
  );
  useEffect(() => {
    if (email !== undefined) {
      if (email.length > 0) {
        axios
          .post(`http://localhost:3000/api/users/login`, {
            email: email,
            name: name,
          })
          .then((response) => {
            let sheets: string[] = response.data.sheetIds;
            console.log(sheets);
            setSheetIds(sheets);
          });
      }
    }
  }, [email]);
  const getSheets = useCallback(async () => {
    let requests = [];
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        sheetIds.forEach((sheetId) => {
          const currentSheet = axios.post(
            `http://localhost:3000/api/sheets/${sheetId}`,
            {
              email: sheet.currentUser,
              mode: "GET",
            }
          );
          requests.push(currentSheet);
        });
        const responseArray = await Promise.all(requests);
        let finalReponse = responseArray.map((response) => response.data);
        return finalReponse;
      }
    }
  }, [sheetIds]);
  const loader = useCallback(async () => {
    const sheetsResp: any = await getSheets();
    if (sheetsResp.length > 0) {
      setSheets(sheetsResp);
    }
  }, [getSheets]);
  useEffect(() => {
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        loader();
      }
    }
  }, [sheetIds]);
  const renderItems = useCallback(() => {
    const { name, description, type, sortMode } = itemsRenderOptions;
    const itemsReady = filterByDescription(
      description,
      filterByName(name, filterBySpentType(type, getSortedItems(sortMode)))
    );
    return itemsReady.map((item) => (
      <CardItem key={item.id} item={item} setEditMode={setEditMode} />
    ));
  }, [sheet, itemsRenderOptions]);
  return (
    <div className={`h-[500vh] w-[100%]`}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <ModalForm isOpen={isOpen4}>
          <ManageRenderOptions
            itemsRenderOptions={itemsRenderOptions}
            setItemsRenderOptions={setItemsRenderOptions}
            toggleIsOpen={() => setIsOpen4((current) => !current)}
          />
        </ModalForm>
        <ModalForm isOpen={isOpen}>
          <FormModalContent
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditMode={currentEditingItem != null}
            onCancel={handleCancel}
            spentOptions={sheet.data.tiposDeGastos}
          />
        </ModalForm>
        <ModalForm isOpen={isOpen2}>
          <div className=" flex flex-row">
            <Switch
              className="self-start mb-2"
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          {selected === "properties" ? (
            <ManageSheetProps toggleIsOpen={handleToggleManageProps} />
          ) : (
            <ManageUsers toggleIsOpen={handleToggleManageProps} />
          )}
        </ModalForm>
        <ControllBar
          handleToggle={handleToggle}
          handleToggleManageProps={handleToggleManageProps}
          setIsOpen4={setIsOpen4}
        />
        <div className="flex justify-center items-center w-full h-[5rem]">
          <h2 className="dark:text-white font-bold text-3xl">
            R${getBalance()}
          </h2>
        </div>

        <div>
          <ul className="flex flex-wrap mt-4 w-full transition-all duration-500 ease-linear">
            {renderItems()}
          </ul>
        </div>
      </Layout>
    </div>
  );
}

export default Sheet;