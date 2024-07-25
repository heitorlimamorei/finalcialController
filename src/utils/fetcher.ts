import axios from 'axios';

const api = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (path: string) => axios.get(`${api}${path}`).then((response) => response.data);

export default fetcher;
