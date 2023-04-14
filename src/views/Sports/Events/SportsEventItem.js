import React from "react"
import { ChevronDown, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { setItem , marketTabChange } from '../../../redux/actions/sports';
import sportsconfig from "../../../configs/sportsconfig";
 
class SportsEventItem extends React.Component {

    IsOpen () {
        this.props.marketTabChange(this.props.Item);
    }

    sportsEventsItems(p1 , p2){
        var data = {
            event_id : this.props.team.event_id,
            AwayCompetitor : this.props.team.AwayCompetitor,
            HomeCompetitor : this.props.team.HomeCompetitor,
            sportid : this.props.team.sportid,
            MarketId: p1.MarketId,
            MarketName: p1.MarketName,
            MarketSpecifiers: p1.MarketSpecifiers,
            MarketStatus : p1.MarketStatus,
            produceStatus : true,
        }
        this.props.setItem(Object.assign({}, p2 ,data));
    }

    
    render() {
        const { Item, sportsSidebarData, team } = this.props;
        return(
            <div>
                <Row
                    onClick={()=>this.IsOpen()}
                    className={(Item.isopen ? 'sports-country-active':'sports-country')}
                >
                    <Col sm='12' className='sports-country-title' style={{display:'flex', justifyContent:'space-between'}}>
                        <div className='sports-country-name' >
                            {Item.MarketSpecifiers !== "" ? Item.MarketName + " (" + Item.MarketSpecifiers + ") " : Item.MarketName}
                        </div>
                        <div>
                            { Item.isopen ? <ChevronDown size={20}/> : <ChevronRight size={20}/> }
                        </div>
                    </Col>
                </Row>
                {
                    Item.isopen ? (
                        <Row className='p-1'>
                            {Item.Outcomes ? Item.Outcomes.map((eventItem, index)=>(
                                <React.Fragment key={index}>
                                    {
                                        Item.Outcomes.length > 0 ? (
                                            Item.Outcomes.length === 3 ? (
                                                <Col>
                                                    { eventItem.OutcomeStatus && Item.MarketStatus === sportsconfig.ACTIVE ? 
                                                        <div 
                                                            onClick={()=>this.sportsEventsItems(Item , eventItem)}
                                                            className={'sports-events-items'+(sportsSidebarData.data.findIndex(
                                                                data => data.OutcomeId === eventItem.OutcomeId && 
                                                                data.OutcomeName === eventItem.OutcomeName &&
                                                                data.MarketId === Item.MarketId && 
                                                                data.MarketName === Item.MarketName && 
                                                                data.MarketSpecifiers === Item.MarketSpecifiers &&
                                                                data.event_id === team.event_id
                                                            )>-1?' sports-events-items-active':'')}>
                                                            <span className='OutcomeName'>{eventItem.OutcomeName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span className='OutcomeOdds'>{eventItem.OutcomeOdds}</span>
                                                        </div> : <div className={'sports-events-items'}>{sportsconfig.Lock}</div>
                                                    }
                                                </Col>
                                            ):(
                                                <Col sm='6'>
                                                    { eventItem.OutcomeStatus && Item.MarketStatus === sportsconfig.ACTIVE ? 
                                                        <div 
                                                            onClick={()=>this.sportsEventsItems(Item , eventItem)} 
                                                            className={'sports-events-items'+(sportsSidebarData.data.findIndex(
                                                                data => data.OutcomeId === eventItem.OutcomeId && 
                                                                data.OutcomeName === eventItem.OutcomeName &&
                                                                data.MarketId === Item.MarketId && 
                                                                data.MarketName === Item.MarketName && 
                                                                data.MarketSpecifiers === Item.MarketSpecifiers &&
                                                                data.event_id === team.event_id
                                                            )>-1?' sports-events-items-active':'')}>
                                                            <span className='OutcomeName'>{eventItem.OutcomeName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span className='OutcomeOdds'>{eventItem.OutcomeOdds}</span>
                                                        </div> : <div className={'sports-events-items'}>{sportsconfig.Lock}</div>
                                                    }
                                                </Col>
                                            )
                                        ) : ""
                                    }
                                </React.Fragment>
                            )):<h3 className = "ml-2">This market is {Item.MarketStatus}</h3>}
                        </Row>
                    ):null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sportsSidebarData : state.sports.sportsSidebarData,
        marketData : state.sports.marketData.data
    }
}

const mapDispatchToProps = {
    setItem,
    marketTabChange
}

export default connect (mapStateToProps, mapDispatchToProps)(SportsEventItem)
