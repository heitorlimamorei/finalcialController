import React, { useState } from "react";
import Input from "../input";
import Button from "../Button";
import useSheets from "../../data/hook/useSheets";
import { trashIcon } from "../icons/Icones";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useAppData from "../../data/hook/useAppData";
interface ManageSheetProps {
  toggleIsOpen: () => void;
  addSheetIntoTheList: (sheet: any) => void;
}
function CreateSheet(props: ManageSheetProps) {
  const { toggleIsOpen } = props;
  const router = useRouter();
  const { toggleIsLoading } = useAppData();
  const [name, setName] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [tiposDeGastos, setTiposDeGastos] = useState([
    "Educação",
    "Alimentação",
    "Transporte",
    "Compras gerais",
    "Farmácia ",
    "Tributos ",
    "Serviços online",
  ]);
  const [newSpent, setNewSpent] = useState("");
  const { createNewSheet } = useSheets();
  const seesion = useSession();
  async function handleSubmit() {
    try {
      toggleIsLoading();

      const sheet = await createNewSheet({
        name: name,
        tiposDeGastos: tiposDeGastos,
        totalValue: totalValue,
        type: "pessoal",
        owner: seesion.data.user.email,
      });

      if (!!sheet.id) toggleIsLoading();

      router.push(`/sheet/${sheet.data.id}`);

      toggleIsOpen();
    } catch (err) {
      toggleIsLoading();
    }
  }
  function filterByIndex(index: number) {
    const arrayClone = [...tiposDeGastos].filter((spent, i) => i !== index);
    setTiposDeGastos(arrayClone);
  }
  function addSpentIntoTheList() {
    const arrayClone = [...tiposDeGastos];
    arrayClone.push(newSpent);
    setTiposDeGastos(arrayClone);
    setNewSpent("");
  }
  return (
    <div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Nome da planilha
        </label>
        <Input
          ClassName=""
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Valor total estimado
        </label>
        <Input
          ClassName=""
          type="number"
          id="value"
          name="value"
          value={totalValue}
          onChange={(ev) =>
            setTotalValue(ev.target.value >= 0 ? ev.target.value : 0)
          }
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="value">
          Modifique os tipos de gastos
        </label>
        <ul className="max-h-[15rem] overflow-y-scroll scroll-m-0">
          {tiposDeGastos.map((tipo, i) => {
            return (
              <li
                className="flex flex-row my-3 rounded-xl items-center transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] shadow-[4.5px_4.5px_10px_#f6f7fb,_-4.5px_-4.5px_10px_#FFFFFF]
              dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]"
                key={tipo}
              >
                <h1 className="mx-4 w-[80%]">{tipo}</h1>
                <div className="w-full flex flex-row items-end justify-end">
                  <Button
                    iconClassName="text-red-600"
                    ClassName="dark:bg-[#232323] bg-[#E0E5EC] 
                  dark:shadow-[3px_3px_12px_#0e0e0e,-3px_-3px_12px_#383838]
                  shadow-[3px_3px_12px_#727578,-3px_-3px_12px_#ffffff] rounded-xl p-1 justify-self-end mr-5 my-1"
                    onClick={() => filterByIndex(i)}
                    icon={trashIcon(6)}
                  ></Button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex mt-1">
          <Input
            ClassName=""
            type="string"
            id="newSpent"
            name="newSpent"
            value={newSpent}
            onChange={(ev) => setNewSpent(ev.target.value)}
          />
          <button
            className="px-2 ml-1 py-5 rounded-xl bg-green-600 text-white h-[2.4rem] flex items-center"
            onClick={addSpentIntoTheList}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={handleSubmit}
          text={"Criar"}
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={toggleIsOpen}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </div>
  );
}
export default React.memo(CreateSheet);
