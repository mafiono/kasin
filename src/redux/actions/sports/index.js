import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify"
import { history } from "../../../history"
import { Root } from "../../../authServices/rootconfig";
import { SPORTS_LIST,SET_ALL_MATCHS,ALL_SPORT_LIST,CURRENT_SELECT_SPORT,CURRENT_TAP_CHANGE,SEASON_TAB_CHANGE,MARKET_TAB_CHANGE,CURRENTSELECTEGAME,SPORTS_SIDEBAR_SET_ITEM,CURRENT_BET_TYPE,REFRESH_BET_ID,SPORTSBOOK_BET_HISTORY } from "../../types"
import sportsconfig from "../../../configs/sportsconfig";

export const get_sports_lists = (EventStatus) => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("sport/load_sportslist_player" , {data : EventStatus},dispatch);
        if(rdata.status){
            dispatch({ type : SPORTS_LIST, data: {data : rdata.data}});
        }else{
            toast.error("error");
        }
    }
}

export const get_odds = ( sendData ) =>{
    return async (dispatch) => {
        var rdata = await AXIOS_REQUEST("sport/load_sportsodds_bysportid_player" , sendData ,dispatch,true);
        if(rdata.status){
            var allOddData = rdata.data;
            var secondSearchData = [];
            for(let a = 0 ; a < allOddData.length ; a ++){
                if(!allOddData[a].market || !allOddData[a].market.length) continue;
                var temp = {};
                allOddData[a].ScheduledTime = changeTime(allOddData[a].ScheduledTime);
                
                if(allOddData[a].Season){
                    var indexId = secondSearchData.findIndex(item => item.name === allOddData[a].Season.Name);
                    if(indexId > -1){
                        secondSearchData[indexId].data.push(handleMarket(allOddData[a]));
                    }else{
                        temp.id = allOddData[a].Season.Id;
                        temp.name = allOddData[a].Season.Name;
                        temp.data = [handleMarket(allOddData[a])];
                        if(secondSearchData.length < 2){
                            temp.isOpen = true;
                        }else{
                            temp.isOpen = false;
                        }
                        secondSearchData.push(temp);
                    }
                }else{
                    var otherIndex = secondSearchData.findIndex(item => item.name === sportsconfig.OTHER);
                    if(otherIndex > -1){
                        secondSearchData[otherIndex].data.push(handleMarket(allOddData[a]));
                    }else{
                        temp.id = Date.now();
                        temp.name = sportsconfig.OTHER;
                        temp.data = [handleMarket(allOddData[a])];
                        if(secondSearchData.length < 2){
                            temp.isOpen = true;
                        }else{
                            temp.isOpen = false;
                        }
                        secondSearchData.push(temp);                    
                    }
                }
            }
            secondSearchData.sort(function(A, B){
                return A.name === sportsconfig.OTHER ? 1 : (A.name < B.name ? -1 : 1)
            });
            dispatch({ type : SET_ALL_MATCHS , data: Object.assign({} , {data : secondSearchData})});
        }else {
            toast.error(rdata.data);
        };
    }
}

export const get_all_sports_list = () => {
    return async(dispatch) => {
        var result = await AXIOS_REQUEST("sport/load_sportsdata","",dispatch , true);
        if(result.status){
            dispatch({type : ALL_SPORT_LIST , data : result.data});
        }else{
            toast.error("Server connection is failed!")
        }
    }
}

export const current_select_sport = (data) => {
    return dispatch => dispatch({ type : CURRENT_SELECT_SPORT, data: data});
}

export const TapChange = (item) => {
    return dispatch => dispatch({ type : CURRENT_TAP_CHANGE , data : item })
}

export const remove_all_match = () => {
    return (dispatch) => {
        dispatch({ type : SET_ALL_MATCHS, data : {data : []} });
        dispatch({ type : SEASON_TAB_CHANGE, data: {data : []}});
        dispatch({ type : MARKET_TAB_CHANGE, data: {data : []}});
        dispatch({ type : CURRENT_SELECT_SPORT, data: {}});
    }
}

