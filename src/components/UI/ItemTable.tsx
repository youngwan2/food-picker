
import axios from "axios";
import styles from "./ItemTable.module.css";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import ReactSpinner from "./loading/ReactSpinner";
import KaMap from "./KaMap";
import Header from "./Header";

import { useState, useEffect, useCallback } from "react";

type ItemsType = {
  adres: string;
  bsshNm: string;
  examinDe: string;
  itemName: string;
  pumNm: string;
  la: string;
  lo: string;
  unit: string;
  unitprice: number;
};

type laLoType = {
  la: string;
  lo: string;
};

function ItemTable() {
  const [items, setItems] = useState<ItemsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [laLo, setLaLo] = useState<laLoType>();
  const [gugun, setGugun] = useState("금정구");
  const [isDisplay, setIsDisplay] = useState(true);
  const [bsshNm, setBsshNm] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getItem = useCallback(async (currentPage: number, gugun: string) => {
    // console.log("지역:", gugun);
    await axios
      .get(
        `https://apis.data.go.kr/6260000/BusanLifeInfoService/getLifeInfo?serviceKey=${process.env.REACT_APP_BUSAN_KEY}&gugunNm=${gugun}&numOfRows=20&pageNo=${currentPage}&resultType=json`
      )
      .then((result) => {
        // console.log("검색결과:", result);
        const itemList = result.data.getLifeInfo.body.items;
        setItems(itemList.item);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getItem(currentPage, gugun);
  }, [getItem, currentPage, gugun]);

  return (
    <>
      <Header isStyle={true}></Header>
      <table className={styles.item_table}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>판매점</th>
            <th>주소</th>
            <th>등록일</th>
            <th>카테고리</th>
            <th>단위</th>
            <th>단위 당 가격</th>
          </tr>
        </thead>
        <tbody>
          <td
            style={isLoading ? { display: "block" } : { display: "none" }}
            className={styles.loading}
          >
            <ReactSpinner/>
          </td>
          {Array.isArray(items)
            ? items.map((item, i) => {
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      setLaLo({ la: item.la, lo: item.lo });
                      setIsDisplay((result) => (result = !result));
                      setBsshNm((result) => (result = item.bsshNm));
                    }}
                  >
                    <td>{item.itemName}</td>
                    <td>{item.bsshNm}</td>
                    <td>{item.adres}</td>
                    <td>{item.examinDe}</td>
                    <td>{item.pumNm}</td>
                    <td>{item.unit}</td>
                    <td>{item.unitprice.toLocaleString()}(원)</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <br /> <br /> <br /> <br /> <br /> <br />
      <Pagination setPage={setCurrentPage}></Pagination>
      <KaMap
        la={laLo?.la}
        lo={laLo?.lo}
        bss={bsshNm}
        isDisplay={isDisplay}
        setIsDisplay={setIsDisplay}
      ></KaMap>
    </>
  );
}

export default ItemTable;