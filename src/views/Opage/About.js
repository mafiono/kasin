import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'

export class About extends Component {
    render() {
        const {aboutus} = this.props.FirstPage
        return (
            <div className='justify-content-center d-flex'>
                <Row className='ml-0 mr-0 pt-2' style={{maxWidth:'1200px', width:'100%'}}>
                    <Col sm='12' className='mt-1'>
                        <h1 className='d-flex justify-content-start'>About us</h1>
                    </Col>
                    {
                        aboutus ? aboutus.map((item,i)=>{
                            return (
                                <div key={i}>
                                    <Col sm='12' className='mt-1'>
                                        <h1 className='d-flex justify-content-start'>{item.title}</h1>
                                    </Col>
                                    <Col sm='12' className='mt-1'>
                                        <p>
                                            {item.navLink}
                                        </p>
                                    </Col>
                                </div>
                            )
                        }) : null
                    }
                   
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
