import sportsconfig from "../../../configs/sportsconfig"
import sportConfig from "../../../configs/sportsconfig"

import {
    SPORTS_LIST,
    SET_ALL_MATCHS,
    ALL_SPORT_LIST,
    CURRENT_SELECT_SPORT,
    CURRENT_TAP_CHANGE,
    SEASON_TAB_CHANGE,
    MARKET_TAB_CHANGE,
    CURRENTSELECTEGAME,
    SPORTS_SIDEBAR_SET_ITEM,
    CURRENT_BET_TYPE,
    REFRESH_BET_ID,
    SPORTSBOOK_BET_HISTORY
} from "../../types"

const initialState = {
    sports_list : {data : []},
    all_matchs : {data : []},
    current_tap : sportConfig.tab[0],
    current_selected_sport : {},
    seasonData : {data : []},
    marketData : {data : []},
    currentSelectedGame : {},
    network : true,
    sportsSidebarData : {
        data : [],
        totalOdds : 0,
        totalMoney : 0,
        totalStack : 0
    },
    betId : Date.now().toString().slice(Date.now().toString().length - 6 , Date.now().toString().length),
    current_bet_type : sportsconfig.SINGLE,
    all_sports_list : [],
    bet_history_list : []
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case SPORTS_LIST :
            return { ...state,sports_list : action.data }
        case CURRENT_SELECT_SPORT :
            return { ...state,current_selected_sport : action.data }
        case CURRENT_TAP_CHANGE :
            return { ...state,current_tap : action.data }
        case SET_ALL_MATCHS :
            return { ...state,all_matchs : action.data }
        case SEASON_TAB_CHANGE : 
            return {...state , seasonData : action.data }
        case MARKET_TAB_CHANGE : 
            return {...state , marketData : action.data }
        case ALL_SPORT_LIST : 
            return { ...state, all_sports_list : action.data }
        case CURRENTSELECTEGAME :
            return { ...state , currentSelectedGame : action.data}
        // case NETWORK_STATUS : 
        //     return { ...state , network : action.data }
        case SPORTS_SIDEBAR_SET_ITEM :
            return { ...state, sportsSidebarData : action.data }
        case CURRENT_BET_TYPE : 
            return { ...state, current_bet_type : action.data }
        case REFRESH_BET_ID : 
            return { ...state, betId : action.data }
        case SPORTSBOOK_BET_HISTORY : 
            return {...state , bet_history_list : action.data}
        default:
            return state
    }
  }
  
export default player
  
