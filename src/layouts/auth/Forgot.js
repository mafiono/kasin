import React from "react"
import { Button, Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input, CardFooter, CardTitle } from "reactstrap"
import { connect } from "react-redux"
import Animate from 'animate.css-react'
import {ChevronLeft,X} from "react-feather"
import * as LoginAction from "../../redux/actions/auth/loginActions"

class Forgot extends React.Component{
    
    state = {
        forgot_card : false,
        email : "",   
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.registerpage !== prevProps.registerpage){
            if (this.props.registerpage.forgot === true) {
                this.setState({forgot_card:true});
            }else{
                this.setState({forgot_card:false});

            }
        }
    }

    login = () =>{
        this.props.setloginpage({login : true, register : false,forgot : false});
    }
    
    cancel = () => {
        this.props.setloginpage({login : false, register : false,forgot : false});
    }

    forgot = () =>{
        this.props.setloginpage({login : false, register : false,forgot : true});
    }
    
    handleForgot = e => {
        e.preventDefault();
        this.props.forgotpassword_send( this.state )
    }

    render(){
        return (
            <div>
                {this.state.forgot_card === true ? 
                    <Animate appear="fadeIn" durationAppear={500} leave="fadeOut" durationLeave={500} component="div" >
                        <Form  action="/" onSubmit={this.handleForgot} className="auth-form">
                            <Card>
                                <CardHeader className='p-2 mt-1'>
                                    <CardTitle className="d-block w-100 mt-1">
                                        <ChevronLeft size="30" className="font-weight-bold cursor-pointer" onClick={()=>this.login()}/>
                                        FORGOT PASSWORD?
                                        <X size="30" className="font-weight-bold cursor-pointer" onClick={()=>this.cancel()}/>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody className="login-body pb-0">
                                    <Row>
                                        <Col md='12'>
                                            Enter your registered e-mail address below and the instructions for retrieving the password will be sent to your e-mail.
                                        </Col>
                                        <Col sm="12" className='pl-2 pb-2 pr-2 pt-0 mt-2'>
                                            <FormGroup className='m-0'>
                                                <Input 
                                                    type="text" 
                                                    name="Email" 
                                                    id="EmailVertical"
                                                    placeholder="Your Email Address"
                                                    value={this.state.email}
                                                    onChange={ e=>this.setState({email: e.target.value})}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter className='pb-4 d-block'>
                                    <Button color="success" className=' register-submit igamez-button' type="submit">Submit</Button>                                       
                                </CardFooter>
                            </Card>
                        </Form>
                    </Animate>
                :null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    registerpage : state.auth.login.setloginpage
})

const mapDispatchToProps = LoginAction

export default connect(mapStateToProps, mapDispatchToProps)(Forgot)
