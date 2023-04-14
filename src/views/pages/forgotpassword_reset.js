import React from 'react'
import { Card, CardBody, Input, Col, Row, Form, FormGroup, CardHeader, CardTitle, CardFooter, Button } from "reactstrap"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import { history } from "../../history";
import { forgotpassword_receive, forgotpassword_set } from "../../redux/actions/auth/loginActions"

class ForgotPasswordVerify extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user  :null,
            email : "",
            Repassword  :"",
            password : ""
        }
    }

    componentDidMount(){
        var data = history.location.pathname.split(':')[1];
        this.props.forgotpassword_receive(data)
    }

    componentDidUpdate(prevProps){
        if(this.props.userdata){
            if(prevProps.userdata.forgotpasswordemail !== this.props.userdata.forgotpasswordemail){
                this.setState({email : this.props.userdata.forgotpasswordemail})
            }
        }
    }

    handleForgotPassword = (e) =>{
        e.preventDefault();
        if(this.state.password !== this.state.Repassword){
            toast.warn("please enter correct password")
            return;
        }else{
            this.props.forgotpassword_set(this.state)
        }
    }

    render (){
        return (
            this.state.email? (
                <div className='d-flex justify-content-center vw vh p-2'>
                <Form className="mt-3 mb-3" action="/" onSubmit={this.handleForgotPassword}>
                    <Card className="text-white m-0 p-3" style={{maxWidth:'450px'}}>
                        <CardHeader className='d-flex justify-content-center align-items-center p-2'>
                            <CardTitle className="d-block w-100 text-center">RESET PASSWORD  </CardTitle>
                        </CardHeader>
                        <CardBody className='p-0'>
                            <Row>
                                <Col sm="12" className='pb-2 pt-0'>
                                    <FormGroup className='m-0'>
                                        <Input 
                                            type="text" 
                                            name="Email" 
                                            id="EmailVertical"
                                            placeholder="Email / Username"
                                            disabled
                                            value={this.state.email}
                                            onChange={ e=>this.setState({email: e.target.value})}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="12" className='pb-2 pt-0'>
                                    <FormGroup className='m-0'>
                                        <Input 
                                            type="password" 
                                            name="password" 
                                            maxLength={15}
                                            minLength={6}
                                            id="passwordVertical" 
                                            placeholder="Password"
                                            value = {this.state.password}
                                            onChange={e=>this.setState({password:e.target.value})}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="12" className='pb-2 pt-0'>
                                    <FormGroup className='m-0'>
                                        <Input
                                            type="password" 
                                            maxLength={15}
                                            minLength={6}
                                            name="password" 
                                            id="passwordVertical1" 
                                            placeholder="REPassword"
                                            value = {this.state.Repassword}
                                            onChange={e=>this.setState({Repassword:e.target.value})}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className='d-flex justify-content-end'>
                            <Button color="success" className=' register-submit igamze-button' type="submit">RESET</Button>
                        </CardFooter>
                    </Card>
                </Form>
            </div>
            ) :(<div/>)
        )
    }
}

const mapStateToProps = (state) => ({
    userdata : state.auth.login
    
})

const mapDispatchToProps = {
    forgotpassword_receive, forgotpassword_set
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordVerify)
