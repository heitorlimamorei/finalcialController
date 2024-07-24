import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

export function useAccount() {
  async function getAccounts(userId: string) {
    console.log(userId);
    const response = await axios.get(`${api}/account?owid=${userId}`);
    return response.data;
  }

  return {
    getAccounts,
  };
}
