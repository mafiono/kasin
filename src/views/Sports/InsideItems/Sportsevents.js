import React from "react";
import Media from "react-media";
import { Col, Row } from "reactstrap";
import { history } from "../../../history"
import { connect } from 'react-redux'
import { setItem } from '../../../redux/actions/sports';
import sportsconfig from "../../../configs/sportsconfig";
import classnames from "classnames";

class Sportsevents extends React.Component {

    state = {
        sportsEvents : {
            event_id: "",
            sportid: "",
            event_name: "",
            AwayCompetitor: "",
            EventStatus: "",
            HomeCompetitor: "",
            ScheduledTime: "",
            Season: {},
            Status: {},
            Venue: {},
            handicap: {},
            oneTotwo: {},
            total:{},
            market: 0,
            produceStatus: true,
        }
    }

    async sportsEvent(e){
        history.push('/sportsevent' , e);
    }
    
    setOdds(p1 , p2){
        var data = {
            event_id : this.props.sportsEvents.event_id,
            AwayCompetitor : this.props.sportsEvents.AwayCompetitor,
            HomeCompetitor : this.props.sportsEvents.HomeCompetitor,
            sportid : this.props.sportsEvents.sportid,
            MarketId: p1.MarketId,
            MarketName: p1.MarketName,
            MarketSpecifiers: p1.MarketSpecifiers,
            MarketStatus : p1.MarketStatus,
            produceStatus : true,
        }
        this.props.setItem(Object.assign({}, p2 ,data));
    }

