import React from 'react';
import axios from 'axios';
import Layout from '../../../components/template/Layout';
import SurveyForm from '../../../components/template/SurveyForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import WatingActionModal from '../../../components/template/WatingActionModal';

import variaveis from '../../../model/variaveis';
import { INewFeedBackProps } from '../../../types/feedBackTypes';
import useAppData from '../../../data/hook/useAppData';

interface IuserProps {
  user_name: string;
  email: string;
  user_url: string;
}

export default function Feedback() {
  const [user, setUser] = useState<IuserProps>(null);
  const router = useRouter();
  const { data } = useSession();
  const { BASE_URL } = variaveis;
  const { toggleIsLoading } = useAppData()

  useEffect(() => {
    const userData = data?.user;
    if (!userData?.email && !userData?.name && !userData?.image) return;

    setUser({
      email: userData.email,
      user_name: userData.name,
      user_url: userData.image,
    });
  }, [data]);

  const handleSubmit = async (payload: INewFeedBackProps) => {
    try {
      toggleIsLoading()

      const { data } = await axios.post(`${BASE_URL}/api/feedback`, {
      stars: payload.stars,
      text: payload.text,
      user_url: user.user_url,
      user_name: user.user_name,
      email: user.email,
      financial_management_improved: payload.financial_management_improved,
      did_pan_before: payload.did_pan_before,
      featuresImprovement: payload.featuresImprovement,
      appHasBeenShared: payload.appHasBeenShared,
      continued_using: payload.continued_using,
    });}catch(err) {
      toggleIsLoading()
    }
  };
  const handleClose = () => {
    router.push('/surveys/feedback/reviews');
  };

  return (
    <div className="h-screen">
      <Layout titulo="" subtitulo="">
        <WatingActionModal text={"Enviando review"} />
        <SurveyForm
          title="Queremos saber sua opinião!"
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </Layout>
    </div>
  );
}
