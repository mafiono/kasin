
import {getSession} from "../../actions/auth/index"
var initdata = {
  userRole: "admin" ,setloginmodal : false, 
  isModaldata : {
    bool : false,
    url :''
  },
  loading  :false,
  values: null,
  session : getSession()
  // session : null
}
export const login = (state = initdata, action) => {
  switch (action.type) {
    case "LOGIN_WITH_JWT": {
      return { ...state, session: action.payload }
    }
    case "LOGOUT_WITH_JWT": {
      return { ...state, values: null,session : null }
    }
    case "SETLOGINPAGE" : {
      return { ...state, setloginpage : action.payload}
    }

    case "PROFILE_USER":{
      return {...state,profile_user : action.data,values : action.data}
    }
    case "LIVECASINOSLIDERIMGS" : {
      return {...state,livecasino_images : action.data
      }
    }
    case "IPLOCATION" :
      return {
        ...state,
        iplocation : action.payload
    }

    case "CASINOSLIDERIMGS" : {
      return {...state,casino_images : action.data
      }
    }

    case "VIRTUALSLIDERIMGS" :{
      return {...state,virtual_images : action.data
      }
    }
    
    case "POKERSLIDERIMGS" :{
      return {...state,poker_images : action.data
      }
    }
    case "COCKFIGHTSLIDERIMGS" : {
      return {...state,cockfight_images : action.data
      }
    }

    case "ANIMALSLIDERIMGS" : {
      return {...state,animal_images : action.data
      }
    }

    case "PAYDEPOSIT":{
      return {...state,isModaldata : action.data}
    }
    case "FORGOTPASSWORD" :{
      return {...state,forgotpasswordemail : action.data}
    }
    case "HOMEPAGELOADIN" :{
      return {...state,loading : action.data}
    }
    case "SIGNUP_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "SIGNUP_WITH_JWT":
      return {
        ...state,
        values: action.payload
      }
    default: {
      return state
    }
  }
}
