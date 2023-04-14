import React from "react"
import {Row, Col, Button} from "reactstrap"
import {ChevronUp, ChevronDown} from 'react-feather'
import {connect} from "react-redux"
import {Bonusmenuload, Claim_request} from "../../../redux/actions/promotions/bonus"
import confirm from "reactstrap-confirm";
import {history} from "../../../history"
import {Lock} from "react-feather"

class Balencehistory extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            active : 0,
            allData : null,
            user : {}
        }
    }

    async UNSAFE_componentWillMount(){
        var user = this.props.user;
        if(user){
          this.props.Bonusmenuload(2,user.email)
        }else{
          history.push("/")
        }
      }
    

    componentDidUpdate(prevProps){
        if(prevProps.BonusData !== this.props.BonusData){
            this.setState({allData: this.props.BonusData})
        }
    }

    DateFormat(e){
        var date = (new Date(e)).toDateString();        
        return date;
    }

    getDay(s, e){
        var start = new Date(s);
        var end = new Date(e);
        var m = new Date(end-start);
        return parseInt(m/86400000);
    }

    activeHander(key){
        if(key===this.state.active){
            this.setState({active:null})
        }else{
            this.setState({active:key})
        }
    }

    async Claim_Bonus_event(){
        var result =  await confirm();
        if(result){
            var Bonusitem = this.state.allData[this.state.active];
            var user = this.props.user;
            var row = {
                bonusid : Bonusitem._id,
                email : user.email,
            }
            this.props.Claim_request(row);
        }else{

        }
    }
    
    render() {
        return (
            <div className='casino-bonus-page'>
                <div className='header'>
                    <span>BONUS NAME</span>
                    <span>AMOUNT</span>
                    <span>STATUS</span>
                </div>
                <div className='body'>
                    {
                        this.state.allData&&this.state.allData.length ?this.state.allData.map((item, key)=>(
                            <div key={key} className='item'>
                                <div onClick={()=>this.activeHander(key)} className='item-header'>
                                    <span>{item.bonusname}</span>
                                    <span>---</span>
                                    <span>Available BONUS</span>
                                    <span>{this.state.active === key ? <ChevronUp size={20}/>:<ChevronDown size={20}/>}</span>
                                </div>
                                {
                                    this.state.active === key ? (
                                        <Row className='item-body'>
                                            <Col lg='3' sm='12'>
                                                <div>
                                                    <span>Starting Date&nbsp;&nbsp;:&nbsp;&nbsp;{this.DateFormat(item.startdate)}</span>
                                                </div>
                                                <div>
                                                    <span>Ending Date&nbsp;&nbsp;:&nbsp;&nbsp;{this.DateFormat(item.enddate)}</span>
                                                </div>
                                            </Col>
                                            <Col lg='9' sm='12'>
                                                <div className='body'>
                                                    <Row className='item'>
                                                        <Col>Wagered : {item.Wagered} INR</Col>    
                                                        <Col>Remaining : {item.Remaining} INR</Col>    
                                                    </Row>                            
                                                    <Row className='item'>
                                                        <Col>Time to Wager</Col>    
                                                        <Col>Wagering Req</Col>    
                                                        <Col>Min&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Max deposit</Col>    
                                                    </Row>                            
                                                    <Row className='item'>
                                                        <Col>{this.getDay(item.startdate, item.enddate)}</Col>    
                                                        <Col>{item.Wageringreq}X</Col>    
                                                        <Col>{item.mindeposit} INR&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{item.maxdeposit} INR</Col>    
                                                    </Row>    
                                                    <Row className='item'>
                                                        <Col xs='12' sm='10'>
                                                            <p className='m-0'>{item.description}</p>
                                                        </Col>
                                                        <Col xs='12' sm='2'>
                                                            {
                                                                item.Remaining === 0 ? (
                                                                    <Button.Ripple  className='square igamze-button' onClick={()=>this.Claim_Bonus_event()} outline color="info" size="sm">Claim BONUS</Button.Ripple>
                                                                ) : 
                                                                <Button disabled={true} outline color="info" size="sm" className="square"><Lock /></Button>
                                                            }
                                                        </Col>
                                                    </Row>    
                                                </div>
                                            </Col>
                                        </Row>
                                    ):null
                                }
                            </div>
                        ))
                        :null 
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    BonusData : state.promotions.BonusData,
    user : state.auth.login.values
})

const mapDispatchToProps = {
    Bonusmenuload, Claim_request
}

export default connect(mapStateToProps, mapDispatchToProps)(Balencehistory)
