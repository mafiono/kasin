import { Root} from "../../../authServices/rootconfig"
import {AXIOS_REQUEST,setSession,fake_session,alert} from "./index"
import io from 'socket.io-client'
import {toast} from "react-toastify"
import {history} from "../../../history"
import {FIRSTPAGESLIDER,FIRSTPAGEDATA,FIRSTPAGEGAMELIST,FIRSTPAGEGETSIDEBAR} from "../../types"

export const socket_connectwithout_login = () =>{
  return (dispatch)=>{
    Root.socket = io(Root.admindomain,);
    Root.socket.on("datetime",(date)=>{
      dispatch({ type : "SET_DATE" ,data : date });      
    });
  }
}

async function session_set(dispatch,userdata,token){
   
    Root.socket.emit("setsession", {token});
    Root.socket.on("destory",(dd)=>{ 
      fake_session();
      window.location.assign("/");
    });
    // Root.socket = io(Root.admindomain,{query:{ authtoken : decoded}});
    Root.socket.on("datetime",(date)=>{
      dispatch({ type : "SET_DATE" ,data : date });      
    });

    
    Root.socket.on("expiredestory",(data)=>{
      if(data.data.email === userdata.email){
        window.location.reload();
      }
    });
  
    Root.socket.on("balance",(barray)=>{
      if(barray.data){
        dispatch({  type : "GETBALANCE",  data : barray.data });
      }
    });

    return true;
}

export const session_checked =  (token)=>{
  return async (dispatch) =>{
    var user = await AXIOS_REQUEST("users/get_user_auth",{token : token},dispatch);
    var userdata = user.data;
    dispatch({ type : "PROFILE_USER",data : userdata});
    // dispatch({ type : "LOGIN_WITH_JWT",payload : token});

    session_set(dispatch,userdata,token);
    return true;
  }
}

export const firstpage_gamelist = () =>{
  return async dispatch =>{
    let rdata = await AXIOS_REQUEST("firstpage/firstpage_gamelist",);
    if(rdata.status){
      dispatch({type : FIRSTPAGEGAMELIST,data : rdata.data});
    }
  }  
}

export const getsidebar = () =>{
  return async dispatch =>{
    let rdata = await AXIOS_REQUEST("firstpage/getsidebar",{},dispatch);
    if(rdata.status){
      dispatch({type : FIRSTPAGEGETSIDEBAR,data : rdata.data});
    }
  }  
}

export const first_slider_load = () =>{
  return async dispatch =>{
    let rdata = await AXIOS_REQUEST("firstpage/firstpage_slider",{},dispatch);
    if(rdata.status){
      dispatch({type : FIRSTPAGESLIDER,data : rdata.data});
    }
  }  
}

export const loginWithJWT = user => {
  return async(dispatch) => {
    var rdata = await AXIOS_REQUEST("users/login",{username: user.username,password: user.password},dispatch,true)
      if(rdata.status){
        var token = rdata.data;
        setSession(token);
        window.location.reload();
        // var userd = await AXIOS_REQUEST("users/get_user_auth",{token : token},dispatch);
        // var userdata = userd.data;
        // dispatch({ type : "LOGIN_WITH_JWT",payload : token});
        // dispatch({ type : "PROFILE_USER",data : userdata});
        // session_set(dispatch,userdata,token);
      }else{
        alert(rdata.error, "error")
      }
  }
}

export const logoutWithJWT = () => {
  return async dispatch => {
    await AXIOS_REQUEST("users/logout",{},dispatch);
    // fake_session();
  }
}

export const setloginpage = (data)=>{
  return dispatch=>{
    dispatch({
      type : "SETLOGINPAGE",
      payload : data
    })
  }
}

export const load_fp_data = () => {
  return async(dispatch) => {
   var rdata =await AXIOS_REQUEST("firstpage/load_data", {},dispatch);
   if (rdata.status) {
     return dispatch({
       type:FIRSTPAGEDATA,
       data:rdata.data
     })
   }
  }
}

export const playsaccount = (gamedata,limits) =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST("players/gameaccount",{game : gamedata,width:window.innerWidth,limits : limits},dispatch,true);
    if(rdata.status){
      var token = rdata.data.token;
      var url = rdata.data.url;
      if(window.innerWidth <= 767 || gamedata.PROVIDERID === "awc"){
        window.location.assign(url)
      }else{
        dispatch({
          type : "GAME_PLAYER",
          gamedata : gamedata,
          gameurl : url,
          Ratio : 16/11,
          state : true,
          token : token,
          mode : "real"
        })
      }
    }else{
      if(rdata.bool === 1)
      {
        toast.warn(rdata.data);
        history.push("/mywallet/deposit");
      }else{
        toast.error(rdata.data);
      }
    }
  }
}

export const playsaccountguest = (gamedata) =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("players/guestgameaccount",{game : gamedata,width : window.innerWidth},dispatch,true);
    if(rdata.status){
      var url = rdata.data;
      if(window.innerWidth <= 767){
        window.location.assign(url)
      }else{
         dispatch({
          type : "GAME_PLAYER",
          gamedata : gamedata,
          gameurl : url,
          Ratio : 16/11,
          state : true,
        })     
      }
    }else{
      toast.error(rdata.data);
    }
  }
}

export const registeraction = user =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST('users/register',{user : user},dispatch,true)
    if(rdata.status){
      toast.success("success");
      // setSession(rdata.token);
      // window.location.reload();
      dispatch({
        type : "SETLOGINPAGE",
        payload : {login : true, register : false,forgot : false}
      })
    }else{
      toast.error(rdata.error);
    }
  }
}

export const emailverify_receive = data =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST('users/emailverify_receive',{data : data})
    if(rdata.status){
      toast.success("success");
      setSession(rdata.token);
      window.location.assign("/emailverify/:verify");
      // dispatch({type : "PROFILE_USER", data : rdata.detail});
    }else{
      toast.warn(rdata.data);
      window.location.assign("/")
    }
  }
}

export const forgotpassword_send = data =>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST('users/forgotpassword_send',{email : data.email})
    if(rdata.status){
      toast.success("success");
      dispatch({
        type : "SETLOGINPAGE",
        payload : {forgot : false}
      })
    }else{
      toast.error("server error");
    }
  } 
}

export const forgotpassword_receive = data =>{
  return async dispatch=>{
    var rdata = await AXIOS_REQUEST('users/forgotpassword_receive',{data : data})
    if(rdata.status){
      toast.success("success");
      dispatch({
        type : "FORGOTPASSWORD",
        data : rdata.data
      })
    }else{
      toast.error("server error");
      // window.location.assign("/")
    }
  } 
}

export const resend_email = data =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("users/resend_email",{email : data});
    if(rdata.status){
      toast.success("success");
      history.push("/")
    }else{

    }
  }
}

export const forgotpassword_set = data =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("users/forgotpassword_set",{data : data});
    if(rdata.status){
      toast.success("success");
      setSession(rdata.token);
      window.location.assign("/");
    }else{
      toast.error("server error")
    }
  }
}