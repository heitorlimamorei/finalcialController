import { useCallback, useEffect, useState } from "react";
import Layout from "../../../components/template/Layout";
import ModalForm from "../../../components/template/ModalForm";
import useSheets from "../../../data/hook/useSheets";
import _ from "lodash";
import axios from "axios";
import {
  sheetItemProps,
  sheetProps,
  itemRenderOptions,
} from "../../../types/sheetTypes";
import CreateOrEditItem from "../../../components/template/CreateOrEditItem";
import ManageSheetProps from "../../../components/template/ManageSheetProps";
import ManageUsers from "../../../components/template/ManageUsers";
import Switch from "../../../components/template/Switch";
import ManageRenderOptions from "../../../components/template/ManageRenderOptions";
import ControllBar from "../../../components/template/ControllBar";
import variaveis from "../../../model/variaveis";
import { useRouter } from "next/router";
import Switch2 from "../../../components/template/Switch2";
import ImportForeignItemsModal from "../../../components/ImportForeignItemsModal";
import IfSheetIsLoaded from "../../../components/IfSheetIsLoaded";
import ExpenseChart from "../../../components/ExpenseChart";
import useAuth from "../../../data/hook/useAuth";
import ItemsFeed from "../../../components/ItemsFeed";
import TimeLineFeed from "../../../components/ItemsTimeLine/Feed";

function EditSheet() {
  const { BASE_URL } = variaveis;
  const {
    sheet,
    sheetReLoader,
    createNewItem,
    sumAllItems,
    updateItem,
    refreshItemsFromListener,
  } = useSheets();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const { data } = useAuth();
  const { user } = data;
  const { email, sheetIds } = user;
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
  const [selected2, setSelected2] = useState<"createItem" | "import">(
    "createItem"
  );
  const router = useRouter();
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
    setSelected2("createItem");
  }, []);

  const handleToggleManageProps = useCallback(() => {
    setIsOpen2((current) => !current);
  }, []);

  const validateField = useCallback((event: any) => {
    // posteriormente alterar por uma solução de UX.
    const validateNumberField = () =>
      typeof parseFloat(event.target.value) === "number";
    return event.target.value == "value"
      ? validateNumberField()
      : event.target.value;
  }, []);

  const handleChange = useCallback((event) => {
    setFormData((current) => {
      return {
        ...current,
        [event.target.name]: validateField(event),
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
    setSelected2("createItem");
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
    async (event) => {
      event.preventDefault();
      if (!currentEditingItem) {
         await createNewItem({
          ...formData,
          value: Number(formData.value),
          sheetId: sheet.data.id,
          author: sheet.currentUser,
          date: new Date(),
        });
      } else {
         await updateItem({
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

  const getSheets = useCallback(async () => {
    let requests = [];
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        sheetIds.forEach((sheetId) => {
          const currentSheet = axios.post(`${BASE_URL}/api/sheets/${sheetId}`, {
            email: sheet.currentUser,
            mode: "GET",
          });
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

  const ReloadSheet = useCallback(
    async (currentId: any, currentEmail: any) => {
      let reloadedSheet: sheetProps = await sheetReLoader(
        currentId,
        currentEmail
      );
      setFormData((current) => {
        return {
          ...current,
          type: reloadedSheet.data.tiposDeGastos[0],
        };
      });
    },
    [setFormData]
  );

  useEffect(() => {
    let id: any = router.query.sheetId;
    if (
      email !== undefined &&
      email !== null &&
      email.length > 0 &&
      id !== undefined
    ) {
      console.log(email);
      console.log(router.query.sheetId);
      ReloadSheet(id, email);
    }
  }, [email, router.query]);

  useEffect(() => {
    if (!!sheet.data.id) {
      const cancel: any = refreshItemsFromListener();
      return () => cancel();
    }
  }, [sheet.data.id]);

  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`md:h-full h-full w-[100%]`}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <IfSheetIsLoaded>
          <ModalForm isOpen={isOpen4}>
            <ManageRenderOptions
              itemsRenderOptions={itemsRenderOptions}
              setItemsRenderOptions={setItemsRenderOptions}
              toggleIsOpen={() => setIsOpen4((current) => !current)}
            />
          </ModalForm>
          <ModalForm isOpen={isOpen}>
            <div className=" flex flex-row mb-1">
              {!currentEditingItem && (
                <Switch2
                  className="self-start mb-2"
                  selected={selected2}
                  setSelected={setSelected2}
                />
              )}
            </div>
            {selected2 === "createItem" ? (
              <CreateOrEditItem
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isEditMode={currentEditingItem != null}
                onCancel={handleCancel}
                spentOptions={sheet.data.tiposDeGastos}
              />
            ) : (
              <ImportForeignItemsModal
                toggleIsOpen={handleToggle}
                sheetOptions={sheets}
              />
            )}
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
          <div className="transition-all duration-500 ease-linear flex justify-center">
            <div
              className="flex justify-center mt-6 md:mt-0 align-center w-fit p-2 rounded-xl shadow-[16px_16px_24px_#636568,-16px_-16px_32px_#ffffff;]
          dark:shadow-[16px_16px_32px_#0f0f0f,-16px_-16px_32px_#373737] dark:text-white "
            >
              <h1 className="font-bold text-3xl uppercase">
                {sheet.data.name}
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-[5rem]">
            <h2 className="dark:text-white font-bold text-3xl">
              R${sumAllItems().toFixed(2)}
            </h2>
          </div>
          <div
            className={isOpen || isOpen2 || isOpen4 ? "hidden" : ""}
            hidden={isHidden}
          >
            <ExpenseChart />
          </div>
          <ControllBar
            handleToggle={handleToggle}
            handleToggleManageProps={handleToggleManageProps}
            setIsOpen4={setIsOpen4}
            toogleChart={toggleVisibility}
          />
         {
          /* 
           <ItemsFeed
            setEditMode={setEditMode}
            itemsRenderOptions={itemsRenderOptions}
          />
          */
         }
         <TimeLineFeed />
        </IfSheetIsLoaded>
      </Layout>
    </div>
  );
}

export default EditSheet;
