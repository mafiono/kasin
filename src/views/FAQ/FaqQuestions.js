import React from "react"
import { Card, CardHeader, CardTitle, Collapse } from "reactstrap"
import { ChevronDown } from "react-feather"
import classnames from "classnames"
import {connect} from "react-redux"

class FaqQuestions extends React.Component {
  state = {
    collapseID: "",
    status: "Closed"
  }

  toggleCollapse = collapseID => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }))
  }

  onEntered = order => {
    if (order === this.state.collapseID) this.setState({ status: "Opened" })
  }
  onEntering = order => {
    if (order === this.state.collapseID) this.setState({ status: "Opening..." })
  }

  onExited = order => {
    if (order === this.state.collapseID) this.setState({ status: "Closed" })
  }

  onExiting = order => {
    if (order === this.state.collapseID) this.setState({ status: "Closing..." })
  }

  render() {
    const {faqpage} = this.props.FirstPage;
    const accordionMarginItems =  faqpage ? 
     faqpage.map(collapseItem => {
      if (this.props.value > 0) {
        return (
          <div
            className="collapse-margin accordion vx-collapse"
            key={collapseItem.order}
          >
            <Card
              onClick={() => this.toggleCollapse(collapseItem.order)}
              className={classnames("shadow-none", {
                "collapse-collapsed":
                  this.state.status === "Closed" &&
                  this.state.collapseID === collapseItem.order,
                "collapse-shown":
                  this.state.status === "Opened" &&
                  this.state.collapseID === collapseItem.order,
                closing:
                  this.state.status === "Closing..." &&
                  this.state.collapseID === collapseItem.order,
                opening:
                  this.state.status === "Opening..." &&
                  this.state.collapseID === collapseItem.order
              })}
            >
              <CardHeader>
                <CardTitle className="lead collapse-title collapsed text-truncate w-75">
                  {collapseItem.title}
                </CardTitle>
                <ChevronDown className="collapse-icon" size={15} />
              </CardHeader>
              <Collapse
                isOpen={collapseItem.order === this.state.collapseID}
                onEntering={() => this.onEntering(collapseItem.order)}
                onEntered={() => this.onEntered(collapseItem.order)}
                onExiting={() => this.onExiting(collapseItem.order)}
                onExited={() => this.onExited(collapseItem.order)}
              >
                <div style={{color:'white', padding:'1rem'}}>{collapseItem.content}</div>
              </Collapse>
            </Card>
          </div>
        )
      } else if (collapseItem.title.toLowerCase().includes(this.props.value)) {
        return (
          <div
            className="collapse-margin accordion vx-collapse"
            key={collapseItem.order}
          >
            <Card
              onClick={() => this.toggleCollapse(collapseItem.order)}
              className={classnames("shadow-none", {
                "collapse-collapsed":
                  this.state.status === "Closed" &&
                  this.state.collapseID === collapseItem.order,
                "collapse-shown":
                  this.state.status === "Opened" &&
                  this.state.collapseID === collapseItem.order,
                closing:
                  this.state.status === "Closing..." &&
                  this.state.collapseID === collapseItem.order,
                opening:
                  this.state.status === "Opening..." &&
                  this.state.collapseID === collapseItem.order
              })}
            >
              <CardHeader>
                <CardTitle className="lead collapse-title collapsed text-truncate w-75">
                  {collapseItem.title}
                </CardTitle>
                <ChevronDown className="collapse-icon" size={15} />
              </CardHeader>
              <Collapse
                isOpen={collapseItem.order === this.state.collapseID}
                onEntering={() => this.onEntering(collapseItem.order)}
                onEntered={() => this.onEntered(collapseItem.order)}
                onExiting={() => this.onExiting(collapseItem.order)}
                onExited={() => this.onExited(collapseItem.order)}
              >
                <div style={{color:'white', padding:'1rem'}}>{collapseItem.navLink}</div>
              </Collapse>
            </Card>
          </div>
        )
      }else{
        return null
      }      
    }) : null

    return <div> {accordionMarginItems}</div>
  }
}

const mastopstate = (state) =>{
  return {
    FirstPage : state.auth.register
  }
}

export default connect(mastopstate,{})(FaqQuestions)
