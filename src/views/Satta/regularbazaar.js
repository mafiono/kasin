import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row,Col} from "reactstrap"
import {Gamelist} from "../../configs/providerConfig"
import {get_date} from "../../redux/actions/auth/index"
import {Lock} from "react-feather"
import Numbers from "./event"
import {get_bazaarsitems} from "../../redux/actions/satta/matka"
import Media from 'react-media';

export class bazaar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bazar : this.props.bazaars,
            gamelist : this.props.gamelist,
            newrow : null,
            NAME : this.props.name,
            bool : "",
            flag : true,
            location : "1"
        }
    }

    Event(bazaaritem,ids,timers,index,location){
        var gameitem = this.state.gamelist.find(obj=>obj._id === ids);
        if(gameitem.bool === "2"){
            let remain_t1 = this.get_remaining_time(bazaaritem.timers.opentime);
            let remain_t2 = this.get_remaining_time(bazaaritem.timers.closetime);
            let t1 = parseInt(remain_t1.split(":")[0]);
            let t2 = parseInt(remain_t1.split(":")[1]);
            let t3 = parseInt(remain_t2.split(":")[0]);
            let t4 = parseInt(remain_t2.split(":")[1]);
            if( t1 === 0 && t2 < 5){
                this.setState({flag : false});
                return;
            }
            if( t3 === 0 && t4 < 5){
                this.setState({flag : false});
                return;
            }
        }else if(timers === "1"){
            let remain_t1 = this.get_remaining_time(bazaaritem.timers.opentime);
            let t1 = parseInt(remain_t1.split(":")[0]);
            let t2 = parseInt(remain_t1.split(":")[1]);
            if( t1 === 0 && t2 < 5){
                this.setState({flag : false});
                return;
            }
        }else{
            let remain_t2 = this.get_remaining_time(bazaaritem.timers.closetime);
            let t3 = parseInt(remain_t2.split(":")[0]);
            let t4 = parseInt(remain_t2.split(":")[1]);
            if( t3 === 0 && t4 < 5){
                this.setState({flag : false});
                return;
            }
        }
        if(!bazaaritem.result){
            var bool = ids + timers + bazaaritem._id;
            this.setState({bool : bool,location : location})
            if(bool === this.state.bool){
                this.setState({flag : !this.state.flag});
            }else{
                this.setState({flag : true});
            }
    
            var numbers = this.props.numbersdata.find(obj=>obj.bool === gameitem.bool);
            if(numbers){    
                let name = gameitem.name + (gameitem.bool === "2" ? " Open and Close" : timers === "1"? " Open" : " Close");
                let list =  [{ list : numbers.gamenumbers,name : name,timerflag : timers ,type : 0}];
                let newrow = Object.assign({},bazaaritem,{numbers : list},{gamesitem :gameitem },{timerflag : timers});
                
                this.setState({newrow : {1 :  newrow},index : index})
            }else{
                let gamenumbers ={};
                if(gameitem.bool === "6"){
                    gamenumbers["Close Single Ank"] = this.props.numbersdata.find(obj =>obj.bool === "1").gamenumbers;
                    gamenumbers["Open Pana"] = this.set_merge(this.props.numbersdata.find(obj =>obj.bool === "3").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "4").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "5").gamenumbers);                
                    let list =  [
                        { list : gamenumbers["Open Pana"],name : "Open Pana",timerflag : "1",type : 1 },
                        { list : gamenumbers["Close Single Ank"],name : "Close Single Ank",timerflag : "2" ,type : 2},
                        { list : gamenumbers["Open Pana"],name : "Close Pana",timerflag : "2" ,type : 3},
                        { list : gamenumbers["Close Single Ank"],name : "Open Single Ank",timerflag : "1",type : 4 },
                    ];
                    let newrow = Object.assign({},bazaaritem,{numbers : list},{gamesitem :gameitem },{timerflag : timers});                
                    // let newrow1 = Object.assign({},bazaaritem,{numbers : list1},{gamesitem :gameitem },{timerflag : timers});                
    
                    this.setState({newrow : {1 : newrow},index : index})
                }else if(gameitem.bool === "7"){
    
                    gamenumbers["Open Pana"] = this.set_merge(this.props.numbersdata.find(obj =>obj.bool === "3").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "4").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "5").gamenumbers);                
                    gamenumbers["Close Pana"] = this.set_merge(this.props.numbersdata.find(obj =>obj.bool === "3").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "4").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "5").gamenumbers);                
                    let list =  [
                        { list : gamenumbers["Open Pana"],name : "Open Pana.",timerflag : "1" ,type : 5 },
                        { list : gamenumbers["Close Pana"],name : "Close Pana.",timerflag : "2",type : 6  }
                    ];
                    
                    let newrow = Object.assign({},bazaaritem,{numbers : list},{gamesitem :gameitem },{timerflag : timers});                
                    this.setState({newrow : {1 : newrow},index : index})
                }
            }
        }else{

        }
    }

    set_merge =  (array1,array2,array3) =>{
        var array = [];
        for(let i in array1){
           for(let j in array1[i]){
               array.push(array1[i][j]);
           } 
        }

        for(let i in array3){
            for(let j in array3[i]){
                array.push(array3[i][j]);
            } 
        }

        for(let i in array2){
            array.push(array2[i]);
        }

        return array
    }

    get_remaining_time = (date) =>{
        
        let server = (this.props.time.toTimeString).split(":");
    	let times = date.split(":");
        let hh = parseInt(times[0]);
        let mm = parseInt(times[1]);

        let HH = server[0];
        let MM = server[1];
        var  m = 0;
        var h = 0
        if(MM > mm){
            mm += 60;
            hh -= 1;
            m = mm - MM;
            h = hh - HH;
        }else{
            m = mm - MM;
            h = hh - HH;
        }

        if(h < 0){
            return "00 : 00";
        }else{
            return h +":" + m;
        }
    }

    games_part_render = (item,width,s,e,i,location) =>{
        let gamesdata = this.state.gamelist;
        return <React.Fragment>
            {
                gamesdata && gamesdata.length > 0 ?
                gamesdata.slice(s,e).map((gameitem,j)=>(
                    <React.Fragment key={j}>
                        
                        <div className="tblbazaaritem" style={{width : width +"%"}}>
                        {
                            item.gamelink && item.gamelink[gameitem._id] && item.gamelink[gameitem._id].status ?
                                gameitem._id === "5fc934917dd9d342e2dd42c5" || gameitem._id === "5fcf027188835f04b5f2f86b"  || gameitem._id === "5fcf028888835f04b5f2f86c"?
                                        item.timers.opentime &&item.timers.closetime ? 
                                        <>
                                            <div className="child d-flex justify-content-center" onClick={()=>this.Event(item,gameitem._id,"3",i,location)}>
                                                <div >
                                                    <p> open-close </p>
                                                    <p>
                                                        {this.get_remaining_time(item.timers.opentime)}
                                                        {/* {this.get_remaining_time(item.timers.closetime)} */}
                                                    </p>
                                                    {/* <p> odds :  { item.gamelink[gameitem._id].oddsprice }  </p> */}
                                                {/* {get_date(item.timers.opentime)} - {get_date(item.timers.closetime)} */}
                                                </div>
                                            </div>
                                        </> 
                                        :  
                                        <div className="child text-center justify-content-center d-flex">
                                            <Lock size={20} className="font-weight-bold" style={{color:"white"}} />
                                        </div>
                                    :
                                item.timers.opentime && item.timers.closetime ?
                                <>
                                    <div className="child1" onClick={()=>this.Event(item,gameitem._id,"1",i,location)}>
                                        <p>open</p>
                                        <p>
                                            {this.get_remaining_time(item.timers.opentime)}
                                        </p>
                                        {/* <p>  odds : { item.gamelink[gameitem._id].oddsprice }  </p> */}
                                        {/* {get_date(item.timers.opentime)} */}
                                    </div>
                                    <div className="child1"  onClick={()=>this.Event(item,gameitem._id,"2",i,location)}>
                                        <p>close</p>
                                        {/* <p>  odds : { item.gamelink[gameitem._id].oddsprice }  </p> */}
                                        <p>
                                            {this.get_remaining_time(item.timers.closetime)}
                                        </p>
                                        {/* {get_date(item.timers.closetime)} */}
                                    </div>
                                </> 
                                    :
                                item.timers.opentime ? 
                                <>
                                    <div className="child" onClick={()=>this.Event(item,gameitem._id,"1",i,location)} >
                                        <p> open </p>
                                        <p>
                                            {this.get_remaining_time(item.timers.opentime)}
                                        </p>
                                        {/* <p>  odds : { item.gamelink[gameitem._id].oddsprice }  </p> */}

                                        {/* {get_date(item.timers.opentime)} */}
                                    </div>
                                </>
                                    :
                                <div className="child" onClick={()=>this.Event(item,gameitem._id,"2",i,location)}>
                                    <p> close </p>
                                    <p>
                                        {this.get_remaining_time(item.timers.closetime)}
                                    </p>
                                    {/* <p> odds :  { item.gamelink[gameitem._id].oddsprice }  </p> */}

                                    {/* {get_date(item.timers.closetime)} */}
                                </div>
                        : 
                            <div className="child text-center justify-content-center d-flex">
                                <Lock size={20} className="font-weight-bold" style={{color:"white"}} />
                            </div>
                        }
                        </div>
                    </React.Fragment>
                )) : null
            }
        </React.Fragment>
    }

    render() {
        return (
            <div className='sports-background height-100'>
                <Row className="satta">
                <Media queries={{ small: "(max-width: 768px)",large: "(min-width: 769px)" }}>
                    {matches => (
                        <React.Fragment>
                        {matches.small && 
                        <>
                             <Col md="12" >
                                {
                                    Gamelist.slice(0,3).map((item,i)=>(
                                        <div className="tblbazaarheader" style={{width :"33%"}} key={i}>
                                            {item}
                                        </div>
                                    ))
                                }
                            </Col>

                                {
                                    this.state.bazar && this.state.bazar.length > 0 ?
                                    this.state.bazar.map((item,i)=>(
                                        <React.Fragment key={i}>
                                        <Col md="12" className="d-flex">
                                            <div className="tblbazaaritem" style={{width :"33%"}}>
                                            <div className="child d-block text-center justify-content-center">
                                                <span className="d-block"> { item.bazaarname }
                                                </span>
                                                <span className="d-block"> 
                                                    { item.timers.opentime &&item.timers.closetime  ? get_date(item.timers.opentime) + " and " + get_date(item.timers.closetime)  : item.timers.opentime ? get_date(item.timers.opentime) : get_date(item.timers.closetime) }
                                                </span>
                                                </div>
                                            </div>
                                            <div className="tblbazaaritem"style={{width :"33%"}}>
                                                <div className="child d-flex text-center justify-content-center">
                                                    <span className="font-weight-bold" style={{color:"green"}}>{item.result ? item.result.openresult + "-" + item.result.jodiresult + "-" + item.result.closeresult : "---"}</span>
                                                </div>
                                            </div>
                                            {
                                                this.games_part_render(item,33.3,0,1,i,"2")
                                            }
                                        </Col>
                                        <Col md="12">
                                            {
                                                this.state.location === "2" && this.state.flag && this.state.newrow && this.state.index === i ? 
                                                <Numbers location = {this.state.newrow} />
                                                : null
                                            }
                                        </Col>
                                        </React.Fragment>
                                    )) : null
                                }

                                
                            <Col md="12" className="mt-1">
                                {
                                    Gamelist.slice(3,6).map((item,i)=>(
                                        <div className="tblbazaarheader" key={i} style={{width :"33%"}} >
                                            {item}
                                        </div>
                                    ))
                                }
                            </Col>
                            {
                                    this.state.bazar && this.state.bazar.length > 0 ?
                                    this.state.bazar.map((item,i)=>(
                                        <React.Fragment key={i}>
                                        <Col md="12" className="d-flex">
                                            {
                                                this.games_part_render(item,33.3,1,4,i,"3")
                                            }   
                                        </Col>
                                        <Col md="12">
                                            {
                                                this.state.location === "3" && this.state.flag && this.state.newrow && this.state.index === i ? 
                                                <Numbers location = {this.state.newrow} />
                                                : null
                                            }
                                        </Col>
                                        </React.Fragment>
                                    )) : null
                            }

                            <Col md="12" className="mt-1">
                                {
                                    Gamelist.slice(6,9).map((item,i)=>(
                                        <div className="tblbazaarheader" key={i} style={{width :"33%"}} >
                                            {item}
                                        </div>
                                    ))
                                }
                            </Col>
                            {
                                    this.state.bazar && this.state.bazar.length > 0 ?
                                    this.state.bazar.map((item,i)=>(
                                        <React.Fragment key={i}>
                                        <Col md="12" className="d-flex">
                                            {
                                                this.games_part_render(item,33.3,4,8,i,"4")
                                            }   
                                        </Col>
                                        <Col md="12">
                                            {
                                                this.state.location === "4" && this.state.flag && this.state.newrow && this.state.index === i ? 
                                                <Numbers location = {this.state.newrow} />
                                                : null
                                            }
                                        </Col>
                                        </React.Fragment>
                                    )) : null
                            }
                        </>
                        }
                        {matches.large &&
                        <>
                            <Col md="12" className="">
                                {
                                    Gamelist.map((item,i)=>(
                                        <div className="tblbazaarheader" key={i}>
                                            {item}
                                        </div>
                                    ))
                                }
                            </Col>
                                {
                                    this.state.bazar && this.state.bazar.length > 0 ?
                                    this.state.bazar.map((item,i)=>(
                                    <React.Fragment key={i}>
                                        <Col md="12" className="d-flex">
                                            <div className="tblbazaaritem">
                                                <div className="child d-block text-center justify-content-center">                                                
                                                <span className="d-block"> 
                                                    { item.bazaarname }
                                                </span>
                                                <span className="d-block"> 
                                                    { item.timers.opentime &&item.timers.closetime  ? get_date(item.timers.opentime) + " and " + get_date(item.timers.closetime)  : item.timers.opentime ? get_date(item.timers.opentime) : get_date(item.timers.closetime) }
                                                </span>
                                                    
                                                </div>
                                            </div>
                                            <div className="tblbazaaritem">
                                                <div className="child d-block text-center justify-content-center">
                                                    <span className="font-weight-bold d-block" style={{color:"green"}}>
                                                        {item.result ? item.result.openresult + "-" + item.result.jodiresult + "-" + item.result.closeresult : "---"}
                                                    </span>
                                                    <span className="d-block"> 
                                                    {
                                                        item.timers.opentime &&item.timers.closetime ? this.get_remaining_time(item.timers.opentime) +"-" + this.get_remaining_time(item.timers.closetime) : item.timers.opentime ?   this.get_remaining_time(item.timers.opentime) : this.get_remaining_time(item.timers.closetime)
                                                    }
                                                       
                                                    </span>

                                                </div>
                                            </div>
                                                {
                                                    this.games_part_render(item,11.1,0,8,i,"1")
                                                }
                                        </Col>
                                        <Col md="12">
                                            {
                                                this.state.location === "1" && this.state.flag && this.state.newrow && this.state.index === i ? 
                                                <Numbers location = {this.state.newrow} />
                                                : null
                                            }
                                        </Col>
                                        </React.Fragment>
                                    ))
                                    : null
                                }
                        </>
                        }
                        </React.Fragment>
                    )}
                </Media>
                </Row>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    numbersdata : state.satta.numbersdata,
    time : state.time.value
})

const mapDispatchToProps = {
    get_bazaarsitems
}

export default connect(mapStateToProps, mapDispatchToProps)(bazaar)
