import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import paymentGateWay from "./paymentGateWay"
import profileReducers from "./profile/index"
import casinolist from "./casinolist/index"
import player from "./player"
import balance from "./balance"
import report from "./report"
import withdraw from "./paymentWithdraw"
import sports from "./sports"
import promotions from "./promotions"
import exchgange from "./exchgange"
import satta from "./satta"
import time from "./time"

const rootReducer = combineReducers({
  promotions: promotions,
  customizer: customizer,
  auth: auth,
  profile : profileReducers  ,
  casinolist : casinolist,
  paymentGateWay : paymentGateWay,
  report : report,
  player : player,
  withdraw : withdraw,
  balance : balance,
  sports : sports,
  exchgange : exchgange,
  satta : satta,
  time : time
})

export default rootReducer
