import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { CashfreeResults } from "../../redux/actions/paymentGateWay"
import { history } from "../../history";
import { connect } from "react-redux"

class CashfreeResponse extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            alertState : false, 
            alertTitle : '',
            alertType : null,
            text : '',
        }
    }
    
    componentDidMount(){
        var order_no = history.location.pathname.split(':')[1];
        this.props.CashfreeResults(order_no);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.PayResultsData!==prevProps.PayResultsData){
            var txStatus = this.props.PayResultsData.resultData.txStatus;
            if(txStatus==='CANCELLED'){
                this.setState({
                    alertState:true,
                    alertTitle:txStatus,
                    alertType:'info',
                    text:this.props.PayResultsData.amount+" IDR"
                })
            }else if(txStatus==="SUCCESS"){
                this.setState({
                    alertState:true,
                    alertTitle:txStatus,
                    alertType:'success',
                    text:this.props.PayResultsData.amount+" IDR"
                })
            }else if(txStatus==="FAILED"){
                this.setState({
                    alertState:true,
                    alertTitle:txStatus,
                    alertType:'error',
                    text:this.props.PayResultsData.amount+" IDR"
                })
            }
        }
    }

    handleAlert = (state, value) => {
        this.setState({ [state] : value });
        history.push('/mywallet/deposit');
    }
    
    render (){
        return (
            this.props.PayResultsData? (
                <React.Fragment>
                    {
                        this.props.PayResultsData ? 
                        (()=> {
                            if(this.state.alertType==='success'){
                                return(
                                    <SweetAlert success title={this.state.alertTitle}
                                        show={this.state.alertState} 
                                        onConfirm={() => this.handleAlert("alertState", false)}
                                    >
                                        <p className="sweet-alert-text">{this.state.text}</p>
                                    </SweetAlert>
                                )
                            }else if(this.state.alertType==='info'){
                                return(
                                    <SweetAlert info title={this.state.alertTitle}
                                        show={this.state.alertState} 
                                        onConfirm={() => this.handleAlert("alertState", false)}
                                    >
                                        <p className="sweet-alert-text">{this.state.text}</p>
                                    </SweetAlert>
                                )
                            }else if(this.state.alertType==='error'){
                                return(
                                    <SweetAlert error title={this.state.alertTitle}
                                        show={this.state.alertState} 
                                        onConfirm={() => this.handleAlert("alertState", false)}
                                    >
                                        <p className="sweet-alert-text">{this.state.text}</p>
                                    </SweetAlert>
                                )
                            }
                        })():null
                    }
                </React.Fragment>
            ) :(
                <div/>
            )
        )
    }
}

const paymentGateWayData = (state) =>{
    return {
        PayResultsData : state.paymentGateWay.PayResultsData,
    }
}
export default connect(paymentGateWayData,{CashfreeResults})(CashfreeResponse)