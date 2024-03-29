import { useQuery } from '@tanstack/react-query';
import { ApiType, getDefaultFetcher } from '../api/get.api';
import { toast } from 'react-toastify';

/**
 * @param key 예) useQuery의 식별키 ['localfood', 5]
 * @param url 예) fetch 요청 주소 '/localfood?page=1'
 * @returns
 */
export default function useDefaultQuery(key: any[], url: string) {
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: key,
    queryFn: () => getDefaultFetcher(url,ApiType.INTERNAL),
  });
  if(isError) toast.error('데이터 조회에 실패하였습니다.')
  return { data, isPending, isError, error, isFetching };
}
