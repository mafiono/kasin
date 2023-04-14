import React from "react"
import { ChevronDown, ChevronRight } from "react-feather";
import { Col, Row } from "reactstrap";
import Sportsevents from "./Sportsevents";
import { connect } from "react-redux"


class SportsBet extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isopen:false,
        }
    }
  
    IsOpen () {
        this.setState({isopen: !this.state.isopen});
    }

    render() {
        const BetItem = this.props.BetItem;
        return(
            <>
                { BetItem.MatchData.length ?
                    <div>
                        <Row onClick={()=>this.IsOpen()} className={ this.state.isopen ? 'sports-country-active':'sports-country' } >
                            <Col sm={10} xs={10} className='sports-country-title' style={{marginLeft:'-10px'}}>
                                <div> { this.state.isopen ? <ChevronDown size={20}/>: <ChevronRight size={20} /> }</div>
                                <div className='sports-country-name'>{BetItem.Name}</div>
                            </Col>
                            <Col sm={2} xs={2} className='sports-country-length'>
                                { BetItem.MatchData ? BetItem.MatchData.length : 0 }
                            </Col>
                        </Row>
                        {
                            this.state.isopen ?(
                                <div className='sports-events-all'>
                                    <Row>
                                        <Col xs={4}>
                                            <Row>
                                                <Col style={{textAlign:'center' , color : "white"}} xs={3}> Match Id </Col>
                                                <Col style={{textAlign:'center' , color : "white"}} xs={3}> Match Name </Col>
                                            </Row>                                            
                                        </Col>
                                        <Col xs={8}>
                                            <Row>
                                                <Col style={{textAlign:'center' , color : "white"}} xs={11}> 1 X 2 </Col>
                                                <Col style={{textAlign:'center' , color : "white"}} xs={1}> Market </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {
                                        BetItem.MatchData ? BetItem.MatchData.map((Matchs, i)=>(
                                            <React.Fragment key={i}>
                                                {Matchs.marketData.length ?
                                                    <Sportsevents Matchs={Matchs}/> : <div></div>
                                                }
                                            </React.Fragment>
                                        )):""
                                    }
                                </div>
                            ):null
                        }
                    </div> : <div></div>
                }
            </>
        )
    }
}

const load_fp_data = (state) => {
    return {
        current_selected_sport : state.sports.current_selected_sport,
	}
}

export default connect(load_fp_data,{})(SportsBet)