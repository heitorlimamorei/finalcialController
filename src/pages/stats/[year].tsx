import React from 'react';
import Layout from '../../components/template/Layout';
import { useState, useEffect } from 'react';
import variaveis from '../../model/variaveis';
import axios from 'axios';
import StatsCard from '../../components/template/StatsCard';
import { StarIcon } from '../../components/icons/Icones';
import { ISurveyStatsResp } from '../../types/feedBackTypes';
import { useRouter } from 'next/router';
const { BASE_URL } = variaveis;

export default function Stats() {
  const [data, setData] = useState<ISurveyStatsResp>(null);
  const router = useRouter();

  const year = router.query.year as string;
  
  const fetchData = async (year: string) => {
    const response = await axios.get(`${BASE_URL}/api/feedback/statistics?year=${year}`);
    setData(response.data);
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  console.log(data);

  const getContinuedUsing = () => {
    const continued = parseFloat(data.Percents.continued_usingPercent.toFixed(2));
    return [
      { name: 'Continuou', value: continued },
      { name: 'Não continuou', value: 100 - continued },
    ];
  }

  const getPlanBefore = () => {
    const planned = parseFloat(data.Percents.did_pan_beforePercent.toFixed(2));
    return [
      { name: 'Tinha planejamento', value: planned },
      { name: 'Não tinha planejamento', value: 100 - planned },
    ];
  }

  const getShared = () => {
    const shared = parseFloat(data.Percents.appHasBeenSharedPercent.toFixed(2));
    return  [
      { name: 'Compartilhou', value: shared },
      { name: 'Não compartilhou', value: 100 - shared },
    ];
  }
  if(!data) return null;
  
  const getRating = () => data.Means.starsMean;

  return (
    <Layout titulo="default" subtitulo="default">
      <div className="flex flex-col  md:flex-row">
        <div
          className="my-2 mx-4 shrink-0 transition-all duration-500 ease-linear bg-gradient-to-br from-[#FFFFFF] to-[#B8BCC2] dark:from-[#2A2A2A] dark:to-[#1C1C1C] p-3 flex-1 m-1 rounded-lg flex flex-col text-center lg:mb-5 w-full md:w-fit dark:text-white
    shadow-[4.5px_4.5px_40px_#A5A8AD,_-4.5px_-4.5px_40px_#FFFFFF]
    dark:shadow-[8px_8px_3px_#1C1C1C,_-3px_-3px_16px_#2A2A2A]"
        >
             <p className="font-bold justify-self-start">Média de estrelas:</p>
             <div className="flex flex-row text-5xl h-full w-full justify-self-center"><div className='flex w-full justify-center items-center'>{StarIcon(10)} {getRating()} </div></div>
        </div>
        <StatsCard data={getContinuedUsing()} StatLabel="Continuaram usando o app:"></StatsCard>
        <StatsCard data={getPlanBefore()} StatLabel="Tinham planejamento antes:"></StatsCard>
        <StatsCard data={getShared()} StatLabel="Compartilharam o app com alguém:"></StatsCard>
      </div>
    </Layout>
  );
}
