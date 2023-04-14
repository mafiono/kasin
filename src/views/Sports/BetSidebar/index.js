import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Row ,FormGroup, Label } from "reactstrap";
import { TrendingUp , TrendingDown } from "react-feather";
import { removeItem,removeAllItem,placeBet,updateSportsSidebar,changeBetType,setItem } from "../../../redux/actions/sports";
import { setloginpage } from "../../../redux/actions/auth/loginActions";
import { ChevronDown, ChevronRight , Plus } from "react-feather";
import { toast } from "react-toastify";
import { history } from "../../../history"
import Select from "react-select";
import sportsconfig from "../../../configs/sportsconfig";

class BetSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active : sportsconfig.SINGLE,
            isopen : true,
            smartBetFlag : false,
            multiAmount : 0,
            priceBoost : false,

            matchData : [{value : "" , label : "Please select Match"}],
            marketData : [{value : "" , label : "Please select Market"}],
            OddsData : [{value : "" , label : "Please select Odd"}],

            smartMatchId: "",
            smartMarketId: "",
            smartOddId: "",
        }
    }

    componentDidUpdate(prevProps){
        // if(prevProps.all_matchs.data !== this.props.all_matchs.data){
        //     var setData = [];
        //     for(var i = 0 ; i < this.props.all_matchs.data.length ; i ++){
        //         var temp = {
        //             value : this.props.all_matchs.data[i].event_id,
        //             label : this.props.all_matchs.data[i].event_id.split(":")[2]
        //         }
        //         setData.push(temp);
        //     }
        //     this.setState({matchData : setData});
        // }
    }

    changeType(type){
        this.setState({active:type, isopen:true});
        this.props.changeBetType(type);
        var data = this.props.sportsSidebarData;
        var totalOdds = 0;
        if(type === "multi"){
            var totalStack = this.state.multiAmount;
            for(var i = 0 ; i < data.data.length ; i ++){
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
                if(totalStack) totalStack = (parseFloat(totalStack) * parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
            }
            data.totalStack = totalStack;
            data.totalOdds = totalOdds;
            data.totalMoney = this.state.multiAmount
        }else{
            var totalStack1 = 0;
            var totalMoney = 0;
            for(var j = 0 ; j < data.data.length ; j ++){
                totalStack1 = (parseFloat(totalStack1) + (parseFloat(data.data[j].amount ? data.data[j].amount : 1) * parseFloat(data.data[j].OutcomeOdds))).toFixed(2);
                totalMoney = (parseFloat(totalMoney) + parseFloat(data.data[j].amount ? data.data[j].amount : 0)).toFixed(2);
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[j].OutcomeOdds)).toFixed(2);
            }
            data.totalStack = totalStack1
            data.totalMoney = totalMoney
            data.totalOdds = totalOdds
        }
        this.props.updateSportsSidebar(data);
    }

    changeAmount(item , value){
        var data = this.props.sportsSidebarData.data;
        var totalStack = 0;
        var totalOdds = 0;
        var totalMoney = 0;

        for(var i = 0 ; i < data.length ; i ++){
            if(data[i].OutcomeId === item.OutcomeId && 
                data[i].OutcomeName === item.OutcomeName && 
                data[i].MarketId === item.MarketId && 
                data[i].MarketName === item.MarketName && 
                data[i].MarketSpecifiers === item.MarketSpecifiers && 
                data[i].event_id === item.event_id){
                data[i].amount = value; 
            }
            if(data[i].amount){
                totalStack = (parseFloat(totalStack) + parseFloat(data[i].amount * data[i].OutcomeOdds)).toFixed(2);
                if(data[i].amount < 5) {
                    data[i].amountMessage = "The minimum bet amount is 5 INR.";
                }else{
                    totalMoney = (parseFloat(totalMoney) + parseFloat(data[i].amount)).toFixed(2);
                    data[i].amountMessage = "";
                }
            }
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2);
        }

        let sendData = {
            data : data,
            totalStack : totalStack,
            totalOdds : totalOdds,
            totalMoney : totalMoney,
            oddsChange : this.props.sportsSidebarData.oddsChange
        }
        console.log('sendData', sendData)
        this.props.updateSportsSidebar(sendData);
    }

    multiAmountChange(value){
        if(!value) value = 0
        this.setState({multiAmount : value});
        var data = this.props.sportsSidebarData.data;
        var totalStack = value;
        var totalOdds = 0;
        for(var i = 0 ; i < data.length ; i ++){
            totalStack = (parseFloat(totalStack) * parseFloat(data[i].OutcomeOdds)).toFixed(2);
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2);
        }
        var sendData = {
            data : data,
            totalStack : totalStack,
            totalOdds : totalOdds,
            totalMoney : value,
            amountMessage : value < 5 ? "The minimum bet amount is 5 INR." : ""
        }
        this.props.updateSportsSidebar(sendData);
    }

    bet(){
        var betData = this.props.sportsSidebarData;
        var sendData = {};
        var navBetData = [];
        var data = betData.data;

        if(this.state.active === sportsconfig.SINGLE){
            for(var i = 0 ; i <data.length ;i ++){
                if( !data[i].amount || data[i].amount < 5){
                    toast.error("The minimum bet is 5 INR.");
                    return;
                }
                if(data[i].MarketStatus === sportsconfig.SUSPENDED || data[i].MarketStatus === sportsconfig.DEACTIVATED || data[i].EventStatus === "Finished" || !data[i].OutcomeStatus){
                    toast.warn("There are exist not allowed market!")
                    return;
                } 
                if(data[i].produceStatus === false){
                    toast.warn("Please check your network connection!")
                    return;
                }
                var singleTemp = {
                    GAMEID : data[i].event_id,
                    LAUNCHURL : "SPORTS",
                    AMOUNT : data[i].amount,
                    betting : {
                        OutcomeId : data[i].OutcomeId,
                        OutcomeName : data[i].OutcomeName,
                        OutcomeOdds : data[i].OutcomeOdds,
                        MarketId : data[i].MarketId,
                        MarketSpecifiers : data[i].MarketSpecifiers,
                        MarketName : data[i].MarketName,
                        sportid : data[i].sportid,
                        MatchName : data[i].AwayCompetitor + " - " + data[i].HomeCompetitor,
                        priceBoost : data[i].priceBoost ? data[i].priceBoost : false
                    },
                }
                navBetData.push(singleTemp);
            }
            sendData.betType = "SINGLE";
            sendData.allAmount = betData.totalMoney;
        }
        else{
            if(this.state.multiAmount < 5){
                toast.error("The Bet Minimum Amount is 5 INR.");
                return;
            }
            for(var j = 0 ; j < data.length ; j ++){
                if(data[i].MarketStatus === sportsconfig.SUSPENDED || data[i].MarketStatus === sportsconfig.DEACTIVATED || data[j].EventStatus === "Finished" || !data[i].OutcomeStatus){
                    toast.warn("There are exist not allowed market!")
                    return;
                } 
                if(data[j].produceStatus === false){
                    toast.warn("Please check your network connection!")
                    return;
                }
                var multiTemp = {
                    GAMEID : data[j].event_id,
                    // USERID : userId,
                    LAUNCHURL : "SPORTS",
                    AMOUNT : this.state.multiAmount,
                    betting : {
                        OutcomeId : data[j].OutcomeId,
                        OutcomeName : data[j].OutcomeName,
                        OutcomeOdds : data[j].OutcomeOdds,
                        MarketId : data[j].MarketId,
                        MarketSpecifiers : data[j].MarketSpecifiers,
                        MarketName : data[j].MarketName,
                        sportid : data[j].sportid,
                        MatchName : data[j].HomeCompetitor + " - " + data[j].AwayCompetitor,
                        priceBoost : data[j].priceBoost ? data[j].priceBoost : false,
                        handleState : false
                    },
                }
                navBetData.push(multiTemp);
            }
            sendData.betType = "MULTI";
            sendData.allAmount = this.state.multiAmount;
        }
        sendData.bet = navBetData;
        // sendData.user = userId;
        sendData.betId = this.props.betId;
        this.setState({multiAmount : 0})
        this.props.placeBet(sendData);
    }

    updateOdds(){
        var betData = this.props.sportsSidebarData;
        for(var bet_i = 0 ; bet_i < betData.data.length ; bet_i ++){
            betData.totalOdds = (parseFloat(betData.totalOdds) - parseFloat(betData.data[bet_i].OutcomeOdds) + parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2);
            if(betData.data[bet_i].amount){
                if(this.state.active === sportsconfig.SINGLE){
                    betData.totalStack = (parseFloat(betData.totalStack) - 
                        parseFloat(betData.data[bet_i].OutcomeOdds) * parseFloat(betData.data[bet_i].amount) + 
                        parseFloat(betData.data[bet_i].OutcomeOdds_) * parseFloat(betData.data[bet_i].amount)).toFixed(2);
                }else{
                    betData.totalStack = (parseFloat(betData.totalStack) / 
                        parseFloat(betData.data[bet_i].OutcomeOdds) * 
                        parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2);                    
                }
            }
            if(betData.data[bet_i].OutcomeOdds_){
                if(betData.data[bet_i].priceBoost){
                    betData.data[bet_i].OutcomeOdds = parseFloat(betData.data[bet_i].OutcomeOdds_) + 0.05;
                }else{
                    betData.data[bet_i].OutcomeOdds = betData.data[bet_i].OutcomeOdds_;
                }
                betData.data[bet_i].oddMessage = "";
                betData.data[bet_i].OutcomeOdds_ = null;
            }
        }
        betData.oddsChange = false;
        this.props.updateSportsSidebar(betData);
    }

    setPriceBoost(data){
        var betData = this.props.sportsSidebarData;
        var index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id );
        betData.data[index].OutcomeOdds = (parseFloat(data.OutcomeOdds) + 0.05).toFixed(2);
        betData.data[index].priceBoost = true
        betData.priceBoost = true;
        this.props.updateSportsSidebar(betData);
        this.setState({priceBoost : false})
    }

    removePriceBoost(data){
        var betData = this.props.sportsSidebarData;
        var index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id );
        betData.data[index].OutcomeOdds = (parseFloat(data.OutcomeOdds) - 0.05).toFixed(2)
        betData.data[index].priceBoost = false;
        betData.priceBoost = false;
        this.props.updateSportsSidebar(betData);
        this.setState({priceBoost : false})
    }
    
    matchChange(e){
        // this.setState({smartMatchId : e});
        // var index = this.props.all_matchs.data.findIndex(item => item.event_id === e);
        // var market = [{value : "" , label : "Please Select Market"}];
        // if(index >= -1){
        //     market = [];
        //     if(this.props.all_matchs.data[index].market && this.props.all_matchs.data[index].market.length){
        //         for(var i = 0 ; i < this.props.all_matchs.data[index].market.length ; i ++){
        //             var temp = {
        //                 value : this.props.all_matchs.data[index].market[i].MarketId
        //             }
        //             if(this.props.all_matchs.data[index].market[i].MarketSpecifiers){
        //                 temp.label = this.props.all_matchs.data[index].market[i].MarketName + "(" + this.props.all_matchs.data[index].market[i].MarketSpecifiers + ")";
        //             }else{
        //                 temp.label = this.props.all_matchs.data[index].market[i].MarketName;
        //             }
        //             market.push(temp);
        //         }
        //     }
        // }
        // this.setState({marketData : market})
    }

    changeMarket(e){
        // this.setState({smartMarketId : e});
        // var index = this.props.all_matchs.data.findIndex(item => item.event_id === this.state.smartMatchId);
        // var index_ = this.props.all_matchs.data[index].market.findIndex(item => item.MarketId === e);
        // var odd = [{value : "" , label : "Please Select Odds"}];
        // if(this.props.all_matchs.data[index].market[index_].Outcomes && this.props.all_matchs.data[index].market[index_].Outcomes.length){
        //     odd = [];
        //     for(var i = 0 ; i < this.props.all_matchs.data[index].market[index_].Outcomes.length ; i ++){
        //         var temp = {
        //             value : this.props.all_matchs.data[index].market[index_].Outcomes[i].OutcomeId,
        //             label : this.props.all_matchs.data[index].market[index_].Outcomes[i].OutcomeName,
        //         }
        //         odd.push(temp);
        //     }
        // }
        // this.setState({OddsData : odd});
    }

    smartBet(){
        // if(!this.state.smartMatchId || !this.state.smartMarketId || !this.state.smartOddId){
        //     toast.error("Please select correct odds.");
        //     return;
        // }
        // var match = this.props.all_matchs.data.findIndex(item => item.event_id === this.state.smartMatchId);
        // var market = this.props.all_matchs.data[match].market.findIndex(item => item.MarketId === this.state.smartMarketId);
        // var odd = this.props.all_matchs.data[match].market[market].Outcomes.findIndex(item => item.OutcomeId === this.state.smartOddId);
        // this.props.setItem(Object.assign({}, this.props.all_matchs.data[match] , this.props.all_matchs.data[match].market[market] , this.props.all_matchs.data[match].market[market].Outcomes[odd]));
    }

    render() {
        const {
            active,
            isopen,
            smartBetFlag,
            matchData,
            marketData,
            OddsData,
            priceBoost,
            multiAmount,
        }=this.state;
        const {
            sportsSidebarData,
            betId,
            removeItem,
            user,
            balance,
            setloginpage,
            removeAllItem,
        }=this.props;
        return (
            sportsSidebarData.data && sportsSidebarData.data.length ? (
                <div className='sports-bet-sidebar'>
                    <div className='betslip'>
                        <div className='wrapper active u-bordercolor-piccolo'>
                            <ul className='betslip-tabs'>
                                <li className='tab' onClick={() => this.changeType(sportsconfig.SINGLE)}>
                                    <div className={active === sportsconfig.SINGLE ? 'active':''}>Single
                                        <span className="amount">{sportsSidebarData.data ? sportsSidebarData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='tab' onClick={() => this.changeType(sportsconfig.MULTI)}>
                                    <div className={active === sportsconfig.MULTI ? 'active':''}>Multi
                                        <span className="amount">{sportsSidebarData.data ? sportsSidebarData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='button'>
                                    <div onClick={()=>this.setState({isopen:!isopen})}>
                                        <svg fill="#fff" height="32" width="32" viewBox="0 0 512 512">
                                            {isopen?
                                                <path d="M507 205.8H5v100.4h502z"></path>:
                                                <path d="M506.997 205.799H306.201V5H205.799v200.799H5.003v100.399h200.796V507h100.402V306.198h200.796z"></path>
                                            }
                                        </svg>
                                    </div>
                                </li>
                            </ul>
    
                            {isopen ? (
                                <React.Fragment>
                                    <Row onClick={()=>this.setState({smartBetFlag:!smartBetFlag})} className={(smartBetFlag ? 'sports-country-active':'sports-country')}>
                                        <Col sm='12' className='sports-country-title'>
                                            <div className='sports-country-name'> SMART BET </div>
                                            <div>
                                                {smartBetFlag ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                                            </div>
                                        </Col>
                                    </Row>
                                    {
                                        smartBetFlag &&
                                            <Row className='sports-country'>
                                                <Col lg='12' md='12' sm='12' xs='12'>
                                                    <FormGroup>
                                                        <Label for="STATUS"> Match Id </Label>
                                                        <Select
                                                            className="React"
                                                            classNamePrefix="select"
                                                            options={matchData}
                                                            defaultValue={matchData[0]}
                                                            onChange={e => this.matchChange(e.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg='12' md='12' sm='12' xs='12'>
                                                    <FormGroup>
                                                        <Label for="STATUS"> Market </Label>
                                                        <Select
                                                            className="React"
                                                            classNamePrefix="select"
                                                            options={marketData}
                                                            defaultValue={marketData[0]}
                                                            onChange={e => this.changeMarket(e.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg='12' md='12' sm='12' xs='12'>
                                                    <FormGroup>
                                                        <Label for="STATUS"> Odds </Label>
                                                        <Select
                                                            className="React"
                                                            classNamePrefix="select"
                                                            options={OddsData}
                                                            defaultValue={OddsData[0]}
                                                            onChange={e => this.setState({smartOddId : e.value})}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg='11' md='11' sm='11' xs='11' className = "ml-1">
                                                    <Button
                                                        className="add-new-btn ml-1 igamze-button"
                                                        color="primary"
                                                        outline
                                                        onClick={() => this.smartBet()}>
                                                        <Plus size={15} />
                                                        <span className="align-middle" color="primary" > Add Bet </span>
                                                    </Button>
                                                </Col>
                                            </Row>
                                    }
                                    <Row className='p-1'>
                                        <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                            <Button.Ripple onClick = {() => this.setState({priceBoost : !priceBoost})} className="square igamze-button" style={{width:'100%'}} outline color="info">
                                                <TrendingUp size={15}/><span>&nbsp;&nbsp;Price Boost</span>
                                            </Button.Ripple>
                                        </Col>
                                    </Row>
                                    <Row className='p-1'>
                                        <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                            <Input value={"Bet Id : " + betId } className='round' style = {{color : 'white' , opacity : "1" , textAlign : 'center'}} readOnly />
                                        </Col>
                                    </Row>
    
                                    <div className='scrolllock'>
                                        {
                                            sportsSidebarData.data.map((item , i) => (
                                                <div key = {i} className='bets'>
                                                    <div>
                                                        <div className='event'>
                                                            <div className='target'>
                                                                <div className="title">{item.AwayCompetitor+' - '+item.HomeCompetitor}</div>
                                                                <span className="animate">
                                                                    <span>{item.event_id.split(":")[2]}</span>
                                                                </span>
                                                            </div>                                                        
                                                            <div className='type' style = {{color : 'white'}}>
                                                                {item.MarketName}
                                                            </div>
                                                            <div className='target'>
                                                                <div className="team">{item.OutcomeName}</div>
                                                                <span className="animate">
                                                                    <span className="u-color-piccolo">{item.OutcomeOdds}</span>
                                                                </span>
                                                            </div>
                                                            {
                                                                priceBoost ?
                                                                    sportsSidebarData.priceBoost ?
                                                                        item.priceBoost &&
                                                                        <Button onClick = {() => this.removePriceBoost(item)} className="square igamze-button" style={{width:'100%'}} outline color="info">
                                                                            <TrendingDown size={15}/><span>&nbsp;&nbsp;{"Remove to " + (parseFloat(item.OutcomeOdds) - 0.05).toFixed(2)}</span>
                                                                        </Button>
                                                                    :   <Button onClick = {() => this.setPriceBoost(item)} className="square igamze-button" style={{width:'100%'}} outline color="info">
                                                                            <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Price Boost to " + (parseFloat(item.OutcomeOdds) + 0.05).toFixed(2)}</span>
                                                                        </Button>
                                                                    :active === sportsconfig.SINGLE && <Input  value = {item.amount ? item.amount : ""}  onChange = {(e) => this.changeAmount(item , e.target.value)} className='round mt-1' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>
                                                                
                                                            }
                                                            <div className='event-footer mt-1'>
                                                                <div className='remove u-color-piccolo' onClick={()=>removeItem(item)}>
                                                                    Remove&nbsp;×
                                                                </div>
                                                                {
                                                                    active === sportsconfig.SINGLE &&
                                                                        <div className='potentialwin' style = {{color : 'white'}}>
                                                                            {"Potential win : "}
                                                                            <span className="sum">&nbsp;{"INR "}
                                                                                <span className="numbers">{ item.amount ? parseFloat(item.amount * item.OutcomeOdds).toFixed(2) : 0.00}</span>
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                            { item.produceMessage && <ErrorComponent message = {item.produceMessage} /> }
                                                            { item.eventMessage && <ErrorComponent message = {item.eventMessage} />}
                                                            { item.oddMessage && <ErrorComponent message = {item.oddMessage} />}
                                                            { item.marketMessage && <ErrorComponent message = {item.marketMessage} />}
                                                            { item.amountMessage && active === sportsconfig.SINGLE && <ErrorComponent message = {item.amountMessage} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                            {
                                                active === sportsconfig.MULTI &&
                                                    <React.Fragment>
                                                        <div className='lower'>
                                                            <Input value={multiAmount ? multiAmount : ""} onChange = {(e) => this.multiAmountChange(e.target.value)} className='round' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>
                                                        </div>
                                                        <div className='event-footer pt-1' style={{display:'flex'}}>
                                                            <div style={{display:'flex', justifyContent:'flex-start',color : 'white'}}>
                                                                Potential Winnings
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                            }
                                            <div className='event-footer pt-1' style={{display:'flex'}}>
                                                <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                    Total stake:
                                                </div>
                                                <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                    <span className="sum"> {"INR "}
                                                        <span className="numbers">{sportsSidebarData.totalStack ? sportsSidebarData.totalStack : 0.00}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='event-footer pt-1' style={{display:'flex'}}>
                                                <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                    Total Odds:
                                                </div>
                                                <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                    <span className="sum">
                                                        <span className="numbers">{sportsSidebarData.totalOdds ? sportsSidebarData.totalOdds : 0.00}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                active === sportsconfig.MULTI ? <ErrorComponent message = {sportsSidebarData.amountMessage} />: ""
                                            }
                                        </div>
                                        <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                            <Row>
                                                <Col md={12} className='pt-1 pl-1 pr-1'>
                                                    {
                                                        user ? (
                                                            (balance && 
                                                                balance.balance >= ( active === sportsconfig.active ? this.sportsSidebarData.totalMoney : multiAmount)
                                                            ) ? (
                                                                sportsSidebarData.oddsChange ?
                                                                    <Button onClick = {()=>this.updateOdds()}  className="round btn-block igamez-button" color="success"> {"Update Odds"}</Button>:
                                                                    <Button onClick = {()=>this.bet()}  className="round btn-block igamez-button" color="success"> {(active === sportsconfig.active ? this.sportsSidebarData.totalMoney : multiAmount) ? "Place Bet " + (active === sportsconfig.active ? this.sportsSidebarData.totalMoney : multiAmount) + " INR": "Place Bet "}</Button> 
                                                            ) : <Button onClick={()=>history.push("/mywallet/deposit")} className="round btn-block igamez-button" color="success"> Deposit </Button>
                                                        ) : <Button onClick = {() => setloginpage({login : true, register : false , forgot : false})} className="round btn-block igamez-button" color="success"> Login </Button>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12} className='pt-1 pl-1 pr-1'>
                                                    <div onClick={()=>removeAllItem()} className='remove u-color-piccolo' style={{textAlign:'center', cursor:'pointer'}}>
                                                        Remove all bets&nbsp;&nbsp;×
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : <div/>}
                        </div>
                    </div>
                </div>
            ) : <div/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sportsSidebarData : state.sports.sportsSidebarData,
        balance : state.balance.value,
        user : state.auth.login.values,
        betId : state.sports.betId
    }
}

const mapDispatchToProps = {
    setloginpage,
    removeItem,
    removeAllItem,
    placeBet,
    updateSportsSidebar,
    changeBetType,
    setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSidebar)

class ErrorComponent extends Component {
    render(){
        return(
            <div className='event-footer mt-1'>
                <b>{this.props.message}</b>
            </div>
        )
    }
}