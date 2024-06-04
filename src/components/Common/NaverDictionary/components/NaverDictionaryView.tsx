import styles from '../NaverDictionary.module.scss';

import { FormEvent, useState, type MouseEventHandler, useEffect } from 'react';
import { useRecoilState } from 'recoil'

import NaverDictionaryList from './NaverDictionaryList';
import NaverCloseIcon from './NaverCloseIcon';
import NaverSearchForm from './NaverSearchForm';
import LoadingSpinner from '@components/Common/Spinner/LoadingSpinner'
import Message from '@/components/Message';
import NaverDictionaryRecentSearchList from './NaverDictionaryRecentSearchList';

import { naverSearchAtom } from '@/atom/NaverSearchAtom';

import { toast } from 'react-toastify';
import { ApiType, getDefaultFetcher } from '@/api/get.api';
import type { DictionaryType } from '../NaverDictionary';
import { StorageType, setStoreage } from '@/utils/storage';


interface PropsType {
  isDisplay: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>
}

const NaverDictionaryView = ({ isDisplay, onToggle }: PropsType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [items, setItems] = useState<DictionaryType[]>();
  const [searchList, setSearchList] = useRecoilState<string[]>(naverSearchAtom)

  const hasItems = items && items.length > 0

  /** 사용자 검색 키워드 기록 */
  function setSearchValue(searchText: string) {
    setSearchList(old => [...old, searchText])
  }

  async function searchNaverDictionary(value: string) {
    if (value.length < 1) return toast.error('2자 이상 입력해주세요.')
    setSearchValue(value)
    setLoading(true);
    const url = '/naver-search?search=' + value
    const data = await getDefaultFetcher(url, ApiType.INTERNAL)
    const { status, meg, result } = data
    const { items } = result
    if (status === 200) { setItems(items) }
    else { toast.error(meg); setError(meg) }
    setLoading(false)
  }

  function onSearch(value: string) {
    searchNaverDictionary(value)
  }

  const searchAction = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()
    const input = formEvent.currentTarget.firstChild
    if (!(input instanceof HTMLInputElement)) return
    searchNaverDictionary(input.value || '')
  };

  // 캐싱
  useEffect(() => {
    setStoreage({ type: StorageType.SESSION, key: 'naver', value: searchList }) // 캐싱
  }, [searchList])



  return (
    <article
      aria-hidden={isDisplay ? 'true' : 'false'}
      className={`${styles.naver_dictionary_modal} ${isDisplay ? styles.active : ''}`}
    >
      <h3 className={styles.title}>네이버 백과사전</h3>
      <NaverSearchForm isDisplay={isDisplay} action={searchAction} />
      <NaverCloseIcon onToggle={onToggle} />
      <NaverDictionaryRecentSearchList searchList={searchList} onSearch={onSearch} />
      {
        loading
          ? <LoadingSpinner />
          : hasItems
            ? <NaverDictionaryList items={items} error={error} />
            : <Message styleClassName={styles.replace_message}>조회된 아이템이 없습니다.</Message>}
    </article>
  );
};

export default NaverDictionaryView;
