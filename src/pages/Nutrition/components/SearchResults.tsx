import { NutritionType } from '../types/nutrition.types';
import { Suspense, lazy } from 'react';
import styles from '../Nutrition.module.scss';
import { useState } from 'react';
import ReactSpinner from '../../../components/UI/ReactSpinner';
const NutritionDetailModal = lazy(() => import('../../NutritionDetail/NutritionDetailModal'));

interface PropsType {
  itemList: NutritionType[];
}
const SearchResults = ({ itemList }: PropsType) => {
  const [modalState, setModalState] = useState(false);
  const [itemId, setItemId] = useState(0);
  return (
    <>
      <section className={styles.search_result_section} id="nutrition_result_section">
        {itemList?.map((item) => {
          return (
            <ul
              key={item.id}
              className={styles.item_container}
              onClick={() => {
                setItemId(item.id);
                setModalState(true);
              }}
            >
              <li className={styles.item_box}>
                <h3> {item.PRODUCT_NAME}</h3>
              </li>
              <li className={styles.item_box}>
                <strong>식별번호</strong>
                {item.id}
              </li>
              <li className={styles.item_box}>
                <strong>음식기원</strong>
                {item.PRODUCT_ORIGIN_NAME}
              </li>
              <li className={styles.item_box}>
                <strong>(총)중량</strong>
                {item.FOOD_WEIGHT}
              </li>
              <li className={styles.item_box}>
                <strong>출처</strong>
                {item.DATA_ORIGIN}
              </li>
              <li className={styles.item_box}>
                <strong>갱신일자</strong>
                {item.BASE_DATE}
              </li>
              <li className={styles.item_box}>
                <strong>생성일자</strong>
                {item.CREATION_DATE}
              </li>
            </ul>
          );
        })}
      </section>
      <Suspense fallback={<ReactSpinner />}>
        <NutritionDetailModal
          id={itemId}
          itemList={itemList}
          setModalState={setModalState}
          modalState={modalState}
        />
      </Suspense>
    </>
  );
};

export default SearchResults;
