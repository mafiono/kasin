import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Card, CardBody, CardImg, Col, CardImgOverlay } from "reactstrap"
import SportsEventItem from './SportsEventItem'
import { getMarketData } from "../../../redux/actions/exchg";

export class Events extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            allData : this.props.location.state,
            marketData : this.props.location.state.marketData,
        }
    }

    componentDidMount(){
        var marketData = this.props.location.state.marketData;
        this.props.getMarketData(marketData);
    }

    componentDidUpdate(){
        if(this.props.currentMarketData !== this.state.marketData){
            this.setState({marketData : this.props.currentMarketData})
        }
    }

    render() {
        return (
            <div className='sports-events'>
                <Row>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12'>
                                <div className='sports-events-title'>{ this.state.allData.Name }</div>
                            </Col>
                        </Row>
                        <Card className="text-white">
                            <CardImg bottom className="img-fluid" src={'https://sportsbet.io/sports/assets/img/worldcup/3.jpg'} alt="card image cap" />
                            <CardImgOverlay className="d-flex flex-column justify-content-between">
                                <CardBody>
                                    <div className="sports-events-content">
                                        <span>{this.state.allData.Name}</span>
                                    </div>
                                </CardBody>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col xs='12' lg='9'>
                        {
                            this.state.marketData.length ? this.state.marketData.map((Item, index)=>(
                                <SportsEventItem Match = {this.state.allData} Item={Item} key={index}/>
                            )):<h1> Any markets doens't exist! </h1>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentMarketData : state.exchgange.currentMarketData
    }
}

const mapDispatchToProps = {
    getMarketData
}

export default connect(mapStateToProps, mapDispatchToProps )(Events)
