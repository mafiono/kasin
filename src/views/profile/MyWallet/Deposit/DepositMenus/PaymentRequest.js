import React, { Component } from 'react';

class PaymentRequest extends Component {
    render() {
        return (
            <React.Fragment>
                {/* <form style={{display:'none'}} id='Qpay' action={`${this.props.QpayRequest_url}`} method='POST'>
                    <input type='hiddin' name='me_id'         value={this.props.Qpay.me_id} readOnly/>
                    <input type='hiddin' name='txn_details'   value={this.props.Qpay.txn_details} readOnly/>
                    <input type='hiddin' name='pg_details'    value={this.props.Qpay.pg_details} readOnly/>
                    <input type='hiddin' name='card_details'  value={this.props.Qpay.card_details} readOnly/>
                    <input type='hiddin' name='cust_details'  value={this.props.Qpay.cust_details} readOnly/>
                    <input type='hiddin' name='bill_details'  value={this.props.Qpay.bill_details} readOnly/>
                    <input type='hiddin' name='ship_details'  value={this.props.Qpay.ship_details} readOnly/>
                    <input type='hiddin' name='item_details'  value={this.props.Qpay.item_details} readOnly/>
                    <input type='hiddin' name='other_details' value={this.props.Qpay.other_details} readOnly/>
                </form> */}

                <form style={{display:'none'}} id='YaarPay' action={`${this.props.YaarPayRequest_url}`} method='POST' acceptCharset="UTF-8">
                    <input type='hiddin' name='mchId'           value={this.props.YaarPay.mchId} readOnly/>
                    {this.props.YaarPay.depositName ? (
                        <input type='hiddin' name='depositName' value={this.props.YaarPay.depositName} readOnly/>
                    ):null}
                    <input type='hiddin' name='depositBankCode' value={this.props.YaarPay.depositBankCode}  readOnly/>
                    <input type='hiddin' name='mchOrderNo'      value={this.props.YaarPay.mchOrderNo} readOnly/>
                    <input type='hiddin' name='appId'           value={this.props.YaarPay.appId} readOnly/>
                    <input type='hiddin' name='amount'          value={this.props.YaarPay.amount} readOnly/>
                    <input type='hiddin' name='channelId'       value={this.props.YaarPay.channelId} readOnly/>
                    <input type='hiddin' name='currency'        value={this.props.YaarPay.currency} readOnly/>
                    <input type='hiddin' name='notifyUrl'       value={this.props.YaarPay.notifyUrl} readOnly/>
                    <input type='hiddin' name='returnUrl'       value={this.props.YaarPay.returnUrl} readOnly/>
                    <input type='hiddin' name='version'         value={this.props.YaarPay.version} readOnly/>
                    <input type='hiddin' name='sign'            value={this.props.YaarPay.sign} readOnly/>
                </form>
                {/* {
                    this.props.Cashfree?
                        <form style={{display:'none'}} id='Cashfree' action={`${this.props.CashfreeRequest_url}`} method='POST' acceptCharset="UTF-8">
                            {
                                Object.keys(this.props.Cashfree).map((item, key)=>(
                                    <input type="text" key={key} name={item} value = {this.props.Cashfree[item]} readOnly/>
                                ))
                            }
                        </form>
                    :null
                } */}
            </React.Fragment>
        )
    }
}
export default  PaymentRequest
                