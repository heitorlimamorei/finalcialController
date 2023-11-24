import { useEffect, useState } from 'react';
import Layout from '../../../../components/template/Layout';
import { IOkrFrontProps, IOkrProps } from '../../../../types/sheetTypes';
import { useRouter } from 'next/router';
import axios from 'axios';
import variaveis from '../../../../model/variaveis';
import { toggleDateToJson, toggleJsonToDate } from '../../../../utils/dateMethods';
import CreateOkr from '../../../../components/Objectives/CreateOkr';
import ModalForm from '../../../../components/template/ModalForm';

const { BASE_URL } = variaveis;

interface ISendFormProps {
  start_cycle: Date;
  end_cycle: Date;
  author: string;
  spentType: string;
  value: number;
  isPercentual: boolean;
}

const Objectives = () => {
  const router = useRouter();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [okrRespository, setOkrRespository] = useState<IOkrFrontProps[]>([]);
  const [sheetId, setSheetId] = useState<string>('');
  const [createOkrModalIsOpen, setCreateOkrModalIsOpen] = useState<boolean>(false);

  const refreshOkrRespository = (rawRepository: IOkrProps[]): void => {
    const normalizeOkrs = (resp: IOkrProps[]): IOkrFrontProps[] => {
      return resp.map((okr) => {
        return {
          ...okr,
          start_cycle: toggleJsonToDate(okr.start_cycle),
          end_cycle: toggleJsonToDate(okr.end_cycle),
          createdAt: toggleJsonToDate(okr.createdAt),
        };
      });
    };

    const normalizedRepository = normalizeOkrs(rawRepository);

    setOkrRespository(normalizedRepository);
  };

  const getOkrs = async (sheetId: string): Promise<IOkrProps[]> => {
    return (await axios.get(`${BASE_URL}/api/okr/bysheetId/${sheetId}`)).data;
  };

  const loadOkrs = async (sheetId: string) => {
    const rawOkrs = await getOkrs(sheetId);
    refreshOkrRespository(rawOkrs);
  };

  useEffect(() => {
    const sheetIdTemp: any = router.query.sheetId;
    if (!!sheetIdTemp) {
      setSheetId(sheetIdTemp);
      loadOkrs(sheetIdTemp);
    }
  }, [router.query]);

  console.log(okrRespository);

  const closeCreateModal = () => setCreateOkrModalIsOpen(false);

  const handleCreate = async (FormProps: ISendFormProps): Promise<void> => {
    console.log(FormProps);
    const { status } = await axios.post(
      '/api/okr',
      {
        sheetId,
        ...FormProps,
        start_cycle: toggleDateToJson(FormProps.start_cycle),
        end_cycle: toggleDateToJson(FormProps.end_cycle),
      },
      {
        baseURL: BASE_URL,
      },
    );
    if (status == 200) loadOkrs(sheetId);
    closeCreateModal();
  };

  return (
    <Layout titulo="Pagina inicial" subtitulo="Estamos construindo um admin template">
      <button onClick={() => setCreateOkrModalIsOpen(true)}>abrir</button>
      <ModalForm isOpen={createOkrModalIsOpen}>
        <CreateOkr sheetId={sheetId} sendForm={handleCreate} handleCancel={closeCreateModal} />
      </ModalForm>
    </Layout>
  );
};

export default Objectives;
