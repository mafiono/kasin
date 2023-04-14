import sportsConfig from "../../../configs/sportsconfig";

const initialState = {
    betSlipData : {
        data : [],
        totalOdds : 0,
        totalMoney : 0,
        totalStack : 0
    },
    exchg_header_data : [],
    current_header_sport : {},
    dataList : [],
    current_tap : sportsConfig.tab[0],
    currentMarketData : []
}

const exchg = (state = initialState, action) => {
    switch (action.type) {
        case "EXCHG_FULL_HEADER_DATA" :
            return { ...state , exchg_header_data : action.data }
        case "SELECT_CURRENT_TYPE_EXCHG" : 
            return { ...state , current_header_sport : action.data }            
        case "EXCHG_LIST_DATA" : 
            return { ...state , dataList : action.data }
        case "EXCHG_CURRENT_TAP" : 
            return { ...state , dataTabList : action.data }            
        case "CURRENT_MATCH_MARKET" : 
            return {...state , currentMarketData : action.data}
        case "SET_EXCHG_BETSLIP" : 
            return {...state , betSlipData : action.data}
        default:
            return state
    }
}
  
export default exchg
  
