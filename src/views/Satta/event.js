import React, { Component } from 'react'
import { connect } from 'react-redux'
import Childitem from "./childitem"
import {  Col, Row ,Button} from "reactstrap";
import {update_satta,satta_bet_save} from "../../redux/actions/satta/matka"
import {setloginpage} from "../../redux/actions/auth/loginActions"
import {get_date} from "../../redux/actions/auth/index"

export class event extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            flag : 1,
            intervaltime : ''
        }
    }

    show_loginform = () =>{
        this.props.setloginpage({login : true, register : false,forgot : false});
    }


    removeAllItem = () =>{
        this.props.update_satta({})
    }

    
    bet = () =>{
        var rows = [];
        var totalbet = 0;
        var sattas_bets = this.props.satta_bet_data;
        var betId = this.props.betId;
        var USERID = this.props.user._id;
        if(this.props.user){
            for(let i in sattas_bets){
                for(let j in sattas_bets[i]["gamesnode"]){
                    for(let k in sattas_bets[i]["gamesnode"][j]["betsnode"]){
                        for(let l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]){

                            let amount = sattas_bets[i]["gamesnode"][j]["betsnode"][k][l].amount;
                            if(parseInt(amount) !== 0){
                                totalbet += parseInt(amount);
                                let ii = sattas_bets[i]["gamesnode"][j]["betsnode"][k][l].id;
                                let ids = ii.split(":")
                                let row = Object.assign({},sattas_bets[i]["gamesnode"][j]["betsnode"][k][l],
                                    {type : "single"},
                                    {transactionid : betId},
                                    {status : "1"},
                                    {USERID : USERID},
                                    {bazaarid : ids[0]},
                                    {gameid : ids[1]},
                                );
                                rows.push(row);
                            }
                        }
                    }
                }
            }
            if(totalbet > 0){
                this.props.satta_bet_save(rows,totalbet,betId)
            }
        }
    }
    sum_ = (selects) =>{
        var amount = 0;
        for(var i in selects){
            for(var j in selects[i]){
                amount += parseInt(selects[i][j].amount);
            }
        }
        return amount;
    }

    get_options = (timers) => {
        var closetime = parseInt((timers.closetime).split(":")[0]);
        var opentime = parseInt(timers.opentime.split(":")[0]);
        var lasttime = timers.opentime.split(":")[1];
        var options = [];
        for(var i = opentime ; i <= closetime ; i++){
            let item = get_date(i + ":" + lasttime);
            options.push(item);
        } 
        return options;
    }
    

    render() {
        
        let t_data  = this.props.location[this.state.flag] ? this.props.location[this.state.flag] : this.props.location[1] ;

        const {numbers,gamesitem} = t_data;
        let bazaaritem = t_data;
        let sattas_bets = this.props.satta_bet_data;
        let totalOdds = 0;
        for(let i in sattas_bets){
            for(let j in sattas_bets[i]["gamesnode"]){
                for(let k in sattas_bets[i]["gamesnode"][j]["betsnode"]){
                    for(let l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]){
                        totalOdds += parseInt( sattas_bets[i]["gamesnode"][j]["betsnode"][k][l]["amount"]);
                    }
                }
            }
        }
        let balance_flag = this.props.balance.toFixed(0) > totalOdds ? true : false;
        var betsdata = this.props.satta_bet_data;
        var selecteditems = [];
        if(betsdata){
            if(betsdata[bazaaritem._id]){
                if(betsdata[bazaaritem._id]["gamesnode"]){
                    if(betsdata[bazaaritem._id]["gamesnode"][gamesitem._id]){
                        for(var i = 1 ; i < 4 ; i++){
                            let timer = i + "";
                            if(betsdata[bazaaritem._id]["gamesnode"][gamesitem._id]["betsnode"][timer]){
                                selecteditems.push(betsdata[bazaaritem._id]["gamesnode"][gamesitem._id]["betsnode"][timer]);
                            }
                        }
                    }
                }
            }
        }

        let timersoption = [];
        timersoption = bazaaritem.bazaartype === "3" ? this.get_options(bazaaritem.timers) : [];

        return (
            <div className='sports-background height-100'>
                 <Col md="12" className=" color-white p-1">
                    <Row>
                        {
                            bazaaritem.bazaartype === "3" ?
                                <React.Fragment>
                                   
                                    <Col xs = "12" sm="12" md="6" className="font-weight-bold align-items-center justify-content-center text-center d-flex">
                                        <span>
                                            {bazaaritem.bazaarname}
                                        </span>
                                    </Col>
                                </React.Fragment>
                            :
                                <Col xs = "12" sm="12" md="6" className="font-weight-bold align-items-center justify-content-center text-center d-flex">
                                    <span>
                                        {bazaaritem.bazaarname}
                                    </span>
                                </Col>
                        }
                        <Col md="2"  xs = "12" sm="12" className="text-center align-items-center justify-content-center d-flex">
                            <span>
                                Total : {this.sum_(selecteditems)}
                            </span>
                        </Col>
                        <Col md="2" sm="6"  xs = "6">
                            {
                                this.props.user ?  
                                    balance_flag  ? 
                                        <Button type="submit"  className="round btn-block igamez-button" color="warning" onClick={()=>this.bet()}>
                                           Place Bet
                                        </Button>
                                    :  <Button  className="round btn-block igamez-button" color="warning" onClick={()=>this.show_depositform()}> Deposit </Button>
                                : <Button className="round btn-block igamez-button" color="warning" onClick={()=>this.show_loginform()}> Bets </Button>                                                                
                            }
                        </Col>
                        <Col md="2" sm="6" xs = "6">
                            <Button className="round btn-block igamez-button" color="warning" onClick={()=>this.removeAllItem()}> Clear All </Button>                                                                
                        </Col>
                    </Row>
                </Col>
                {
                    bazaaritem.bazaartype === "3" ?
                
                        <Col md="12" className="sattaitems mb-1 color-white">
                            <Row>
                                {
                                    timersoption.map((item,i)=>(
                                        <Col md="1" onClick={()=>this.setState({intervaltime : item})} sm="3" xs="6"  className={"satta-events-items mr-1 " + (this.state.intervaltime === item ? " satta-events-items-active" : "")} key={i}>
                                            {item}
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    : null
                }
                {
                    numbers && numbers.length > 0 ? numbers.map((item,i)=>(
                        <div key ={i}>
                            <Childitem data={item}  detail = {t_data} />
                        </div>
                    )) : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    balance : state.balance.value.balance,
    user : state.auth.login.values,
    satta_bet_data : state.satta.betsdata,
    satta_bet_finace : state.satta.finacedata,
    betId : state.satta.betId
})

const mapDispatchToProps = {
    setloginpage,
    update_satta,
    satta_bet_save
}

export default connect(mapStateToProps, mapDispatchToProps)(event)