export const get_odds_lengues = (allOddData) => {
    return async(dispatch) => {
        // var secondSearchData = [];
        // for(var a = 0 ; a < allOddData.length ; a ++){
        //     if(!allOddData[a].market || !allOddData[a].market.length) continue;
        //     var flag = false;
        //     var temp = {};
        //     if(allOddData[a].ScheduledTime){
        //         var date = new Date(allOddData[a].ScheduledTime);
        //         var month = date.getMonth() + 1;
        //         var day = date.getDate();
        //         let weekday = date.getDay();
        //         var index = sportsconfig.weekday.findIndex(item=>item.id === weekday);
        //         if(index > -1){
        //             weekday = sportsconfig.weekday[index].name;
        //             allOddData[a].ScheduledTime = day + " / " + month + " " + weekday;
        //         }
        //     }
        //     for(var b = 0 ; b < secondSearchData.length ; b ++){
        //         if(allOddData[a].Venue){
        //             if(allOddData[a].Venue.country === secondSearchData[b].name){
        //                 secondSearchData[b].data.push(handleMarket(allOddData[a]));
        //                 flag = true;
        //                 break;
        //             }
        //         }else{
        //             if(secondSearchData[b].name === sportsconfig.OTHER){
        //                 secondSearchData[b].data.push(handleMarket(allOddData[a]));
        //                 flag = true;
        //                 break;
        //             }
        //         }
        //     }
        //     if(!flag){
        //         if(allOddData[a].Venue){
        //             temp.id = allOddData[a].Venue.id;
        //             temp.name = allOddData[a].Venue.country;
        //             temp.data = [handleMarket(allOddData[a])];
        //             secondSearchData.push(temp);
        //         }else{
        //             temp.id = Date.now();
        //             temp.name = sportsconfig.OTHER;
        //             temp.data = [handleMarket(allOddData[a])];
        //             secondSearchData.push(temp);
        //         }
        //     }
        // }
        // secondSearchData.sort(function(a, b){
        //     return a.name === sportsconfig.OTHER ? 1 : (a.name < b.name ? -1 : 1)
        // });
        // dispatch({ type : SET_ALL_MATCHS, data: secondSearchData});
    }
}

export const seasonTabChange = (data) => {
    return async(dispatch , getState) => {
        var seasonData = getState().sports.seasonData.data;
        var index = seasonData.findIndex( item => item.id === data.id);
        if(index > -1){
            seasonData.splice(index , 1);
        }else{
            seasonData.push({id : data.id});
        }
        dispatch({ type : SEASON_TAB_CHANGE , data : Object.assign({} , {data : seasonData}) });
    }
}

export const marketTabChange = (data) => {
    return async (dispatch , getState) => {
        var marketData = getState().sports.currentSelectedGame;
        var index = marketData.market.findIndex(item => item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers);
        if(index > -1){
            marketData.market[index].isopen = !marketData.market[index].isopen;
        }
        dispatch({ type : CURRENTSELECTEGAME, data : Object.assign({} , marketData) });
    }
}

export const currentSelecteGame = (data) => {
    return async(dispatch) => {
        var result = await AXIOS_REQUEST("sport/get_currentMatchMarket",{ event_id : data.event_id },dispatch , true);
        if(result.status){
            result.data.ScheduledTime = changeTime(result.data.ScheduledTime);
            dispatch({ type : CURRENTSELECTEGAME, data : Object.assign({} , result.data ) });
        }else{
            toast.error("Server connection is failed!")
        }
    }
}

export const setItem = (data)=>{
    return async (dispatch , getState) =>{
        var rdata = get(getState().sports.sportsSidebarData , data , getState().sports.current_bet_type);
        dispatch({ type : SPORTS_SIDEBAR_SET_ITEM, data: Object.assign({} , rdata) });
    }
}

export const removeItem = (data)=>{
    return async (dispatch , getState) =>{
        let rdata = remove(getState().sports.sportsSidebarData , data , getState().sports.current_bet_type);
        dispatch({ type : SPORTS_SIDEBAR_SET_ITEM, data: Object.assign({} , rdata) });
    }
}

export const removeAllItem = () => {
    return dispatch => dispatch({ 
        type : SPORTS_SIDEBAR_SET_ITEM, 
        data: { data : [] , totalMoney : 0 , totalStack : 0 , totalOdds : 0 }
    });
}

export const changeBetType = (data) => {
    return dispatch => dispatch({ type : CURRENT_BET_TYPE, data });
}

export const updateSportsSidebar = (data ) => {
    return dispatch => dispatch({ type : SPORTS_SIDEBAR_SET_ITEM, data : Object.assign({} , data) });
}

