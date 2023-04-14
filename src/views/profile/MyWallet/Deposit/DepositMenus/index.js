import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Button, Input, Label, Form } from 'reactstrap'
import {toast} from "react-toastify"
import { QpayCheckOut, YaarPayCheckOut, PaymentMenuload, netcentCheckOut, CashfreeCheckOut, RazorpayCheckOut, RazorpayResponse, Paygate10CheckOut } from "../../../../../redux/actions/paymentGateWay"
import PaymentRequest from "./PaymentRequest";
import AmountSetting from "./AmountSetting";
import Select from "react-select"
import CreditCardInput from 'react-credit-card-input';
import {Payment_Bool} from "../../../../../configs/providerConfig"
import {Clock,ChevronRight} from "react-feather"
import {Root} from "../../../../../authServices/rootconfig"

class DepositMenus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMethod : null,
            allMethod : null,
            activeindex : null,
            activeType : null,
            moreInfoState : true,
            amount:0,
            
            Qpay:{},
            QpayRequest_url : '',
            
            YaarPay:{},
            YaarPayRequest_url : '',
            depositBankCode : '',

            Cashfree:null,
            CashfreeRequest_url : '',
            customername:'',
            customeremail:'',
            customerphone:'',
            customerbankcode:'',
            cvc: '',
            expiry: '',
            cardNumber: '',
            cardname: '',

            mobile:'',
            address:'',
            city:'',
            postcode:'',
            YaarPay_options : {
                depositBankCode : ""
            },

            flag : false
        }
        // this.paymentDeposit = this.paymentDeposit.bind(this);
    }

    componentDidMount(){
        this.props.PaymentMenuload({type:1});
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.QpayCheckOutData !== this.props.QpayCheckOutData) {
            await this.setState({
                Qpay:this.props.QpayCheckOutData.data,
                QpayRequest_url : this.props.QpayCheckOutData.request_url,
            })
            document.getElementById('Qpay').submit();
        }else if (prevProps.YaarPayCheckOutData !== this.props.YaarPayCheckOutData) {
            await this.setState({
                YaarPay:this.props.YaarPayCheckOutData.data,
                YaarPayRequest_url : this.props.YaarPayCheckOutData.request_url,
            })
            document.getElementById('YaarPay').submit();
        }else if (prevProps.CashfreeCheckOutData !== this.props.CashfreeCheckOutData) {
            await this.setState({
                Cashfree:this.props.CashfreeCheckOutData.data,
                CashfreeRequest_url : this.props.CashfreeCheckOutData.request_url,
            })
            document.getElementById('Cashfree').submit();
        }else if (prevProps.RazorpayCheckOutData !== this.props.RazorpayCheckOutData) {
            var data = this.props.RazorpayCheckOutData;
            var me = this;
            var options = {
                "key": data.key_id,
                "amount": data.data.amount,
                "currency": "INR",
                "name": "Gamesite deposit",
                "description": "Gamesite deposit Transaction",
                "image": "https://cdn.razorpay.com/logo.svg",
                "order_id": data.data.id,
                "handler": function (response){
                    var data = {
                        order_no:response.razorpay_order_id,
                        status:true,
                        response
                    }
                    me.props.RazorpayResponse(data);
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
                var data = {
                    order_no:response.error.metadata.order_id,
                    status:false,
                    response
                }
                me.props.RazorpayResponse(data);
            });
            rzp1.open();
        }else if(prevProps.PaymentMenuData !== this.props.PaymentMenuData){
            this.setState({
                activeMethod : this.props.PaymentMenuData[0],
                allMethod : this.props.PaymentMenuData,
                amount:this.props.PaymentMenuData[0].min,
                activeindex:0
            })
        }
    }
    
    activeChange(e){

        let activeitem = this.state.allMethod[e];
        console.log(activeitem);
        this.setState({
            flag : !this.state.flag,
            activeindex : e,
            activeMethod : activeitem,
            amount:activeitem.min,
            moreInfoState : false, 
            depositBankCode : activeitem.depositBankCode && activeitem.depositBankCode.length ? activeitem.depositBankCode[0].value:'',
        })
        let userdetail = activeitem.userdetail;
        if(userdetail){
            switch(activeitem.type){
                case Payment_Bool.YaarPay :                
                break;
                case Payment_Bool.RUPEPayment :
                this.setState({city  : userdetail.city,address  : userdetail.address,mobile : userdetail.mobile ,postcode : userdetail.mobile});
                break;
                default :
                break;
            }
        }
        
    }

    paymentDeposit (e){
        e.preventDefault();
        // const { mobile, address, city, postcode, amount, activeMethod, depositBankCode, customername, customeremail, customerphone, customerbankcode, cvc, expiry, cardNumber, cardname } = this.state;
        const { mobile, address, city, postcode, amount, activeMethod, customername, customeremail, customerphone, customerbankcode, cvc, expiry, cardNumber, cardname } = this.state;
        const { firstname, lastname, email } = this.props.user.values;

        let {depositBankCode} = this.state.YaarPay_options;
        if(amount > activeMethod.max || amount < activeMethod.min){
            toast.error("Please input correct amount.");
            return;
        }else{
            var row={}
            switch (activeMethod.type){
                case 'netcents' : 
                     row = {
                        first_name: firstname,
                        last_name:lastname,
                        email:email,
                        amount:amount,
                        type : activeMethod.type,
                        bankType : activeMethod.paymentType.split('-')[1],
                        depositBankCode : depositBankCode
                    }
                    return this.props.netcentCheckOut(row);
                case 'Qpay' :
                     row = {
                        first_name: firstname,
                        last_name:lastname,
                        email:email,
                        amount:amount,
                        type : activeMethod.type,
                        bankType : activeMethod.paymentType.split('-')[1],
                        depositBankCode : depositBankCode
                    }
                    return this.props.QpayCheckOut(row);
                case 'Razorpay' :
                     row = {
                        first_name: firstname,
                        last_name:lastname,
                        email:email,
                        amount:amount,
                        type : activeMethod.type,
                    }
                    return this.props.RazorpayCheckOut(row);
                case Payment_Bool.RUPEPayment :
                     row = {
                        first_name: firstname,
                        last_name:lastname,
                        email:email,
                        amount:amount,
                        type : activeMethod.type,
                        bankType : activeMethod.paymentType,
                        mobile, address, city, postcode,
                        paymentmenuid : activeMethod._id
                    }
                    return this.props.Paygate10CheckOut(row);
                case Payment_Bool.YaarPay :
                    if(!depositBankCode){
                        return toast.warn('Please Select Bank.');
                    }
                     row = {
                        first_name: firstname,
                        last_name:lastname,
                        email:email,
                        amount:amount,
                        type : activeMethod.type,
                        bankType : activeMethod.paymentType,
                        // bankType : activeMethod.paymentType.split('-')[1],
                        depositBankCode : depositBankCode,
                        paymentmenuid : activeMethod._id
                    }
                    return this.props.YaarPayCheckOut(row);

                
                case "Cashfree" :
                    {
                        if(activeMethod.paymentType==='NetBanking'){
                             row = {
                                first_name: firstname,
                                last_name:lastname,
                                email:email,
                                orderAmount:amount,
                                type : activeMethod.type,
                                customerName : customername,
                                customerEmail : customeremail,
                                customerPhone : customerphone,
                                paymentOption: 'nb',
                                code : customerbankcode,
                            }
                        }else if(activeMethod.paymentType==='Card'){
                             row = {
                                first_name: firstname,
                                last_name:lastname,
                                email:email,
                                type : activeMethod.type,
                                orderAmount:amount,
                                customerName : customername,
                                customerEmail : customeremail,
                                customerPhone : customerphone,
                                paymentOption: 'card',
                                number: cardNumber.replace(/\s/g, ''),
                                holder: cardname,
                                expiryMonth: expiry.split('/')[0].trim(),
                                expiryYear: '20'+expiry.split('/')[1].trim(),
                                cvv: cvc,
                            }
                        }
                        return this.props.CashfreeCheckOut(row);
                    }
                default:
                    return 
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    setValue = (state, value) => {
        this.setState({ [state] : value })
    }


    renderDeposit(){
        // const { activeMethod, depositBankCode }=this.state;
        const { activeMethod }=this.state;
        let {depositBankCode} = this.state.YaarPay_options;
        
        switch (activeMethod.type){
            case Payment_Bool.YaarPay :
                return <Col xs='12'>
                            <Select className="React" classNamePrefix="select" id="depositBankCode" name="depositBankCode"
                                options={activeMethod.depositBankCode} value={activeMethod.depositBankCode.find(obj => obj.value === depositBankCode)}
                                onChange={e => this.setState({YaarPay_options:{depositBankCode :e.value}})} />
                        </Col>
           
            case Payment_Bool.RUPEPayment :
                
                return <React.Fragment>
                        <Col xs='12'>
                            <Label for="Mobile">Mobile</Label>
                            <Input 
                                required 
                                type="text" 
                                name="Mobile" 
                                minLength={10}
                                maxLength={14}
                                placeholder="Mobile" 
                                value={this.state.mobile} 
                                onChange={(e) => this.setState({ mobile:e.target.value })} 
                            />
                        </Col>
                        <Col xs='12'>
                            <Label for="Address" className='mt-1'>Address</Label>
                            <Input 
                                required 
                                type="text" 
                                name="address" 
                                placeholder="Address" 
                                value={this.state.address} 
                                onChange={(e) => this.setState({ address:e.target.value })} 
                            />
                        </Col>
                        <Col xs='12'>
                            <Label for="City" className='mt-1'>City</Label>
                            <Input 
                                required 
                                type="text" 
                                name="city" 
                                placeholder="City" 
                                value={this.state.city} 
                                onChange={(e) => this.setState({ city:e.target.value })} 
                            />
                        </Col>
                        <Col xs='12'>
                            <Label for="Pincode" className='mt-1'>Pincode</Label>
                            <Input 
                                required 
                                type="text" 
                                name="postcode" 
                                placeholder="Pincode / Postal code / Zip code" 
                                value={this.state.postcode} 
                                onChange={(e) => this.setState({ postcode:e.target.value })} 
                            />
                        </Col>
                </React.Fragment>
            case "Cashfree" :
                var main = <React.Fragment>
                    <Col xs='12'>
                        <Input 
                            required 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={this.state.customername} 
                            onChange={(e) => this.setState({ customername:e.target.value })} 
                        />
                    </Col>
                    <Col className='mt-1' xs='12'>
                        <Input 
                            required 
                            type="text" 
                            name="email" 
                            placeholder="Email" 
                            value={this.state.customeremail} 
                            onChange={(e) => this.setState({ customeremail:e.target.value })} 
                        />
                    </Col>
                    <Col className='mt-1' xs='12'>
                        <Input 
                            required 
                            type="text" 
                            name="phone" 
                            placeholder="Phone" 
                            value={this.state.customerphone} 
                            onChange={(e) => this.setState({ customerphone:e.target.value })} 
                        />
                    </Col>
                </React.Fragment>
                if(activeMethod.paymentType==='NetBanking'){

                    return <React.Fragment>
                                {main}
                                <Col className='mt-1' xs='12'>
                                    <Input 
                                        required 
                                        type="text" 
                                        name="bankcode" 
                                        placeholder="BankCode"
                                        value={this.state.customerbankcode} 
                                        onChange={(e) => this.setState({ customerbankcode:e.target.value })} 
                                    />
                                </Col>
                            </React.Fragment>
                }else if(activeMethod.paymentType==='Card'){
                    return <React.Fragment>
                                {main}
                                <Col className='mt-1' xs='12'>
                                    <CreditCardInput
                                        cardNumberInputProps={{ value: this.state.cardNumber, onChange: (e)=>this.setState({cardNumber:e.target.value}) }}
                                        cardExpiryInputProps={{ value: this.state.expiry, onChange: (e)=>this.setState({expiry:e.target.value}) }}
                                        cardCVCInputProps={{ value: this.state.cvc, onChange: (e)=>this.setState({cvc:e.target.value}) }}
                                        fieldClassName="input"
                                        customTextLabels={{
                                            invalidCardNumber: 'The card number is invalid.',
                                            expiryError: {
                                            invalidExpiryDate: 'The expiration date is invalid.',
                                            monthOutOfRange: 'The expiration month must be between 01 and 12.',
                                            yearOutOfRange: 'The expiration year cannot be in the past.',
                                            dateOutOfRange: 'The expiration date cannot be in the past.'
                                            },
                                            invalidCvc: 'The security code is invalid.',
                                            invalidZipCode: 'The zip code is invalid.',
                                            cardNumberPlaceholder: 'Card number',
                                            expiryPlaceholder: 'MM/AA',
                                            cvcPlaceholder: 'COD',
                                            zipPlaceholder: 'C.P.'
                                        }}
                                    />
                                </Col>
                                <Col className='mt-1' xs='12'>
                                    <Input 
                                        required 
                                        type="text" 
                                        name="cardName" 
                                        placeholder="Card Name"
                                        value={this.state.cardname} 
                                        onChange={(e) => this.setState({cardname:e.target.value })} 
                                    />
                                </Col>
                            </React.Fragment>
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { activeMethod, amount, moreInfoState ,flag}=this.state;
        return (
            <React.Fragment>
                {this.state.allMethod && this.state.allMethod.length? (
                    <Row >
                        <PaymentRequest {...this.state} />
                        {
                            !flag  ?
                            <React.Fragment>
                                <Col md="12" className="d-flex align-items-center justify-content-center text-center">
                                    <h5>Select deposit method </h5>
                                </Col>
                                {
                                    this.state.allMethod.map((item, key)=>(
                                        <Col md="6" sm="12" className="mt-1 pl-1" key={key}>
                                            <Row className="m-0 igamez-border" style={{border:'1px solid',borderRadius:"5px",padding:"0.5rem",cursor:"pointer"}} onClick={()=>this.activeChange(key,item)} >
                                                <Col md="2" xs="3"  className="font-weight-bold d-flex justify-content-center text-center align-items-center">
                                                <img style={{width:"70px",height:"25px"}} src={ Root.imageurl + item.image} alt=''/>
                                                </Col>
                                                <Col md="9" xs="6" className="justify-content-center text-center align-items-center">
                                                    <h5 className="font-weight-bold">
                                                        {item.name}
                                                    </h5>
                                                    <p className="mb-0">
                                                        {item.currency}&nbsp;{item.min} - {item.currency}&nbsp;{item.max} &nbsp; <span><Clock size={15} /> 1 ~ 5 min</span>
                                                    </p>
                                                </Col>
                                                <Col md="1" xs="3" className="font-weight-bold d-flex justify-content-center text-center align-items-center">
                                                    <ChevronRight size="25" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))
                                }
                            </React.Fragment> :
                            <Col md="12" className="mt-1">
                                <Form onSubmit={(e)=>this.paymentDeposit(e)}>
                                        <AmountSetting activeMethod={activeMethod}  amount={amount}  setValue={(r,e)=>this.setValue(r,e)} />
                                        <Col sm='12' md="12" >
                                            <Row>
                                                {this.renderDeposit()}
                                                <Col xs='12' md='12' className='mt-1'>
                                                    <Row>
                                                        <Col xs='12'  style={{cursor:'pointer'}}  className="payment-deposit-text font-2"  onClick={()=>this.setState({moreInfoState:!moreInfoState})} >
                                                            More info
                                                        </Col>
                                                    </Row>
                                                    {/* {moreInfoState?( */}
                                                        <Row className='payment-deposit-text font-2 mt-1'>
                                                            <Col xs='12'><Input style={{minHeight:'200px', borderRadius:'0px'}} onChange={()=>console.log()} type='textarea' value={activeMethod.info} /></Col>
                                                        </Row>
                                                    {/* ):null} */}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md='12'>
                                            <Row>
                                                <Col md="6">
                                                    <Button className='igamez-button' color="warning" style={{width:'100%',fontWeight:'bold'}} type="button" onClick={()=>this.setState({flag : !this.state.flag})}>Back</Button>
                                                </Col>
                                                <Col md="6">
                                                    <Button className='igamez-button' color="warning" style={{width:'100%',fontWeight:'bold'}} type="submit">Make deposit</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                </Form>
                            </Col>
                        }

                    </Row>
                    ) : <div>Please wait ...</div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.auth.login,
    PaymentMenuData:state.paymentGateWay.PaymentMenuData,
    QpayCheckOutData : state.paymentGateWay.QpayCheckOutData,
    YaarPayCheckOutData : state.paymentGateWay.YaarPayCheckOutData,
    CashfreeCheckOutData : state.paymentGateWay.CashfreeCheckOutData,
    RazorpayCheckOutData : state.paymentGateWay.RazorpayCheckOutData,
})

const mapDispatchToProps = {netcentCheckOut, QpayCheckOut, YaarPayCheckOut, PaymentMenuload, CashfreeCheckOut, RazorpayCheckOut, RazorpayResponse, Paygate10CheckOut}

export default connect(mapStateToProps, mapDispatchToProps)(DepositMenus)