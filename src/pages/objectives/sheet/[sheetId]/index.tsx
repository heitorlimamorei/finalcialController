import { useEffect, useState } from 'react';
import Layout from '../../../../components/template/Layout';
import { IOkrFrontProps, IOkrProps } from '../../../../types/sheetTypes';
import { useRouter } from 'next/router';
import axios from 'axios';
import variaveis from '../../../../model/variaveis';
import { toggleJsonToDate } from '../../../../utils/dateMethods';

const { BASE_URL } = variaveis;

const Objectives = () => {
  const router = useRouter();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [okrRespository, setOkrRespository] = useState<IOkrFrontProps[]>([]);

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
    const sheetId: any = router.query.sheetId;
    if (!!sheetId) loadOkrs(sheetId);
  }, [router.query]);

  console.log(okrRespository);

  return (
    <Layout titulo="Pagina inicial" subtitulo="Estamos construindo um admin template"></Layout>
  );
};

export default Objectives;
