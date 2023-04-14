import React, { Component } from 'react'
import { connect } from 'react-redux'
import {get_bazaarsitems} from "../../redux/actions/satta/matka"
import {Col,} from "reactstrap"
import ReBazar from "./regularbazaar"
import KingBazar from "./kingbazaar"
import StBazar from "./StBazar"
import {Bazaartype_key} from "../../configs/providerConfig"

export class index extends Component {

    componentDidMount(){
        this.props.get_bazaarsitems()
    }

    render() {
        const bazaars = this.props.bazaars;
        let rebazaars = bazaars.filter(obj=>obj.bazaartype === Bazaartype_key.regular);
        let kingbazaars = bazaars.filter(obj=>obj.bazaartype === Bazaartype_key['king-bazaar']);
        let startbazaars = bazaars.filter(obj=>obj.bazaartype === Bazaartype_key.starline);
        return (
            <React.Fragment>
                {
                    bazaars.length > 0 && this.props.gamesdata.length > 0 ?
                    <div className='sports-background height-100 satta'>
                        <Col md="12" className="d-flex text-center">
                            <div className="font-weight-bold w-100 bazaaritem-header pl-0 pr-0"  >
                                <span>REGULAR BAZAR</span> 
                            </div>
                        </Col>
                        <Col md="12" className="mt-1">
                            {
                                rebazaars.length > 0 ?
                                <ReBazar  bazaars={rebazaars} name={"REGULAR BAZAR"} gamelist={this.props.gamesdata.slice(0,7)} />
                                : null
                            }
                        </Col>
                        <Col md="12" className="d-flex text-center mt-1">
                            <div  className="font-weight-bold w-100 bazaaritem-header pl-0 pr-0"  >
                                <span>KING BAZAR</span> 
                            </div>
                        </Col>
                        <Col md="12" className="mt-1">
                            {
                                kingbazaars.length > 0 ?
                                <KingBazar  bazaars={kingbazaars} name={"KING BAZAR"} gamelist={this.props.gamesdata} />
                                : null
                            }
                        </Col>
                        <Col md="12" className="d-flex text-center mt-1">
                            <div color="warning" className="font-weight-bold w-100 bazaaritem-header pl-0 pr-0"  >
                                <span>STARTLINE BAZAR</span> 
                            </div>
                        </Col>
                        <Col md="12" className="mt-1">
                            {
                                startbazaars.length > 0 ?
                                <StBazar  bazaars={startbazaars} name={"STARTLINE BAZAR"} gamelist={this.props.gamesdata} />
                                : null
                            }
                        </Col>
                    </div> 
                    : null
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    bazaars : state.satta.bazaarsdata,
    gamesdata : state.satta.gamedata,

})

const mapDispatchToProps = {
    get_bazaarsitems
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
