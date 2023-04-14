import { AXIOS_REQUEST,set_page } from "../auth/index"
import { toast } from "react-toastify"
// import {history} from "../../../history"

export const get_bazaarsitems = () =>{
    return async (dispatch) =>{
        var rdata = await AXIOS_REQUEST("satta/load_bazaars",{},dispatch,true)
        if(rdata.status){
            dispatch({ type: "SATTA_BAZAARS_ITEMS", data: rdata.data });
        }else{
            toast.error(rdata.data);   
        }
    }
}

export const update_satta = (data) =>{
    return async dispatch =>{
        window.sessionStorage.setItem("sattadata",JSON.stringify(data));
        dispatch({type : "SATTA_BETS_DATA",data : data});
    }
}

export const event_update = (flag) =>{
    return async dispatch =>{
        dispatch({type : "SATTA_EVENT_FLAG",data :flag})
    }
}

export const satta_bet_save = (data,betamount,betid) =>{
    return async (dispatch,getState) =>{
        // var user = getState().auth.login.values;
        // console.log(data,betamount,betid)
        // var rdata = await AXIOS_REQUEST("satta/save_bet_bazaars",{data : data,totalbets : betamount,userdata : user,transactionid : betid},dispatch,true)
        // if(rdata.status){
        //     window.sessionStorage.removeItem("sattadata");
        //     toast.success("successfully!");
        //     history.push("/Mybets/satta")
        //     dispatch({type : "SATTA_BETS_ID_FORMAT",data : {}});
        //     dispatch({type : "SATTA_BETS_DATA",data : {}});
        // }else{
        //     toast.error(rdata.data);   
        // }
    }
}


export const reports_email_load = (datas, params) => {
    return  async(dispatch) => {
        var rdata = await AXIOS_REQUEST("satta/bethistory_email_load",datas,dispatch)
        if(rdata.status){
            var rows =  set_page(params,rdata);
            var fdata = rows['fdata'];
            var totalPages = rows['totalPages'];
            dispatch({
                type: "SATTA_GET_DATA",
                data: fdata,
                totalPages:totalPages,
                params : rows['params'],
                result : rdata.result,
                allData : rdata.data
            });
        }else{
            // toast.error('No Record');   
        }
    }
}

export const ReportPageNationChange = (params)=>{
  return (dispatch,getState)=>{
    var row = {
      data : getState().profile.sattas.allData
    }
    var rows =  set_page(params,row)
    var fdata = rows['fdata'];
    var totalPages = rows['totalPages'];
    dispatch({
      type:"SATTA_GET_PAGENATION",
      data: fdata,
      totalPages:totalPages,
      params
    })
  }
}
