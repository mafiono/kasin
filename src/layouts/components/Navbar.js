import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand } from "mdbreact";
import { Dropdown, Button, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames"
import { Login, Register, Forgot, Clock } from "../auth"
import { logoutWithJWT } from "../../redux/actions/auth/loginActions";
import avatar from "../../assets/avatar.png";
import { Root ,} from "../../authServices/rootconfig";
import { history } from "../../history";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'mdbreact/dist/css/mdb.css';
import {Download} from "react-feather";
import Media from "react-media";

const id_preffix = Root.id_preffix;
const handleNavigation = (e, path) => {
    e.preventDefault();
    history.push(path)
}



class Navbar extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
    
        this.state = {
            langDropdown: false,
            users : {},
            isAuthenticated : false,
            balance : 0,
            session : null
        }
    }
    
     componentDidMount() {
        this._isMounted = true;
        window.addEventListener('resize', this.handleResize, false)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

     componentDidUpdate(prevProps, prevState){
        if(prevProps.user.values !== this.props.user.values){
            this.setState({users : this.props.user.profile_user});
        }

        if( this.props.bal && prevState.bal !== this.props.bal){
            // console.log("--")
            //  this.setState({bal : this.props.bal});
            // this.setState({
            //     balance : balance
            // })
        }
        if(prevProps.session !== this.props.session){
            console.log(this.props.session,"=---sesion -----------")
            this.setState({session : this.props.session})
        }
    }
    
    handleLangDropdown = () =>{
        this.setState({ langDropdown: !this.state.langDropdown })
    }
    
    logout = () => {
        this.props.logoutWithJWT();
    }
    
    loadLogo(favicon){
        let link = document.querySelector('link[rel="shortcut icon"]') ||
        document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.id = 'favicon';
            link.rel = 'shortcut icon';
            document.head.appendChild(link);
        }
        link.href = Root.imageurl +favicon;
    }

    render(){
        const { logoimg, favicon,appurl,sidebar } = this.props.Firstpage;
        let balance = this.props.bal && this.props.bal.balance ? parseInt(this.props.bal.balance + this.props.bal.bonusbalance) : 0 

        const colorsArr = [ "primary", "danger", "success", "info", "warning", "dark"]
        const guestLinks = (
            <div className='d-flex guest-links'>
                <div className="header-user-info">
                    <Media queries={{Mobile : "(max-width: 767px)",Tablet : "(min-width: 768px)",Desktop : "(min-width: 992px)"}}>
                        {matches => (
                            <>
                                {matches.Mobile && 
                                    <div className=''>
                                       <Button className='header-deposit-button-1 igamez-button' color="warning" onClick={(e)=>handleNavigation(e, "/mywallet/deposit",sidebar)} >
                                            &nbsp; Deposit
                                        </Button>
                                        <h6>{ balance}
                                        { this.props.user.profile_user && this.props.user.profile_user.currency && this.props.user.profile_user.currency !== "" ? this.props.user.profile_user.currency : "INR" }
                                        </h6>
                                    </div>
                                }
                                {matches.Tablet && <>
                                    <Button className='header-deposit-button igamez-button' color="warning" onClick={(e)=>handleNavigation(e, "/mywallet/deposit",sidebar)} >
                                        Deposit
                                    </Button>
                                </>}
                            </>
                        )}
                    </Media>
                    {/* <div className="header-user-balance">
                        
                    </div> */}
                </div>
                <Dropdown
                    tag="li"
                    className="dropdown-language nav-item"
                    isOpen={this.state.langDropdown}
                    toggle={this.handleLangDropdown}
                        // isOpen={true}
                    onMouseEnter={this.handleLangDropdown}
                    onMouseLeave={this.handleLangDropdown}
                    data-tour="language"
                >
                <DropdownToggle 
                    tag="a" className="nav-link d-flex align-items-center " 
                    onClick={e => handleNavigation(e, "/myprofile/profile-info",sidebar)}>
                         <Media queries={{Mobile : "(max-width: 767px)",Tablet : "(min-width: 768px)",Desktop : "(min-width: 992px)"}}>
                        {matches => (
                            <>
                                {matches.Mobile && 
                                    <div className=''>
                                    </div>
                                }
                                {matches.Tablet && <>
                                    <h4 className="header-user-balance">{balance }
                                    { this.props.user.profile_user && this.props.user.profile_user.currency && this.props.user.profile_user.currency !== "" ? this.props.user.profile_user.currency : "INR" }
                                    </h4>
                                </>}
                            </>
                        )}
                    </Media>

                    {
                        this.props.user.profile_user && this.props.user.profile_user.avatar ? (
                            <img src={Root.imageurl +this.props.user.profile_user.avatar} alt='user-avatar'/> 
                        ):(
                            <img src={avatar} alt='user-avatar'/>  
                        ) 
                    }
                </DropdownToggle>
                <DropdownMenu right className="user-dropdown-menu">
                    <DropdownItem 
                        tag="a" href="#" className="nav-link"
                        onClick={e => handleNavigation(e, "/myprofile/profile-info",sidebar)}>
                        {
                            this.props.user.profile_user ?
                                <span className="align-middle">{ id_preffix + this.props.user.profile_user.fakeid + ":" +  this.props.user.profile_user.username}</span>
                                :<span>&nbsp;</span>
                        }
                    </DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={e => handleNavigation(e, "/mywallet/deposit",sidebar)}>
                            <span className="align-middle">My Funds</span>
                        </DropdownItem>
                        <DropdownItem tag="a" href="#" onClick={e => handleNavigation(e, "/Mybets/casinos",sidebar)}>
                            <span className="align-middle">My Activity</span>
                        </DropdownItem>
                        <DropdownItem tag="a" href="#" onClick={e => handleNavigation(e, "/myprofile/profile-info",sidebar)}>
                            <span className="align-middle">My Profile</span>
                        </DropdownItem>
                        <DropdownItem tag="a" href="#" onClick={e => handleNavigation(e, "/Bonuses/casinos",sidebar)}>
                            <span className="align-middle">Special Offers</span>
                        </DropdownItem>
                        <DropdownItem className="border-bottom-0" tag="div" onClick={()=>this.logout()}>
                            <span className="align-middle">Log Out</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
        return (
            <React.Fragment>
                <div className="content-overlay"></div>
                <MDBNavbar 
                    className={classnames(
                        "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
                        {
                            "navbar-light": this.props.navbarColor === "default" || !colorsArr.includes(this.props.navbarColor),
                            "navbar-dark": colorsArr.includes(this.props.navbarColor),
                            "bg-primary":
                                this.props.navbarColor === "primary",
                            "bg-danger":
                                this.props.navbarColor === "danger",
                            "bg-success":
                                this.props.navbarColor === "success",
                            "bg-info":
                                this.props.navbarColor === "info",
                            "bg-warning":
                                this.props.navbarColor === "warning",
                            // "navbar-light":
                            //     this.props.navbarColor === "dark",
                            "d-none": 
                                this.props.navbarType === "hidden" && !this.props.horizontal,
                            "navbar-static-top":
                                this.props.navbarType === "static" && !this.props.horizontal,
                            "fixed-top": 
                                this.props.navbarType === "sticky" || this.props.horizontal,
                            "scrolling": 
                                this.props.horizontal && this.props.scrolling
                        }
                    )}
                >
                    <MDBNavbarBrand className="header-nav-bar-brand d-flex">
                        <Link to="/" className="d-flex align-items-center justify-content-center">
                            {logoimg ?<LazyLoadImage className='web-site-logo' alt='logo' effect="opacity" src ={Root.imageurl + logoimg}/>:<div className='web-site-logo'></div>}
                            {favicon ? this.loadLogo(favicon):null}
                        </Link>
                    </MDBNavbarBrand>
                    <div className="header-nav-bar-user">
                        <div className="d-flex justify-content-center align-items-center">
                            {
                                this._isMounted ? 
                            <Media queries={{Mobile : "(max-width: 767px)",Tablet : "(min-width: 768px)",Desktop : "(min-width: 992px)"}}>
                                {matches => (
                                    <a href={Root.appurl +appurl }  target="_bank" >
                                        {matches.Mobile && <>
                                            <Button.Ripple className='btn-download igamez-button' color="warning">
                                                <Download size={13} />                                
                                                 App
                                            </Button.Ripple>
                                        </>}
                                        {matches.Tablet && <>
                                            <Button.Ripple className='btn-download igamez-button' color="warning">
                                                Download App
                                            </Button.Ripple>
                                        </>}
                                       
                                    </a>
                            )}
                            </Media>
                            : null
                            }
                        </div>
                        <Clock />
                        {
                             this._isMounted ? 
                             this.props.session?(
                                    guestLinks
                                ):
                                    <>
                                        <Login/> 
                                        <Register />
                                        <Forgot />
                                    </>
                            : null
                        }
                    </div>
                </MDBNavbar>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    Firstpage : state.auth.register,
    user : state.auth.login,
    session : state.auth.login.session,
    bal : state.balance.value,
})

const mapDispatchToProps = {
    logoutWithJWT
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

