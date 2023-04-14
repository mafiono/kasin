import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { MessageCircle} from 'react-feather'

export class About extends Component {
    render() {
        const {contactus} = this.props.FirstPage
        return (
            <div className='justify-content-center d-flex'>
                <Row className='ml-0 mr-0 pt-2' style={{maxWidth:'1200px', width:'100%'}}>
                    <Col sm='12' className='mt-1'>
                        <h1 className='d-flex justify-content-start'>Contacts</h1>
                    </Col>
                    <Col sm='12' className='mt-4 mb-5'>
                        <Row>
                            {
                                contactus ? contactus.map((item,i)=>{
                                    return (
                                        <Col sm='4' xs='12' key={i}>
                                            <MessageCircle size={60} className='m-1'/>
                                            <h3>{item.title}</h3>
                                            <p className='mt-1'>
                                                {item.navLink}
                                            </p>
                                        </Col>
                                    )
                                }) : null
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    FirstPage : state.auth.register
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
