import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Col, Row,Input } from "reactstrap";
import {update_satta,satta_bet_save} from "../../redux/actions/satta/matka"
import {setloginpage} from "../../redux/actions/auth/loginActions"
import {toast} from "react-toastify"

export class childitem extends Component {
    
    constructor(props){
        super(props)
        this.state={
            isopen:true,
            active : null
        }
    }

    IsOpen(){
        this.setState({isopen: !this.state.isopen});
    }

    itemselect = (item) =>{
        var row = this.props.satta_bet_data;
        let sattas_bets = this.props.satta_bet_data;
        var bazaaritem = this.props.detail;
        var time_flag = this.props.data.timerflag;
        var name = this.props.data.name;
        var type = this.props.data.type;
        var gameitem = this.props.detail.gamesitem;
        var gamename = gameitem.name;
        var detail = null;
        let betnumber = item;
        let time_flag1 = time_flag;
        let is_exist = false;
        let exit_item = null;
        for(let i in sattas_bets){
            for(let j in sattas_bets[i]["gamesnode"]){
                for(let k in sattas_bets[i]["gamesnode"][j]["betsnode"]){
                    for(let l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]){
                        let b_node = sattas_bets[i]["gamesnode"][j]["betsnode"][k][l];
                        if(b_node.detail && b_node.detail.require && name !== b_node.detail.text){
                            toast.warn("Please select " +b_node.detail.text);    
                            return;
                        }else if(b_node.detail && b_node.detail.require && name === b_node.detail.text){
                            exit_item = b_node;
                            is_exist = true;
                        }
                    }
                }
            }
        }
       

        if(gameitem._id === "5fcf027188835f04b5f2f86b" || gameitem._id === "5fcf028888835f04b5f2f86c" ){
            detail = {};

            if(is_exist){
                console.log(type)
                switch(type){
                    case 1 :
                        gamename += " A";
                        detail = {
                            require : false,
                            betnumber : exit_item.betnumber,
                            time_flag : exit_item.time_flag,
                            name : "Close Single Ank"
                        }
                    break;

                    case 2 :
                        item = exit_item.betnumber;
                        time_flag = exit_item.time_flag;
                        detail = {
                            require : false,
                            betnumber : betnumber,
                            time_flag : time_flag1,
                            name : "Close Single Ank"
                        }
                    break;

                    case 3 :
                        gamename += " B";
                        detail = {
                            require : false,
                            betnumber : exit_item.betnumber,
                            time_flag : exit_item.time_flag,
                            name : "Open Single Ank"
                        }
                    break;
                    
                    case 4 :
                        item = exit_item.betnumber;
                        time_flag = exit_item.time_flag;
                        detail = {
                            require : false,
                            betnumber : betnumber,
                            time_flag : time_flag1,
                            name : "Open Single Ank"
                        }
                    break;

                    case 5 :
                        detail = {
                            require : false,
                            betnumber : exit_item.betnumber,
                            time_flag : exit_item.time_flag,
                            name : "Close Pana "
                        }
                    break;

                    case 6 :
                        item = exit_item.betnumber;
                        time_flag = exit_item.time_flag;
                        detail = {
                            require : false,
                            betnumber : betnumber,
                            time_flag : time_flag1,
                            name : "Close Pana "
                        }
                    break;
                  
                    
                    default :
                    break;
                }   
            }else{
                console.log(type)
                switch(type){
                    case 1 :
                        gamename += " A";
                        detail = {
                            text : "Close Single Ank",
                            require : true
                        }
                    break;

                    case 2 :
                        gamename += " A";
                        detail = {
                            text : "Open Pana",
                            require : true
                        }
                    break;

                    case 4 :
                        gamename += " B";
                        detail = {
                            text : "Close Pana",
                            require : true
                        }
                    break;

                    case 3 :
                        gamename += " B";
                        detail = {
                            text : "Open Single Ank",
                            require : true
                        }
                    break;

                    case 5 :
                        detail = {
                            text : "Close Pana.",///    space keyboard
                            require : true
                        }
                    break;

                    case 6 :
                        detail = {
                            text : "Open Pana.",
                            require : true
                        }
                    break;

                    default :
                    break;

                }
            }

        }
        
