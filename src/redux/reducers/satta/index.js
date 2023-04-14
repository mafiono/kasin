import {get_betid,get_betsdata} from "../../actions/auth/index"
const initialState = {
    bazaarsdata : [],
    gamedata : [],
    numbersdata  :[],
    betsdata  :  get_betsdata(),
    betId : get_betid(),
    finacedata : {
      totalOdds : 0,
      totalMoney : 0,
    },
    eventflag : true
}

  const satta = (state = initialState, action) => {
    switch (action.type) {
      case "SATTA_BAZAARS_ITEMS":
        return { ...state, ...action.data}
      case "SATTA_BETS_DATA" : 
        return {...state, betsdata : action.data}
      case "SATTA_EVENT_FLAG" : 
        return {...state, eventflag : action.data}
        
      case "SATTA_BETS_ID_FORMAT" : 
        return {...state, betId : get_betid() }
        default:
        return state
    }
  }
  
export default satta
  