    render() {
        const { sportsEvents, sportsSidebarData } = this.props;
        
        return(
            <Media queries={{
                small: "(max-width: 768px)",
                medium: "(min-width: 769px) and (max-width: 999px)",
                large: "(min-width: 1000px)"
            }}>
                {matches => (
                    <React.Fragment>
                        {matches.small && 
                            <Row className='m-1'>
                                <div className='sports-align-left' style={{width:'calc(100% - 30px)'}}>
                                    <Row style={{width:'100%'}}>
                                        <Col xs={6}>
                                            <Row style={{alignItems:'center'}}>
                                                <Col xs={8} className='sports-team p-0'>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                    <Col xs={12} className='sports-start-time p-0'>
                                                        { 
                                                            sportsEvents.Status ? (
                                                                (sportsEvents.Status.MatchStatus ? sportsEvents.Status.MatchStatus + " " : "") + 
                                                                (sportsEvents.Status.EventTime ? sportsEvents.Status.EventTime : sportsEvents.ScheduledTime)
                                                            ) : sportsEvents.ScheduledTime
                                                        }
                                                    </Col>
                                                </Col>
                                                <Col xs={4} className='sports-score-board p-0'>
                                                    <div>{ sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore:0}</div>
                                                    <div>{ sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore:0}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='item-center p-0' xs={6}>
                                            <Row>
                                                <Col xs={12} className='p-0'>
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.one} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.draw} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.two} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex'>
                                    <div onClick={()=>this.sportsEvent(sportsEvents)} style={{width:'30px'}} className='sports-other-markets odds_num'>{sportsEvents.market && sportsEvents.market.length ? sportsEvents.market.length : 0}</div>
                                </div>
                            </Row>
                        }
                        {matches.medium && 
                            <Row className='m-1'>
                                <div className='sports-align-left' style={{width:'calc(100% - 50px)'}}>
                                    <Row style={{width:'100%'}}>
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={3} className='sports-team'>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)} className = "mt-1">{sportsEvents.event_id ? sportsEvents.event_id.split(":")[2] : ""}</div>
                                                </Col>
                                                <Col sm={5} className='sports-team'>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                </Col>
                                                <Col sm={2} className='sports-start-time'>
                                                    { 
                                                        sportsEvents.Status ? (
                                                            (sportsEvents.Status.MatchStatus ? sportsEvents.Status.MatchStatus + " " : "") + 
                                                            (sportsEvents.Status.EventTime ? sportsEvents.Status.EventTime : sportsEvents.ScheduledTime)
                                                        ) : sportsEvents.ScheduledTime
                                                    }
                                                </Col>
                                                <Col sm={2} className='sports-score-board'>
                                                    <div>{ sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore:0}</div>
                                                    <div>{ sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore:0}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='item-center p-0' sm={6}>
                                            <Row>
                                                <Col xs={12}>
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.one} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.draw} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.two} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex'>
                                    <div onClick={()=>this.sportsEvent(sportsEvents)} style={{width:'50px'}} className='sports-other-markets odds_num'>{sportsEvents.market && sportsEvents.market.length ? sportsEvents.market.length : 0}</div>
                                </div>
                            </Row>
                        }
                        {matches.large &&
                            <Row className='m-1'>
                                <div className='sports-align-left' style={{width:'calc(100% - 50px)'}}>
                                    <Row style={{width:'100%'}}>
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={3} className='sports-team'>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)} className = "mt-1">{sportsEvents.event_id ? sportsEvents.event_id.split(":")[2] : ""}</div>
                                                </Col>
                                                <Col sm={5} className='sports-team'>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                    <div onClick={()=>this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                </Col>
                                                <Col sm={2} className='sports-start-time'>
                                                    { 
                                                        sportsEvents.Status ? (
                                                            (sportsEvents.Status.MatchStatus ? sportsEvents.Status.MatchStatus + " " : "") + 
                                                            (sportsEvents.Status.EventTime ? sportsEvents.Status.EventTime : sportsEvents.ScheduledTime)
                                                        ) : sportsEvents.ScheduledTime
                                                    }
                                                </Col>
                                                <Col sm={2} className='sports-score-board'>
                                                    <div>{ sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore:0}</div>
                                                    <div>{ sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore:0}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='item-center p-0' sm={6}>
                                            <Row>
                                                <Col xs={4}>
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.one} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.draw} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.oneTotwo.two} 
                                                        data2={sportsEvents.oneTotwo} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                </Col>
                                                <Col xs={4}>
                                                    <EventItem 
                                                        data1={sportsEvents.handicap.one} 
                                                        data2={sportsEvents.handicap} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.handicap.two} 
                                                        data2={sportsEvents.handicap} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                </Col>
                                                <Col xs={4}>
                                                    <EventItem 
                                                        data1={sportsEvents.total.one} 
                                                        data2={sportsEvents.total} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                    <EventItem 
                                                        data1={sportsEvents.total.two} 
                                                        data2={sportsEvents.total} 
                                                        sportsEvents={sportsEvents} 
                                                        sportsSidebarData={sportsSidebarData} 
                                                        setOdds={(a,b)=>this.setOdds(a,b)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex'>
                                    <div onClick={()=>this.sportsEvent(sportsEvents)} style={{width:'50px'}} className='sports-other-markets odds_num'>{sportsEvents.market && sportsEvents.market.length ? sportsEvents.market.length : 0}</div>
                                </div>
                            </Row>
                        }
                    </React.Fragment>
                )}
            </Media>
        )
    }
}

const EventItem = ({data1, data2, sportsEvents, setOdds, sportsSidebarData}) =>(
    data1&&
    sportsEvents.produceStatus === true && 
    sportsEvents.EventStatus !== sportsconfig.FINISHED && 
    data2.MarketStatus === sportsconfig.ACTIVE && 
    data1.OutcomeStatus ?
    <div onClick={()=>setOdds(data2 , data1)}
        className = {classnames("odds_num" , {
            "active_odds_num" : sportsSidebarData.data.findIndex( data => 
                data.OutcomeId === data1.OutcomeId && 
                data.OutcomeName === data1.OutcomeName && 
                data.MarketId === data2.MarketId && 
                data.MarketName === data2.MarketName && 
                data.MarketSpecifiers === data2.MarketSpecifiers && 
                data.event_id === sportsEvents.event_id
            ) > -1}
        )}
    >
        {data1.OutcomeOdds}
    </div>:<div className = "odds_num">{sportsconfig.Lock}</div>
)

const mapStateToProps = (state) => ({
    sportsSidebarData : state.sports.sportsSidebarData,
})

const mapDispatchToProps = {
    setItem
}

export default connect (mapStateToProps, mapDispatchToProps)(Sportsevents)