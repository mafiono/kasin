import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

class Clock extends Component{
    _isMounted = false;

    constructor(props) {
		super(props)
		this.state = {
            time: new Date(),
		}
	}
	
	componentDidMount() {
        this._isMounted = true;
	}

    componentDidUpdate(prevProps,prevState){
        if(prevState.time !== this.props.time){
            this.setState({time : this.props.time});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render(){
        return(
            <div className="header-time-bar">
                {
                this.props.time && this.props.time.toLocaleTimeString ? 
                <React.Fragment>
                    <div className="header-clock-time d-flex justify-content-center align-items-center text-center">
                        <FontAwesomeIcon color="#1a9a65" icon={faClock} className='igamez-icon'/>
                        <h2>
                               { this.props.time.toLocaleTimeString}
                        </h2>
                    </div>
                    <div className="header-clock-date">
                        <div className="header-clock-year">
                            <span>
                               { this.props.time.toDateString }
                            </span>
                        </div>
                    </div>
                </React.Fragment>
                : null
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    time : state.time.value
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock)