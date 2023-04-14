import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import {connect} from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';
import roosterIcon from '@iconify-icons/emojione-v1/rooster';
import horseIcon from '@iconify-icons/fa-solid/horse';

class SideMenuContent extends React.Component {

  render() {
    const menuItems = this.props.navigationConfig && this.props.navigationConfig.firstmenu ? this.props.navigationConfig.firstmenu.map((item , idx) => {
      const CustomAnchorTag = Link;
      // if (item.type === "groupHeader") {
      //   return ( <li className="navigation-header" key={`group-header-${item.groupTitle}`}> <span>{item.groupTitle}</span> </li> )
      // }
      // if (item.type === "line") {
      //    return ( <li className="navigation-line" key = {idx}></li> ) 
      // }

      let renderItem = (
        <li  className={classnames("nav-item", { hover: this.props.hoverIndex === item._id,active: (this.props.activeItemState === item.navLink), })}
          key={idx} onClick={e => { e.stopPropagation();this.props.handleActiveItem(item.navLink);}}>
          <CustomAnchorTag to={ item.navLink } className={`d-flex ${"justify-content-start" }`} onMouseEnter={() => { this.props.handleSidebarMouseEnter(item._id) }}
            onMouseLeave={() => { this.props.handleSidebarMouseEnter(item._id) }} key={item._id} >
            <div className="menu-text">
            {
              item.icon ==='cockIcon'?  <Icon icon={roosterIcon} style={{fontSize:"25px"}} />:
              item.icon ==="faHourglass" ? <Icon icon={horseIcon} /> :
              <FontAwesomeIcon color="#8f99a3" icon={Icons[item.icon]}/>
            }
            {'  '}
              <span className="menu-item menu-title">
                {item.title}
              </span>
            </div>
          </CustomAnchorTag>
        </li>
      )
      return renderItem
    }) : null
    return <React.Fragment>{menuItems}</React.Fragment>
  }
}
const mapStateToProps = (state) => ({
  navigationConfig : state.auth.register,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContent)