export const placeBet = (sendData) => {
    return async (dispatch) => {
        var result = await AXIOS_REQUEST("sport/place_bet" , sendData,dispatch,true)
        if(result.status){
            dispatch(removeAllItem());
            toast.success("Successfuly bet!");
            var betId = Date.now().toString().slice(Date.now().toString().length - 6 , Date.now().toString().length);
            dispatch({type : REFRESH_BET_ID , data : betId});
        }else{
            toast.error(result.message);
        }
    }
}

export const get_bet_history = (data) => {
    return async (dispatch) => {
        var result = await AXIOS_REQUEST("sport/get_bet_history" , data  , dispatch , true);
        if(result.status){
            dispatch({type : SPORTSBOOK_BET_HISTORY , data : result.data})
        }else{
            toast.error("please check your network connection")
        }
    }
}

export const cashOut = (data) => {
    return async(dispatch , getState) => {
        // var result = await AXIOS_REQUEST("sport/cashout" , data,dispatch,true);
        // if(result.status){
        //     var betHistory = getState().sports.bet_history_list;
        //     var realBetHistory = [];
        //     for(var i = 0 ; i < betHistory.length ; i ++){
        //         if(betHistory[i].betting.transactionId !== data.betting.transactionId){
        //             realBetHistory.push(betHistory[i]);
        //         }
        //     }
        //     dispatch({type : "BET_HISTORY_LIST" , data : realBetHistory});
        // }else{
        //     toast.error("Server connection is failed!")
        // }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function handleMarket(data){
    var pushData = data;
    pushData.oneTotwo = {}
    pushData.handicap = {}
    pushData.total = {}

    data.ScheduledTime = changeTime(data.ScheduledTime);
    if(pushData.market){
        if(pushData.market.length){
            for(var f = pushData.market.length-1 ;f >= 0 ; f --){
                if(pushData.market[f].MarketName.toLowerCase() === sportsconfig.T1X2){
                    if(!pushData.market[f].Outcomes) break;
                    if(!pushData.market[f].Outcomes.length) break;
                    pushData.oneTotwo.MarketId = pushData.market[f].MarketId;
                    pushData.oneTotwo.MarketName = pushData.market[f].MarketName;
                    pushData.oneTotwo.MarketStatus = pushData.market[f].MarketStatus;
                    pushData.oneTotwo.MarketSpecifiers = pushData.market[f].MarketSpecifiers;
                    pushData.oneTotwo.one = {
                        OutcomeId : pushData.market[f].Outcomes[0].OutcomeId,
                        OutcomeName : pushData.market[f].Outcomes[0].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[f].Outcomes[0].OutcomeOdds).toFixed(2),
                        OutcomeStatus : pushData.market[f].Outcomes[0].OutcomeStatus,
                    }
                    pushData.oneTotwo.draw = {
                        OutcomeId : pushData.market[f].Outcomes[1].OutcomeId,
                        OutcomeName : pushData.market[f].Outcomes[1].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[f].Outcomes[1].OutcomeOdds).toFixed(2),
                        OutcomeStatus : pushData.market[f].Outcomes[1].OutcomeStatus,
                    }
                    pushData.oneTotwo.two = {
                        OutcomeId : pushData.market[f].Outcomes[2].OutcomeId,
                        OutcomeName : pushData.market[f].Outcomes[2].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[f].Outcomes[2].OutcomeOdds).toFixed(2),
                        OutcomeStatus : pushData.market[f].Outcomes[2].OutcomeStatus,
                    }
                    break;
                }
            }

            for(var g = pushData.market.length-1 ;g >= 0 ; g --){
                if(pushData.market[g].MarketName.toLowerCase() === sportsconfig.THANDICAP){
                    if(!pushData.market[g].Outcomes) break;
                    if(!pushData.market[g].Outcomes.length) break;
                    pushData.handicap.MarketId = pushData.market[g].MarketId;
                    pushData.handicap.MarketName = pushData.market[g].MarketName;
                    pushData.handicap.MarketSpecifiers = pushData.market[g].MarketSpecifiers;
                    pushData.handicap.MarketStatus = pushData.market[g].MarketStatus;
                    pushData.handicap.one = {
                        OutcomeId : pushData.market[g].Outcomes[0].OutcomeId,
                        OutcomeName : pushData.market[g].Outcomes[0].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[g].Outcomes[0].OutcomeOdds).toFixed(2),
                        OutcomeStatus : pushData.market[g].Outcomes[0].OutcomeStatus,
                    }
                    pushData.handicap.two = {
                        OutcomeId : pushData.market[g].Outcomes[1].OutcomeId,
                        OutcomeName : pushData.market[g].Outcomes[1].OutcomeName,
                        OutcomeOdds : parseFloat(pushData.market[g].Outcomes[1].OutcomeOdds).toFixed(2),
                        OutcomeStatus : pushData.market[g].Outcomes[1].OutcomeStatus,
                    }
                    break;
                }
            }

            for(var h = pushData.market.length-1 ;h >= 0 ; h --){
                if(pushData.market[h].MarketName.toLowerCase() === sportsconfig.TTOTAL){
                    if(!pushData.market[h].Outcomes) break;
                    if(!pushData.market[h].Outcomes.length) break;
                    pushData.total.MarketId = pushData.market[h].MarketId;
                    pushData.total.MarketName = pushData.market[h].MarketName;
                    pushData.total.MarketSpecifiers = pushData.market[h].MarketSpecifiers;
                    pushData.total.MarketStatus = pushData.market[h].MarketStatus;
                    pushData.total.one = {
                        OutcomeId : pushData.market[h].Outcomes[0].OutcomeId,
                        OutcomeName : pushData.market[h].Outcomes[0].OutcomeName,
                        OutcomeStatus : pushData.market[h].Outcomes[0].OutcomeStatus,
                        OutcomeOdds : parseFloat(pushData.market[h].Outcomes[0].OutcomeOdds).toFixed(2),
                    }
                    pushData.total.two = {
                        OutcomeId : pushData.market[h].Outcomes[1].OutcomeId,
                        OutcomeName : pushData.market[h].Outcomes[1].OutcomeName,
                        OutcomeStatus : pushData.market[h].Outcomes[1].OutcomeStatus,
                        OutcomeOdds : parseFloat(pushData.market[h].Outcomes[1].OutcomeOdds).toFixed(2),
                    }
                    break;
                }
            }
        }
    }
    return pushData;
}

