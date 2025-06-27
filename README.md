※ 백엔드 주소: https://github.com/youngwan2/foodpicker-server

# 📓 식품 정보 공유 웹 사이트, 푸드피커
## 🎫 프로젝트 개요
- 우리 지역의 음식, 다양한 음식의 영양정보, 간단한 레시피 등 음식정보 공유 웹
  
 ![home](https://github.com/user-attachments/assets/b4a5b4df-996d-4f90-99e3-610b9e6f88c9)


<br><br>
## 📅 개발기간
- 2024년 5월 24일 ~ 2024년 6월 12일
- **비고**: 과거 개발된 프로젝트를 전면적으로 재개발한 프로젝트이며, 초기 개발시에는 무분별한 !important의 사용으로 CSS의 계층적인 우선순위가 관리가 불가능해질 정도로 복잡해 졌고, 무엇보다 폰트, 레이아웃 설계, 중복된 로직과 정리되지 못한 폴더구조 등 전반적으로 개선할 포인트가 많아서 3주 정도 기간을 정해서 기본 틀만 남겨두고, 전면 재개발하였습니다.
<br><br>
## 📒 문서
- <a href="https://youngwan2.notion.site/1f968acd779b8050bf02e67cc53b1bf4" target="_blank" rel="noopener noreferrer">트러블슈팅</a>
- <a href="https://github.com/youngwan2/food-picker/issues/27" target="_blank" rel="noopener noreferrer">배포 히스토리(프론트)</a>
- <a href="https://github.com/youngwan2/food-picker/issues/30" target="_blank" rel="noopener noreferrer">배포 히스토리(백엔드)</a>
- <a href="https://github.com/youngwan2/food-picker/issues/15" target="_blank" rel="noopener noreferrer">개발 히스토리</a>
<br><br>
## 🔥 배포
- 데모(비용 문제 배포중단): https://foodpick.co.kr/
<br><br>
## 📟 배포 시퀸스다이어그램
``` mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub
    participant GHA as GitHub Actions
    participant Vite
    participant S3
    participant CF as CloudFront
    participant User

    Dev->>GH: Push code
    GH->>GHA: Trigger workflow
    GHA->>Vite: Run build command
    Vite->>Vite: Build React app
    Vite-->>GHA: Return build artifacts
    GHA->>S3: Upload build artifacts
    S3-->>GHA: Confirm upload
    GHA->>CF: Create invalidation
    CF-->>GHA: Confirm invalidation request
    CF->>S3: Fetch updated content
    S3-->>CF: Serve updated content
    User->>CF: Request website
    CF->>User: Serve website content
```
<br><br>
## 🧰 기술스택
### 프론트엔드/백엔드

|      사용 스텍       | 비고  |
| :------------------ | :---------------------- |
|    Typeccript(^5.4.2)    | (언어) 정적 타입 검사를 통한 타입 안정성 확보 위함   |
|     ReactJS(^18.3.1)     | (SPA) 개인적으로 SPA 프레임워크(혹은 라이브러리) 중 VueJS 보다 더 유연하고, 기능 확장이 유연한 점이 편했기에 선택 |
| SASS(^1.77.2)  | (CSS 프레임워크) CSS 코드 재사용성 향상 및 상속 구조 단순화 |
|   Zustand(^4.5.4)    | (전역 상태관리) 단일 스토어 기반으로 리덕스 처럼 래퍼를 사용하지 않고도, 간편하게 상태관리가 가능하다는 이점과 React Context API 에 의존하지 않는 처리 방식을 통한 성능상 이점 등을 고려하여 선택.(비고: 기존에는 Atom 기반의 전역 상태 관리 도구인 Recoil 을 사용하였으나 더 이상 관리가 되지 않고, 향후  React19 버전에서는 동작하지 않을 가능성을 염두하여 대체함) |
|     @tanstack/react-query(^5.39.0)      | (서버 상태관리) 캐싱 및 에러 처리의 효율성을 높이고, 무한 스크롤 기능 적용 시 캐싱 기능의 이점을 최대한 활용하기 위해 선택. SWR 과 비교해서 라이브러리 자체가 무거운 편이긴 하지만 문서화가 잘 되어 있고, 상태관리를 위한 폭 넓은 도구(ex. 직관적인 인터페이스의 개발도구 등)를 적극 지원하고 있는 점 등을 고려해서 선택 |
|    express(^4.18.3)     | (백엔드) 보다 더 가볍고, 확장성이 높다고 알려진 fastify 선택을 고민했으나, 미들웨어 처리의 유연성이 독보적이고, 보다 문서화가 잘 되어 있어서 선택|

### 데이터베이스
|      사용 스택       | 비고  |
| :------------------ | :---------------------- |
|    SQLite(^5.11.0)    | 복잡한 관계없이 대량의 데이터를 조회하고 빠른 쿼리를 생각한다면 NoSQL이 최적이겠으나, 개인적으로 관계형 데이터베이스의 학습 목적 및 별도의 서버없이 데이터베이스 구축과 적용이 가능하다는 이점, 향후 타 RDBS 이전 시 용이성이 돋보여서 선택 |

<br><br>


## GIF 데모
### 향토이야기
#### 메인
![local](https://github.com/user-attachments/assets/04e79e37-19d3-4a69-940f-9160cbe76459)

#### 상세
![local-detail](https://github.com/user-attachments/assets/fb3ead2d-390b-4926-9cad-2cebf7213ac9)


### HACCP 페이지
![haccp](https://github.com/user-attachments/assets/97e27fcc-896e-44b5-a8fe-379016b35a10)


### 간단 레시피
![recipe](https://github.com/user-attachments/assets/274f95d0-8ae2-4119-b007-f1b1c0180712)

### 전통 음식
![tradition](https://github.com/user-attachments/assets/d3ce7321-4fe1-4dca-a903-f8da093356db)

### 식품영양정보
![nutribution](https://github.com/user-attachments/assets/8127356d-1a4a-4384-8cfc-42f8ba84ec2e)


<br><br>


## ⚙ 기능
- ### 로드맵
    -  react-kakao-maps-sdk 를 활용하여 연관 식당의 로드뷰를 확인할 수 있는 기능 입니다.  useState로 설정한 true/false 상태에 따라 일반지도와 로드뷰를 바꿔가며 볼 수 있도록 구현했고, 전체화면과 창화면 모드를 지원하여 모바일 환경과 데스크톱 환경에서도 일관된 사용자 경험을 제공할 수 있도록 구현되었습니다.
    ![image](https://github.com/user-attachments/assets/11e9d23e-21a5-4c79-ad81-5fc16c5d07fb)
    ![image](https://github.com/user-attachments/assets/a55ea97d-1f03-433d-ac13-472ad7c6366f)
    ![image](https://github.com/user-attachments/assets/f624d0a2-6885-4e27-a799-c4956b728733)

- ### 무한 스크롤
    -  tanstack/query-react 의 useInfiniteQuery 를 재사용할 수 있도록 useInfiniteScroll 라는 이름의 커스텀 훅으로 래핑하였습니다. 스크롤의 끝지점을 계산할 수 있도록 HTML5의 intersectionObserver 의 커스텀 훅 버전인 useIntersection 를 결합하여 구현 되었습니다.
    -  서버 측(Node.js Express)에서는 다음 페이지의 커서를 .next 객체에 담아서 응답함으로서 페이지 전환이 자연스럽게 이루어지도록 구현 되었습니다.
    ![image](https://github.com/user-attachments/assets/7000af96-54dd-4065-9561-05cc1cef0939)


- ### 페이지네이션
    -  tanstack/query-react 의 placeholderData 와 keepPreviousData 를 사용하여 새로운 데이터를 요청하는 동안에도 마지막으로 성공적으로 페치된 데이터를 사용토록 하고, Pagination 컴포넌트를 필요로 하는 각 페이지 마다 가져와서 재사용할 수 있도록 구현 하였습니다. 이로서 컴포넌트의 재사용성을 높일 수 있고, 동시에 페이지 전환 시 화면이 깜빡이는 문제를 방지 합니다.
- ### 필터
    - 사용자가 선택한 데이터셋을 기반으로 실시간 데이터 조회가 가능한 기능 입니다. 식품영양정보 페이지의 필터는 다중 필터를 지원하고, 실시간 필터의 이점을 유지하면서 과중한 네트워크 요청을 방지하기 위해 디바운싱을 적용하여 구현 하여습니다.
    ![image](https://github.com/user-attachments/assets/c44a6c93-3578-4425-8c31-530f6ad196c7)


- ### AI 음식 가이드
    -  OpenAI의 gpt3.5 버전을 사용하여 전통음식 이름을 전달받으면, 부여된 음식 가이드 역할에 따라 응답하는 기능 입니다. 클라이언트로 부터 받은 음식이름을 서버 측에서 openAI 에 요청을 보내게 되고, 이 때 json 객체 형태로 추천키워드와 설명을 응답 받은 후 클라이언트로에는 정제된 형태로 응답토록 로직 처리 하였습니다.
    ![image](https://github.com/user-attachments/assets/b0b02419-ec83-4d47-826c-f57fc9c5712e)

- ### 최근검색어 필터
    -  백과사전 조회 시 사용자가 최근 검색한 키워드를 중복제거 후 저장하고, 해당 키워드를 클릭하여 재검색할 수 있도록 구현 하였습니다.
     ![image](https://github.com/user-attachments/assets/772b525c-277f-4712-b33a-150bdd7671df)
     ![image](https://github.com/user-attachments/assets/741e88da-5923-49b6-97ec-39538fec532f)

- ### Breadcrumb 네비게이션
    - 사용자의 현재 위치를 알려주기 위해 깊이에 따라 현재 경로를 표시하는 기능. GuideMessage 컴포넌트로 모듈화되어 각 페이지 마다 재사용할 수 있도록 구현 하였습니다.
    
- ### 현재 항목 표시
    -  현재 사용자가 스크롤된 페이지의 수나 아이템의 갯수를 시각적으로 확인할 수 있는 기능 입니다.
    -  무한 스크롤 기반으로 목록을 조회할 때 사용자가 현재 어느 지점까지 왔는지 시각적으로 확인할 수 있다면 편할 것 같아서 추가하였습니다.
    ![image](https://github.com/user-attachments/assets/30fb7ec1-e29a-4479-a73b-0d5924692573)
<br><br>

## 🗂️ 프로젝트 구조
```
📦src
 ┣ 📂api ---------->  HTTP 요청
 ┣ 📂stores ------->  zustand 전역 상태관리
 ┣ 📂components --->  전역적으로 쓰이는 컴포넌트 모음
 ┣ 📂config  ------>  프로젝트 환경 구성
 ┣ 📂hooks -------->  커스텀 훅
 ┣ 📂pages -------->  페이지 및 관련 컴포넌트 모음
 ┃ ┣ 📂Haccp
 ┃ ┣ 📂Home
 ┃ ┣ 📂Local ------>  Local 관련 페이지 역할을 하는 컴포넌트가 2 개 이므로 이를 묶어서 관리
 ┃ ┃ ┣ 📂Common
 ┃ ┃ ┣ 📂LocalFood
 ┃ ┃ ┣ 📂LocalMarket
 ┃ ┣ 📂Nutrition
 ┃ ┣ 📂Recipe
 ┃ ┗ 📂TraditionalFood
 ┣ 📂router ------->  페이지 라우터 설정
 ┣ 📂types  ------->  타입 관리
 ┗ 📂utils  ------->  유틸 함수 관리
```
