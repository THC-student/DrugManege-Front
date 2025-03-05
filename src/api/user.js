//用户相关请求
import { request } from "@/utils";
//1.登录请求
export function loginAPI(user){
   return request({
        url:'/useController/login',
        method:'POST',
        data: user
    })
}

//2.注册请求
export function registerdAPI(user){
    return  request({
        url:'/useController/registered',
        method:'POST',
        data: user
    })
}

export function getProfileAPI(token){
    return request({
         url:'/useController/getUserInfo/',
         method:'POST',
         headers: { 'Content-Type': 'application/json' }, // 设置Content-Type
         data: { token: token }
     })
}


export function changeUserInfo(user){
    return request({
        url:'/useController/changeUserInfo',
        method:'POST',
        data: user
    })
}
export function getUserList(pageNum){
    return request({
        url:'/useController/getUserList?',
        method:'GET',
        params:{pageNum:pageNum}
    })
}

export function getUserPageSum(){
    return request({
        url:`/useController/getUserPageCount`,
        method:'GET',
    })
}

export function changeUserJudgeById(userId){
    return request({
        url:'/useController/changeUserJudgeById?',
        method:'GET',
        params:{userId:userId}
    })

}

export function deleteUserByUserId(userId){
    return request({
        url:'/useController/deleteUserByUserId?',
        method:'GET',
        params:{userId:userId}
    })
}

export function getUserPageCountSum(){
    return request({
        url:'/useController/getUserPageSum',
        method:'GET',
    })
}

export function useGetSuggest(){
    return request({
        url:'/useController/useGetSuggest',
        method:'GET',
    })
}

export function useSetSuggest(suggestInfo){
    return request({
        url:'/useController/useSetSuggest',
        method:'POST',
        data:suggestInfo
    })
}

export function reloadSuggest(suggestBacks){
    return request({
        url:'/useController/reloadSuggest',
        method:'POST',
        data:suggestBacks
    })

}
export function deleteSuggestById(msgId){
    return request({
        url:'/useController/deleteSuggestById?',
        method:'GET',
        params:{msgId:msgId}
    })
}