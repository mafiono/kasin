import React from "react"
import { connect } from "react-redux"
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap"
import Fullscreen from "react-full-screen"
import Iframe from 'react-iframe'
import { X, Maximize, Minimize } from "react-feather"
import Media from "react-media"
import Loader from 'react-loader-spinner'
import { GameExit } from '../../redux/actions/Player'
import { history } from "../../history"
import { Root } from "../../authServices/rootconfig"

class GamePlay extends React.Component {
    
    constructor(props) {
		
		super(props)
		this.state = {
            time: new Date(),
            isFull: false,
            height: window.innerHeight,
            isChecked : false,
            bool : true,
            index : 0
        }
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true
        if (this.mounted) {
            if (window !== "undefined") {
              window.addEventListener("resize", this.updateHeight, false);

              var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
              var eventer = window[eventMethod];
              var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
              eventer(messageEvent, function (e) {
                  switch (e.data.action) {
                    //   case "game.loaded":
                    //       // Game successfully loaded.
                    //       break;
                    //   case "game.balance.changed":
                    //       // Game Balance changed.
                    //       break;
                    //   case "game.cycle.started":
                    //       // Ticket placing...
                    //       break;
                    //   case "game.cycle.end":
                    //       // Ticket placed
                    //       break;
                    //   case "game.goto.home":
                    //       //Game has to be redirected to the home lobby page.(exit)
                    //       break;
                    //   case "game.goto.history":
                    //       // History modal opens
                    //       break;
                    //   case "game.resize.height":
                    //       // iframe height should be: e.data.value;
                    //     //   document.getElementById("myIdiframe").style.height = e.data.value;
                    //       break;
                      case "game.get.clientrect":
                          // iframe selector.
                          e.source.postMessage({action: "game.clientrect", value: document.getElementById("myIdiframe").getBoundingClientRect()}, '*');
                          break;
                      case "game.get.clientheight":
                          // iframe selector.
                          e.source.postMessage({action: "game.clientheight", value: 700}, '*');
                          break;
                      case "game.get.innerheight":
                          // general window selector.
                          e.source.postMessage({action: "game.innerheight", value: 700}, '*');
                          break;
                    default:
                        break;
                  }
              });
            }
        }
    }

    UNSAFE_componentWillUnmount(){
        if(this.props.mode){
            Root.socket.emit("gamedelete",{data : this.props.token});
        }
    }

    goFull = () => {
        this.setState({ isFull:  true });
    }
    
    goMin = () => {
        this.setState({ isFull: false });
    }

    exitGame = () => {
        this.props.GameExit();
    }

    updateHeight = () => {
        if (this.mounted) {
          this.setState(prevState => ({
            height: window.innerHeight
          }))
        }
    }
    
    handleSwitchChange = (isChecked) => {
        this.setState({
          isChecked: isChecked
        })
    }

    Iframeonload = (e)=>{
        if(!this.state.bool){
            if(this.props.gamedata.LAUNCHURL !== "5"){
                window.location.assign(history.location.pathname);
            }
        }else{

        }
        this.setState({bool:false})
    }

