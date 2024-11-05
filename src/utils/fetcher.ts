import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (path: string) =>
  axios
    .get(`${api}${path}`)
    .then((response) => response.data)
    .catch((err) => {
      const jsonError = JSON.stringify({
        message: err.response?.data?.message,
        statuscode: err.response?.status,
      });
      throw new Error(jsonError);
    });

export default fetcher;

export interface IReqError {
  message: string;
  statuscode: number;
}

export const parseError = (err: string): IReqError => {
  const error = JSON.parse(err);
  return error;
};
