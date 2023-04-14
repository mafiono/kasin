import * as loginAction from "./loginActions"
import { Root} from "../../../authServices/rootconfig"
import { history } from "../../../history"
import axios from "axios"
import {toast} from "react-toastify"

const token = Root.token;
export default loginAction

export const validateUsername = (fld) =>{
        
	var error = "";

	if (fld === "") {
		error = "You didn't enter a username.\n";
		// toast.error(error);
		alert(error,"error");
		return false;
	} 
	else {

	}
	return true;
}

export const validateEmail = (fld) =>{
        
	var error = "";

	if (fld === "") {
		error = "You didn't enter a username.\n";
		alert(error,"error");
		return false;
	} 
	else if(fld.indexOf("@") !== -1){
		var mails = fld.split("@");
		var f1 = mails[1].includes(mails[0]);
		var f2 = mails[0].includes(mails[1]);
		if(f1 || f2){
			alert("Please enter correct email.","error");
			return false
		}else{
			return true;
		}
	}else{
		return true;
	}
}

export const validateEmail1 = (fld) =>{
        
	var error = "";

	if (fld === "") {
		error = "You didn't enter a username.\n";
		alert(error,"error");
		return false;
	} 
	else if(fld.indexOf("@") !== -1){
		var mails = fld.split("@");
		var f1 = mails[1].includes(mails[0]);
		var f2 = mails[0].includes(mails[1]);
		if(f1 || f2){
			alert("Please enter correct email.","error");
			return false
		}else{
			return true;
		}
	}else{
		return false;
	}
}

export const get_item = (id,sidebar) =>{
    let item = {};
    function fact(node){
      if(node.id === id){
        item = node;
        return;
      }
      if(node.children && node.children.length > 0){
        for(let j in node.children){
          if(id === node.children[j].id){
            item = node.children[j];
            return;
          }
          fact(node.children[j]);
        }
      }else{
        return;
      }
    }

    for(var i in sidebar){
      fact(sidebar[i]);
    }
    return item;
}


export const setSession = (string)=>{
	localStorage.setItem(token,string);
	return true;
}

export const get_betsdata = () =>{
	try{
		var data  =	window.sessionStorage.getItem("sattadata");
	   if(data){
		   return JSON.parse(data);
	   }else{
		   return {}
	   }
	}catch(e){
		return {}
	}
}

export const get_provider = (bool) =>{
	try{
		var data  =	window.sessionStorage.getItem("setprovider"+bool);
	   if(data){
		   return JSON.parse(data);
	   }else{
		   return []
	   }
	}catch(e){
		return []
	}
}

export const get_type = (bool) =>{
	try{
		var data  =	window.sessionStorage.getItem("settype"+bool);
	   if(data){
		   return JSON.parse(data);
	   }else{
		   return {label : "ALL",value : 'All'}
	   }
	}catch(e){
		return {label : "ALL",value : 'All'}
	}
}

export const get_date  =(time) =>{
	var times = time.split(":");
	if(times.length >= 1){
		if(parseInt(times[0]) > 11){
			if(parseInt(times[0]) === 12){
				let time =convert ((parseInt(times[0]))) + ":" +  convert(times[1]) + " PM";
				return time;
			}else{
				let time =convert ((parseInt(times[0]) - 12 )) + ":" +  convert(times[1]) + " PM";
				return time;
			}
		}else{
			let time = convert(parseInt(times[0]))+":" + convert(times[1])  + "  AM";
			return time
		}
	}
	function convert(number){
        if(parseInt(number) > 9){
            return number
        }else{
            return "0" + parseInt(number)
        }
    }
}

export const get_betid = () =>{
	var a = new Date().valueOf() + "";
	var b=  a.slice((a.length-1-7),(a.length-1));
	return b;
}

export const getSession =()=>{
	var session =  sessioninfor();
	if(session){
		return session;
	}else{
		return false;
	}
}

export const url_path = ()=>{
	return history.location.pathname;
}

export const sessioninfor = ()=>{
	let auth = localStorage.getItem(token);
	return auth
}

export const fake_session =  ()=>{
	 localStorage.removeItem(token);
	return true;
}

export const instance = axios.create({
    baseURL: Root.apiurl,
    timeout: 500000,
    headers: {
		authorization: encodeURIComponent(localStorage.getItem(token)),
		"Content-Type": "application/json",
		device : window.innerWidth,
		"user-device" : "web"
    },
});

export const AXIOS_REQUEST = async (url,inputdata,dispatch,loading) =>{
	try{
		if(loading){
			dispatch({type : "HOMEPAGELOADIN",data : true})
		}
		var Response =  await instance.post( url , inputdata );
		if(loading){
			setTimeout(()=>{
				dispatch({type : "HOMEPAGELOADIN",data : false})
			},100)
		}
		if(Response.data){
			if(Response.data.session){
				dispatch({type : "LOGOUT_WITH_JWT"});
				Root.socket.emit("sessiondestroy", {token : localStorage.getItem(token)});
				fake_session();
				Root.socket.disconnect();
				window.location.assign ("/");
			}else{
				return Response.data
			}
		}else{
			return {status : false,error : "error"}
		}
	}catch(e){
		if(loading){
			dispatch({type : "HOMEPAGELOADIN",data : false})
		}
		return {status : false,error : "error"}
	}
}

export const set_page = (params,rdata)=>{
	let { page, perPage } = params;
	let totalPages = Math.ceil(rdata.data.length / perPage);
	let fdata = [];
	let newparams = {};
	if (page !== undefined && perPage !== undefined) {
		let calculatedPage = (page - 1) * perPage;
		let calculatedPerPage = page * perPage;
	  	if(calculatedPage > rdata.data.length){
			totalPages = Math.ceil(rdata.data.length / perPage);
			fdata = rdata.data.slice(0, perPage);
			newparams['page'] = 0;
			newparams['perPage'] = perPage;
		}else{
			fdata = rdata.data.slice(calculatedPage, calculatedPerPage);
			newparams = params;
		}
	}else {
		totalPages = Math.ceil(rdata.data.length / 7);
		fdata = rdata.data.slice(0, 7);
		newparams = params;
	}
	if(fdata.length === 0){
		newparams['page'] = 0;
		newparams['perPage'] = 7;
		fdata = rdata.data.slice(0, 7);
	}
	return {fdata : fdata,totalPages : totalPages,params : newparams}
}

export const alert = (string,type) =>{
	if(string && string.length > 0){

		switch(type){
			case "success" :
				toast.success(string);
			break;
			case "warn" :
				toast.warn(string);
			break;
			case "error" :
				toast.error(string);
			break;
			default : 
				toast.error(string);
			break;
		}
		return;
	}
}
