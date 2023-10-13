###### 백엔드 저장소 주소: https://github.com/youngwan2/busan-item-map-server



## 프로젝트명
- 식품 정보공유 웹 사이트: <mark><b>B.I.M</b></mark>
<p style="text-aligin:center">
  <img src="https://github.com/youngwan2/busan_item_map/assets/107159871/256f8cdf-6e65-412b-8a45-4f43d2313e91" alt="홈페이지 프리뷰"/>
  </p>


## 배포 URL(도메인)
- <a href="http://foodpick.site/" target="_blank">http://foodpick.site/</a>
- <a href="https://port-0-busan-item-map-server-12fhqa2blnl2zdg4.sel5.cloudtype.app/" target="_blank">https://port-0-busan-item-map-server-12fhqa2blnl2zdg4.sel5.cloudtype.app/</a>

## 프로젝트 목적
- (목적) 다양한 식품 정보를 적재적소에 검색하여 활용할 수 있는 사이트가 있으면 좋겠다는 개인적인 바람에 의해 개발하였습니다. 

## 주요 기능
- 부산 생활필수품에 대한 가격, 판매장소(지도), 주소를 확인할 수 있도록 테이블 형식으로 정보를 제공합니다.
- 테이블 내 목록을 클릭하면 해당 상품을 판매하고 있는 위도/경도 정보를 바탕으로 카카오 맵을 토대로 위치 정보를 보여줍니다.
- 지도 내 마커 위에 마우스 호버하면 해당 위치 내 판매점 이름이 표시됩니다.
- HACCP 인증을 받은 식품에 대한 정보를 제공하며, 각 상품목록을 클릭 시 상호명, 주소, 원재료 등에 대한 정보를 제공합니다.
- 학교 급식, 외식, 가정식 등의 다양한 음식의 영양성분 정보를 제공하며, 더보기 버튼을 활용하여 대량의 데이터를 필요에 따라 추가 조회할 수 있으며, 3대 영양소에 대한 시각화 정보를 제공합니다.
- AI Chat 을 활용하여 유동적으로 사용자가 원하는 질문에 대한 답변을 제공합니다.
- 네이버 지식백과 API와 연동하여 사이트 이용 중 모르는 용어에 대한 정보조회를 지원합니다.

## 사용된 라이브러리 및 프레임워크(기타 도구포함)
### 프론트엔드
- #### React.js
- #### Typescript.js
- #### KaKao Map API
- #### Chart.js
- #### Redux-Toolkit

### 데이터베이스
- #### IndexedDB

## 향후 계획
- 식품 이미지를 사용자가 올리면, 해당 이미지를 분석하여 영양정보를 제공하는 AI 기능을 tensorflow.js 를 활용하여 도입해볼 예정입니다.
- 카테고리별로 사용자가 원하는 음식에 대한 레시피 정보를 얻어갈 수 있도록 기능을 추가해볼 예정입니다.
- 그 외에도 있으면 좋은 기능이 발견되면 지속적으로 개선해 나갈 예정입니다.