function changeTime(time){
    var rtime = "";
    if(time && time.indexOf("IST") > -1){
        var date = new Date(time.replace("IST" , "GMT +05:30"));
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let weekday = date.getDay();
        var index = sportsconfig.weekday.findIndex(item => item.id === weekday);
        weekday = sportsconfig.weekday[index].name;
        rtime = month + " / " + day + " " + hour + ":" + minute + " " + weekday;
        return rtime;
    }else{
        return time;
    }
}

function get(p1, p2 , betType){
    var index = p1.data.findIndex(data => data.OutcomeId === p2.OutcomeId && data.OutcomeName === p2.OutcomeName && data.MarketId === p2.MarketId && data.MarketName === p2.MarketName && data.MarketSpecifiers === p2.MarketSpecifiers && data.event_id === p2.event_id );
    if(index > -1){
        if(p1.data[index].OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) - parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
        if(betType === sportsconfig.SINGLE){
            if(p1.data[index].amount) p1.totalMoney = (parseFloat(p1.totalMoney) - parseFloat(p1.data[index].amount)).toFixed(2);
            if(p1.data[index].amount) p1.totalStack = (parseFloat(p1.totalStack) - (parseFloat(p1.data[index].amount) * parseFloat(p1.data[index].OutcomeOdds))).toFixed(2);
        }else if(betType === sportsconfig.MULTI){
            if(p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) / parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
        }
        p1.data.splice(index, 1);
    }else{
        if(p2.OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) + parseFloat(p2.OutcomeOdds)).toFixed(2);
        if(betType === sportsconfig.MULTI){
            if(p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) * parseFloat(p2.OutcomeOdds)).toFixed(2);
        }
        p1.data.push(p2);
    }
    return p1;
}

function remove(p1, p2 , betType){
    var index = p1.data.findIndex(data => data.OutcomeId === p2.OutcomeId && data.OutcomeName === p2.OutcomeName && data.MarketId === p2.MarketId && data.MarketName === p2.MarketName && data.MarketSpecifiers === p2.MarketSpecifiers && data.event_id === p2.event_id );
    if(p1.data[index].OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) - parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
    if(betType === sportsconfig.SINGLE){
        if(p1.data[index].amount) p1.totalMoney = (parseFloat(p1.totalMoney) - parseFloat(p1.data[index].amount)).toFixed(2);
        if(p1.data[index].amount) p1.totalStack = (parseFloat(p1.totalStack) - (parseFloat(p1.data[index].amount) * parseFloat(p1.data[index].OutcomeOdds))).toFixed(2);
    }else if(betType === sportsconfig.MULTI){
        if(p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) / parseFloat(p1.data[index].OutcomeOdds)).toFixed(2);
    }
    p1.data.splice(index, 1);
    return p1;
}

