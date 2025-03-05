import { request } from "@/utils";

export function getGoodsList(pageNum){
    return request({
        url:`/drugController/getDrugList`,
        method:'GET',
        params: { pageNum: pageNum } 
    })
}

export function getGoodsPageSum(){
    return request({
        url:`/drugController/getPageCount`,
        method:'GET',
    })
}

export function newPicture(file) {
    const formData = new FormData();
    console.log('file=',file);
    // 确保字段名与后端期望的字段名匹配
    formData.append('DrugPicture1', file); // 这里的 'DrugPicture1' 应该与后端期望的字段名一致
    return request({
      url: '/drugController/newPicture',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
}

export function newDrug(drug){
    return  request({
        url:'/drugController/insertNewDrug',
        method:'POST',
        data: drug
    })
}

export function deleteDrugById(drugId){
    return request({
        url:`/drugController/deleteDrugById?`,
        method:'GET',
        params: { drugId: drugId } 
    })
}

export function getDrugInfo(drugId){
    return request({
        url:'/drugController/getDrugInfoByDrugId?',
        method:'GET',
        params: { drugId: drugId } 
    })

}

export function changeDrugInfo(drug){
    return request({
        url:'/drugController/changeDrugInfo',
        method:'POST',
        data: drug
    })
}

export function  getDrugPageSum(){
    return request({
        url:'/drugController/getDrugPageSum',
        method:'GET',
    })
}

export function getTypeofDrug(){
    return request({
        url:'/drugController/getTypeofDrug',
        method:'GET',
    })
}

export function getNumberOfDrug(){
    return request({
        url:'/drugController/getNumberOfDrug',
        method:'GET',
    })
}



export function getDrugByName(drugName){
    return request({
        url:`/drugController/getDrugByName`,
        method:'GET',
        params: { drugName:drugName } 
    })
}
