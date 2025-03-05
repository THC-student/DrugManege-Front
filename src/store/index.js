//组合redux子模块+导出store实例
import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './modules/user'
import { skinReducer } from "./modules/skin"; // 使用命名导入
export default configureStore({
    reducer:{
        user:userReducer,
        skin:skinReducer
    }
})