    render() {
        const {gameurl, Ratio, gamedata, state } = this.props;
        return (
            state ? (
                <React.Fragment>
                    <style dangerouslySetInnerHTML={{__html: `body{overflow:hidden;}`}}></style>
                    {this.state.bool ?                 
                        <div className='websit-loading'>
                            <Loader type="ThreeDots"/>	
                        </div>
                    :null}
                    <Media 
                        queries={{
                            Mobile : "(max-width: 767px)",
                            Tablet : "(min-width: 768px) and (max-width: 991px)",
                            Desktop : "(min-width: 992px)"
                        }}>
                        {matches => (
                                <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({isFull})}>
                                {matches.Mobile && 
                                    <div className="pw-overlay iframeplayactive" style={{backgroundImage : `url('${Root.imageurl+gamedata.backImage}')` }}>
                                        <Card className="iframe-container">
                                            <CardHeader>
                                                <Row className='w-100 m-1'>
                                                    <Col style={{textAlign: 'left'}} className="d-flex align-items-center flex-1 justify-content-start" md="3" sm="3" xs="3">
                                                        {/* <span style={{color:'white'}}>
                                                            {gamedata.NAME}
                                                        </span> */}
                                                    </Col>
                                                    <Col md="6" sm="6" xs="6" />
                                                    <Col style={{textAlign: 'right'}} className="d-flex align-items-center flex-1 justify-content-end" md="3" sm="3" xs="3">
                                                        <X size="21" onClick={()=>this.exitGame()} style={{cursor:"pointer"}} />
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <Iframe name="_self" url={gameurl}
                                                    width="100%"
                                                    height="100%"
                                                    id="myIdiframe"
                                                    className="myClassname"
                                                    display="initial"
                                                    position="relative"
                                                    scrolling="no" 
                                                    frameBorder="0"
                                                    allowfullscreen={true}
                                                    allow="fullscreen"
                                                    onLoad={this.Iframeonload}
                                                    onMouseOver={this.onMounseover}
                                                    onMouseOut={this.onMounseout}
                                                    sandbox={"allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation"}
                                                />
                                            </CardBody>
                                        </Card>
                                    </div>
                                }
                                {matches.Tablet && 
                                    <div className="pw-overlay" style={{backgroundImage : `url('${Root.imageurl+gamedata.backImage}')`}}>
                                        <Card className="iframe-container" style={{width : '94%'}}>
                                            <CardHeader>
                                                <Row className='w-100 m-1'>
                                                    <Col style={{textAlign: 'left'}} className="d-flex align-items-center flex-1 justify-content-start" md="3" sm="3" xs="3">
                                                        {/* <span style={{color:'white'}}>
                                                            {gamedata.NAME}
                                                        </span> */}
                                                    </Col>
                                                    <Col md="6" sm="6" xs="6" />
                                                    <Col style={{textAlign: 'right'}} className="d-flex align-items-center flex-1 justify-content-end" md="3" sm="3" xs="3">
                                                        <X size="21" onClick={()=>this.exitGame()} style={{cursor:"pointer"}} />
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <Iframe name="_self" url={gameurl}
                                                    width="100%"
                                                    height="100%"
                                                    id="myIdiframe"
                                                    className="myClassname"
                                                    display="initial"
                                                    position="relative"
                                                    frameBorder="0"
                                                    scrolling={"no"}
                                                    onLoad={this.Iframeonload}
                                                    onMouseOver={this.onMounseover}
                                                    allowfullscreen={true}
                                                    allow="fullscreen"                                                
                                                    onMouseOut={this.onMounseout}
                                                    sandbox={"allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-same-origin" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation"}
                                                />
                                            </CardBody>
                                        </Card>
                                    </div>
                                }
                                {matches.Desktop &&
                                    <div className="pw-overlay" style={{ backgroundImage : `url('${Root.imageurl+gamedata.backImage}')`}}>
                                        <Card id="myIdiframe123" className="iframe-container" style={{width : `${this.state.height*Ratio > window.innerWidth ? 'calc('+window.innerWidth+' - 6%)' : this.state.height*Ratio+'px'}`}}>
                                            <CardHeader>
                                                <Row className='w-100 m-1'>
                                                    <Col style={{textAlign: 'left'}} className="d-flex align-items-center flex-1 justify-content-start" md="3" sm="3" xs="3">
                                                        {/* <span style={{color:'white'}}>
                                                            {gamedata.NAME}
                                                        </span> */}
                                                    </Col>
                                                    <Col  className="" md="6" sm="6" xs="6" />
                                                    <Col style={{textAlign: 'right'}} className="d-flex align-items-center flex-1 justify-content-end" md="3" sm="3" xs="3">
                                                        {
                                                            this.state.isFull === false ?
                                                            <Maximize size="21" onClick={()=>this.goFull()} style={{cursor:"pointer",marginLeft:"5px"}} />
                                                            :
                                                            <Minimize size="21" onClick={()=>this.goMin()} style={{cursor:"pointer",marginLeft:"5px"}} />
                                                        }
                                                        <X size="21" onClick={()=>this.exitGame()} style={{cursor:"pointer"}} />
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <Iframe name="_self" url={gameurl}
                                                    width="100%"
                                                    height="100%"
                                                    id="myIdiframe"
                                                    className="myClassname"
                                                    display="initial"
                                                    position="relative"
                                                    allowfullscreen={true}
                                                    allow="fullscreen"
                                                    frameBorder="0"
                                                    onLoad={this.Iframeonload}
                                                    onMouseOver={this.onMounseover}
                                                    onMouseOut={this.onMounseout}
                                                    sandbox={"allow-forms" | "allow-modals" | "allow-orientation-lock" | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox" | "allow-presentation" | "allow-scripts" | "allow-storage-access-by-user-activation" | "allow-top-navigation" | "allow-top-navigation-by-user-activation"}
                                                />
                                            </CardBody>
                                          
                                        </Card>
                                    </div>
                                }
                            </Fullscreen>
                        )}
                    </Media>
                </React.Fragment>
            ):null
        )
    }
}

export default connect(null,{GameExit})(GamePlay)