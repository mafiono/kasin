import React from "react"
import { Col,Row,Button} from "reactstrap"
import Toggle from "react-toggle"
import {connect} from "react-redux"
import { set_notification,get_notification} from "../../../redux/actions/profile"

class Notifications extends React.Component {

    state = {
        internalmessage: false,
        pushnotification : false,
        emailnotification : false,
        sms : false,
        phonecall : false,
        notify : false,
        users : {}
    }

     componentDidMount(){
        this.props.get_notification();
    }

    notificationsave =() =>{
        var data = {};
        data = this.state;
        data['email'] = this.props.user.email;
        this.props.set_notification(data);
    }

    internalmessage = () => {
        this.setState({
            internalmessage: !this.state.internalmessage
        })
    }

    pushnotification = () => {
        this.setState({
            pushnotification: !this.state.pushnotification
        })
    }
    sms = () => {
        this.setState({
            sms: !this.state.sms
        })
    }
    emailnotification = () => {
        this.setState({
            emailnotification: !this.state.emailnotification
        })
    }
    phonecall = () => {
        this.setState({
            phonecall: !this.state.phonecall
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.notify !== this.props.notify){
            this.setState({internalmessage : this.props.notify.internalmessage,
            pushnotification :this.props.notify.pushnotification ,sms : this.props.notify.sms,
            emailnotification :this.props.notify.emailnotification,phonecall : this.props.notify.phonecall})
        }
    }
      
    render(){
        return (
            <div style={{padding:"2% 5%"}}>
                <Row>
                    <Col xs='12'>
                        <h4 style={{textAlign:'center'}}>
                            Notify me about news and offer by
                        </h4>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <p>Internal Message</p>
                            </Col>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <label className="react-toggle-wrapper">
                                    <Toggle checked={this.state.internalmessage} onChange={this.internalmessage} name="controlledSwitch" value="yes"/>
                                    <Button.Ripple className='igamez-button' color="primary" size="sm" onClick={this.internalmessage}>
                                        {this.state.internalmessage ? "Yes" : "No"}
                                    </Button.Ripple>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <p>Push Notification</p>
                            </Col>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <label className="react-toggle-wrapper">
                                    <Toggle checked={this.state.pushnotification} onChange={this.pushnotification} name="controlledSwitch" value="yes" />
                                    <Button.Ripple className='igamez-button' color="primary" size="sm" onClick={this.pushnotification}>
                                        {this.state.pushnotification ? "Yes" : "No"}
                                    </Button.Ripple>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <p>email</p>
                            </Col>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <label className="react-toggle-wrapper">
                                    <Toggle checked={this.state.emailnotification} onChange={this.emailnotification} name="controlledSwitch" value="yes"/>
                                    <Button.Ripple className='igamez-button' color="primary" size="sm" onClick={this.emailnotification}>
                                        {this.state.emailnotification ? "Yes" : "No"}
                                    </Button.Ripple>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <p>sms</p>
                            </Col>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <label className="react-toggle-wrapper">
                                    <Toggle checked={this.state.sms} onChange={this.sms} name="controlledSwitch" value="yes"/>
                                    <Button.Ripple className='igamez-button' color="primary" size="sm" onClick={this.sms}>
                                        {this.state.sms ? "Yes" : "No"}
                                    </Button.Ripple>
                                </label>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="12">
                        <Row>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <p>phonecall</p>
                            </Col>
                            <Col className='d-flex justify-content-center' xs='6'>
                                <label className="react-toggle-wrapper">
                                    <Toggle checked={this.state.phonecall} onChange={this.phonecall} name="controlledSwitch" value="yes" />
                                    <Button.Ripple className='igamez-button' color="primary" size="sm" onClick={this.phonecall}>
                                        {this.state.phonecall ? "Yes" : "No"}
                                    </Button.Ripple>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" className='d-flex justify-content-end'>
                        <Button className='igamez-button' color="primary" onClick={()=>this.notificationsave()}>
                            Confirm
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.auth.login.profile_user,
    notify : state.profile.notification.notify
})

const mapDispatchToProps = {
    set_notification,get_notification 
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
