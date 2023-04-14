import {AXIOS_REQUEST} from "../auth/index"
import {toast} from "react-toastify"

export const getExchgHeaderData = () => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("exchg/getExchgHeaderData",{},dispatch);
        if(rdata.status){
            dispatch({ type: "EXCHG_FULL_HEADER_DATA", data : rdata.data });
        }else{
            toast.error("Please check your connection.");
            return;
        }
    }
}

export const currentSelectSports = (data) => {
    return dispatch => dispatch({type : "SELECT_CURRENT_TYPE_EXCHG" , data });
}

export const getExchgData = (data) => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("exchg/getExchgData" , {data} , dispatch , true);
        if(rdata.status){
            dispatch({ type: "EXCHG_LIST_DATA", data : rdata.data });
        }else{
            toast.error("Please check your connection.");
            return;
        }
    }
}

export const TapChange = (data) => {
    return dispatch => dispatch({ type: "EXCHG_CURRENT_TAP", data : data });
}

export const getMarketData = (data) => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("exchg/GetPricesOfMarket" , {data} , dispatch , true);
        if(rdata.status){
            dispatch({type : "CURRENT_MATCH_MARKET" , data : rdata.data})
        }else{
            dispatch({type : "CURRENT_MATCH_MARKET" , data : []})
        }
    }
}

export const addBetSlip = (data) => {
    return async (dispatch , getState) => {
        var betSlipData = getState().exchgange.betSlipData;
        var index = betSlipData.data.findIndex(item => item.SelectionId === data.SelectionId );
        if(index > -1){
            betSlipData.totalOdds = (parseFloat(betSlipData.totalOdds) - betSlipData.data[index].Price).toFixed(2);
            betSlipData.totalStack = (parseFloat(betSlipData.totalStack ? betSlipData.totalStack : 0) - (betSlipData.data[index].Stack ? betSlipData.data[index].Stack * (data.Price - betSlipData.data[index].Price) : 0)).toFixed(2);
            data.Stack = parseFloat(betSlipData.data[index].Stack ? betSlipData.data[index].Stack : 0).toFixed(2);
            data.message = betSlipData.data[index].message;
            betSlipData.data[index] = data;
        }else{
            data.message = "Please input bet amount.";
            betSlipData.data.push(data);
        }
        betSlipData.totalOdds = (parseFloat(betSlipData.totalOdds) + parseFloat(data.Price)).toFixed(2);
        dispatch({type : "SET_EXCHG_BETSLIP" , data : Object.assign({} , betSlipData)});
    }
}

export const removeSlipItem = (data) => {
    return async(dispatch , getState) => {
        var betSlipData = getState().exchgange.betSlipData;
        var index = betSlipData.data.findIndex(item => item.SelectionId === data.SelectionId );
        if(index > -1){
            betSlipData.totalOdds = (parseFloat(betSlipData.totalOdds) - betSlipData.data[index].Price).toFixed(2);
            betSlipData.totalMoney = (parseFloat(betSlipData.totalMoney) - (betSlipData.data[index].Stack ? betSlipData.data[index].Stack : 0)).toFixed(2);
            betSlipData.totalStack = (parseFloat(betSlipData.totalStack) - (betSlipData.data[index].Stack ? betSlipData.data[index].Stack * betSlipData.data[index].Price : 0)).toFixed(2);
            betSlipData.data.splice(index , 1);
            dispatch({type : "SET_EXCHG_BETSLIP" , data : Object.assign({} , betSlipData)});
        }
    }
}

export const updateExchgSidebar = (data) => {
    return dispatch => dispatch({type : "SET_EXCHG_BETSLIP" , data : Object.assign({} , data)});
}

export const exchgPlaceBet = (data) => {
    return async (dispatch) => {
        await AXIOS_REQUEST("exchg/sendPlaceBet" , {data} , dispatch , true);
        return;
        // if(rdata.status){
        //     dispatch(updateExchgSidebar({data : [] , totalOdds : 0 , totalMoney : 0 , totalStack : 0}));
        // }else{
        //     toast.error("Please check your connection.");
        //     return;
        // }
    }
}