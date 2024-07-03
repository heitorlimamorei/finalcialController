import { collection, addDoc, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { IFeedBackItemProps, INewFeedBackProps } from '../../types/feedBackTypes';

async function createFeedBack(newFeedBack: INewFeedBackProps) {
  const feedbackColletionRef = collection(db, 'feedback2024');
  const feedback = await addDoc(feedbackColletionRef, { ...newFeedBack });

  return feedback.id;
}

async function updateFeedback(feedback: IFeedBackItemProps) {
  const feedbackRef = doc(db, `feedback2024/${feedback.id}`);
  const docRef = await setDoc(
    feedbackRef,
    {
      email: feedback.email,
      user_name: feedback.user_name,
      user_url: feedback.user_url,
      stars: feedback.stars,
      text: feedback.text,
      featuresImprovement: feedback.featuresImprovement,
      appHasBeenShared: feedback.appHasBeenShared,
      continued_using: feedback.continued_using,
      financial_management_improved: feedback.financial_management_improved,
      did_pan_before: feedback.did_pan_before,
    },
    { merge: true },
  );
}

async function getFeedBacks(): Promise<IFeedBackItemProps[]> {
  const feedbackColletionRef = collection(db, 'feedback2024');
  const feedBacks = await getDocs(feedbackColletionRef);
  let normalizado = [];

  feedBacks.forEach((item) => {
    normalizado.push({ id: item.id, ...item.data() });
  });

  return normalizado;
}

async function getFeedbackByEmail(email: string): Promise<IFeedBackItemProps[]> {
  const feedbackColletionRef = collection(db, 'feedback2024');
  const q = query(feedbackColletionRef, where('email', '==', email));

  let itens: IFeedBackItemProps[] = [];
  const feedbacks = await getDocs(q);

  feedbacks.forEach((item) => {
    itens.push({ id: item.id, ...item.data() } as IFeedBackItemProps);
  });

  return itens;
}

export default {
  createFeedBack,
  getFeedBacks,
  updateFeedback,
  getFeedbackByEmail,
};
