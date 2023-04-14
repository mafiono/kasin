import React, { Component } from 'react';
import { Col, Row, Input, FormGroup } from 'reactstrap'
import Slider from "rc-slider"
import { connect } from 'react-redux'

class AmountSetting extends Component {

    render() {
        const { activeMethod,setValue, amount,balance }=this.props;
        var balance_ = balance.balance && balance.balance > 1  ? (balance.balance - 1).toFixed(0) : 0;
        let Minamount =  activeMethod.min;
        let Maxamount = activeMethod.max < balance_  ? activeMethod.max : balance_;
        return (
            <>
                <Row>
                    <Col md="12">
                        <h4>Available Withdrawl Money {}</h4>
                    </Col>
                </Row>
                <Row className="p-1">
                    <Col xs='12' md='8'>
                        <Row>
                            <Col xs="12">
                                <Slider
                                    min={Minamount}
                                    max={Maxamount}
                                    disabled={balance_ <= 1 ? true : false}
                                    value={amount}
                                    onChange={e => setValue("amount",e)}
                                    reverse={this.props.rtl === "rtl"}
                                />   
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='6' className="payment-deposit-text font-2 justify-content-starts">{activeMethod.currency+" "+Minamount}</Col>
                            <Col xs='6' className="payment-deposit-text font-2 justify-content-ends">{activeMethod.currency+" "+Maxamount}</Col>
                        </Row>
                    </Col>
                    <Col xs='12' md='4'>
                        <FormGroup className="position-relative has-icon-left">
                            <Input min={Minamount}
                                max={Maxamount}
                                type="number" 
                                disabled={balance_ <= 1 ? true : false}
                                onChange={(e) => parseInt(e.target.value) > Maxamount ? setValue("amount",parseInt(Maxamount)) :  setValue("amount",parseInt(e.target.value))} 
                                value={amount}  
                            />
                            <div className="form-control-position payment-deposit-text font-2">
                                {activeMethod.currency}
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <hr/>
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    balance : state.balance.value   
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AmountSetting)