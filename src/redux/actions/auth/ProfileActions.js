import {AXIOS_REQUEST,setSession} from './index'
import {toast} from "react-toastify"
import {history} from '../../../history'


export const Againregister = (user) =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST("users/againusersave",{user : user},dispatch);
    if(rdata.status){
      setSession(rdata.token);
      window.location.assign(history.location.pathname)
    }else{
      toast.error(rdata.data)
    }
   
  }
}

export const changepassword =(user) =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST("users/adminchangepassword",{user},dispatch);
    if(rdata.status){
      toast.success("successfully changed");
    }else{
      toast.error(rdata.error)

    }
  }
}

export const get_userinfor =(user) =>{
  
  return async(dispatch) =>{
    var response = await AXIOS_REQUEST("users/get_userinfor",{},dispatch);
    if(response.status){
      return dispatch({
        type : "PROFILE_USER",
        data : response.data
      })
    }else{
      // alert(response.data.data)
    }
  }
}


export const profilesave = (user) =>{
  return async dispatch =>{
    var response = await AXIOS_REQUEST("profile/profilesave",user,dispatch);
    if(response.status){
      toast.success("success")
      return dispatch({
        type : "PROFILE_USER",
        data : response.data
      })
    }else{
      // alert(response.data.data)
    }
  }
}