import feedbackRepository from '../repositories/feedback.repository';
import { INewFeedBackProps } from '../../types/feedBackTypes';
import axios from 'axios';

async function createFeedBack(newFeedBack: INewFeedBackProps) {
  const {
    email,
    user_name,
  } = newFeedBack;

  if (email != undefined) {
    const feedbackId = await feedbackRepository.createFeedBack(newFeedBack);

    if (!feedbackId) {
      throw new Error(`Feedback cannot be created`);
    }

    const userResp = await axios.post('https://gpt-solver-backend.onrender.com/v1/user/cmdsuser', {
      email: email,
      name: user_name,
    });

    if (userResp.status != 201) {
      throw new Error(`Feedback could not be created: reason: user cannot be created`);
    }
  } else {
    throw new Error(`Feedback could not be created`);
  }
}

async function getFeedBacks(year: string) {
  return await feedbackRepository.getFeedBacks(year);
}

export default {
  createFeedBack,
  getFeedBacks,
};
