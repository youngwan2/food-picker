import { useEffect } from "react";
import styles from "./db.module.css";
import { useRef } from "react";

function DbSearch({ setItemName }: { setItemName: (name: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <div className={styles.search_container}>
      <input
        className={styles.search_input}
        ref={inputRef}
        type="text"
        placeholder="음식명을 입력해주세요!"
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            setItemName(e.currentTarget.value);
            setTimeout(() => {
              inputRef.current && (inputRef.current.value = '')
            }, 100);
          }
        }}
      />
      <button
        className={styles.search_btn}
        type="button"
        onClick={() => {
          if (inputRef.current) setItemName(inputRef.current.value);
          setTimeout(() => {
           if(inputRef.current)(inputRef.current.value = "");
          }, 100);
        }}
      >
        검색
      </button>
    </div>
  );
}

export default DbSearch;
