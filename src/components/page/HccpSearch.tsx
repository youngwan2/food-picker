import Header from "../UI/Header";
import styles from "./HccpSearch.module.css";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Modal from "../UI/HccpModal/modal";
import HccpResult from "../module/HccpResult";
import ReactSpinner from "../UI/loading/ReactSpinner";
import Movement from "../UI/movement/Movement";
import NavSearch from "../UI/NavSearch";
import GPT from "../../util/kakao/gpt";

export type ItemsType = {
  item: {
    allergy: string; // 알레르기
    barcode: string; // 바코드
    imgurl1: string;
    manufacture: string; // 제조사
    prdkind: string; // 상품 유형
    prdkindstate: string; // 상품 상태
    prdlstNm: string; // 상품 이름
    prdlstReportNo: string; // 상품 보고 번호(일련번호)
    rawmtrl: string; // 영양정보
  };
};

function HccpSearch() {
  const [productName, setProductName] = useState(""); // 상품 이름
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemsType[]>([]); // 상품목록
  const [filterItems, setFilterItems] = useState<ItemsType[]>([]); // 사용자가 선택한 아이템
  const [modal, setModal] = useState(false);
  const [productId, setProductId] = useState("");

  const input = useRef<any>(null);

  const getAxios = async (productName: string) => {
    try {
      setLoading(true);
      const url = `https://apis.data.go.kr/B553748/CertImgListServiceV2/getCertImgListServiceV2?ServiceKey=${process.env.REACT_APP_BUSAN_KEY}&returnType=json&prdlstNm=${productName}&numOfRows=30`;
      const response = await axios.get(url);
      const data = response.data;
      const items = data.body.items;
      setItems(items);
      setLoading(false);

      input.current.value = " ";
    } catch (err) {
      console.log("아이템 로드 중 에러:", err);
    }
  };

  // 사용자가 선택한 상품의 일련번호와 일치하는 상품만 필터링한다.
  const filter = useCallback(
    (productId: string) => {
      const result = items.filter((item) => {
        return item.item.prdlstReportNo === productId;
      });

      setFilterItems(result);
    },
    [items]
  );

  useEffect(() => {
    if (productId) filter(productId);
  }, [productId, filter]);

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <div className={styles.Haccp}>
        <Header isStyle={true} />
        <h2 style={{ textAlign: "center", margin: "6rem 0" }} className={styles.haccp_page_title}>
          HACCP제품 정보조회
        </h2>
        <div className={styles.haccp_inner_container}>
          {/* 검색창 */}
          <div className={styles.search_container}>
            <input
              ref={input}
              className={styles.search_input}
              type="text"
              id={styles.search}
              placeholder="상품명을 입력해주세요!"
              onKeyUp={(e) => {
                setProductName(e.currentTarget.value);
                if (e.code === "Enter") {
                  getAxios(e.currentTarget.value);
                }
              }}
            />
            {/* 조회 버튼 */}
            <button
              className={styles.search_btn}
              onClick={() => {
                getAxios(productName);
              }}
            >
              조회
            </button>
            <div
              className={styles.spinner}
              style={loading ? { display: "block" } : { display: "none" }}
            >
              {" "}
              <ReactSpinner />
            </div>
          </div>
          {/* 잠깐 알고가기 */}
          <p className={styles.message}>
            {" "}
            <span>잠깐 알고가기</span> <br />
            해썹(HACCP) 제도는 식품, 축산물, 사료 등을 만드는 과정에서 생물학적,
            화학적, 물리적 위해요인들이 발생할 수 있는 상황을 과학적으로
            분석하고 사전에 위해요인의 발생여건들을 차단하여 소비자에게 안전하고
            깨끗한 제품을 공급하기 위한 시스템적인 규정을 말합니다.
          </p>{" "}
          <br />
        </div>
        {/* 검색 결과 보이는 곳 */}
        <HccpResult
          items={items}
          setModal={setModal}
          setProductId={setProductId}
          modal={modal}
        />
        <Modal
          filterItems={filterItems}
          setModal={setModal}
          modal={modal}
        ></Modal>
        <Movement />
      </div>

      <NavSearch />
      <GPT />
    </>
  );
}

export default HccpSearch;
