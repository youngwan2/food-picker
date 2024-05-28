import styles from '../Recipe.module.scss';

import { useEffect, useState, useRef } from 'react';
import useIntersection from '@/hooks/useIntersection';

import RecipeMessage from './RecipeMessage';
import RecipeCard from './RecipeCard';
import ObserverSpinner from '@/components/Common/Spinner/ObserverSpinner';

import type { RecipeType } from '@/types/Recipe.types';

import { toast } from 'react-toastify';


interface ResultType {
  recipes: RecipeType[];
  totalCount: number
  category: string
  searchValue: string
}
// const SPLIT_ITEM_COUNT = 10
export default function RecipeList({ recipes = [], totalCount, searchValue, category }: ResultType) {
  const [visibleRecipes, setVisibleRecipes] = useState<RecipeType[]>([]);

  const observerRef = useRef<HTMLSpanElement>(null)

  const { isEnd } = useIntersection(observerRef)

  const hasMoreRecipe = (totalCount>0 && totalCount === visibleRecipes.length)

  // 스크롤 처리 함수
  const handleScroll = (currentLength: number) => {
    if (isEnd && hasMoreRecipe) return toast.info('모든 데이터를 조회하였습니다.')

    if (isEnd && (totalCount > visibleRecipes.length)) {

      // 다음으로 보여줄 레시피가 있는가? 
      // console.log("정상처리 관찰용:",currentLength, currentLength+10)
      const nextRecipes = recipes?.slice(currentLength, currentLength + 10);
      const hasNextRecipe = nextRecipes && nextRecipes.length > 0

      // 있다면 기존 레시피에서 추가된 10개의 레시피를 추가하고, 총 갯수 캐시 갱신
      if (hasNextRecipe) {
        setVisibleRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes]);

      }
    }
  };



  useEffect(() => {
    const currentLength = Number(sessionStorage.getItem('currentRecipes'));
    handleScroll(currentLength)

  }, [isEnd]);

  // 사용자가 추가 검색을 시도하면 이전 내역을 모두 초기화
  useEffect(() => {
    setVisibleRecipes([])
    sessionStorage.setItem('currentRecipes', `0`)

  }, [searchValue, category])

// 스크롤의 끝지점에 도달하는 순간 현재 조회된 레시피 개수를 기억(memo: 이 값은 다음 레시피 목록을 불러오는 기준으로 처리)
  useEffect(() => {
    sessionStorage.setItem('currentRecipes', `${visibleRecipes.length}`);
  }, [visibleRecipes.length, isEnd])

  return (
    <>
      <div className={styles.recipe_list_container}>
        <h2 className={styles.recipe_list_title}>레시피 목록</h2>

        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.RCP_SEQ} recipe={recipe} />
        ))}
      </div>
      <RecipeMessage recipes={recipes} visibleRecipes={visibleRecipes} />
      <ObserverSpinner ref={observerRef}>  </ObserverSpinner>
    </>
  );
}

