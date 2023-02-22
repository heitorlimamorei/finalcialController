import { useEffect, useState } from "react";
import { trashIcon } from "../components/icons/Icones";
import Layout from "../components/template/Layout";
import ModalForm from "../components/template/ModalForm";
import useSheets from "../data/hook/useSheets";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sheetItemProps, sheetProps } from "../types/sheetTypes";
import { editIcon } from "../components/icons/Icones";

export default function Home() {
  const {
    sheet,
    loadSheet,
    deleteItem,
    createNewItem,
    getBalance,
    getSortedItems,
    updateItem,
  } = useSheets();
  const [sheetId, setSheetId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sheets, setSheets] = useState<sheetProps[]>([]);
  const [sheetIds, setSheetIds] = useState<string[]>([]);
  const session = useSession();
  let email = session.data?.user.email;
  let name = session.data?.user.name;
  const [currentEditingItem, setCurrentEditingItem] =
    useState<sheetItemProps>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: 0,
    description: "",
  });
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleCancel = () => {
    handleToggle();
    setFormData({
      name: "",
      type: "",
      value: 0,
      description: "",
    });
    setCurrentEditingItem(null);
  };
  function setEditMode(currentItem: sheetItemProps) {
    setCurrentEditingItem(currentItem);
    setFormData({
      name: currentItem.name,
      type: currentItem.type,
      value: currentItem.value,
      description: currentItem.description,
    });
    setIsOpen((current) => !current);
  }
  const handleSubmit = (event) => {
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
  };
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
            setSheetIds(sheets);
          });
      }
    }
  }, [email]);
  async function getSheets() {
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
  }
  async function loader() {
    const sheetsResp: any = await getSheets();
    if(sheetsResp.length > 0) {
      setSheets(sheetsResp);
    }
  }
  useEffect(() => {
    if (sheetIds !== undefined) {
      if (sheetIds.length > 0) {
        loader();
        
      }
    }
  }, [sheetIds]);
  console.log(sheets);
  return (
    <div className={`h-full w-full `}>
      <Layout
        titulo="Pagina inicial"
        subtitulo="Estamos construindo um admin template"
      >
        <ModalForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isOpen={isOpen}
          handleToggle={handleToggle}
          setFormData={setFormData}
          isEditMode={currentEditingItem != null}
          onCancel={handleCancel}
        />
        <label htmlFor="sheetid">Digite o código da planilhas</label>
        <div className="flex flex-1 w-full">
          <input
            id="sheetid"
            type="text"
            className="rounded-lg py-1 px-2 mt-1 w-4/6"
            value={sheetId}
            onChange={(ev) => setSheetId(ev.target.value)}
          />
          <div className="flex w-2/6">
            <button
              className="bg-green-700 px-4 py-1 mt-1 rounded-lg ml-2 text-white w-2/3 flex-1"
              onClick={async () => {
                await loadSheet(sheetId);
              }}
            >
              Procurar
            </button>
            {sheet.session.canEditItems ? (
              <button
                className="bg-blue-700 px-4 py-1 mt-1 rounded-lg ml-2 text-white w-1/3"
                onClick={handleToggle}
              >
                Criar Gasto
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <span>R${getBalance()}</span>
        <div>
          <ul className="flex flex-row mt-2">
            {sheets.length > 0 && (sheets.map(currentSheet => {
              return <li  className=" px-2 py-1 bg-gray-700 rounded-md mx-1 shadow-xl hover:bg-gray-600 cursor-pointer" key={currentSheet.data.id} onClick={async () => await loadSheet(currentSheet.data.id)}>
                <h2 className="font-bold text-white">{currentSheet.data.name}</h2>
                <p className="font-bold text-gray-400">#{currentSheet.data.id}</p>
              </li>
            }))}
          </ul>
          <ul className="flex  flex-wrap mt-4 w-full transition-all duration-500 ease-linear">
            {getSortedItems("date descending").map((item) => (
              <li
                className="transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] w-1/4 px-4 py-3 flex-1 m-2 rounded-lg justify-center flex flex-col  lg:mb-5 
                shadow-[4.5px_4.5px_40px_#A5A8AD,_-4.5px_-4.5px_40px_#FFFFFF]
                dark:shadow-[3px_3px_16px_#1C1C1C,_-3px_-3px_16px_#2A2A2A] "
                key={item.id}
              >
                <h1 className="text-3xl dark:text-white font-extrabold">{item.name}</h1>
                <p className="text-base text-gray-600 dark:text-gray-400 my-1/2"><strong>Descrição: </strong>{item.description}</p>
                <p>
                  <p className="dark:text-white font-light text-lg my-1"><strong>Valor:</strong> R${item.value}</p>
                </p>
                <p className="dark:text-white mb-2"><strong>Tipo:</strong> {item.type}</p>
                <div className="flex w-full">
                  <button
                    className={`transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 
                    shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
                    dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
                     dark:text-white hover:text-red-600 ${
                      !sheet.session.canEditItems ? "cursor-not-allowed" : ""
                    }`}
                    onClick={async (ev) => {
                      ev.stopPropagation();
                      await deleteItem(item.id);
                    }}
                    disabled={!sheet.session.canEditItems}
                  >
                    {trashIcon(8)}
                  </button>
                  <button 
                  className={`ml-5 transition-all duration-500 ease-linear flex justify-center bg-[#E0E6EC] dark:bg-[#232323] rounded-full p-3 
                  shadow-[5px_5px_10px_#A7ABB0,_-5px_-5px_10px_#FFFFFF]
                  dark:shadow-[5px_5px_10px_#1A1A1A,_-5px_-5px_10px_#2C2C2C]
                  hover:text-blue-900 dark:text-white  ${
                      !sheet.session.canEditItems ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() =>
                    sheet.session.canEditItems ? setEditMode(item) : false
                  }>
                    {editIcon(8)}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  );
}
