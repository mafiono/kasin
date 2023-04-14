import React from "react"
import { Lock } from "react-feather";
import {   Row } from "reactstrap";
import { connect } from "react-redux"
import {history} from "../../history"

class SportsBet extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isopen:true,
        }
    }
  
    IsOpen () {
        this.setState({isopen: !this.state.isopen});
    }

    Event(bazaaritem,gameitem,timers){
        var numbers = this.props.numbersdata.find(obj=>obj.bool === gameitem.bool);
        if(numbers){
            let newrow = Object.assign({},bazaaritem,{numbers : numbers.gamenumbers},{gamesitem :gameitem },{timerflag : timers});
            history.push("/Satta/event",newrow);
        }else{
            let gamenumbers ={};
            if(gameitem.bool === "6"){
                gamenumbers["Open Single Ank"] = this.props.numbersdata.find(obj =>obj.bool === "1").gamenumbers;
                gamenumbers["Close Pana"] = this.set_merge(this.props.numbersdata.find(obj =>obj.bool === "3").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "4").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "5").gamenumbers);                
                let newrow = Object.assign({},bazaaritem,{numbers : gamenumbers},{gamesitem :gameitem },{timerflag : timers});                
                history.push("/Satta/event",newrow);
            }else if(gameitem.bool === "7"){
                gamenumbers["Open Pana"] = this.set_merge(this.props.numbersdata.find(obj =>obj.bool === "3").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "4").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "5").gamenumbers);                
                gamenumbers["Close Pana"] = this.set_merge(this.props.numbersdata.find(obj =>obj.bool === "3").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "4").gamenumbers,this.props.numbersdata.find(obj =>obj.bool === "5").gamenumbers);                
                let newrow = Object.assign({},bazaaritem,{numbers : gamenumbers},{gamesitem :gameitem },{timerflag : timers});                
                history.push("/Satta/event",newrow);
            }
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

    get_date = (time)=>{
        var times = time.split(":");
        if(times.length >= 1){
            if(parseInt(times[0]) > 12){
                let time =this.convert ((parseInt(times[0]) - 12 )) + ":" +  this.convert(times[1]) + " PM";
                return time;
            }else{
                let time = this.convert(parseInt(times[0]))+":" + this.convert(times[1])  + "  AM";
                return time
            }
        }
    }

    convert = (number) =>{
        if(parseInt(number) > 9){
            return number
        }else{
            return "0" + parseInt(number)
        }
    }

    render() {
        const Items = this.props.data;
        const postCalled = this.props.data.postCalled;
        const timers = this.props.data.timers;
        const gamesdata = this.props.gamesdata;
        return(
            <div>
                {/* <Row onClick={()=>this.IsOpen()} className={ this.state.isopen ? 'sports-country-active':'sports-country' } >
                    <Col sm={10} xs={10} className='sports-country-title' style={{marginLeft:'-10px'}}>
                        <div> { this.state.isopen ? <ChevronDown size={20}/>: <ChevronRight size={20}/> }</div>
                        <div className='sports-country-name'>{Items.bazaarname}</div>
                    </Col>
                 
                </Row> */}
                <div className='sports-events-all'>
                    <Row className="d-flex">
                        <div className='d-flex flex-1'>
                            <div  className=" d-flex odds_num bazaaritem justify-content-center align-items-center" >
                                <div className="text-center font-weight-bold">
                                    {Items.bazaarname}
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-1'>
                            <div  className=" d-flex odds_num bazaaritem  justify-content-center align-items-center"  >
                                <div className="text-center">
                                    445 - 24 - 255
                                </div>
                            </div>
                        </div>
                        {
                            gamesdata && gamesdata.length > 0 ? gamesdata.map((item,i)=>(
                                <div style={{flexDirection:"row"}}  className='d-flex flex-1' key={i}>
                                    {
                                        Items.gamelink && Items.gamelink[item._id] ? 
                                                postCalled === "1" ?
                                                <>
                                                    <div style={{width:"50%"}}  onClick={()=>this.Event(Items,item,true)}  className="odds_num text-center bazaaritem d-flex"   >
                                                        Open
                                                        <br />
                                                            {timers ?this.get_date( timers.opentime) : ""}
                                                        <br />
                                                        {
                                                            Items.gamelink[item._id] ? "Odd :"+ Items.gamelink[item._id].oddsprice : ""
                                                        }
                                                    </div>
                                                    <div style={{width:"50%"}}  className="odds_num text-center bazaaritem d-flex"   >
                                                        <Lock size={15} />
                                                        
                                                    </div>
                                                </> 
                                                : postCalled === "2" ?
                                                    <>
                                                        <div style={{width:"50%"}}  className="odds_num text-center bazaaritem d-flex"   >
                                                            <Lock size={12} />
                                                        </div>                                                                                                
                                                        <div style={{width:"50%"}} onClick={()=>this.Event(Items,item,true)}  className="odds_num text-center bazaaritem d-flex"   >
                                                            Close <br /> {timers ? this.get_date(timers.closetime) : ""}
                                                            <br />
                                                            {
                                                                Items.gamelink[item._id] ? "Odd :"+ Items.gamelink[item._id].oddsprice : ""
                                                            }
                                                        </div>
                                                    </> 
                                                : postCalled === "3" || postCalled === "4" ?
                                                <>
                                                    <div style={{width:"50%"}}  onClick={()=>this.Event(Items,item,true)}  className="odds_num text-center bazaaritem d-flex"   >
                                                        Open<br/>{timers ? this.get_date( timers.opentime) : ""}
                                                        <br />
                                                        {
                                                            Items.gamelink[item._id] ? "Odd : "+ Items.gamelink[item._id].oddsprice : ""
                                                        }
                                                    </div>
                                                    <div style={{width:"50%"}} onClick={()=>this.Event(Items,item,true)}  className="odds_num text-center bazaaritem d-flex"   >
                                                        Close <br/> {timers ? this.get_date(timers.closetime) : ""} 
                                                        <br />
                                                        {
                                                            Items.gamelink[item._id] ? "Odd :"+ Items.gamelink[item._id].oddsprice : ""
                                                        }
                                                    </div>
                                                </>  : null
                                        :
                                        <div  className=" d-flex odds_num bazaaritem  justify-content-center align-items-center"   >
                                            <div className="text-center">
                                                <Lock size={12} />
                                            </div>
                                        </div>
                                    }
                                </div>
                            )) : null
                        }
                    </Row>
                </div>
                {/* {
                    this.state.isopen ?(

                    ):null
                } */}
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        gamesdata : state.satta.gamedata,
        numbersdata : state.satta.numbersdata
	}
}

export default connect(load_fp_data,{})(SportsBet)