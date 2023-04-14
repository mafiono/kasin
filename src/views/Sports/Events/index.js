import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Card, CardBody, CardImg, Col, CardImgOverlay } from "reactstrap"
import { get_odds, get_all_sports_list, currentSelecteGame } from "../../../redux/actions/sports/index"
import { history } from "../../../history"
import sportsconfig from "../../../configs/sportsconfig";
import SportsEventItem from './SportsEventItem'

export class Events extends Component {

    constructor(props) {
        super(props)
        this.state = {
            team : this.props.location.state,
            category : ""
        }
    }

    async componentDidMount(){
        if(!this.state.team){
            history.push("sports");
            return;
        }
        await this.props.currentSelecteGame(this.state.team);
        await this.props.get_all_sports_list();

        // if(this.props.all_matchs.data){
        //     var currentData = this.props.all_matchs.data[0].data[0];
        //     this.state.team(currentData);
        //     if(!document.getElementById("matchId")){
        //         const P = document.createElement("p");
        //         P.id = "matchId";
        //         P.className = this.props.currentSelecteGame.event_id.split(":")[2];
        //         document.body.appendChild(P);
        //     }else{
        //         document.getElementById("matchId").className = this.props.currentSelecteGame.event_id.split(":")[2];
        //     }
    
        //     const script = document.createElement("script");
        //     script.src = "https://kasagames.com/client/script.js";
        //     script.async = true;
        //     document.body.appendChild(script);
        // }

        var index = this.props.all_sports_list.findIndex(item => item.sport_id === this.state.team.sportid);
        var category = ""
        if(index > -1){
            category = this.props.all_sports_list[index].sport_name;
        }
        if(this.state.team.Venue){
            category += " > " + this.state.team.Venue.country;
        }
        if(this.state.team.Season){
            category += " > " + this.state.team.Season.Name;
        }
        this.setState({ category });
    }

    componentDidUpdate(){
        if( JSON.stringify(this.props.currentSelectedGame) !== "{}" && this.state.team !== this.props.currentSelectedGame){
            var team = this.props.currentSelectedGame;
            if(team.market && team.market.length){
                team.market.sort(function(A, B){
                    return A.MarketId < B.MarketId ? -1 : 1;
                });
            }
            this.setState({ team });
        }
    }

    render() {
        const { category, team } = this.state;
        return (
            <div className='sports-events'>
                <Row>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12'>
                                <div className='spors-events-title'>{category}</div>
                            </Col>
                        </Row>
                        <Card className="text-white">
                            <CardImg bottom className="img-fluid" src={sportsconfig.img4} alt="card image cap" />
                            <CardImgOverlay className="d-flex flex-column justify-content-between">
                            <CardBody>
                                <div style={{textAlign:'center', color:'white', fontSize:'2rem'}}>
                                    <span>{team?.HomeCompetitor} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                    <span>
                                    {
                                        team?.Status ? (
                                            (team?.Status.HomeScore ? team?.Status.HomeScore : 0) + " - " +
                                            (team?.Status.AwayScore ? team?.Status.AwayScore : 0)
                                        ) : "0 - 0"
                                    }
                                    </span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{team?.AwayCompetitor}</span>
                                </div>
                                <div style={{textAlign:'center', color:'white', fontSize:'1.5rem'}}>
                                { 
                                    team?.Status ? (
                                        (team?.Status.MatchStatus ? team?.Status.MatchStatus + " " : "") + 
                                        (team?.Status.EventTime ? team?.Status.EventTime : team?.ScheduledTime)
                                    ) : team?.ScheduledTime
                                }
                                </div>
                            </CardBody>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col xs='12' lg='9'>
                        {
                            team?.EventStatus === sportsconfig.FINISHED ? <h1> Attention! All markets Finished. </h1> : 
                            (
                                team?.produceStatus === true ? (
                                    team?.market ? team?.market.map((Item, index)=>(
                                        <SportsEventItem team={team} Item={Item} key={index}/>
                                    )) : "no market"
                                ) : <h1>
                                        Now Betrada server is downtime. Please wait some minute. 
                                        Or Please check your network state.
                                    </h1>
                            )
                        }
                    </Col>
                    <Col xs='12' lg='3'>
                        <div className="widgets">
                            <div><div className="sr-widget sr-widget-1"></div></div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSelectedGame : state.sports.currentSelectedGame,
        all_matchs : state.sports.all_matchs,
        all_sports_list : state.sports.all_sports_list
    }
}

const mapDispatchToProps = {
    get_odds,
    get_all_sports_list,
    currentSelecteGame
}

export default connect(mapStateToProps, mapDispatchToProps )(Events)
