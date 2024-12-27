import Layout from "@/page/Layout";
import Login from "@/page/Login";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRouter";
import Home from "@/page/Home";
import Registerd from "@/page/Registerd";
import Goods from "@/page/goods";
import StoreHorse from "@/page/storehouse";
import AddGoods from "@/page/addGoods";
import ChangeGoods from "@/page/ChangeGoods";
import UserInfo from "@/page/UserInfo";
import UserManage from "@/page/UserManage";
import ChangeStores from "@/page/ChangeStores";
import Suggest from "@/page/Suggest";
const router=createBrowserRouter([
    {
        path:"/",
        element:<AuthRoute><Layout/></AuthRoute>,
        children:[
           {
            path:'home',
            element:<Home/>
           },
           {
            path:'goods',
            element:<Goods/>
           },
            {
            path:'storehouse',
            element:<StoreHorse/>
           },
            {
                path:'addGoods',
                element:<AddGoods/>
            },
            {
                path:'changeGoods/:drugId?',
                element:<ChangeGoods/>
            },
            {
                path:'userInfo',
                element:<UserInfo/>
            },
            {
                path:'userManage',
                element:<UserManage/>
            },
            {
                path:'ChangeStores/:storeId?',
                element:<ChangeStores/>
            },
           {
            path:'Suggest',
            element:<Suggest/>
           }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },{
        path:'/registerd',
        element:<Registerd/>
    }
])

export default router