        var oddsprice =  bazaaritem["gamelink"][gameitem._id]['oddsprice'];

        if(row[bazaaritem._id]){
            if(row[bazaaritem._id]["gamesnode"][gameitem._id]){
                if(row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]){
                    if(!row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag][item]){
                        let betnode =  Object.assign({},row,{});
                        if(gameitem._id === "5fcf027188835f04b5f2f86b" || gameitem._id === "5fcf028888835f04b5f2f86c"  ){
                            if(type === 1 || type === 3 || type === 5){
                                if(exit_item && row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][exit_item.time_flag][exit_item.betnumber]){
                                    if(betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item + ":" + exit_item.betnumber]){
                                        toast.warn("it is repeated");
                                        return;
                                    }else{
                                        betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item + ":" + exit_item.betnumber] = {
                                            betnumber : item,
                                            id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                                            roundid : new Date().valueOf(),
                                            amount : 0,
                                            winamount : 0,
                                            name : name,
                                            time_flag : time_flag,
                                            detail : detail,
                                            gamename : gamename
                                        }
                                        delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][exit_item.time_flag][exit_item.betnumber];
                                    }
                                }else{
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                        betnumber : item,
                                        id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                                        roundid : new Date().valueOf(),
                                        amount : 0,
                                        winamount : 0,
                                        name : name,
                                        time_flag : time_flag,
                                        detail : detail,
                                        gamename : gamename
                                    }
                                }
                            }else{
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                    betnumber : item,
                                    id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                                    roundid : new Date().valueOf(),
                                    amount : 0,
                                    winamount : 0,
                                    name : name,
                                    time_flag : time_flag,
                                    detail : detail,
                                    gamename : gamename
                                }
                            }
                        }else{
                            betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                betnumber : item,
                                id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                                roundid : new Date().valueOf(),
                                amount : 0,
                                winamount : 0,
                                name : name,
                                time_flag : time_flag,
                                detail : detail,
                                gamename : gamename
                            }
                        }
                        this.props.update_satta(betnode)
                    }else{
                        if(gameitem._id === "5fcf027188835f04b5f2f86b"  || gameitem._id === "5fcf028888835f04b5f2f86c" ){
                            if(type === 3 || type === 1 || type === 5){
                                let betnode =  Object.assign({},row,{});
                                delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item];
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["detail"] = detail;
                                this.props.update_satta(betnode);
                            }else{
                                let betnode =  Object.assign({},row,{});
                                if(betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item +":"+ detail.betnumber]){
                                    toast.warn("It is repeated number");
                                    return;
                                }else{
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item +":"+ detail.betnumber] = {};
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["detail"] = detail;
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item +":"+ detail.betnumber] = betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item];
                                    delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item];
                                    this.props.update_satta(betnode);
                                }
                            }
                        }else{
                            let betnode =  Object.assign({},row,{});
                            delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item];
                            this.props.update_satta(betnode)
                        }
                    }
                }else{
                    let betnode =  Object.assign({},row,{});
                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag] = {};
                    if(type === 3 || type === 1 || type === 5){
                        if(exit_item && row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][exit_item.time_flag][exit_item.betnumber]){
                            if(betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item + ":" + exit_item.betnumber]){
                                toast.warn("It is repeated number");
                                return;
                            }else{
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item + ":" + exit_item.betnumber] = {
                                    betnumber : item,
                                    id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                                    roundid : new Date().valueOf(),
                                    amount : 0,
                                    name : name,
                                    winamount : 0,
                                    time_flag : time_flag,
                                    detail : detail,
                                    gamename : gamename
                                }
                                delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][exit_item.time_flag][exit_item.betnumber];
                            }
                        }else{
                            betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                betnumber : item,
                                id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                                roundid : new Date().valueOf(),
                                amount : 0,
                                name : name,
                                winamount : 0,
                                time_flag : time_flag,
                                detail : detail,
                                gamename : gamename
                            }
                        }
                    }else{
                        betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                            betnumber : item,
                            id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                            roundid : new Date().valueOf(),
                            amount : 0,
                            name : name,
                            winamount : 0,
                            time_flag : time_flag,
                            detail : detail,
                            gamename : gamename
                        }
                    }
                    this.props.update_satta(betnode)
                }
            }else{
                let betnode = {};
                betnode[time_flag] = {}
                betnode[time_flag][item] = {
                    betnumber : item,
                    id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                    roundid : new Date().valueOf(),
                    amount : 0,
                    name : name,
                    winamount : 0,
                    time_flag : time_flag,
                    detail : detail,
                    gamename : gamename
                }
                let betitem = Object.assign({},row,{});;
                betitem[bazaaritem._id]["gamesnode"][gameitem._id] = {
                    betsnode :betnode,
                    oddsprice : oddsprice
                };
                this.props.update_satta(betitem)
            }
        }else{
            let betnode = {};
            betnode[time_flag] = {}
            betnode[time_flag][item] = {
                betnumber : item,
                id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                roundid : new Date().valueOf(),
                name : name,
                amount : 0,
                winamount : 0,
                time_flag : time_flag,
                detail : detail,
                gamename : gamename
            }

            let gamesnode = {};
            gamesnode[gameitem._id] = {
                betsnode :betnode ,
                oddsprice : oddsprice
            };
            let bazaarnode = Object.assign({},row,{});
            bazaarnode[bazaaritem._id] = {
                gamesnode : gamesnode,
                bazaarname : bazaaritem.bazaarname
            }
            this.props.update_satta(bazaarnode)
        }
    }

    sum_ = (selects) =>{
        var amount = 0;
        for(var i in selects){
            amount += parseInt(selects[i].amount);
        }
        return amount;
    }

    sum_items = (items,selecteditems) =>{
        var amount = 0;
        for(var i in items){
            if(selecteditems[items[i]]){
                amount += parseInt(selecteditems[items[i]].amount);
            }
        }
        return amount
    }

    multi_a_ch_act = (e,items) =>{
        for(var i in items){
            this.a_ch_act(e,items[i],true);
        }
    }

    all_a_ch_act = (e,list) =>{
        if(list && list.length > 3){
            this.multi_a_ch_act(e,list);
        }else{
            for(var i in list){
                this.multi_a_ch_act(e,list[i]);
            }
        }
    }


    a_ch_act = (e,item,multi) =>{
        let amount  = parseInt(e);
        if(amount < 1){
            return;
        }
        var row = this.props.satta_bet_data;
        var bazaaritem = this.props.detail;
        var time_flag = this.props.data.timerflag;
        var gameitem = this.props.detail.gamesitem;
        var oddsprice =  bazaaritem["gamelink"][gameitem._id]['oddsprice'];
        let winamount = amount * parseInt(oddsprice)
        var name = this.props.data.name;
        var gamename = gameitem.name;

        if(row[bazaaritem._id]){
            if(row[bazaaritem._id]["gamesnode"][gameitem._id]){
                if(row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]){
                    if(!row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag][item]){
                        let betnode =  Object.assign({},row,{});
                        betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                            betnumber : item,
                            id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                            roundid : new Date().valueOf(),
                            amount : amount,
                            winamount : winamount,
                            name : name,
                            time_flag : time_flag,
                            multi : multi ? true : false,
                            gamename : gamename
                        }
                        this.props.update_satta(betnode)
                    }else{
                        if(!row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag][item]["multi"] && multi){
                        }else {
                            if(isNaN(amount)){
                                let betnode =  Object.assign({},row,{});
                                delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]
                                this.props.update_satta(betnode)
                            }else{
                                let betnode =  Object.assign({},row,{});;
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["amount"] = amount
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["winamount"] = winamount;
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["multi"] = multi ? true : false;
                                this.props.update_satta(betnode)
                            }
                        }
                    }
                }else{
                    let betnode =  Object.assign({},row,{});
                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag] = {};
                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                        betnumber : item,
                        id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                        roundid : new Date().valueOf(),
                            name : name,
                            amount : amount,
                        winamount : winamount,
                        time_flag : time_flag,
                        multi : multi ? true : false,
                        gamename :gamename
                }
                    this.props.update_satta(betnode)
                }
            }else{
                let betnode = {};
                betnode[time_flag] = {}
                betnode[time_flag][item] = {
                    betnumber : item,
                    id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                    roundid : new Date().valueOf(),
                    amount : amount,
                    winamount : winamount,
                    time_flag : time_flag,
                    multi : multi ? true : false,
                    gamename :gamename
                }
                let betitem = Object.assign({},row,{});;
                betitem[bazaaritem._id]["gamesnode"][gameitem._id] = {
                    gamename : gameitem.name,
                    betsnode :betnode,
                    oddsprice : oddsprice
                };
                this.props.update_satta(betitem)
            }
        }else{
            let betnode = {};
            betnode[time_flag] = {}
            betnode[time_flag][item] = {
                betnumber : item,
                id : bazaaritem._id + ":" + gameitem._id + ":"+ item + ":" + time_flag,
                roundid : new Date().valueOf(),
                amount : amount,
                winamount : winamount,                            
                name : name,
                time_flag : time_flag,
                multi : multi ? true : false,
                gamename :gamename
            }

            let gamesnode = {};
            gamesnode[gameitem._id] = {
                gamename : gameitem.name,
                betsnode :betnode ,
                oddsprice : oddsprice
            };
            let bazaarnode = Object.assign({},row,{});
            bazaarnode[bazaaritem._id] = {
                gamesnode : gamesnode,
                bazaarname : bazaaritem.bazaarname
            }
            this.props.update_satta(bazaarnode)
        }
    }

    

    render() {
        
        const {list,timerflag,name,type} = this.props.data;
        const bazaaritem = this.props.detail;
        var time_flag = timerflag;
        const gameitem = this.props.detail.gamesitem;
        var betsdata = this.props.satta_bet_data;
        var selecteditems = {};
        if(betsdata){
            if(betsdata[bazaaritem._id]){
                if(betsdata[bazaaritem._id]["gamesnode"]){
                    if(betsdata[bazaaritem._id]["gamesnode"][gameitem._id]){
                        if(betsdata[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]){
                            let itemss = betsdata[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag];
                            selecteditems=itemss;
                        }
                    }
                }
            }
        }

        let indexs = list && list.length > 3 ? 0: list[0].length ;
        console.log(list)
        let l_object = {};
        for(let i = 0 ; i < indexs ; i++){
            l_object[i] = [];
            l_object[i].push(list[1][i]);
            l_object[i].push(list[2][i]);
            l_object[i].push(list[3][i]);
            l_object[i].push(list[4][i]);
            l_object[i].push(list[5][i]);
            l_object[i].push(list[6][i]);
            l_object[i].push(list[7][i]);
            l_object[i].push(list[8][i]);
            l_object[i].push(list[9][i]);
            l_object[i].push(list[0][i]);
        }

        let headers = [1,2,3,4,5,6,7,8,9,0]
            
        return (
            <div className="sports-events" >
               
                <div className='sports-events-all'>
                    <Col className="color-white" md="12">
                        <Row className="pt-1">
                            {
                                list && list.length > 3 ?  
                               null
                                :
                                <React.Fragment>
                                    <Col md="2" sm="6" xs="6" className="text-left d-flex align-items-center">
                                        <span>
                                            Bazar all numbers: 
                                        </span>
                                    </Col>
                                    <Col md="1"  sm="6" xs="6">
                                        <Input  onChange={(e)=>this.all_a_ch_act(e.target.value,list)} type="number" className="color-white igamez-satta-border"  />
                                    </Col>
                                </React.Fragment>
                            }
                            <Col md="7" className="text-left d-flex align-items-center justify-content-center" sm="12" xs="12">
                                <span>
                                    {name } 
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Row className="d-flex m-0">
                        {list && list.length > 3 ? 
                            <React.Fragment>
                                {
                                    list.map((item,i)=>(
                                        <Col  md={1} sm="6" xs="6" className="p-0 mr-0 mt-1 mb-0 sattaitems"  key={i} >
                                            <div onClick={()=>this.itemselect(item)} className={"satta-events-items m-0 d-block " +(selecteditems[item] ? " satta-events-items-active" : "") } >
                                                <span className="OutcomeName">
                                                    {item}
                                                </span>
                                            </div>
                                            {
                                                type === 0 ?
                                                <Input min={1} type="number" onChange={(e)=>this.a_ch_act(e.target.value,item)}   value={selecteditems[item] ? selecteditems[item].amount : "" }className='igamez-satta-border'  />
                                                :
                                                null
                                                // <Input min={1} type="number" disabled={true}    />
                                            }
                                        </Col>
                                    )) 
                                }
                                <Col  md={1}  className="p-0 m-0 mt-1 sattaitems" sm="6" xs="6"> 
                                    <div  className="satta-events-items m-0 d-block">
                                        <span className="OutcomeName">
                                            Amount
                                        </span>
                                    </div>
                                    <Input disabled={true} type="text" value={this.sum_(selecteditems)} className="color-white igamez-satta-border" />
                                </Col>
                            </React.Fragment>
                            : 
                            <React.Fragment>
                                <Col md="12">
                                    <Row>
                                        {
                                            headers.map((item,i)=>(
                                                <Col md="1" key={i} className="p-0 mr-0 mt-0 mb-0 d-block"  style={{marginLeft : "0.5rem"}}>
                                                    <Input type="number" min={1} onChange={(e)=>this.multi_a_ch_act(e.target.value,list[item])} className="color-white igamez-satta-border"/>
                                                    <p className="text-center font-weight-bold color-white" style={{fontSize:"1.5rem"}} >
                                                        {item}
                                                    </p>                                                    
                                                </Col>
                                            ))
                                        }
                                        <Col md="1" className=" d-flex align-items-center text-center color-white justify-content-center">
                                            <span>
                                                Amount
                                            </span>
                                        </Col>
                                    </Row>
                                </Col>
                                { 
                                    Object.keys(l_object).map((itemj,j)=>(
                                        <React.Fragment key={j}>
                                            <Col md="12" className="mt-1">
                                                <Row>
                                                    {
                                                        l_object[itemj].map((item,i)=>(
                                                            <React.Fragment  key={i}>
                                                                <Col  md={1} sm="3" className="p-0 mr-0 mt-0 mb-0 sattaitems"  >
                                                                    <div onClick={()=>this.itemselect(item)} className={"satta-events-items m-0 d-block " +(selecteditems[item] ? " satta-events-items-active" : "") } >
                                                                        <span className="OutcomeName">
                                                                            {item}
                                                                        </span>
                                                                    </div>
                                                                    <Input type="number" min={1} onChange={(e)=>this.a_ch_act(e.target.value,item)} className="color-white igamez-satta-border" value={selecteditems[item] ? selecteditems[item].amount : "" }/>
                                                                </Col>
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                    <Col md={1} className="d-flex sattaitems" style={{alignItems : "flex-end"}}>
                                                        <Input type="number" disabled={true} value={this.sum_items(l_object[itemj],selecteditems)} className='igamez-satta-border' />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </React.Fragment>
                                    ))
                                }                            
                            </React.Fragment>
                        }
                    </Row>
                </div>
                  
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    balance : state.balance.value.balance,
    user : state.auth.login.values,
    satta_bet_data : state.satta.betsdata,
    satta_bet_finace : state.satta.finacedata,
    betId : state.satta.betId,
    eventflag : state.satta.eventflag
})

const mapDispatchToProps = {
    setloginpage,
    update_satta,
    satta_bet_save
}

export default connect(mapStateToProps, mapDispatchToProps)(childitem)
