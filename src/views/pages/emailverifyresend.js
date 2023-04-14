import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Col, Button } from "reactstrap"
import { resend_email } from "../../redux/actions/auth/loginActions"

export class emailverifyresend extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email : "example@gmail.com"
        }
    }

    componentDidMount(){
        if(this.props.location.state){
            if(this.props.location.state.data){
                this.setState({email : this.props.location.state.data})
            }
        }
    }

    handleResend = (e) =>{
        e.preventDefault();
        this.props.resend_email(this.state.email)
    }
    

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <Form className="mt-3 mb-3" action="/" onSubmit={this.handleResend}>
                    <Card className="text-white m-0" style={{minWidth:'500px',minHeight:'500px'}}>
                        <CardHeader className='d-flex justify-content-center align-items-center p-2 mt-1'>
                            <CardTitle className="d-block w-100 mt-1 text-center font-weight-bold">Resend Email </CardTitle>
                        </CardHeader>
                        <CardBody className="pb-0  d-block m-0">
                            <Col md="12" className='color-white ml-1'>
                                Please check your email
                            </Col>
                            <Col sm="12" className='pl-2 pb-2 pr-2 pt-0 mt-2'>
                                <FormGroup className='m-0'>
                                    <Input 
                                        type="text" 
                                        name="Email" 
                                        id="EmailVertical"
                                        disabled
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={ e=>this.setState({email: e.target.value})}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="12"className='d-flex m-auto justify-content-end justify-content-center align-items-center text-center' >
                                <Button color="success" className='register-submit igamze-button' type="submit">RESEND</Button>
                            </Col>
                        </CardBody>
                    </Card>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    resend_email
}

export default connect(mapStateToProps, mapDispatchToProps)(emailverifyresend)
