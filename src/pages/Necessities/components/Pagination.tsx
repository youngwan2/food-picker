import styles from "./Pagination.module.css";
import { useState, useEffect, useCallback } from "react";

interface PaginationType {
  setPage: (updatePage: number) => void;
}

function Pagination({ setPage }: PaginationType) {
  const [items, setItems] = useState<any>();
  const [totalPage] = useState(100);
  const [updatePage, setUpdatePage] = useState(1);

  const render = useCallback(
    (updatePage: number) => {
      const pageSize = 10;
      const currentPage = updatePage;
      const pageGroup = Math.ceil(currentPage / pageSize);

      const lastPage = pageGroup * pageSize;
      const firstPage = lastPage - pageSize + 1;
      // console.log(
      //   "현재 그룹:",
      //   pageGroup,
      //   "현재페이지:",
      //   currentPage,
      //   "첫 페이지:",
      //   firstPage,
      //   "마지막페이지:",
      //   lastPage
      // );

      const renderItem = [];

      renderItem.push(
        <button
        key={-1}
          onClick={() => {
            console.log(updatePage);
            if (currentPage <= 1) return;
            setUpdatePage((updatePage) => (updatePage -= 1));
            setPage(updatePage);
            window.scrollTo({top:0, behavior:'smooth'})
          }}
          className={styles.prev_btn}
        >
            {'<'}
        </button>
      );
      for (let i = firstPage; i <= lastPage; i++) {
        renderItem.push(
          <li
          key={i}
            style={
              i === currentPage
                ? { backgroundColor: "rgb(24, 58, 170)" }
                : { backgroundColor: "" }
            }
            onClick={() => {
              setUpdatePage(i);
              setPage(i);
              window.scrollTo({top:0, behavior:'smooth'})
            }}
            className={styles.page_item}
          >
            {i}
          </li>
        );
      }

      renderItem.push(
        <button
        key={-2}
          onClick={() => {
            console.log(updatePage);
            if (currentPage === totalPage) return;
            setUpdatePage((updatePage) => (updatePage += 1));
            setPage(updatePage);
            window.scrollTo({top:0, behavior:'smooth'})
          }}
          className={styles.next_btn}
        >
          {'>'}
        </button>
      );

      setItems(renderItem);
    },
    [totalPage, setPage]
  );

  useEffect(() => {
    render(updatePage);
  }, [updatePage, render]);

  return (
    <article>
      <ul className={styles.page_container}>{items}</ul>
    </article>
  );
}

export default Pagination;
