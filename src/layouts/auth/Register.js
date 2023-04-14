import React from "react"
import { Button, Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input, CardFooter, CardTitle } from "reactstrap"
import { connect } from "react-redux"
import Animate from 'animate.css-react'
import captchapng from 'captchapng';
import { toast } from "react-toastify"
import Media from "react-media";
import { User, Mail, Lock, X } from "react-feather"
import { playerid ,defaultSupermaster} from "../../configs/providerConfig"
import { validateUsername } from "../../redux/actions/auth/index"
import { setloginpage, registeraction } from '../../redux/actions/auth/loginActions'
import { validateEmail1 } from "../../redux/actions/auth";

class Register extends React.Component{
    state = {
        captchapng:null,
        captchanumber:null,
        register_card : false,
        password : "",
        email : "",
        firstname : "",
        lastname : "",
        username : "",
        mobilenumber : "",
        repassword : "",
        digit_code : "",
    }

    componentDidMount(){
        this.captchaImg();
    }

    componentDidUpdate(prevProps){
        if(prevProps.loginpage !== this.props.loginpage){
            if (this.props.loginpage.register === true) {
                this.setState({register_card : true});
                this.captchaImg();
            }else{
                this.setState({register_card : false});
            }
        }
    }

    toggle_register = () =>{
        this.props.setloginpage({register : true, login : false})
    }

    cancle = () => {
        this.props.setloginpage({login : false, register : false});
    }

    login = () => {
        this.props.setloginpage({login : true, register : false,forgot : false});
    }

    handleregister = e =>{
        e.preventDefault();
        if(this.state.repassword !== this.state.password){
            toast.error("please input correct password");
            return;
        }else if(parseInt(this.state.digit_code) !== this.state.captchanumber){
            toast.error("please input correct digit code");
            return;
        }else{
            var usernamecheck= validateUsername(this.state.username)
            if(usernamecheck){
                var eamilcheck= validateEmail1(this.state.email)
                if(eamilcheck){
                    var row = {
                        password : this.state.password,
                        email : this.state.email,
                        firstname : this.state.firstname,
                        lastname : this.state.lastname,
                        username : this.state.username,
                        mobilenumber : this.state.mobilenumber,
                        permission : playerid,
                        status : "allow",
                        isdelete : false,
                        created : defaultSupermaster
                    }
                    this.props.registeraction(row)
                }
            }
        }
    }

   
    
    captchaImg(){
        var captchanumber = parseInt(Math.random()*9000+1000);
        var p = new captchapng(150,38,captchanumber);
        p.color(115, 95, 197, 100);
        p.color(30, 104, 21, 255);
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        img = "data:image/jpeg;base64,"+new Buffer(imgbase64).toString('base64');   
        this.setState({captchapng:img,captchanumber:captchanumber});
    }

    render(){
        return (
            <div className='imtem-center'>
                <Button.Ripple color="danger" className="btn-register " onClick={()=>this.toggle_register()} >
                <Media 
                    queries={{
                        Mobile : "(max-width: 767px)",
                        Tablet : "(min-width: 768px) and (max-width: 991px)",
                        Desktop : "(min-width: 992px)"
                    }}>
                    {matches => (
                        <>
                            {matches.Mobile && <>JOIN US </>}
                            {matches.Tablet && <>JOIN US </>}
                            {matches.Desktop && <>JOIN US </>}
                        </>
                    )}
                </Media>
                </Button.Ripple>
                {
                    this.state.register_card === true ? 
                    <Animate appear="fadeIn" durationAppear={500} leave="fadeOut" durationLeave={500}>
                        <Form action="/" onSubmit={this.handleregister} className="auth-form">
                            <Card className='register'>
                                <CardHeader className="d-flex w-100 pb-3" >
                                    <CardTitle className="d-block w-100 mt-1">
                                        <span>&nbsp;</span>
                                        CREATE FREE ACCOUNT
                                        <X size="30" className="font-weight-bold float-right" style={{cursor : "pointer"}} onClick={()=>this.cancle()}/>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody className="register-body pt-1 pb-0" >
                                    <Row className="pr-2 pl-2">
                                        <Col xs="12" sm="6" className="pt-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input
                                                    type="text" name="name" placeholder="user name" required minLength={5} 
                                                    maxLength={15} value = {this.state.username} onChange={e=>this.setState({username : e.target.value})}
                                                />
                                                <div className="form-control-position">
                                                    <User size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>
    
                                        <Col  xs="12" sm="6"  className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input type="email" name="Email" required value={this.state.email}
                                                    onChange={e=>this.setState({email : e.target.value})} id="EmailVerticalIcons"
                                                    placeholder="Email" />
                                                <div className="form-control-position">
                                                    <Mail size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative"> 
                                                <Input type="password" name="password" placeholder="Password"
                                                    required maxLength={15} minLength={6} value={this.state.password}
                                                    onChange={e=>this.setState({password : e.target.value})}
                                                />
                                                <div className="form-control-position">
                                                    <Lock size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input type="password" name="password" placeholder="RePassword"
                                                    required maxLength={15} minLength={6} value={this.state.repassword}
                                                    onChange={e=>this.setState({repassword : e.target.value})}
                                                />
                                                <div className="form-control-position">
                                                    <Lock size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>


                                        <Col xs="6" sm="3" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="position-relative"> 
                                                <Input className='pr-1' type="text" name="name" placeholder="First Name"
                                                    required value = {this.state.firstname}
                                                    onChange={e=>this.setState({firstname : e.target.value})}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="6" sm="3" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="position-relative">
                                                <Input className='pr-1' type="text" name="name" required
                                                  value = {this.state.lastname} onChange={e=>this.setState({lastname : e.target.value})}
                                                    placeholder="Last Name"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input type="number" name="mobile" id="IconsMobile" placeholder="Mobile"
                                                    onChange={e=>this.setState({mobilenumber : e.target.value})}
                                                    value = {this.state.mobilenumber} maxLength={10} required 
                                                />
                                                <div className="form-control-position">
                                                    <span style={{color:'white'}}>+91</span>
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="form-label-group">
                                                <Input type="number" name="digit_code" id="digit_code" placeholder="Enter 4 digit code"
                                                    required maxLength={4} value = {this.state.digit_code}
                                                    onChange={e=>this.setState({digit_code : e.target.value})}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col  xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <img className='captcha-png' src={this.state.captchapng} alt=""/>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter className='w-100'>
                                    <Button color="success" className=' register-submit igamez-button' type="submit">REGISTER</Button>
                                    <p className="mt-1">
                                        Already have an account?
                                        <span onClick={()=>this.login()} className="font-weight-bold" style={{cursor:"pointer"}}> Sign In</span>
                                    </p>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Animate>
                    :null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginpage : state.auth.login.setloginpage,
    firstpagesettinglogoimg : state.auth.login.firstpagesettinglogoimg,
    iplocation : state.auth.login.iplocation
})

const mapDispatchToProps = {
    registeraction, setloginpage
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
