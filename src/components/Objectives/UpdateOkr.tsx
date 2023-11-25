import Input from '../input';
import Button from '../Button';
import Select from '../template/Select';
import useAuth from '../../data/hook/useAuth';
import { useEffect, useState } from 'react';
import useSheets from '../../data/hook/useSheets';
import DatepickerType from 'react-tailwindcss-datepicker/dist/index';
import Datepicker from 'react-tailwindcss-datepicker';
import { IOkrFrontProps } from '../../types/sheetTypes';

const DatepickerTs: typeof DatepickerType = Datepicker;

interface ISendFormProps {
  start_cycle: Date;
  end_cycle: Date;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

interface ICreateOkrProps {
  sheetId: string;
  sendForm: (props: ISendFormProps) => Promise<void>;
  handleCancel: () => void;
  cItemProps: IOkrFrontProps;
}

interface ITimesStamps {
  startDate: Date;
  endDate: Date;
}

export default function UpdateOkr(props: ICreateOkrProps) {
  const { data } = useAuth();
  const { user } = data;
  const [meta, setMeta] = useState<number>(props.cItemProps.value);
  const [spendType, setSpendType] = useState<string>(props.cItemProps.spentType);
  const [timesStamps, setTimesStamps] = useState<ITimesStamps>({
    startDate: props.cItemProps.start_cycle,
    endDate: props.cItemProps.end_cycle,
  });

  async function handleSubmit(ev) {
    ev.preventDefault();
    await props.sendForm({
      value: meta,
      spentType: spendType,
      author: user.email,
      isPercentual: true,
      start_cycle: new Date(timesStamps.startDate),
      end_cycle: new Date(timesStamps.endDate),
    });
  }

  const { loadSheet, sheet } = useSheets();

  async function LoadIfIsNotLogged() {
    const isAuthenticated = sheet.session.authenticated;
    if (!isAuthenticated) {
      await loadSheet(props.sheetId);
    }
  }

  useEffect(() => {
    if (!!sheet.currentUser) {
      LoadIfIsNotLogged();
    }
    console.log(sheet.currentUser);
  }, [props.sheetId, sheet]);

  if (sheet.data.tiposDeGastos.length <= 0) return;

  return (
    <form onSubmit={handleSubmit} className={`w-full h-full`}>
      <h1 className="font-bold text-2xl mb-4">Crie seu link de convite!</h1>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Meta (% ou número)
        </label>
        <Input
          ClassName=""
          type="number"
          id="meta"
          name="meta"
          placeholder="meta"
          value={meta}
          onChange={(ev) => setMeta(parseFloat(ev.target.value))}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="type">
          Tipo de gasto
        </label>
        <Select
          options={sheet.data.tiposDeGastos}
          id="spentTypesTargetMeta"
          selected={spendType}
          handleselected={(ev) => setSpendType(ev.target.value)}
          name="spentTypesTargetMeta"
          ClassName="p-3"
        />
      </div>
      <DatepickerTs
        value={timesStamps}
        onChange={(nv: any) => setTimesStamps(nv)}
        i18n="pt-br"
        primaryColor={'blue'}
      />
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          type="submit"
          text={'Salvar'}
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={props.handleCancel}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </form>
  );
}
