import React, { Component } from 'react';
import { Col, Row } from 'reactstrap'

class AllPayment extends Component {

    
    render() {
        return (
            <Col md="12">
                <h4>Select deposit method </h4>
                <Row>
                    {
                        this.props.allMethod&&this.props.allMethod.length ?(
                            this.props.allMethod.map((item, key)=>(
                                <Col >
                                    <img className='payment-deposit-item-img' src={item.image} alt=''/>
                                </Col>
                            ))
                        ):null 
                    }
                </Row>
            </Col>
        )
    }
}
export default  AllPayment