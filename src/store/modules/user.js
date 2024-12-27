import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils";
import { setToken as _setToken,getToken } from "@/utils";
import { loginAPI,getProfileAPI, registerdAPI } from "@/api/user";
import { message } from "antd";
const userStore=createSlice({
    name:'user',
    initialState:{
        token:getToken()||'',
        userInfo:{}
    },
    //同步修改方法
    reducers:{
        setToken(state,action){
            state.token=action.payload
            //localstorage存一份
            _setToken(action.payload)
        },
        //同步修改用户方法
         setUserInfo(state,action){
            state.userInfo=action.payload
        },
        //清理用户数据方法
        clearUserInfo(state){
            state.token='',
            state.userInfo={}
            removeToken()
        }
    }
    
})

//解构出actionCreater函数
const {setToken,setUserInfo,clearUserInfo}=userStore.actions



//获取reducer函数
const userReducer=userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
      const res = await loginAPI(loginForm)
      if(res.code===0){
        message.error('登录失败')
      }else{
        dispatch(setToken(res.data.token))
        message.success('登录成功')

      }    
    }
}

const fetchRegisterd =(loginForm) => {
    return async (dispatch) => {
       const {userCount,userPassword}=loginForm
       const user={
        userCount,
        userPassword
       }
       const res=await registerdAPI(user)
       if(res.code===0){
        message.error('注册失败')
      }else{
        dispatch(setToken(res.data.token))
        message.success('注册失败')

      } 
         
    }
}



//获取个人信息异步方法
const fetchUserInfo = (token) => {
    return async (dispatch) => {
        const res = await getProfileAPI(token)
        dispatch(setUserInfo(res.data))
       
    }
}
  

export {fetchLogin,setToken,fetchUserInfo,clearUserInfo,fetchRegisterd}

export default  userReducer