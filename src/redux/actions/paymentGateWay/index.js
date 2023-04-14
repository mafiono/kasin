import {AXIOS_REQUEST,set_page} from "../auth/index"
import { toast } from "react-toastify"
import {history} from "../../../history"
import queryString from "query-string"

export const PaymentMenuload = (params) => {
    return  async (dispatch) => {
        var res = await AXIOS_REQUEST("paymentGateWay/menuloads",params,dispatch,true)
        if(res.status){
            dispatch({ type: "PAYMENTMENU_DATA", data: res.data })
        }else{
            var bool = res.data.bool;
            switch(bool){
            case 1 :
                toast.warn("Already withdrawl");
                dispatch({ type: "PAYMENTMENU_DATA",})
                break;
            case 2 :
                toast.warn("You must verify Email for your withdrawl");
                // history.push({ pathname:"/emailverifysend",state : {data : data}});
                break;
            case 3 : 
                toast.error("fail")
                dispatch({ type: "PAYMENTMENU_DATA",})
                break;
            case 4 : 
                toast.warn("You must verify kyc for your withdrawl");
                history.push({ pathname:"/myprofile/profile-info",state : {data : "2"}});    
                break;
            default : 
                toast.error("fail");
                dispatch({ type: "PAYMENTMENU_DATA",})
            break;
            }
        }
    }
}

export const paymentMethodLoad = (params) => {
    return  async (dispatch,getState) => {
        var data = getState().auth.login.values.email;
        params['email'] = data;
        var res = await AXIOS_REQUEST("paymentGateWay/paymentMethodLoad",params,dispatch)
        if(res.status){
            dispatch({ type: "PAYMENTMETHOD_DATA", data: res.data })
        }else{
            // toast.error("fail")
        }
    }
}

export const YaarPayWithdraw = row => {
    return  async(dispatch) => {
      var res = await AXIOS_REQUEST("paymentGateWay/YaarPayWithdraw",row,dispatch)
          if(res.status){
              toast.success(res.data);   
          }else{
              toast.error(res.data);   
          }
    }
}

export const RazorpayWithdraw = row => {
    return  async(dispatch) => {
      var res = await AXIOS_REQUEST("paymentGateWay/RazorpayWithdraw",row,dispatch)
          if(res.status){
              toast.success(res.data);   
          }else{
              toast.error(res.data);   
          }
    }
}

export const Paygate10Withdraw = row => {
    return  async(dispatch) => {
      var res = await AXIOS_REQUEST("paymentGateWay/Paygate10Withdraw",row,dispatch)
          if(res.status){
              toast.success(res.data);   
          }else{
              toast.error(res.data);   
          }
    }
}

export const netcentsResults = order_no => {
    return  async(dispatch) => {
      var res = await AXIOS_REQUEST("paymentGateWay/netcentsResults",{order_no},dispatch)
          if(res.status){
              dispatch({ type: "PAYMENT_RESULTS_DATA", data: res.data })
          }else{
              toast.error(res.data);   
          }
    }
}

export const QpayResults = order_no => {
    return  async(dispatch) => {
      var res = await AXIOS_REQUEST("paymentGateWay/QpayResults",{order_no},dispatch)
          if(res.status){
              dispatch({ type: "PAYMENT_RESULTS_DATA", data: res.data })
          }else{
              toast.error(res.data);   
          }
    }
}

// export const YaarPayResults = order_no => {
//     return  async(dispatch) => {
//       var res = await AXIOS_REQUEST("paymentGateWay/YaarResults",{order_no})
//           if(res.status){
//               dispatch({ type: "PAYMENT_RESULTS_DATA", data: res.data })
//           }else{
//               toast.error(res.data);   
//           }
//     }
// }

export const CashfreeResults = order_no => {
    return  async(dispatch) => {
      var res = await AXIOS_REQUEST("paymentGateWay/CashfreeResults",{order_no})
          if(res.status){
              dispatch({ type: "PAYMENT_RESULTS_DATA", data: res.data })
          }else{
              toast.error(res.data);   
          }
    }
}

export const netcentCheckOut = (row)=>{
    return async dispath=>{
        var res =  await AXIOS_REQUEST("paymentGateWay/netcentCheckOut",{data : row})        
        if(res.status){
            window.location.href = res.data;
        }else{
            toast.error(res.data);   
        }
    }
}

