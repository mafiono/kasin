import React, { Component } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import {Root,} from "../../authServices/rootconfig"
import avatar from "../../assets/avatar.png"
import { Row } from "reactstrap";

const id_preffix = Root.id_preffix;
class SidebarHeader extends Component {

	state = {
		users : {},
		avatar : null,
		mbalance : '0 INR',
		bbalance : '0 INR'
    }

	componentDidUpdate(prevProps, prevState){
		if(this.props.user){
			if(this.props.user.profile_user !== prevState.users){
				this.setState({users  : this.props.user.profile_user});
			}			
		}
		if(prevProps.bal !== this.props.bal){
             this.setState({bbalance : this.props.bal ? parseInt(this.props.bal.bonusbalance).toString()+' INR':'0 INR',mbalance :this.props.bal ? parseInt(this.props.bal.balance).toString()+' INR':'0 INR' });
        }
	}

	render() {
		return (
			<div className="navbar-header">
				<ul className="nav navbar-nav flex-row">
					<li className="nav-item nav-toggle">
						<div className="nav-link">
						<Link to="/myprofile/profile-info">
							{this.state.users&&this.state.users.avatar?(
								<img src={Root.imageurl +this.state.users.avatar}  alt=''/>
							):(
								<img src={avatar} alt=''/>  
							)}
							<h5>
								<small className="d-table-row mt-1">{this.state.users && this.state.users.id ?  id_preffix + this.state.users.id + ":" + this.state.users.username : ""}</small>
								<small>{this.state.users && this.state.users.email ? this.state.users.email : ""}</small> 
							</h5>
						</Link>
						<Row>
							<div>Main Balance<br/>{this.state.mbalance}</div>
							<div>Bonus Balance<br/>{this.state.bbalance}</div>
						</Row>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}

const getusers = (state) =>{
    return {
        user : state.auth.login,
        bal : state.balance.value,
    }
  }
export default connect(getusers)(SidebarHeader)