export const Sport_socket = () => {
    return async (dispatch , getState) => {
        setTimeout(() => { 
            if(Root.socket){
                Root.socket.on(sportsconfig.ODDSCHANGE , (data) => {
                    var eventData = data.data;
                    var currentPage = history.location.pathname.split("/")[1];
                    var EventStatus = currentPage === sportsconfig.matchType.sports ? getState().sports.current_tap.EventStatus : sportsconfig.matchType[currentPage];
                    var allMatchs = getState().sports.all_matchs.data;
                    var sport_list = getState().sports.sports_list.data;
                    var selectedSport = getState().sports.current_selected_sport;
                    var currentSelectedGame = getState().sports.currentSelectedGame;
                    var betSideBar = getState().sports.sportsSidebarData;
                
                    if(eventData.event_id === "sr:match:11365261"){
                        console.log("ODDSCHANGE" , eventData.timestamp , eventData.temp);
                    }
                    if(sportsconfig.sportsUrls.indexOf(currentPage) > -1){
                        if(currentPage !== sportsconfig.matchType.sportsevent){
                            if(EventStatus === eventData.EventStatus && sport_list.findIndex(item => item.sport_id === eventData.sportid) < 0){
                                dispatch(get_sports_lists(EventStatus));
                                return;
                            }
                            if(selectedSport.sport_id === eventData.sportid){
                                if(EventStatus === eventData.EventStatus){
                                    var OddFlag = false;
                                    for(var odd_i = 0 ; odd_i < allMatchs.length ; odd_i ++){
                                        var OddIndex = allMatchs[odd_i].data.findIndex(item => item.event_id === eventData.event_id);
                                        if(OddIndex > -1){
                                            let market = allMatchs[odd_i].data[OddIndex].market;
                                            for(let odds_i in market){
                                                var index = eventData.market.findIndex(item => item.MarketName === market[odds_i].MarketName && item.MarketId === market[odds_i].MarketId && item.MarketSpecifiers === market[odds_i].MarketSpecifiers);
                                                if(index < 0 ){
                                                    eventData.market.push(market[odds_i]);
                                                }
                                            }
                                            allMatchs[odd_i].data[OddIndex] = handleMarket(eventData);
                                            OddFlag = true;
                                            break;
                                        }
                                    }
                                    if(!OddFlag){
                                        var oddTemp = {};
                                        if(eventData.Season){
                                            var seasonIndex = allMatchs.findIndex(item => item.name === eventData.Season.Name);
                                            if(seasonIndex > -1){
                                                allMatchs[seasonIndex].data.push(handleMarket(eventData));
                                            }else{
                                                oddTemp.id = eventData.Season.Id;
                                                oddTemp.name = eventData.Season.Name;
                                                oddTemp.data = [handleMarket(eventData)];
                                                allMatchs.push(oddTemp);    
                                            }
                                        }else{
                                            var otherIndex = allMatchs.findIndex(item => item.name === sportsconfig.OTHER);
                                            if(otherIndex > -1){
                                                allMatchs[otherIndex].data.push(handleMarket(eventData));
                                            }else{
                                                oddTemp.id = Date.now();
                                                oddTemp.name = sportsconfig.OTHER;
                                                oddTemp.data = [handleMarket(eventData)];
                                                allMatchs.push(oddTemp);
                                            }
                                        }
                                    }
                                }else{
                                    for(var odd_i_ = 0 ; odd_i_ < allMatchs.length ; odd_i_ ++){
                                        var oddsChangeIndex = allMatchs[odd_i_].data.findIndex(item => item.event_id === eventData.event_id);
                                        if(oddsChangeIndex > -1){
                                            allMatchs[odd_i_].data.splice(oddsChangeIndex , 1);
                                            if(allMatchs[odd_i_].data.length === 0){
                                                allMatchs.splice(odd_i_ , 1);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            allMatchs.sort(function(A, B){
                                return A.name === sportsconfig.OTHER ? 1 : (A.name < B.name ? -1 : 1)
                            });
                            dispatch({ type : SET_ALL_MATCHS, data: Object.assign({} , {data : []})});
                            dispatch({ type : SET_ALL_MATCHS, data: Object.assign({} , {data : allMatchs})});
                        }else if(currentSelectedGame.event_id === eventData.event_id){
                            var currentmarket = currentSelectedGame.market;
                            for(let current_i in currentmarket){
                                var currentindex = eventData.market.findIndex(item => item.MarketName === currentmarket[current_i].MarketName && item.MarketId === currentmarket[current_i].MarketId && item.MarketSpecifiers === currentmarket[current_i].MarketSpecifiers);
                                if(currentindex < 0 ){
                                    eventData.market.push(currentmarket[current_i]);
                                }else{
                                    eventData.market[currentindex].isopen = currentmarket[current_i].isopen;
                                }
                            }
                            eventData.ScheduledTime = changeTime(eventData.ScheduledTime);
                            dispatch({ type : CURRENTSELECTEGAME, data : Object.assign({} , eventData ) });
                        }
                    }
                    var betOddFlag = false;
                    for(var oddsBet_i = 0 ; oddsBet_i < betSideBar.data.length ; oddsBet_i ++){
                        if(betSideBar.data[oddsBet_i].event_id === eventData.event_id){
                            betOddFlag = true;
                            betSideBar.data[oddsBet_i].EventStatus = eventData.EventStatus;
                            if(eventData.EventStatus === sportsconfig.LIVE || eventData.EventStatus === sportsconfig.NotStarted){
                                betSideBar.data[oddsBet_i].eventMessage = "";
                            }else{
                                betSideBar.data[oddsBet_i].eventMessage = "This match is " + eventData.EventStatus;
                            }
                            if(eventData.market && eventData.market.length){
                                for(var mak_i = 0 ; mak_i < eventData.market.length ; mak_i ++){
                                    if(eventData.market[mak_i].Outcomes){
                                        for(var odd_j = 0 ; odd_j < eventData.market[mak_i].Outcomes.length ; odd_j ++){
                                            if( betSideBar.data[oddsBet_i].OutcomeId === eventData.market[mak_i].Outcomes[odd_j].OutcomeId && betSideBar.data[oddsBet_i].OutcomeName === eventData.market[mak_i].Outcomes[odd_j].OutcomeName && betSideBar.data[oddsBet_i].MarketId === eventData.market[mak_i].MarketId && betSideBar.data[oddsBet_i].MarketName === eventData.market[mak_i].MarketName && betSideBar.data[oddsBet_i].MarketSpecifiers === eventData.market[mak_i].MarketSpecifiers ){
                                                betSideBar.data[oddsBet_i].OutcomeStatus = eventData.market[mak_i].Outcomes[odd_j].OutcomeStatus;
                                                if(betSideBar.data[oddsBet_i].OutcomeOdds !== eventData.market[mak_i].Outcomes[odd_j].OutcomeOdds){
                                                    betSideBar.data[oddsBet_i].OutcomeOdds_ = eventData.market[mak_i].Outcomes[odd_j].OutcomeOdds;
                                                    betSideBar.oddsChange = true;
                                                    if(eventData.market[mak_i].Outcomes[odd_j].OutcomeStatus){
                                                        betSideBar.data[oddsBet_i].oddMessage = "This odd is changed";
                                                    }else{
                                                        betSideBar.data[oddsBet_i].oddMessage = "This odd is deactivated";
                                                    }
                                                }else if(!eventData.market[mak_i].Outcomes[odd_j].OutcomeStatus){
                                                    betSideBar.data[oddsBet_i].oddMessage = "This market is deactivated";
                                                }
                                            }
                                        }
                                    }
                                    if( betSideBar.data[oddsBet_i].MarketId === eventData.market[mak_i].MarketId && betSideBar.data[oddsBet_i].MarketName === eventData.market[mak_i].MarketName && betSideBar.data[oddsBet_i].MarketSpecifiers === eventData.market[mak_i].MarketSpecifiers){
                                        betSideBar.data[oddsBet_i].MarketStatus = eventData.market[mak_i].MarketStatus;
                                        if(eventData.market[mak_i].MarketStatus === sportsconfig.ACTIVE){
                                            betSideBar.data[oddsBet_i].marketMessage = "";
                                        }else{
                                            betSideBar.data[oddsBet_i].marketMessage = "This market is " + eventData.market[mak_i].MarketStatus;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(betOddFlag){
                        dispatch(updateSportsSidebar(betSideBar));
                    }
                })

                Root.socket.on(sportsconfig.BETSTOP , (data) => {
                    var eventData = data.data;
                    var currentPage = history.location.pathname.split("/")[1];
                    var EventStatus = currentPage === sportsconfig.matchType.sports ? getState().sports.current_tap.EventStatus : sportsconfig.matchType[currentPage];
                    var allMatchs = getState().sports.all_matchs.data;
                    var selectedSport = getState().sports.current_selected_sport;
                    var currentSelectedGame = getState().sports.currentSelectedGame;
                    var betSideBar = getState().sports.sportsSidebarData;
                    if(eventData.event_id === "sr:match:11365261"){
                        console.log("BETSTOP" , eventData.timestamp , eventData.temp);
                    }
                    if(currentPage === sportsconfig.matchType.sports || currentPage === sportsconfig.matchType.Inplay || currentPage === sportsconfig.matchType.Upcoming || currentPage === sportsconfig.matchType.sportsevent){
                        if(selectedSport.sport_id === eventData.sportid && EventStatus === eventData.EventStatus){
                            for(var betstop_i = 0 ; betstop_i < allMatchs.length ; betstop_i ++){
                                var betStopIndex = allMatchs[betstop_i].data.findIndex(item => item.event_id === eventData.event_id);
                                if(betStopIndex > -1){
                                    allMatchs[betstop_i].data[betStopIndex] = handleMarket(eventData);
                                    break;
                                }
                            }
                            dispatch({ type : SET_ALL_MATCHS, data: Object.assign({} , {data : []})});
                            dispatch({ type : SET_ALL_MATCHS, data: Object.assign({} , {data : allMatchs})});
                        }
                        if(currentSelectedGame.event_id === eventData.event_id){
                            currentSelectedGame.market = eventData.market;
                            dispatch({ type : CURRENTSELECTEGAME, data : Object.assign({} , currentSelectedGame) });
                        }
                    }
                    var betStopBetFlag = false;
                    for(var stopBet_i = 0 ; stopBet_i < betSideBar.data.length ; stopBet_i ++){
                        if(betSideBar.data[stopBet_i].event_id === eventData.event_id){
                            betSideBar.data[stopBet_i].MarketStatus = sportsconfig.SUSPENDED;
                            betSideBar.data[stopBet_i].marketMessage = "This market is Suspended";
                            betStopBetFlag = true;
                        }
                    }
                    if(betStopBetFlag){
                        dispatch(updateSportsSidebar(betSideBar));
                    }
                })
                
                Root.socket.on(sportsconfig.RecoveryEvent , (data) => {
                    var eventData = data.data;
                    console.log(eventData)
                    var allMatchs = getState().sports.all_matchs.data;
                    var currentSelectedGame = getState().sports.currentSelectedGame;
                    var betSideBar = getState().sports.sportsSidebarData;
                    for(var recovery_i = 0 ; recovery_i < allMatchs.length ; recovery_i ++){
                        for(var recovery_j = 0 ; recovery_j < allMatchs[recovery_i].data.length ; recovery_j ++){
                            allMatchs[recovery_i].data[recovery_j].produceStatus = eventData.produceStatus;
                        }
                    }
                    dispatch({ type : SET_ALL_MATCHS, data: Object.assign({} , {data : []})});
                    dispatch({ type : SET_ALL_MATCHS, data: Object.assign({} , {data : allMatchs})});
                    if(currentSelectedGame){
                        currentSelectedGame.produceStatus = eventData.produceStatus;
                        dispatch({ type : CURRENTSELECTEGAME, data : Object.assign({} , currentSelectedGame) });
                    }
                    for(var setproduceStatus_i = 0 ; setproduceStatus_i < betSideBar.data.length ; setproduceStatus_i ++){
                        betSideBar.data[setproduceStatus_i].produceStatus = eventData.produceStatus;
                        if(eventData.produceStatus){
                            betSideBar.data[setproduceStatus_i].produceMessage = "";
                        }else{
                            betSideBar.data[setproduceStatus_i].produceMessage = "sportsbook down time.";
                        }
                    }
                    dispatch(updateSportsSidebar(betSideBar));
                })
            }  
        } , 5000)
    }
}