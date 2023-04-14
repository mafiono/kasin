import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Button, Input, Label,Form } from 'reactstrap'
import {toast} from "react-toastify"
import { YaarPayWithdraw, PaymentMenuload, paymentMethodLoad, RazorpayWithdraw, Paygate10Withdraw ,Cash_payout} from "../../../../../redux/actions/paymentGateWay"
// import ActivePayment from "./ActivePayment";
// import AllPayment from "./AllPayment";
import AmountSetting from "./AmountSetting";
import Select from "react-select"
import {Payment_Bool,WalletType} from "../../../../../configs/providerConfig"

class DepositMenus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMethod : [],
            allMethod : [],
            activeindex : 0,
            moreInfoState : true,
            amount:0,
            depositBankCode:'',
            ifscCode:'',
            accountName:'',
            accountNo:'',
            name:'',
            email:'',
            contact:'',

            bankname:'',
            bankbranch:'',
            bankaddress:'',

            mobile:'',
            address:'',
            postcode:'',
            city:'',
        }
    }

    componentDidMount(){
        this.props.PaymentMenuload({type:WalletType.Withdrawl});
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevProps.PaymentMenuData !== this.props.PaymentMenuData && this.props.PaymentMenuData){
            this.setState({
                activeMethod : this.props.PaymentMenuData[0],
                allMethod : this.props.PaymentMenuData,
                amount:this.props.PaymentMenuData[0].min
            })
            // this.props.paymentMethodLoad({type : this.props.PaymentMenuData[0].type+'-'+this.props.PaymentMenuData[0].paymentType.split('-')[1]})
            // this.props.paymentMethodLoad({type : this.props.PaymentMenuData[0].type+'-'+this.props.PaymentMenuData[0].paymentType.split('-')[1]})
        }else if(prevProps.PaymentMethod !== this.props.PaymentMethod){
            this.setState({
                depositBankCode : this.props.PaymentMethod.paymentData.payoutBankCode,
                accountName : this.props.PaymentMethod.paymentData.accountName,
                accountNo : this.props.PaymentMethod.paymentData.accountNo,
                ifscCode : this.props.PaymentMethod.paymentData.ifscCode,
            });
        }
    }

    activeChange(e){
        this.setState({
            activeindex : e,
            activeMethod : this.state.allMethod[e],
            amount:this.state.allMethod[e].min,
            moreInfoState : false, 
        })
    }

    paymentWithdraw(e){
        e.preventDefault();

        if(this.state.amount <= 1 || this.state.activeMethod.min > this.state.amount  || this.props.balance.balance < parseInt(this.state.amount) ){
            toast.error("Please input correct amount.");
            return;
        }else {
            switch (this.state.activeMethod.type){
                case Payment_Bool.YaarPay :
                    if(!this.state.ifscCode||!this.state.accountName||!this.state.accountNo||!this.state.depositBankCode){
                        toast.error("Please input correct.");
                        return;
                    }else{
                        return this.props.YaarPayWithdraw({
                            first_name : this.props.user.values.firstname,
                            last_name : this.props.user.values.lastname,
                            email : this.props.user.values.email,
                            amount : this.state.amount,
                            type : this.state.activeMethod.type,
                            currency : this.state.activeMethod.currency,
                            bankType : this.state.activeMethod.paymentType,
                            // bankType : this.state.activeMethod.paymentType.split('-')[1],
                            payoutData : {
                                ifscCode : this.state.ifscCode,
                                accountName : this.state.accountName,
                                accountNo : this.state.accountNo,
                                payoutBankCode : this.state.depositBankCode,
                            }
                        });
                    }
                case 'Razorpay' :
                    if(!this.state.name||!this.state.email||!this.state.contact||!this.state.ifscCode||!this.state.accountName||!this.state.accountNo){
                        toast.error("Please input correct.");
                        return;
                    }else{
                        return this.props.RazorpayWithdraw({
                            first_name : this.props.user.values.firstname,
                            last_name : this.props.user.values.lastname,
                            email : this.props.user.values.email,
                            amount : this.state.amount,
                            type : this.state.activeMethod.type,
                            currency : this.state.activeMethod.currency,
                            bankType : this.state.activeMethod.type,
                            payoutData:{
                                name : this.state.name,
                                email : this.state.email,
                                contact : this.state.contact,
                                ifscCode : this.state.ifscCode,
                                accountName : this.state.accountName,
                                accountNo : this.state.accountNo,
                                account_type : 'bank_account',
                            }
                        });
                    }
                case 'Paygate10' :
                    if(this.state.activeMethod.paymentType==='netbanking'){
                        if(!this.state.name||!this.state.accountName||!this.state.accountNo||!this.state.bankname||!this.state.bankbranch||!this.state.bankaddress||!this.state.ifscCode){
                            toast.error("Please input correct");
                            return;
                        }else{
                            return this.props.Paygate10Withdraw({
                                first_name : this.props.user.values.firstname,
                                last_name : this.props.user.values.lastname,
                                email : this.props.user.values.email,
                                amount : this.state.amount,
                                type : this.state.activeMethod.type,
                                currency : this.state.activeMethod.currency,
                                bankType : this.state.activeMethod.paymentType,
                                payoutData:{
                                    username : this.state.name,
                                    accountname : this.state.accountName,
                                    accountnumber : this.state.accountNo,
                                    bankname : this.state.bankname,
                                    bankbranch : this.state.bankbranch,
                                    bankaddress : this.state.bankaddress,
                                    bankifsc : this.state.ifscCode,
                                }
                            });
                        }
                    }else if(this.state.activeMethod.paymentType==='cod'){
                        if( !this.state.mobile||!this.state.address||!this.state.postcode||!this.state.city){
                            toast.error("Please input correct");
                            return;
                        }else{
                            return this.props.Paygate10Withdraw({
                                first_name : this.props.user.values.firstname,
                                last_name : this.props.user.values.lastname,
                                email : this.props.user.values.email,
                                amount : this.state.amount,
                                type : this.state.activeMethod.type,
                                currency : this.state.activeMethod.currency,
                                bankType : this.state.activeMethod.paymentType,
                                payoutData:{
                                    mobile : this.state.mobile,
                                    address : this.state.address,
                                    postcode : this.state.postcode,
                                    city : this.state.city,
                                }
                            });
                        }
                    }
                    break;
                case Payment_Bool.CASH :
                    this.props.Cash_payout({
                        amount : this.state.amount,
                        type : this.state.activeMethod.type,
                        currency : this.state.activeMethod.currency,
                        bankType : this.state.activeMethod.paymentType,payoutData:{}})
                    break;
                default:
                    break;
            }
        }
    }

    setValue = (state, value) => {
        this.setState({ [state] : value })
    }

    renderWithdraw(){
        const { activeMethod }=this.state;
        switch (activeMethod.type){
            case 'Razorpay' :
                return <>
                    <Col xs='12'>
                        <Input type="text" required placeholder="Enter Name" onChange={(e) => this.setState({"name":e.target.value})}  value={this.state.name}  />
                    </Col>
                    <Col xs='12' className='mt-1'>
                        <Input type="text" required placeholder="Enter Email" onChange={(e) => this.setState({"email":e.target.value})} value={this.state.email}/>
                    </Col>
                    <Col xs='12' className='mt-1'>
                        <Input type="text" required placeholder="Enter Contact" onChange={(e) => this.setState({"contact":e.target.value})} value={this.state.contact}  />
                    </Col>
                    <Col xs='12' className='mt-1'>
                        <Input type="text"required placeholder="Enter Account Name" onChange={(e) => this.setState({"accountName":e.target.value})}  value={this.state.accountName}  />
                    </Col>
                    <Col xs='12' className='mt-1'>
                        <Input type="text" required placeholder="Enter Account No" onChange={(e) => this.setState({"accountNo":e.target.value})} value={this.state.accountNo}   />
                    </Col>
                    <Col xs='12' className='mt-1'>
                        <Input type="text"  required placeholder="Enter IFSC Code" onChange={(e) => this.setState({"ifscCode":e.target.value})} value={this.state.ifscCode}  />
                    </Col>
                </>
            case 'Paygate10' :
                if(activeMethod.paymentType==='netbanking'){
                    return <>
                        <Col xs='12'>
                            <Input 
                                type="text" 
                                placeholder="Enter User Name"
                                required
                                onChange={(e) => this.setState({"name":e.target.value})} 
                                value={this.state.name}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter Account Name"
                                onChange={(e) => this.setState({"accountName":e.target.value})} 
                                value={this.state.accountName}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter Account Number"
                                onChange={(e) => this.setState({"accountNo":e.target.value})} 
                                value={this.state.accountNo}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter Bank IFSC Code"
                                onChange={(e) => this.setState({"ifscCode":e.target.value})}
                                value={this.state.ifscCode}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter Bank Name"
                                onChange={(e) => this.setState({"bankname":e.target.value})}
                                value={this.state.bankname}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter Bank Branch"
                                onChange={(e) => this.setState({"bankbranch":e.target.value})}
                                value={this.state.bankbranch}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input required
                                type="text" 
                                placeholder="Enter Bank Address"
                                onChange={(e) => this.setState({"bankaddress":e.target.value})}
                                value={this.state.bankaddress}  
                            />
                        </Col>
                    </>
                }else if(activeMethod.paymentType==='cod'){
                    return <>
                        <Col xs='12'>
                            <Label for="Mobile">Mobile</Label>
                            <Input
                                minLength={12}
                                maxLength={12}
                                type="text" required
                                placeholder="Enter Mobile"
                                onChange={(e) => this.setState({"mobile":e.target.value})} 
                                value={this.state.mobile}
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Label for="Address">Address</Label>
                            <Input 
                                type="text" required
                                placeholder="Enter Address"
                                onChange={(e) => this.setState({"address":e.target.value})} 
                                value={this.state.address}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Label for="City">City</Label>
                            <Input
                                type="text" required
                                placeholder="Enter City"
                                onChange={(e) => this.setState({"city":e.target.value})}
                                value={this.state.city}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Label for="Postcode">Postcode</Label>
                            <Input 
                                type="text" required
                                placeholder="Enter Postcode"
                                onChange={(e) => this.setState({"postcode":e.target.value})} 
                                value={this.state.postcode}  
                            />
                        </Col>
                    </>
                }
                break;
            case  Payment_Bool.YaarPay:
                // return activeMethod.paymentType.split('-')[0]==='bank'?(
                return <>
                        <Col xs='12'>
                            <Input 
                                type="text" required
                                placeholder="Enter Account Name"
                                onChange={(e) => this.setState({"accountName":e.target.value})} 
                                value={this.state.accountName}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter Account No"
                                onChange={(e) => this.setState({"accountNo":e.target.value})} 
                                value={this.state.accountNo}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Input 
                                type="text" required
                                placeholder="Enter IFSC Code"
                                onChange={(e) => this.setState({"ifscCode":e.target.value})}
                                value={this.state.ifscCode}  
                            />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Select
                                className="React"
                                classNamePrefix="select"
                                id="depositBankCode"
                                name="depositBankCode"
                                options={this.state.activeMethod.depositBankCode}
                                value={this.state.activeMethod.depositBankCode.find(obj => obj.value === this.state.depositBankCode)}
                                defaultValue={this.state.activeMethod.depositBankCode[0]}
                                onChange={(e) => this.setState({"depositBankCode":e.value})}
                            />
                        </Col>
                    </>
            case Payment_Bool.CASH : 
                return <div>
                    <Col xs='12' className='mt-1'>
                            <Input 
                                hidden
                                type="text" 
                                placeholder="Enter IFSC Code"
                                onChange={(e) => this.setState({"ifscCode":e.target.value})}
                                value={this.state.ifscCode}  
                            />
                        </Col>
                </div>
            default:
                break;
        }
    }

    render() {
        const { activeMethod, amount, moreInfoState }=this.state;
        return (
            <React.Fragment>
                { this.props.balance && this.props.balance.balance && this.state.allMethod && this.state.allMethod.length? (
                    <Row className='payment-deposit' style={{minHeight:'600px'}}>
                        <Col lg='12' xl='12'>
                            <div className='p-1 pl-2 pr-2 payment-deposit-menus' style={{height:'100%'}}> 
                                <AmountSetting  activeMethod={activeMethod} amount={amount}  setValue={(r,e)=>this.setValue(r,e)} />
                                <Form onSubmit={(e)=>this.paymentWithdraw(e)}  action={'#'}>
                                    <Row className='p-2'>
                                        <Col sm='12' lg='6' className='pl-1 pr-1'>
                                            <Row>
                                                <Col xs='12'>
                                                    <Row>
                                                        <Col sm='12'  className="payment-deposit-text font-2 curosr-pointer"  onClick={()=>this.setState({moreInfoState:!moreInfoState})} >
                                                            More info
                                                        </Col>
                                                    </Row>
                                                    {moreInfoState?(
                                                        <Row className='payment-deposit-text font-2 mt-1'>
                                                            <Col xs='12'><Input style={{minHeight:'100px', borderRadius:'0px'}} type='textarea' value={"cash payout"} disabled={true} /></Col>
                                                        </Row>
                                                     ):null} 
                                                </Col>
                                                <Col xs='12' sm='6'></Col>
                                            </Row>
                                        </Col>
                                        <Col sm='12' lg='6' className='pl-1 pr-1'>
                                            <Row  className='mt-1 pt-1'>
                                                <Col xs='12'>
                                                    <Button className='igamez-button' color="warning"  type="submit" style={{width:'100%',fontWeight:'bold'}}>Make withdraw</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                ):<div>Please wait </div>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.auth.login,
    PaymentMethod : state.paymentGateWay.PaymentMethod,
    PaymentMenuData:state.paymentGateWay.PaymentMenuData,
    balance : state.balance.value
})

const mapDispatchToProps = {YaarPayWithdraw, PaymentMenuload, paymentMethodLoad, RazorpayWithdraw, Paygate10Withdraw,Cash_payout}

export default connect(mapStateToProps, mapDispatchToProps)(DepositMenus)