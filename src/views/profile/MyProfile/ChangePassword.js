import React from "react"
import {Button,FormGroup,Row,Col,Input,Label,Card,CardTitle,CardBody} from "reactstrap"
import { Settings, Lock} from "react-feather"
import {changepassword} from "../../../redux/actions/auth/ProfileActions"
import { connect } from "react-redux"


class ChangePassword extends React.Component {

    state = {
        currentpassword : '',
        password : '',
        confirmpassword : '',
    }

    changepassword = () =>{
        if(this.state.password !== this.state.confirmpassword){
            alert("Please input correct password and confirmpassword");
            return;
        }
        this.props.changepassword({password : this.state.password,currentpassword: this.state.currentpassword});
        this.setState({
            currentpassword : '',
            password : '',
            confirmpassword : '',
        })
    }
    render(){
        return (
            <Card>
                <CardTitle className="text-center pt-2">
                    Change Password
                </CardTitle>                    
                <CardBody>
                    <Row>
                        <Col sm="12" md="12">
                        <Label >CurrentPassword</Label>
                            <FormGroup className="has-icon-left form-label-group position-relative">
                                <Input
                                    type="password"
                                    placeholder="CurrentPassword"
                                    required
                                    value={this.state.currentpassword}
                                    onChange={e => this.setState({ currentpassword: e.target.value })}
                                />
                                <div className="form-control-position">
                                    <Lock size={15} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="12">
                        <Label >New Password</Label>
                            <FormGroup className="has-icon-left form-label-group position-relative">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                                <div className="form-control-position">
                                    <Settings size={15} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="12">
                        <Label >confirmpassword</Label>
                            <FormGroup className="has-icon-left form-label-group position-relative">
                                <Input
                                    type="password"
                                    placeholder="confirmpassword"
                                    required
                                    value={this.state.confirmpassword}
                                    onChange={e => this.setState({ confirmpassword: e.target.value })}
                                />
                                <div className="form-control-position">
                                    <Settings size={15} />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="12" className='d-flex justify-content-end'>
                            <Button  className='igamez-button' color="primary" type="button" onClick={()=>this.changepassword()} >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

const getusers = (state) =>{
    return {
        user : state.auth.login.profile_user,
    }
}
export default connect(getusers,{changepassword})(ChangePassword)