import React from "react";
import Media from "react-media";
import { Col, Row } from "reactstrap";
import { history } from "../../../history"
import { connect } from 'react-redux'
import { addBetSlip } from '../../../redux/actions/exchg';
import classnames from "classnames";

class Sportsevents extends React.Component {

    sportsEvent(){
        history.push('/exchgevent',this.props.Matchs);
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
        console.log(match , market , odd);
        this.props.addBetSlip(slipItem)
    }

    render() {
        var Matchs = this.props.Matchs;
        return(
            <Media queries={{
                small: "(max-width: 768px)",
                medium: "(min-width: 769px) and (max-width: 999px)",
                large: "(min-width: 1000px)"
                }}>
                {matches => (
                    <React.Fragment>
                        {matches.large &&
                            <Row className='m-1'>
                                <div className='sports-align-left' style={{width:'calc(100% - 30px)'}}>
                                    <Row style={{width:'100%'}}>
                                        <Col sm={4}>
                                            <Row>
                                                <Col sm={2} className='sports-team exchg-team'>
                                                    <div onClick={()=>this.sportsEvent()}>{Matchs.Id}</div>
                                                </Col>
                                                <Col sm={5} className='sports-team exchg-team'>
                                                    <div onClick={()=>this.sportsEvent()}>{Matchs.Name}</div>
                                                </Col>
                                                <Col sm={5} className='sports-team exchg-team'>
                                                    <div onClick={()=>this.sportsEvent()}>{Matchs.SName ? Matchs.SName : ""}</div>
                                                </Col>                                               
                                            </Row>
                                        </Col>
                                        <Col className='item-center' sm={8} style = {{color : "white"}}>
                                            {
                                                Matchs.onetotwo.oddsData.ForSidePrices.map((item , key) => (
                                                    <React.Fragment key = {key}>
                                                        {!item.nofield ? 
                                                            <Col className = {classnames("odds_num exchg-odd ml-1" , 
                                                                {"exchg-odd-active" : this.props.betSlipData.data.findIndex(slipItem => 
                                                                    slipItem.SelectionId === Matchs.onetotwo.oddsData.Id &&
                                                                    slipItem.Polarity === "Back" &&
                                                                    slipItem.Price === parseFloat(item.Price).toFixed(2)
                                                                    ) > -1}
                                                                )} onClick = {() => this.addBetSlip( Matchs , Matchs.onetotwo , Matchs.onetotwo.oddsData , "Back" , parseFloat(item.Price).toFixed(2))}>
                                                                {parseFloat(item.Price).toFixed(2)}(<span>{parseFloat(item.Stake).toFixed(2)}</span>)
                                                            </Col>
                                                             : 
                                                            <Col className = "odds_num ml-1">
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
                                            {
                                                Matchs.onetotwo.oddsData.AgainstSidePrices.map((item , key) => (
                                                    <React.Fragment key = {key}>
                                                        {!item.nofield ? 
                                                            <Col className = {classnames("odds_num exchg-odd ml-1" , 
                                                                {"exchg-odd-active" : this.props.betSlipData.data.findIndex(slipItem => 
                                                                    slipItem.SelectionId === Matchs.onetotwo.oddsData.Id &&
                                                                    slipItem.Polarity === "Lay" &&
                                                                    slipItem.Price === parseFloat(item.Price).toFixed(2)
                                                                    ) > -1}
                                                                )} onClick = {() => this.addBetSlip(Matchs , Matchs.onetotwo , Matchs.onetotwo.oddsData , "Lay" , parseFloat(item.Price).toFixed(2))}>
                                                                {parseFloat(item.Price).toFixed(2)}(<span>{parseFloat(item.Stake).toFixed(2)}</span>)
                                                            </Col>
                                                             : 
                                                            <Col className = "odds_num ml-1">
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
                                        </Col>
                                    </Row>
                                </div>
                                <div className='sports-other-markets odds_num' onClick={()=>this.sportsEvent()}>{Matchs.marketData ? Matchs.marketData.length : 0}</div>
                            </Row>
                        }
                    </React.Fragment>
                )}
            </Media>
        )
    }
}

const mapStateToProps = (state) => ({
    betSlipData : state.exchgange.betSlipData
})

const mapDispatchToProps = {
    addBetSlip,
}

export default connect (mapStateToProps, mapDispatchToProps)(Sportsevents)