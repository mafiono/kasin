import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Input, Row } from "reactstrap"
import { updateExchgSidebar , removeSlipItem , exchgPlaceBet } from "../../../redux/actions/exchg";
import { setloginpage } from "../../../redux/actions/auth/loginActions";
import { history } from "../../../history"
import {toast} from "react-toastify";

 class BetSidebar extends Component {
     
    state = {
         isopen : true,
         active : 'single',
     }

    changeStack(item , Stack){
        var data = this.props.betSlipData.data;
        var totalStack = 0;
        var totalOdds = 0;
        var totalMoney = 0;

        var index = data.findIndex(slipItem => slipItem.SelectionId === item.SelectionId && slipItem.Polarity === item.Polarity && slipItem.Price === item.Price);
        if(index > -1){
            data[index].Stack = Stack;
        }
        for(var i = 0 ; i < data.length ; i ++){
            if(data[i].Stack){
                totalStack = (parseFloat(totalStack) + data[i].Stack * data[i].Price).toFixed(2);
                if(data[i].Stack < 5) {
                    data[i].message = "The minimum bet amount is 5 INR.";
                }else{
                    totalMoney = (parseFloat(totalMoney) + parseFloat(data[i].Stack)).toFixed(2);
                    data[i].message = "";
                }
            }
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].Price)).toFixed(2);
        }
        var sendData = { 
            data , 
            totalStack : parseFloat(totalStack).toFixed(2),
            totalOdds : parseFloat(totalOdds).toFixed(2),
            totalMoney : parseFloat(totalMoney).toFixed(2)
        };
        this.props.updateExchgSidebar(sendData);
    }

    placeBet(){
        var betData = this.props.betSlipData;
        for(var i = 0 ; i < betData.data.length ; i ++){
            var oneBet = betData.data[i];
            if(oneBet.Stack < 5){
                toast.error("Place bet is refused. Please check betslip!");
                return;
            }
        }
        this.props.exchgPlaceBet(betData.data);
    }

    render() {
        return (
            this.props.betSlipData.data && this.props.betSlipData.data.length ? (
                <div className='sports-bet-sidebar'>
                    <div className='betslip'>
                        <div className='wrapper active u-bordercolor-piccolo'>
                            <ul className='betslip-tabs'>
                                <li className='tab'>
                                    <div className={this.state.active==='single' ? 'active' :''}>Single
                                        <span className="amount">{this.props.betSlipData.data ? this.props.betSlipData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='tab'>
                                    <div className={this.state.active==='multi' ? 'active' :''}>Multi
                                        <span className="amount">{this.props.betSlipData.data ? this.props.betSlipData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='button'>
                                    <div onClick={()=>this.setState({isopen : !this.state.isopen})}>
                                        <svg fill="#fff" height="32" width="32" viewBox="0 0 512 512">
                                            {
                                                this.state.isopen?(
                                                    <path d="M507 205.8H5v100.4h502z"></path>
                                                ):(
                                                    <path d="M506.997 205.799H306.201V5H205.799v200.799H5.003v100.399h200.796V507h100.402V306.198h200.796z"></path>
                                                )
                                            }
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            {this.state.isopen?(
                                <>
                                    <div className='scrolllock'>
                                    {
                                        this.state.active === 'single' ? (this.props.betSlipData.data ? this.props.betSlipData.data.map((item, i)=>(
                                            <div key={i} className='bets'>
                                                <div>
                                                    <div className='event'>
                                                        <div className='target'>
                                                            <div className="title">{item.matchName}{item.Name}</div>
                                                            <span className="animate">
                                                                <span>{item.SelectionId}</span>
                                                            </span>
                                                        </div>                                                        
                                                        <div className='type' style = {{color : 'white'}}>
                                                            {item.Name}
                                                        </div>
                                                        <div className='target'>
                                                            <div className="team">{item.marketName}</div>
                                                            <span className="animate">
                                                                <span className="u-color-piccolo">{item.Price}</span>
                                                            </span>
                                                        </div>
                                                        <div className='BetInput jZDdQz'>
                                                            <Input value = {item.Stack ? item.Stack : ""} onChange = {(e) => this.changeStack(item , e.target.value ? e.target.value : 0)} className='round mt-1' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>
                                                        </div>
                                                        <div className='event-footer mt-1' style={{display:'flex'}}>
                                                            <div onClick = {() => this.props.removeSlipItem(item)} className='remove u-color-piccolo'>
                                                                Remove&nbsp;&nbsp;<b>×</b>
                                                            </div>
                                                            <div className='potentialwin' style = {{color : 'white'}}>
                                                                {"Potential win : "}
                                                                <span className="sum">&nbsp;{"INR "}
                                                                    <span className="numbers">{ "0.00" }</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='event-footer mt-1' style={{display:'flex' , color : "red"}}>
                                                            <b>{item.message}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )):null):(this.props.betSlipData.data ? this.props.betSlipData.data.map((item, i)=>(
                                            <div key={i} className='bets'>
                                                {/* <div className='event'>
                                                    <div className='title'>
                                                        {item.AwayCompetitor.Name+' - '+item.HomeCompetitor.Name}
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
                                                        this.state.priceBoost ? 
                                                            (
                                                                this.props.betSlipData.priceBoost ? 
                                                                    (
                                                                        item.priceBoost ? 
                                                                            <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                                                <Button.Ripple onClick = {() => this.removePriceBoost(item)} className="square" style={{width:'100%'}} outline color="info">
                                                                                    <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Remove to " + (parseFloat(item.OutcomeOdds) - 0.05)}</span>
                                                                                </Button.Ripple>
                                                                            </Col> : ""
                                                                    )
                                                                        : 
                                                                    <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                                        <Button.Ripple onClick = {() => this.setPriceBoost(item)} className="square" style={{width:'100%'}} outline color="info">
                                                                            <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Price Boost to " + (parseFloat(item.OutcomeOdds) + 0.05)}</span>
                                                                        </Button.Ripple>
                                                                    </Col> 
                                                                    
                                                            ) : "" 
                                                    }                                                            
                                                    <div className='event-footer mt-1' style={{display:'flex'}}>
                                                        <div className='remove u-color-piccolo'  onClick={()=>this.props.removeItem(item)}>
                                                            Remove&nbsp;&nbsp;<b>×</b>
                                                        </div>
                                                    </div>
                                                    <div className='event-footer mt-1' style={{display:'flex' , color : "red"}}>
                                                        <b>{item.message}</b>
                                                    </div>
                                                </div> */}
                                            </div>
                                        )):null)
                                    }
                                    {
                                        this.state.active !== 'single' ? (
                                            <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                                {/* <div className='lower'>
                                                    <Input value={this.state.multiAmount ? this.state.multiAmount : ""} onChange = {(e) => this.multiAmountChange(e.target.value)} className='round' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>
                                                </div>
                                                <div className='event-footer pt-1' style={{display:'flex'}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',color : 'white'}}>
                                                        Potential Winnings
                                                    </div>
                                                </div>
                                                <div className='event-footer pt-1' style={{display:'flex'}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total stake:
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum"> {"INR "}
                                                            <span className="numbers">{this.props.betSlipData.totalStack ? this.props.betSlipData.totalStack : 0.00}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer pt-1' style={{display:'flex'}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total Odds:
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum">
                                                            <span className="numbers">{this.props.betSlipData.totalOdds ? this.props.betSlipData.totalOdds : 0.00}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer mt-1' style={{display:'flex' , color : "red"}}>
                                                    <b>{this.props.betSlipData.message}</b>
                                                </div>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        {
                                                            this.props.user ? (
                                                                (this.props.balance && this.props.balance >= this.state.multiAmount) ? (
                                                                    this.props.betSlipData.oddsChange ? (
                                                                        <Button 
                                                                            onClick = {()=>this.updateOdds()}  
                                                                            className="round btn-block" 
                                                                            color="success"> 
                                                                            {"Update Odds"}
                                                                        </Button>
                                                                    ) : (
                                                                        <Button 
                                                                            onClick = {()=>this.bet()}  
                                                                            className="round btn-block" 
                                                                            color="success"> 
                                                                            {this.state.multiAmount ? "Place Bet " + this.state.multiAmount + " INR": "Place Bet "}
                                                                        </Button> 
                                                                    )
                                                                ) : <Button 
                                                                        className="round btn-block" 
                                                                        color="success"> Deposit 
                                                                    </Button>
                                                            ) : <Button className="round btn-block" color="success"> Login </Button>                                                                
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        <div onClick={()=>this.props.removeAllItem()} className='remove u-color-piccolo' style={{textAlign:'center', cursor:'pointer'}}>
                                                            Remove all bets&nbsp;&nbsp;×
                                                        </div>
                                                    </Col>
                                                </Row> */}
                                            </div>
                                        ):(
                                            <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                                <div className='event-footer' style={{display:'flex',}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total stake :
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum"> {"INR "}
                                                            <span className="numbers">{this.props.betSlipData.totalStack ? this.props.betSlipData.totalStack : "0.00"}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer' style={{display:'flex',}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total Odds :
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum">
                                                            <span className="numbers">{this.props.betSlipData.totalOdds}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer' style={{display:'flex',}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total Bet :
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum">
                                                            <span className="numbers">INR&nbsp;&nbsp;{this.props.betSlipData.totalMoney}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        {
                                                            this.props.user ? (
                                                                this.props.balance && this.props.balance >= this.props.betSlipData.totalMoney ? (
                                                                    <Button onClick = {() => this.placeBet()} className="round btn-block igamez-button" color="success">
                                                                        {this.props.betSlipData.totalMoney ? "Place Bet " + this.props.betSlipData.totalMoney + " INR": "Place Bet "}
                                                                    </Button>
                                                                ) : <Button onClick={()=>history.push("/mywallet/deposit")} className="round btn-block igamez-button" color="success"> Deposit </Button>
                                                            ) : <Button onClick = {() => this.props.setloginpage({login : true, register : false , forgot : false})} className="round btn-block igamez-button" color="success"> Login </Button>                                                                
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        <div onClick={()=>this.props.updateExchgSidebar({data : [] , totalOdds : 0 , totalMoney : 0 , totalStack : 0})} className='remove u-color-piccolo' style={{textAlign:'center', cursor:'pointer'}}>
                                                            Remove all bets&nbsp;&nbsp;×
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                    </div>
                                </>
                            ):null}
                        </div>
                    </div>
                </div>
            ):<div/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        betSlipData : state.exchgange.betSlipData,
        user : state.auth.login.values,
        balance : state.balance.value.balance,
    }
}

const mapDispatchToProps = {
    updateExchgSidebar , setloginpage , removeSlipItem , exchgPlaceBet
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSidebar)