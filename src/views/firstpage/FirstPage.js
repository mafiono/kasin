import React from "react"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Casino, LiveCasino} from "./Casino";
import {CasinoSlider} from "../GamePages/CasinoComponents"
import * as FpMngAction from "../../redux/actions/auth/loginActions"
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

class FirstPage extends React.Component {
	
	play = (item) =>{
		if(!this.props.user.values){
			this.props.setloginpage({login : true, register : false});
		}else{
			this.props.playsaccount(item,true);
		}
	}

	render() {
		const {firstpages1,newtext,casinoitems,livecasinoitems,} = this.props.FirstPage;
		return (
			<React.Fragment>
				<CasinoSlider slider_images={firstpages1} play={this.play} bool={true}  me={this.props}   {...this.props}/>
				<Row className="m-0 marqueetext">
					{newtext ? 
					// eslint-disable-next-line
						<marquee>
							{newtext ? newtext.map((item, i) => (
								<span key={i}><strong>{item.title}</strong>{item.navLink}</span>
							)):null}
						</marquee>
					:null}
				</Row>
				{
					livecasinoitems || casinoitems ? 
					<React.Fragment>
						<Row className="m-0">
							<Col xs="12" md="12" lg="12" className="mb-1 p-0">
								<div className="fp-center-letter">
									<h3>THE ULTIMATE PLAYER EXPERIENCE</h3>
								</div>
							</Col>
						</Row>
						<Row>
							<Col xs="6" md="6" lg="6">
								<h4 className='m-0 pl-1'>Live Casino</h4>
							</Col>
							<Col xs="6" md="6" lg="6">
								<h4 className='m-0 pl-1 float-right'><Link to="/live-casino">More</Link></h4>
							</Col>
						</Row>
						{livecasinoitems ? <LiveCasino data={livecasinoitems} me={this.props}  />:null}
						<Row>
							<Col xs="6" md="6" lg="6">
								<h4 className='m-0 pl-1'>Casino</h4>
							</Col>
							<Col xs="6" md="6" lg="6">
								<h4 className='m-0 pl-1 float-right'><Link to="/casino">More</Link></h4>
							</Col>
						</Row>
						{casinoitems ? <Casino data={casinoitems} me={this.props} />:null}

					</React.Fragment>
					: 
					null
				}
			</React.Fragment>
		)
	}
}
const mapStateToProps = (state) => ({
	FirstPage : state.auth.register,
	user : state.auth.login,
})

const mapDispatchToProps = FpMngAction

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
