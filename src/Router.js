import React, { Suspense, lazy } from "react"
import { Router, Switch, Route,Redirect } from "react-router-dom"
import ReactGA from 'react-ga';
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import { ContextLayout } from "./utility/Layout"
import FallbackSpinner from "./components/@vuexy/spinner/Fallback-spinner"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import {  session_checked, load_fp_data ,socket_connectwithout_login,first_slider_load,firstpage_gamelist} from "./redux/actions/auth/loginActions"
import {get_userinfor} from "./redux/actions/auth/ProfileActions"
import { history } from "./history"
import Player from './views/PlayGame/player';
import {getSession,fake_session} from "./redux/actions/auth"
import {Sport_socket} from "./redux/actions/sports/index"

const FirstPage = lazy(() =>  import("./views/firstpage/FirstPage"))
const BetHistory = lazy(() => import("./views/Sports/history/index"));

const Sports = lazy(() => import("./views/Sports/mainComponent/Sports"));
const Live = lazy(() => import("./views/Sports/mainComponent/Live"));
const Upcoming = lazy(() => import("./views/Sports/mainComponent/Upcoming"));

const SportEvents = lazy(() => import("./views/Sports/Events"));
const SattaPage = lazy(() => import("./views/Satta"));

const Exchg = lazy(() => import("./views/Exchg/exchg/index"));
const ExchgEvents = lazy(() => import("./views/Exchg/Events"))

const Casino = lazy(() => import("./views/GamePages/Casino"))
const LiveCasino = lazy(() => import("./views/GamePages/LiveCasino"))
const VirtualSports = lazy(() => import("./views/GamePages/VirtualSpots"))
const Poker = lazy(() => import("./views/GamePages/Poker"))
const CockFight = lazy(() => import("./views/GamePages/CockFight"))
const Animal = lazy(() => import("./views/GamePages/animal"))

const QpayResponse = lazy(()=>import("./views/PaymentGatway/qpayResponse"));
const YaarResponse = lazy(()=>import("./views/PaymentGatway/YaarResponse"));
const netcentsResponse = lazy(()=>import("./views/PaymentGatway/netcentsResponse"));
const CashfreeResponse = lazy(()=>import("./views/PaymentGatway/CashfreeResponse"));
const Paygate10Response = lazy(()=>import("./views/PaymentGatway/Paygate10Response"));

const Emailverify = lazy(()=>import("./views/profile/Emailverify"));
const Wlt_deposit = lazy(() => import("./views/profile/MyWallet/Deposit"));
const Wlt_withdraw = lazy(() => import("./views/profile/MyWallet/Withdraw"));
const Wlt_balancehistory = lazy(() => import("./views/profile/MyWallet/Balencehistory"))

const Pro_profileinfo = lazy(() => import("./views/profile/MyProfile/MyProfile"));
const Pro_changepassword = lazy(() => import("./views/profile/MyProfile/ChangePassword"));
const Pro_security = lazy(() => import("./views/profile/MyProfile/Security"));
const Pro_news = lazy(() => import("./views/profile/MyProfile/Newsletter"));
const Messages = lazy(() => import("./views/profile/Messages/Messages"))

const Bet_sports = lazy(() => import("./views/profile/Mybets/SportsBook"));
const Bet_casinos = lazy(() => import("./views/profile/Mybets/Casino"));
const Satta_history = lazy(() => import("./views/Satta/bethistory"));

const Bns_sports = lazy(() => import("./views/profile/MyBonuses/SportsBook"));
const Bns_casinos = lazy(() => import("./views/profile/MyBonuses/Casino"));

const FAQ = lazy(() => import("./views/FAQ/FAQ"))
const About = lazy(() => import("./views/Opage/About"))
const Contact = lazy(() => import("./views/Opage/Contact"))
const PrivacyPolicy= lazy(() => import("./views/Opage/PrivacyPolicy"))

const Welcometobonuspage = lazy(() => import("./views/pages/welcometobonus"));
const ForgotPasswordverify = lazy(() => import("./views/pages/forgotpassword_reset"));
const EmailverifyResend = lazy(() => import("./views/pages/emailverifyresend"));
// const error404 = lazy(() => import("./views/pages/misc/error/404"));

const RouteConfig = ({ component: Component, fullLayout,VerticalLayout,SportsLayout, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        return (
          <ContextLayout.Consumer>
            {context => {
              let LayoutTag =
                fullLayout === true ? context.fullLayout : SportsLayout === true ? context.SportsLayout : VerticalLayout === true ? context.VerticalLayout
                :context.horizontalLayout
              return (
                <LayoutTag {...props} permission={props.user} >
                  <Suspense fallback={<FallbackSpinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
            }}
          </ContextLayout.Consumer>
        )
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.login
  }
}

const AppRoute = connect(mapStateToProps,{})(RouteConfig)

const RequireAuth =  (data) => {

  if (!getSession()) {
    fake_session();
    return <Redirect to={"/"} />;
  }
  if(data.children){
    let items = data.children.props.children;
    for(var i in items){
      if( items[i] && items[i].props.path === data.location.pathname){
        return items.slice(0, items.length-1);
      }
    }
    return items.slice(items.length-1, data.children.length);
  }else{
    // return <Redirect to={"/"} />;
    return false
  }
};

class AppRouter extends React.Component {

   componentWillMount(){
    let decoded =  getSession();
    this.props.socket_connectwithout_login();
    if(decoded){
      console.log(decoded)
      this.props.session_checked(decoded);
    }else{
      fake_session();
    }
    this.props.load_fp_data();
    this.props.first_slider_load();
    this.props.firstpage_gamelist();
    this.props.Sport_socket();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.firstpagesettingtrackcode){
      if(prevProps.firstpagesettingtrackcode !== this.props.firstpagesettingtrackcode && this.props.firstpagesettingtrackcode.trackcode ){
        ReactGA.initialize(this.props.firstpagesettingtrackcode.trackcode);
        ReactGA.pageview(history.location.pathname + history.location.search);
      }
    }
  }
  
  render() {

    const { state, gamedata, gameurl, Ratio, token, mode } = this.props.player;

    return (
      <Router history={history}>
        { /* games play form */}
        {state ? <Player gamedata={gamedata} gameurl={gameurl} Ratio={Ratio} state = {state} token={token} mode={mode}/> : null}
        { /* compoment loading */}
        {this.props.loading ? <Spinner /> : null}
        <Switch>
          <AppRoute exact path="/" component={FirstPage} />
          <AppRoute path="/sports" component={Sports} SportsLayout/>
          <AppRoute path="/Inplay" component={Live} SportsLayout/>
          <AppRoute path="/Upcoming" component={Upcoming} SportsLayout/>
          <AppRoute path="/sportsevent" component={SportEvents} SportsLayout/>
          <AppRoute path="/exchg" component={Exchg} SportsLayout/>
          <AppRoute path="/exchgevent" component={ExchgEvents} SportsLayout/>
          <AppRoute path="/Satta/pages" component={SattaPage} SportsLayout/>
          <AppRoute path="/virtual-sports" component={VirtualSports}/>
          <AppRoute path="/casino" component={Casino} />
          <AppRoute path="/poker" component={Poker}/>
          <AppRoute path="/live-casino" component={LiveCasino} />
          <AppRoute path="/cock-fight" component={CockFight} />
          <AppRoute path="/animal" component={Animal} />
          <AppRoute path="/paymentGateWay/netcents_receive" component={netcentsResponse} VerticalLayout />
          <AppRoute path="/PaymentGateway/qpayResponse/:param1" component={QpayResponse} VerticalLayout />
          
          <AppRoute path="/PaymentGateway/YaarResponse" component={YaarResponse} VerticalLayout /> {/* yaarpay rediection */}
          <AppRoute path="/PaymentGateway/Paygate10Response" component={Paygate10Response} VerticalLayout />

          <AppRoute path="/PaymentGateway/CashfreeResponse/:param1" component={CashfreeResponse} VerticalLayout />
          <AppRoute path="/PaymentGateway/CashfreeResponse/:param1" component={CashfreeResponse} VerticalLayout />
          <AppRoute path="/emailverify/:param1" component={Emailverify} />
          <AppRoute path="/forgotpasswordverify/:param1" component={ForgotPasswordverify} />
          <AppRoute path="/FAQ" component={FAQ}/>
          <AppRoute path="/about" component={About}/>
          <AppRoute path="/contact" component={Contact}/>
          <AppRoute path="/PrivacyPolicy" component={PrivacyPolicy}/>
          {/* It is required auth */}   
          <RequireAuth>
            <React.Fragment>
              <AppRoute path="/bethistory" component={BetHistory} VerticalLayout />
              <AppRoute path="/welcometobonuspage" component={Welcometobonuspage}   />
              <AppRoute path="/emailverifysend" component={EmailverifyResend}   />
              <AppRoute path="/mywallet/deposit" component={Wlt_deposit}  VerticalLayout />
              <AppRoute path="/mywallet/withdraw" component={Wlt_withdraw}  VerticalLayout />
              <AppRoute path="/mywallet/balance-history" component={Wlt_balancehistory}  VerticalLayout />
              <AppRoute path="/myprofile/profile-info" component={Pro_profileinfo}   VerticalLayout />
              <AppRoute path="/myprofile/change-password" component={Pro_changepassword}  VerticalLayout />
              <AppRoute path="/myprofile/security" component={Pro_security}  VerticalLayout />
              <AppRoute path="/myprofile/news-letter" component={Pro_news}  VerticalLayout />
              <AppRoute path="/Mybets/sports" component={Bet_sports}  VerticalLayout />
              <AppRoute path="/Mybets/casinos" component={Bet_casinos}  VerticalLayout />
              <AppRoute path="/Mybets/satta" component={Satta_history}  VerticalLayout />
              <AppRoute path="/Bonuses/sports" component={Bns_sports}  VerticalLayout />
              <AppRoute path="/Bonuses/casinos" component={Bns_casinos}  VerticalLayout />
              <AppRoute path="/Messages/messages" component={Messages}  VerticalLayout />
            </React.Fragment>
          </RequireAuth>
        </Switch>
        {/* toast notification. */}
        <ToastContainer />
      </Router>
    )
  }
}


const mapStateToPropss = (state) => ({
  firstpagesettingtrackcode : state.auth.register,
  player: state.player,
  loading : state.auth.login.loading,
  user : state.auth.login.values
})

const mapDispatchToProps = {
   session_checked, load_fp_data, get_userinfor, Sport_socket,socket_connectwithout_login,first_slider_load,firstpage_gamelist
}

export default connect(mapStateToPropss, mapDispatchToProps)(AppRouter)
