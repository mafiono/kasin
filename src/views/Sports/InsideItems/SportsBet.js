import React from "react"
import { ChevronDown, ChevronRight } from "react-feather";
import { Col, Row } from "reactstrap";
import Sportsevents from "./Sportsevents";
import { connect } from "react-redux"
import { seasonTabChange } from "../../../redux/actions/sports";
import Media from "react-media";


class SportsBet extends React.Component {

    IsOpen () {
        this.props.seasonTabChange(this.props.sportsBetItem);
    }

    render() {
        const { sportsBetItem, seasonData } = this.props;
        return(
            <div>
                <Row onClick={()=>this.IsOpen()} className={ seasonData.data.findIndex( item => item.id === sportsBetItem.id) > -1 ? 'sports-country-active':'sports-country' } >
                    <Col sm={10} xs={10} className='sports-country-title' style={{marginLeft:'-10px'}}>
                        <div> { seasonData.data.findIndex( item => item.id === sportsBetItem.id) > -1 ? <ChevronDown size={20}/>: <ChevronRight size={20}/> }</div>
                        <div className='sports-country-name'>{sportsBetItem.name}</div>
                    </Col>
                    <Col sm={2} xs={2} className='sports-country-length'>
                        { sportsBetItem.data ? sportsBetItem.data.length : 0 }
                    </Col>
                </Row>
                {
                    seasonData.data.findIndex( item => item.id === sportsBetItem.id) > -1 && (
                        <div className='sports-events-all'>
                            <Media 
                                queries={{
                                    small: "(max-width: 768px)",
                                    medium: "(min-width: 769px) and (max-width: 999px)",
                                    large: "(min-width: 1000px)"
                                }}>
                                {matches => (
                                    <React.Fragment>
                                        {matches.small &&
                                            <Row className='m-1'>
                                                <div className='sports-align-left' style={{width:'calc(100% - 30px)'}}>
                                                    <Row className='w-100'>
                                                        <Col xs={6}></Col>
                                                        <Col xs={6} className='p-0'>
                                                            <Row>
                                                                <Col className = "color-white text-center" xs={4}> 1 </Col>
                                                                <Col className = "color-white text-center" xs={4}> X </Col>
                                                                <Col className = "color-white text-center" xs={4}> 2 </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div style={{width:'30px'}}></div>
                                            </Row>
                                        }
                                        {matches.medium && 
                                            <Row className='m-1'>
                                                <div className='sports-align-left' style={{width:'calc(100% - 50px)'}}>
                                                    <Row className='w-100'>
                                                        <Col xs={6}>
                                                            <Row>
                                                                <Col className = "color-white" xs={3}> Match Id </Col>
                                                                <Col className = "color-white" xs={5}> Match Name </Col>
                                                                <Col className = "color-white" xs={2}> Date </Col>
                                                                <Col className = "color-white text-center" xs={2}> Point </Col>
                                                            </Row>                                    
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Row>
                                                                <Col className = "color-white text-center" xs={4}> 1 </Col>
                                                                <Col className = "color-white text-center" xs={4}> X </Col>
                                                                <Col className = "color-white text-center" xs={4}> 2 </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div style={{width:'50px'}}> Markets </div>
                                            </Row>
                                        }
                                        {matches.large &&
                                            <Row className='m-1'>
                                                <div className='sports-align-left' style={{width:'calc(100% - 50px)'}}>
                                                    <Row className='w-100'>
                                                        <Col xs={6}>
                                                            <Row>
                                                                <Col className = "color-white" xs={3}> Match Id </Col>
                                                                <Col className = "color-white" xs={5}> Match Name </Col>
                                                                <Col className = "color-white" xs={2}> Date </Col>
                                                                <Col className = "color-white text-center" xs={2}> Point </Col>
                                                            </Row>                                    
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Row>
                                                                <Col className = "color-white text-center" xs={4}> 1 X 2 </Col>
                                                                <Col className = "color-white text-center" xs={4}> HANDICAP </Col>
                                                                <Col className = "color-white text-center" xs={4}> TOTAL </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div style={{width:'50px'}}> Markets </div>
                                            </Row>
                                        }
                                    </React.Fragment>
                                )}
                            </Media>
                            {
                                sportsBetItem.data.length && sportsBetItem.data.map((sportsEvents, i)=>(
                                    <Sportsevents key={i} sportsEvents={sportsEvents}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        seasonData : state.sports.seasonData
	}
}

export default connect(load_fp_data,{seasonTabChange})(SportsBet)