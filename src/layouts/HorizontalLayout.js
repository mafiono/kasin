import React, { PureComponent } from "react"
import classnames from "classnames"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import themeConfig from "../configs/themeConfig"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import Customizer from "../components/@vuexy/customizer/Customizer";
import { connect } from "react-redux"
import {
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
  changeMode
} from "../redux/actions/customizer/index";
import {history} from "../history"
import { Icon } from '@iconify/react';
import roosterIcon from '@iconify-icons/emojione-v1/rooster';
import horseIcon from '@iconify-icons/fa-solid/horse';

class HorizontalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: false,
    layout: this.props.app.customizer.theme,
    collapsedContent: false,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname,
    menuOpen: themeConfig.menuOpen,
    activeIndex : history.location.pathname
  }

  mounted = false

  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }))
    }
  }

  updateScroll = () => {
    if (this.mounted) {
      this.setState({ scroll: window.pageYOffset })
    }
  }

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    })
  }

  componentDidMount() {
    this.mounted = true
    if (this.mounted) {
      if (window !== "undefined") {
      }
      if (this.props.location.pathname === "/pages/profile") {
        this.setState({
          sidebarState: true,
          collapsedContent: true
        })
      }
      let layout = this.props.app.customizer.theme
      return layout === "pink-dark"
        ? document.body.classList.add("pink-dark-layout")
        : layout === "green-dark"
        ? document.body.classList.add("green-dark-layout")
        : layout === "real-dark"
        ? document.body.classList.add("real-dark-layout")
        : layout === "blue-dark"
        ? document.body.classList.add("blue-dark-layout")
        : null
    }
  }

  componentDidUpdate() {
    if (this.mounted) {
      if (this.state.currRoute !== this.props.location.pathname) {
        this.handleRouteChange()
        this.setState({
          currRoute: this.props.location.pathname
        })
      }

      let layout = this.props.app.customizer.theme
      if (layout === "pink-dark") {
        document.body.classList.remove("green-dark-layout", "real-dark-layout", "blue-dark-layout");
        document.body.classList.add("pink-dark-layout");
      }
      if (layout === "green-dark") {
        document.body.classList.remove("pink-dark-layout", "real-dark-layout", 'blue-dark-layout');
        document.body.classList.add("green-dark-layout");
      }
      if (layout === "real-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", 'blue-dark-layout');
        document.body.classList.add("real-dark-layout");
      }
      if (layout === "blue-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", "real-dark-layout");
        document.body.classList.add("blue-dark-layout");
      }
      if (layout !== "dark" && layout !== "green-dark" && layout !== "real-dark" && layout !== "blue-dark" && layout !== "pink-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", "real-dark-layout", "blue-dark-layout");
      }
    }
  }

  handleRouteChange = () => {
    if (this.props.location.pathname === "/pages/profile") {
      this.setState({
        collapsedContent: true
      })
    } else {
      this.setState({
        sidebarState: false,
        collapsedContent: false
      })
    }
  }

  toggleSidebarMenu = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    })
  }

  sidebarMenuHover = () => {
    this.setState({
      sidebarState: !this.state.sidebarState
    })
  }

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        // window.addEventListener("resize", () => {
        //   if (this.state.sidebarHidden) {
        //     this.setState({
        //       sidebarHidden: !this.state.sidebarHidden
        //     })
        //   }
        // })
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      })
    }
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    })
  }

  handleAppOverlay = value => {
    if (value.length > 0)
      this.setState({
        appOverlay: true
      })
    else if (value.length > 0 || value === "") {
      this.setState({
        appOverlay: false
      })
    }
  }

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    let appProps = this.props.app.customizer;
    let customizerProps = {
      customizerState: this.state.customizer,
      handleCustomizer: this.handleCustomizer,
      changeMode: this.props.changeMode,
      changeNavbar: this.props.changeNavbarColor,
      changeNavbarType: this.props.changeNavbarType,
      changeFooterType: this.props.changeFooterType,
      changeMenuTheme: this.props.changeMenuColor,
      collapseSidebar: this.props.collapseSidebar,
      hideScrollToTop: this.props.hideScrollToTop,
      activeMode: appProps.theme,
      activeNavbar: appProps.navbarColor,
      navbarType: appProps.navbarType,
      footerType: appProps.footerType,
      menuTheme: appProps.menuTheme,
      scrollToTop: appProps.hideScrollToTop,
      sidebarState: appProps.sidebarCollapsed
    };
    let navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };
    let footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    let navbarTypeArr = ["sticky", "static", "sticky", "floating", "hidden"]
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark"
    ]
    return (
      <div
        className={classnames(
          `wrapper horizontal-layout theme-${customizerProps.menuTheme}`,
          {
            "menu-collapsed":
              this.state.collapsedContent === true && this.state.width > 1200,
            "fixed-footer": customizerProps.footerType === "sticky",
            "navbar-static": customizerProps.navbarType === "static",
            "navbar-sticky": customizerProps.navbarType === "sticky",
            "navbar-floating":
              customizerProps.navbarType === "floating" ||
              !navbarTypeArr.includes(customizerProps.navbarType),
            "navbar-hidden": customizerProps.navbarType === "hidden",
            "theme-primary": !menuThemeArr.includes(customizerProps.menuTheme)
          }
        )}>
        <Navbar {...navbarProps} />
        <div className="header-nav-bar-menu" expand="md" id='header-nav-bar-menu'>
            <div className="header-nav-bar-item-group">
                {
                    !this.props.navigationConfig ? "" :
                    this.props.navigationConfig.firstmenu ? this.props.navigationConfig.firstmenu.map((item,i) => (
                        <Link to={item.navLink}  key={i}>
                            <div className={"header-nav-bar-item"+(history.location.pathname===item.navLink?' header-nav-bar-item-active':'')} onClick={()=>this.setState({activeIndex : item.navLink})}>
                                {
                                  item.icon ==='cockIcon'?  <Icon icon={roosterIcon} style={{fontSize:"25px"}} />:
                                  item.icon ==="faHourglass" ? <Icon icon={horseIcon} /> :
                                  <FontAwesomeIcon color="#8f99a3" icon={Icons[item.icon]}/>
                                }
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    )) : null
                }
            </div>
        </div>
        <div className={classnames(`app-content content`, { "show-overlay": this.state.appOverlay === true})}
          onClick={this.handleAppOverlayClick}>
          <div className="content-wrapper">{this.props.children}</div>
        </div>

        <Footer
          {...footerProps} 
        />
        {appProps.disableCustomizer !== true ? (
          <Customizer {...customizerProps} />
        ) : null}
        <div
          className="sidenav-overlay"
          onClick={this.handleSidebarVisibility}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
        navigationConfig : state.auth.register,
        app: state.customizer
  }
}
export default connect(mapStateToProps, {
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
  changeMode
})(HorizontalLayout)
