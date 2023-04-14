import React from "react"
import { connect } from "react-redux";
import { Col , Row} from "reactstrap"; 
import { ChevronDown, ChevronRight } from "react-feather";
import { addBetSlip } from '../../../redux/actions/exchg';
import classnames from "classnames";

class SportsEventItem extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isopen:false,
        }
    }
 
    IsOpen () {
        this.setState({isopen: !this.state.isopen});
    }

    addBetSlip(match , market , odd , Polarity , Price){
        var slipItem = {
            SelectionId : odd.Id,
            ExpectedSelectionResetCount : odd.ResetCount,
            WithdrawalSequenceNumber : market.WithdrawalSequenceNumber,
            Polarity,
            Price,
            Name : odd.Name,
            matchName : match.Name,
            marketName : market.Name,
        }
        this.props.addBetSlip(slipItem)
    }

    render() {
        const Item = this.props.Item;
        return(
            <div>
                {Item.oddsData && Item.oddsData.length ? 
                    <Row onClick={()=>this.IsOpen()} className={'' + (this.state.isopen ? 'sports-country-active':'sports-country')} >
                        <Col sm='12' className='sports-country-title' style={{display:'flex', justifyContent:'space-between'}}>
                            <div className='sports-country-name' >
                                {Item.Name}
                            </div>
                            <div>
                                { this.state.isopen ? <ChevronDown size={20}/> : <ChevronRight size={20}/> }
                            </div>
                        </Col>
                    </Row> : ""
                }
                {
                    this.state.isopen ? (
                        <Row style = {{color : "white"}} className = "pb-1">
                            {/* <Col sm = "12">
                                <Row className = "pl-2">
                                    <Col sm="3"></Col>
                                    <Col sm="9">
                                        <Row style = {{textAlign : "center"}}>
                                            <Col className = "exchg-events-items ml-1">Lay</Col>
                                            <Col className = "exchg-events-items ml-1">Back</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col> */}
                            {
                                Item.oddsData && Item.oddsData.length && Item.oddsData.map((item , key) => (
                                    <Col key = {key} sm = "12">
                                        <Row className = "pl-2">
                                            <Col sm="3" className = "exchg-events-items" style = {{textAlign : "center"}}>{item.Name}</Col>
                                            <Col sm="9">
                                                <Row>
                                                    <Col sm="6">
                                                        <Row>
                                                            {
                                                                item.ForSidePrices && item.ForSidePrices.length && item.ForSidePrices.map((Sitem , Skey) => (
                                                                    <React.Fragment key={Skey}>
                                                                        {!Sitem.nofield ? 
                                                                            <Col onClick = {() => this.addBetSlip( this.props.Match , Item , item , "Back" , parseFloat(Sitem.Price).toFixed(2))}
                                                                                className = {classnames("exchg-events-items exchg-odd ml-1" , {
                                                                                    "exchg-odd-active" : this.props.betSlipData.data.findIndex(slipItem => 
                                                                                            slipItem.SelectionId === item.Id &&
                                                                                            slipItem.Polarity === "Back" &&
                                                                                            slipItem.Price === parseFloat(Sitem.Price).toFixed(2)
                                                                                        ) > -1
                                                                                })}
                                                                            >
                                                                                {parseFloat(Sitem.Price).toFixed(2)}(<span>{parseFloat(Sitem.Stake).toFixed(2)}</span>)
                                                                            </Col>
                                                                             :
                                                                            <Col className = "exchg-events-items ml-1">
                                                                                <svg width="1.3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M4.107 12.536L4 18.256c0 1.166.853 2.12 2.027 2.332 2.56.318 7.253.741 11.946 0C19.147 20.376 20 19.422 20 18.257l-.213-5.721c0-1.166-.96-2.013-2.134-2.225-2.56-.106-7.04-.424-11.413.106-1.173.106-2.027 1.06-2.133 2.119z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"></path>
                                                                                    <path d="M16.267 10.31V7.345C16.267 5.014 14.24 3 11.893 3 9.547 3 7.52 4.907 7.52 7.344v2.967" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"></path>
                                                                                    <path d="M12 14v3.137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                                                </svg>
                                                                            </Col>
                                                                        }
                                                                    </React.Fragment>
                                                                ))
                                                            }
                                                        </Row>
                                                    </Col>
                                                    <Col sm="6">
                                                        <Row>
                                                            {
                                                                item.AgainstSidePrices && item.AgainstSidePrices.length && item.AgainstSidePrices.map((Sitem , Skey) => (
                                                                    <React.Fragment key={Skey}>
                                                                        {!Sitem.nofield ? 
                                                                            <Col onClick = {() => this.addBetSlip( this.props.Match , Item , item , "Lay" , parseFloat(Sitem.Price).toFixed(2))}
                                                                                className = {classnames("exchg-events-items exchg-odd ml-1" , {
                                                                                    "exchg-odd-active" : this.props.betSlipData.data.findIndex(slipItem => 
                                                                                            slipItem.SelectionId === item.Id &&
                                                                                            slipItem.Polarity === "Lay" &&
                                                                                            slipItem.Price === parseFloat(Sitem.Price).toFixed(2)
                                                                                        ) > -1
                                                                                })}
                                                                            >
                                                                                {parseFloat(Sitem.Price).toFixed(2)}(<span>{parseFloat(Sitem.Stake).toFixed(2)}</span>)
                                                                            </Col>
                                                                             :
                                                                            <Col className = "exchg-events-items ml-1">
                                                                                <svg width="1.3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M4.107 12.536L4 18.256c0 1.166.853 2.12 2.027 2.332 2.56.318 7.253.741 11.946 0C19.147 20.376 20 19.422 20 18.257l-.213-5.721c0-1.166-.96-2.013-2.134-2.225-2.56-.106-7.04-.424-11.413.106-1.173.106-2.027 1.06-2.133 2.119z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"></path>
                                                                                    <path d="M16.267 10.31V7.345C16.267 5.014 14.24 3 11.893 3 9.547 3 7.52 4.907 7.52 7.344v2.967" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round"></path>
                                                                                    <path d="M12 14v3.137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                                                </svg>
                                                                            </Col>
                                                                        }
                                                                    </React.Fragment>
                                                                ))
                                                            }
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                ))
                            }
                        </Row>
                    ) : ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        betSlipData : state.exchgange.betSlipData
    }
}

const mapDispatchToProps = {
    addBetSlip
}

export default connect (mapStateToProps, mapDispatchToProps)(SportsEventItem);