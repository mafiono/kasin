import React from "react"
import { Button, Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input,} from "reactstrap"
import { connect } from "react-redux"
import Animate from 'animate.css-react'
import {X} from "react-feather"
import * as LoginAction from "../../redux/actions/auth/loginActions"
import { validateEmail } from "../../redux/actions/auth/index"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"

class Login extends React.Component{
    state = {
        login_card : false,
        username : "",
        password : "",
        remember : false
    }

    componentDidMount(){
        if(localStorage.getItem('remember')){
            var users = localStorage.getItem("remember");
            users = JSON.parse(users);
            this.setState({ username: users.username ,password :users.password })    
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.registerpage !== prevProps.registerpage){
            if (this.props.registerpage.login === true) {
                this.setState({login_card:true});
            }else{
                this.setState({login_card:false});
        
            }
        }
    }

    toggle_login = () =>{
        this.props.setloginpage({login : true, register : false,forgot : false});
    }
    
    cancle = () => {
        this.props.setloginpage({login : false, register : false,forgot : false});
    }

    forgot = () =>{
        this.props.setloginpage({login : false, register : false,forgot : true});
    }

    joinus = () =>{
        this.props.setloginpage({login : false, register : true,forgot : false});
    }
    
    handleLogin = e => {
        e.preventDefault();
        if(this.state.remember){
            var remember = {
                password : this.state.password,
                username : this.state.username
            }
            localStorage.setItem("remember",JSON.stringify(remember))
        }
        var mailcheck =  validateEmail(this.state.username);
        if(mailcheck){
            this.props.loginWithJWT(this.state)
        }
    }
    
    handleRemember = e => {
        this.setState({ remember: e.target.checked })
    }

    render(){
        return (
            <div>
                <Button.Ripple className='btn-login igamez-button' color="warning" onClick={()=>this.toggle_login()}>LOGIN</Button.Ripple>
                {this.state.login_card === true ? 
                    <Animate appear="fadeIn" durationAppear={500} leave="fadeOut" durationLeave={500} component="div">
                        <Form action="/" onSubmit={this.handleLogin} className="auth-form">
                            <Card>
                                <CardHeader className='mt-1'>
                                    <Col md="12">
                                        <X  size="20" className="font-weight-bold float-right cursor-pointer" onClick={()=>this.cancle()}/>
                                    </Col>
                                    <Col md="12" className="font-weight-bold">
                                        Cool just login
                                    </Col>
                               </CardHeader>
                                <CardBody className="login-body pb-0 mt-2">
                                    <Row>
                                        <Col md="12" className='pt-0'>
                                            <FormGroup className='m-0'>
                                                <Input  type="text" name="username"  id="EmailVertical" placeholder="Email / Username" 
                                                    value={this.state.username} onChange={ e=>this.setState({username: e.target.value})} required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="12" className='pt-2'>
                                            <FormGroup className='m-0'>
                                                <Input  type="password"  name="password"  id="passwordVertical"  placeholder="Password"
                                                    value = {this.state.password} onChange={e=>this.setState({password:e.target.value})}
                                                    required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="12" className='pt-2'>
                                            <Checkbox color="primary" icon={<Check className="vx-icon" size={16} />}
                                                label="Remember me" defaultChecked={false} onChange={this.handleRemember}
                                                className="float-left w-100 mb-1" />
                                        </Col>
                                        <Col md="6" sm="12" className="pt-1">
                                            <span color="success" className='cursor-pointer float-left text-decoration-underline' onClick={()=>this.forgot()}>
                                                Forgot Password?
                                            </span>
                                        </Col>
                                        <Col md="6" sm="12" className="pt-1">
                                            <span color="danger" className='cursor-pointer float-right text-decoration-underline' onClick={()=>this.joinus()}>
                                                Join Us
                                            </span>
                                        </Col>
                                        <Col md="12" className="mt-2 pb-1">
                                            <Button className='register-submit btn-warning igamez-button w-100'  type="submit">SIGNIN</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
