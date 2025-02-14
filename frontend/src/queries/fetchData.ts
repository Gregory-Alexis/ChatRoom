import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const POST_API_URL = 'http://localhost:5000/api/post';

type PostInput = {
  content: string;
};

const fetchData = async (): Promise<PostInput[]> => {
  const response = await axios.get(`${POST_API_URL}`);

  const data = await response.data;

  return data;
};

export const usePost = () => {
  return useQuery({
    queryKey: ['post'],
    queryFn: fetchData,
    staleTime: 10000,
    refetchOnWindowFocus: true,
  });
};
