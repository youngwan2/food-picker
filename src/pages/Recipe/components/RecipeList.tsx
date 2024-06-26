import styles from '../Recipe.module.scss';

import { useEffect, useState, useRef } from 'react';
import useIntersection from '@/hooks/useIntersection';

import RecipeCard from './RecipeCard';
import LoadViewCountModal from '@/components/Modal/LoadViewCountModal';
import ObserverSpinner from '@/components/Spinner/ObserverSpinner';

import type { RecipeType } from '@/types/Recipe.types';

import { toast } from 'react-toastify';

interface ResultType {
  isLoading: boolean;
  recipes: RecipeType[];
  totalCount: number;
  category: string;
  searchValue: string;
}

export default function RecipeList({
  isLoading,
  recipes = [],
  totalCount,
  searchValue,
  category,
}: ResultType) {
  const [visibleRecipes, setVisibleRecipes] = useState<RecipeType[]>([]);
  const observerRef = useRef<HTMLSpanElement>(null);
  const { isEnd } = useIntersection(observerRef);
  const visibleRecipeCount = visibleRecipes.length;
  const hasMoreRecipe = totalCount > 0 && totalCount === visibleRecipeCount;

  // 스크롤 처리 함수
  const handleScroll = (currentLength: number) => {
    if (isEnd && hasMoreRecipe)
      return toast.info('모든 데이터를 조회하였습니다.');

    if (isEnd && totalCount > visibleRecipeCount) {
      // 다음으로 보여줄 레시피가 있는가?
      // console.log("정상처리 관찰용:",currentLength, currentLength+10)
      const nextRecipes = recipes?.slice(currentLength, currentLength + 10);
      const hasNextRecipe = nextRecipes && nextRecipes.length > 0;

      // 있다면 기존 레시피에서 추가된 10개의 레시피를 추가하고, 총 갯수 캐시 갱신
      if (hasNextRecipe) {
        setVisibleRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes]);
      }
    }
  };

  useEffect(() => {
    const currentLength = Number(sessionStorage.getItem('currentRecipes'));
    handleScroll(currentLength);
  }, [isEnd]);

  // 사용자가 추가 검색을 시도하면 이전 내역을 모두 초기화
  useEffect(() => {
    setVisibleRecipes([]);
    sessionStorage.setItem('currentRecipes', `0`);
  }, [searchValue, category]);

  // 스크롤의 끝지점에 도달하는 순간 현재 조회된 레시피 개수를 기억(memo: 이 값은 다음 레시피 목록을 불러오는 기준으로 처리)
  useEffect(() => {
    sessionStorage.setItem('currentRecipes', `${visibleRecipeCount}`);
  }, [visibleRecipeCount, isEnd]);

  return (
    <>
      <div className={styles.recipe_list_container}>
        <h2 className={styles.recipe_list_title}>레시피 목록</h2>
        {!isLoading && totalCount > 0 && visibleRecipes.length < 1 && (
          <p className={styles.replace_message}>
            조회하려면 아래로 스크롤 해주세요.
          </p>
        )}
        {!isLoading ? (
          totalCount > 0 ? (
            visibleRecipes.map((recipe) => {
              return <RecipeCard key={recipe.RCP_SEQ} recipe={recipe} />;
            })
          ) : (
            <p className={styles.replace_message}>
              현재 조회된 목록이 없습니다.
            </p>
          )
        ) : (
          <p className={styles.replace_message}>데이터를 조회중입니다.</p>
        )}
      </div>
      <LoadViewCountModal
        currentProductCount={visibleRecipeCount}
        totalProductCount={recipes.length}
      />
      <ObserverSpinner ref={observerRef}> </ObserverSpinner>
    </>
  );
}
