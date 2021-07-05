import cookie from 'js-cookie'

//set in cookie

export const setCookie =(key,value)=>{
    if (window !== "undefined"){
        cookie.set(key,value,{
           // 1 Day
            expires:1
        })
    }
}
//remove from cookie
export const removeCookie =key=>{
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires:1
        })
    }
}

// get from cookie like token
export const getCookie =key=>{
    if (window !== 'undefined'){
        return cookie.get(key)
    }
}
//set in localstorage
export const setLocalStorage =(key , value)=>{
    if (window !== 'undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
//remove from localstorage
export const removeLocalStorage =key=>{
    if (window !== 'undefined'){
        localStorage.removeItem(key)
    }
}
//auth user after login
export const authenticate =(res,next)=>{
    setCookie('token',res.data.accessToken)
    setLocalStorage('user',res.data.accessToken)
    next()

}
//sign out
export const signout=next=>{
    removeCookie('token')
    removeLocalStorage('user')
}
//get user info from localstorage
export const isAuth =()=>{
    if (window !== 'undefined'){
        const cookieChecked = getCookie('token')
        if (cookieChecked){
            if (localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}