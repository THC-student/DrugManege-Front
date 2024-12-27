import { request } from "@/utils";


export function getAllSampleId(){
    return request({
        url:`/storeController/getAllSampleId`,
        method:'GET',
    })
}

export function getStoreList(pageNum,sampleId){
    return request({
        url:`/storeController/StorePage`,
        method:'GET',
        params: { pageNum: pageNum,sampleId:sampleId } 
    })
}


export function StorePageCount(sampleId){
    return request({
        url:`/storeController/StorePageCount`,
        method:'GET',
        params: { sampleId:sampleId } 
    })
}

export function GetStoreInfoById(storeId){
    return request({
        url:`/storeController/GetStoreInfoById`,
        method:'GET',
        params: { storeId:storeId } 
    })
}

export function deleteStoreById(storeId){
    return request({
        url:`/storeController/deleteStoreById`,
        method:'GET',
        params: { storeId:storeId } 
    })
}

export function changeStore(store){
    return request({
        url:'/storeController/changeStore',
        method:'POST',
        data:store
    })
}

