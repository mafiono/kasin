import { AXIOS_REQUEST } from "../auth/index";
import {toast} from "react-toastify"
import {CASINO_PROVIDER,CASINO_TYPES,CASINO_GET_ALL_DATA, CASINO_GET_DATA,CASINO_FILTER_DATA,CASINO_TYPE,CASINO_SETPROVIDER,CASINO_DATA_FORMAT} from "../../types"

export const data_load = (bool,imgtype,actiontype)=>{
    return async (dispatch,getState)=>{
        dispatch({ type: CASINO_DATA_FORMAT,bool : bool});
        var select_p = getState().casinolist.setprovider;
        var rdata = await AXIOS_REQUEST("firstpage/LivecasinoproviderLoad",{bool :bool,type : imgtype,selectprovider : select_p},dispatch,true);
        if(rdata.status){
            var pdata = rdata.data.pdata;
            var tdata = rdata.data.tdata;
            var gamelist = rdata.data.list;
            var index = rdata.data.index;
            var filteredData = [];
            var value = getState().casinolist.settype.value;
            if(value !== "All"){
                filteredData = Filter(value,gamelist)
            }else{
                filteredData = gamelist;
            }
            dispatch({ type: CASINO_GET_ALL_DATA, data: gamelist,index : index,filteredData : filteredData});
            dispatch({ type: actiontype, data: rdata.data.imgs});
            var pros = [];
            var types = [{label:"ALL",value:"All"}];
            if(pros){
                for(var i = 0 ; i < pdata.length ; i++){
                    pros.push({label : pdata[i].provider.toLocaleUpperCase(),value : pdata[i].provider});
                }
                dispatch({
                    type : CASINO_PROVIDER,
                    data : pros,
                    moredata : pdata
                })
            }
            if(tdata){
                for(var j = 0 ; j < tdata.length ; j++){
                    types.push({label : tdata[j],value : tdata[j]});
                }
                dispatch({
                    type : CASINO_TYPES,
                    data : types
                })
            }
        }else{
            // toast.error("")
        }
    }
}

export const providerchange = (value,bool)=>{
    return async(dispatch,getState) =>{
        var returndata = await AXIOS_REQUEST("firstpage/LivecasinoProviderChange",{data : value,bool : bool},dispatch,true);
        if(returndata.status){
            var gamelist = returndata.data;
            if(value.length > 0){
                window.sessionStorage.setItem("setprovider" + bool, JSON.stringify(value));
            }
            dispatch({
                type : CASINO_SETPROVIDER,setprovider : value
            });
            dispatch({ type: CASINO_GET_ALL_DATA, data: gamelist,filteredData : gamelist});
        }else{
            toast.error("server error");
        }
    }
}

export const gametypechange = (value,bool)=>{
    return async(dispatch,getState)=>{
        window.sessionStorage.setItem("settype" + bool, JSON.stringify({label : value ,value:value}));
        dispatch({
            type : CASINO_TYPE,data : {label : value ,value:value}
        });
        var allData  = getState().casinolist.allData;
        var filteredData = Filter(value,allData)        
        dispatch({
            type : CASINO_GET_DATA,
            data : filteredData
        })
    }
}

export const get_scrollevent_load =  (provider,lastdata) =>{
    return async (dispatch,getState) =>{
        if(provider){
            var rdata =  await AXIOS_REQUEST("firstpage/scroll_load",{data:provider.value},dispatch,true);
            if(rdata.status){
                var rows = lastdata;
                for(var i in rdata.data){
                    rows.push(rdata.data[i]);
                }
                var filteredData = [];
                var value = getState().casinolist.settype.value;
                if(value !== "All"){
                    filteredData = Filter(value,rows)
                }else{
                    filteredData = rows
                }

               dispatch({ type: CASINO_GET_ALL_DATA, data :  rows,filteredData :filteredData })
            }else{
                return false
            }
        }else{
            return false
        }
    }
}


export const filterData = value => {
  return dispatch => dispatch({ type: CASINO_FILTER_DATA, value })
}

function Filter(value,data){
    var filteredData = []
	if(value === "All"){
		filteredData = data;
        return filteredData
	}else{
		filteredData = data
			.filter(item => {
			  let startsWithCondition =  !item.TYPE ? null : item.TYPE.toLowerCase().startsWith(value.toLowerCase())
			  let includesCondition = !item.TYPE ? null :  item.TYPE.toLowerCase().startsWith(value.toLowerCase())
			if (startsWithCondition) {
				return startsWithCondition
			  } else if (!startsWithCondition && includesCondition) {
				return includesCondition
			  } else return null
			});
			return filteredData
	}
}