export const QpayCheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            toast.error('email undefined');   
        }else{
            var res = await AXIOS_REQUEST("paymentGateWay/QpayCheckOut",{params})
                if(res.status){
                    dispatch({ type: "PAYMENTGATEWAY_QPAY_CHEKOUT_DATA", data: res });
                }else{
                    toast.error(res.data);   
                }
        }
    }
}

export const YaarPayCheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            toast.error('email undefined');   
        }else{
            var res = await AXIOS_REQUEST("paymentGateWay/YaarPayCheckOut",{params},dispatch,true)
            if(res.status){
                dispatch({ type: "PAYMENTGATEWAY_YAARPAY_CHEKOUT_DATA", data: res });
            }else{
                toast.error(res.data);   
            }
        }
    }
}

export const CashfreeCheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            toast.error('email undefined');   
        }else{
            var res = await AXIOS_REQUEST("paymentGateWay/CashfreeCheckOut", params)
                if(res.status){
                    dispatch({ type: "PAYMENTGATEWAY_CASHFREE_CHEKOUT_DATA", data: res });
                }else{
                    toast.error(res.data);   
                }
        }
    }
}

export const RazorpayCheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            toast.error('email undefined');   
        }else{
            var res = await AXIOS_REQUEST("paymentGateWay/RazorpayCheckOut", params)
                if(res.status){
                    dispatch({ type: "PAYMENTGATEWAY_RAZORPAY_CHEKOUT_DATA", data: res });
                }else{
                    toast.error(res.data);   
                }
        }
    }
}

export const Paygate10CheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            toast.error('email undefined');   
        }else{
            var res = await AXIOS_REQUEST("paymentGateWay/Paygate10CheckOut", params,dispatch,true)
                if(res.status){
                    window.location.assign(res.data.paymenturl);
                }else{
                    toast.error(res.data);   
                }
        }
    }
}

export const RazorpayResponse = params => {
    return  async(dispatch) => {
        var res = await AXIOS_REQUEST("paymentGateWay/RazorpayResponse", params)
            if(!res.status){
                toast.error(res.data);   
            }
    }
}

export const deposittransactionHistoryLoad = (params) => {
    return  async(dispatch) => {
        var res = await AXIOS_REQUEST("paymentGateWay/deposittransactionHistoryLoad",{params},dispatch)
        if(res.status){
            var rows =  set_page(params,res);
            var fdata = rows['fdata'];
            var totalPages = rows['totalPages'];
            dispatch({
                type: "TRANSACTION_HISTORY__GET_DATA",
                data: fdata,
                totalPages:totalPages,
                params : rows['params'],
                allData : res.data
            });
        }else{
            // toast.error(res.data);   
        }
    }
}

export const pagenationchange = (params)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().paymentGateWay.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages']
      dispatch({
        type:"TRANSACTION_HISTORY__PAGENATION",
        data: fdata,
        totalPages:totalPages,
        params
      })
    }
}
  
export const WithdrawHistoryLoad = (params,date) => {
    return  async(dispatch) => {
        
        var res = await AXIOS_REQUEST("paymentGateWay/WithdrawHistoryLoad",date,dispatch)
        if(res.status){
            var rows =  set_page(params,res);
            var fdata = rows['fdata'];
            var totalPages = rows['totalPages'];
            dispatch({
                type: "WITHDRAW_HISTORY__GET_DATA",
                data: fdata,
                totalPages:totalPages,
                params : rows['params'],
                allData : res.data
            });
        }else{
            // toast.error(res.data);   
        }
        
    }
}

export const Withdrawpagenationchange = (params)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().withdraw.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages']
      dispatch({
        type:"WITHDRAW_HISTORY__PAGENATION",
        data: fdata,
        totalPages:totalPages,
        params
      })
    }
}

export const Cash_payout = (data) =>{
    return async (dispatch,getState) =>{
        var start =   new Date();
        var end =  new Date(new Date().valueOf() + 60 * 60 * 24 * 1000);
        var rdata = await AXIOS_REQUEST("paymentGateWay/cashpayout",{params : data,start : start,end : end},dispatch,true);
        if(rdata.status){
            toast.success("succesfully")
            var params = queryString.parse(history.location.search);
            var rows =  set_page(params,rdata);
              var fdata = rows['fdata'];
              var totalPages = rows['totalPages'];
                dispatch({
                  type: "WITHDRAW_HISTORY__GET_DATA",
                  data: fdata,
                  totalPages:totalPages,
                  params : rows['params'],
                  allData : rdata.data
                });
            // window.location.reload()
        }else{

        }
    }
}
