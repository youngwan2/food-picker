import { createBrowserRouter } from "react-router-dom";
import Detail from "../components/page/Detail";
import App from "../App";
import KaMap from "../components/UI/KaMap";
import ItemTable from "../components/UI/ItemTable";
import Select from "../components/page/Select";


const router = createBrowserRouter([
  {
    path:'/busan_item_map/',
    element:<App></App>,
    errorElement:<h2>컴포넌트를 불러오는 중에 문제가 발생하였습니다.</h2>,
  },
  {
    path: "/detail/:id",
    element: <Detail></Detail>,
    errorElement:<h1>에러가 발생했습니다.</h1>
  },
  {
    path:'/map',
    element:<KaMap></KaMap>
  },
  {
    path:'/busan_item_map/item',
    element:<ItemTable></ItemTable>
  },
  {
    path:'/busan_item_map/search',
    element:<Select></Select>
  },
  {
    path:'*',
    element:<h2>여기는 존재하지 않는 페이지 입니다.</h2>
  }
]);

export default router;
