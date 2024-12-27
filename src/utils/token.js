//三个与token的方法 分别为存、去和删除
const TOKENKEY='token_key'
function setToken(token){
    localStorage.setItem(TOKENKEY,token)
}

function getToken(){
  return  localStorage.getItem(TOKENKEY)
}

function removeToken(){
    localStorage.removeItem(TOKENKEY)
}

export {
    setToken,
    getToken,
    removeToken
}
