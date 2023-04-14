import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'

export class About extends Component {

    render() {
        const {privacypolicy} = this.props.FirstPage
        return (
            <div className='justify-content-center d-flex'>
                <Row className='ml-0 mr-0 pt-2' style={{maxWidth:'1200px', width:'100%'}}>
                    <Col sm='12' className='mt-1'>
                        <h1 className='d-flex justify-content-start'>Privacy Policy</h1>
                    </Col>
                    <Col sm='12' className='mt-4 mb-5'>
                    {
                        privacypolicy ? privacypolicy.map((item,i)=>{
                            return(
                                <div key={i}>
                                    <h2>
                                    {item.title}
                                    </h2>
                                    <h5>
                                    {item.navLink}
                                    </h5>
                                </div>
                            )
                        }) : null
                    }
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      FirstPage : state.auth.register
    }
  }
  

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
