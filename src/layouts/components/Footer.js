import React from "react"
import { Link } from "react-router-dom";
import * as Icon from "react-feather"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux"
import Media from "react-media";
import classnames from "classnames"
import { GameProvider } from "../auth"
import {Root} from "../../authServices/rootconfig"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

class Footer extends React.Component {
  
  render() {
    const { logoimg, title, firstmenu, footertext, sociallink, firstquick, paymentimgs, providerimgs } = this.props.FirstPage;
    let footerTypeArr = ["sticky", "static", "hidden"]
    return (
      <React.Fragment>
        {
          logoimg && firstmenu ? 
        <Media 
          queries={{Mobile : "(max-width: 767px)",Tablet : "(min-width: 768px)",Desktop : "(min-width: 992px)"}}>
          {matches => (
            <footer
              className={classnames("footer footer-light", {
                "footer-static": this.props.footerType === "static" || !footerTypeArr.includes(this.props.footerType),
                "d-none": this.props.footerType === "hidden"
              })}
            >
              {matches.Mobile && <></>}
              {matches.Tablet && <>
                <Row className='footer-content m-0'>
                  <Col xs="12" md="12" sm="12" lg="12" className="footer-gameprovider-slider mb-1 w-100 ">
                    <GameProvider providerimgs={providerimgs} />
                  </Col>
                  <Col xs="12" md="12" sm="12" lg="12" className="footer-paymentmethod mb-1 w-100 ">
                    <h4>Payment Methods</h4>
                    <div className="paymentmethods-imgs">
                      {paymentimgs?paymentimgs.map((item,i) => (
                        <img src={Root.imageurl + item.image} alt={item.image} key={i} />
                      )):null}
                    </div>
                  </Col>
                  <Col xs="12" sm="12" md="3" lg="3" className="mb-1">
                    <div className="footer-logo mb-1">
                      <img src={!logoimg ? "" :Root.imageurl + logoimg} alt="logo" />
                    </div>
                    <div className="footer-logo-text">
                      {title?title:null}                          
                    </div>
                  </Col>
                  <Col xs="6" sm="6" md="3" lg="3" className="footer-menu mb-1">
                    <ul className="ul-list">
                      <li><h4>MENU</h4></li>
                      {firstmenu ? firstmenu.map((item,i) => (
                        <li key={i}><Link to={item.navLink}>{item.title}</Link></li>
                      )):null}
                    </ul>
                  </Col>
                  <Col xs="6" sm="6" md="3" lg="3" className="footer-menu mb-1">
                    <ul className="ul-list">
                      <li><h4>QUICK LINKS</h4></li>
                      {firstquick ? firstquick.map((item,i) => (
                        <li key={i}>
                          <Link className="Social-icon" to={item.navLink}>{item.title}</Link>
                        </li>
                      )):null}
                    </ul>
                  </Col>
                  <Col xs="12" sm="12" md="3" lg="3" className="mb-1">
                    <div className="footer-socials-feed">
                      <div className="footer-logo mb-1">
                        <a href={""}>
                          <img src={!logoimg ? "" :Root.imageurl + logoimg} alt="logo" />
                        </a>
                      </div>

                      <h4>GET IN TOUCH</h4>
                      {sociallink ? sociallink.map((item,i) => (
                        <a className="Social-icon" key={i} href={item.navLink}  target="_blank" rel="noopener noreferrer" >
                          <SocialIcon data = {item}/>
                        </a>
                      )):null}
                    </div>
                  </Col>
                  <Col xs="12" md="12" sm="12" lg="12">
                    {footertext?footertext:null}
                  </Col>
                </Row>
                <div id='footer-hidden'/>
              </>}
            </footer>
          )}
        </Media>
        : 
        <SkeletonTheme  color="#202020" highlightColor="#444" className="mt-1">
          <Skeleton count={15} />
        </SkeletonTheme>
        }
      </React.Fragment>
    )
  }
}

const SocialIcon = ({data}) => {
  switch(data.icon){
    case "facebook" :
      return <Icon.Facebook color={'gray'} size={20}/>
    case "instagram" :
      return <Icon.Instagram color={'gray'} size={20}/>
    case "twitter" :
      return <Icon.Twitter color={'gray'} size={20}/>
    default :
      return <div/>
  }
}
const mapStateToProps = (state) => ({
  FirstPage : state.auth.register,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
