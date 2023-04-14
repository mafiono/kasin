import React from "react"
import { Col, Row } from "reactstrap"
import { CasinoItem, LiveCasinoItem } from "../GamePages/CasinoComponents"

export const Casino = (props) =>{
    var items = props.data.slice(1, 9);
    var additems = props.data.slice(9, 21);
    if(props.data.length){
        var firstdata = props.data[0];
        return(
            <Row className="casino-item-group mb-1 m-0">
                <Col col="4" xs="12" sm="12" md="4" lg="4" className='item'>
                    <CasinoItem data={firstdata["gameid"]} me={props.me} />
                </Col>
                <Col lg="8" md="8" sm="12">
                    <Row>
                        {items.length ? items.map((item, i) => 
                            <Col key={i} xs="6" sm="6" md="3" lg="3" className='item'>
                                <CasinoItem data={item["gameid"]} me={props.me} />
                            </Col>
                        ):null}
                    </Row>
                </Col>
                {additems.length ? additems.map((item, i) => 
                    <Col key={i} xs="6" sm="6" md="2" lg="2" className='item'>
                        <CasinoItem data={item["gameid"]} me={props.me} />
                    </Col>
                ):null}
            </Row>
        )
    }else{
        return(<div/>)
    }
}

export const LiveCasino = (props) =>{
    var items = props.data.slice(1, 9);
    var additems = props.data.slice(9, 21);
    if(props.data.length){
        var firstdata = props.data[0];
        return(
            <Row className="casino-item-group mb-1 m-0">
                <Col col="4" xs="12" sm="12" md="4" lg="4" className='item'>
                    <LiveCasinoItem data={firstdata.gameid} me={props.me} />
                </Col>
                <Col lg="8" md="8" sm="12">
                    <Row>
                        {items.length ? items.map((item, i) => 
                            <Col key={i} xs="6" sm="6" md="3" lg="3" className='item'>
                                <LiveCasinoItem data={item["gameid"]} me={props.me} />
                            </Col>
                        ):null}
                    </Row>
                </Col>
                {additems.length ? additems.map((item, i) => 
                    <Col key={i} xs="6" sm="6" md="2" lg="2" className='item'>
                        <LiveCasinoItem data={item['gameid']} me={props.me} />
                    </Col>
                ):null}
            </Row>
        )
    }else{
        return(<div/>)
    }
}