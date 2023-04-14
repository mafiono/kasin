import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { history } from "../../history";
import { connect } from "react-redux"
import queryString from "query-string"

class YaarPayResponse extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            alertState : true, 
            alertTitle : '',
            alertType : null,
            text : '',
            text2 : '',
        }
    }
    
    componentDidMount(){

        var data =  queryString.parse(this.props.location.search);
        if(data){
            let alertTitle = data.status;
            let alertType = "";
            let text = "Transaction Id :" + data.order_no;
            let text2 = "Amount :" + data.amount;
            switch(data.status){
                case "Approve" :
                    alertType = "success";
                break;
                case "Pending" :
                    alertType = "info";
                    break;
                case "Reject" :
                    alertType = "error";
                break;
                default:
                    alertType = "error";
                break;
            }

            this.setState({alertState : true,alertTitle : alertTitle,alertType : alertType,text : text,text2 : text2})
        }
    }

    

    handleAlert = (state, value) => {
        // this.setState({ [state] : value });
        history.push('/mywallet/deposit');
    }
    
    render (){
        return (
                <React.Fragment>
                    {
                        (()=> {
                            if(this.state.alertType==='success'){
                                return(
                                    <SweetAlert success title={this.state.alertTitle}
                                        show={this.state.alertState} 
                                        onConfirm={() => this.handleAlert("alertState", false)}
                                    >
                                        <p className="sweet-alert-text">{this.state.text}</p>
                                        <p className="sweet-alert-text">{this.state.text2}</p>
                                    </SweetAlert>
                                )
                            }else if(this.state.alertType==='info'){
                                return(
                                    <SweetAlert info title={this.state.alertTitle}
                                        show={this.state.alertState} 
                                        onConfirm={() => this.handleAlert("alertState", false)}
                                    >
                                        <p className="sweet-alert-text">{this.state.text}</p>
                                        <p className="sweet-alert-text">{this.state.text2}</p>
                                    </SweetAlert>
                                )
                            }else if(this.state.alertType==='error'){
                                return(
                                    <SweetAlert error title={this.state.alertTitle}
                                        show={this.state.alertState} 
                                        onConfirm={() => this.handleAlert("alertState", false)}
                                    >
                                        <p className="sweet-alert-text">{this.state.text}</p>
                                        <p className="sweet-alert-text">{this.state.text2}</p>
                                    </SweetAlert>
                                )
                            }
                        })()
                    }
                </React.Fragment>
          
        )
    }
}

const paymentGateWayData = (state) =>{
    return {
        PayResultsData : state.paymentGateWay.PayResultsData,
    }
}
export default connect(paymentGateWayData,{})(YaarPayResponse)