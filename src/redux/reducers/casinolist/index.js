import {CASINO_PROVIDER,CASINO_TYPES,CASINO_GET_ALL_DATA, CASINO_GET_DATA,CASINO_FILTER_DATA,CASINO_TYPE,CASINO_SETPROVIDER,CASINO_DATA_FORMAT} from "../../types"
import {get_provider, get_type} from "../../actions/auth/index"


const initialState = {
    data: [],
    allData: [],
    filteredData: [],
    providerData : [],
    types : [],
    settype : {label : "ALL",value : 'All'},
    setprovider : [],
    moredata : [],
    index : 0
  }
  
  const DataListReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case CASINO_GET_ALL_DATA:

        return {
          ...state,
          allData: action.data,
          data : action.filteredData,
          index : action.index
        }
        case CASINO_DATA_FORMAT:
          
        return {
          ...state,
          data: [],
          allData: [],
          filteredData: [],
          providerData : [],
          types : [],
          settype : get_type(action.bool),
          setprovider :get_provider(action.bool),
          moredata : [],
        }
        case CASINO_GET_DATA:
          
        return {
          ...state,
          data: action.data,
        }
      case CASINO_FILTER_DATA:
        let value = action.value;
        let data = []
        if (value.length) {
          data = state.allData
            .filter(item => {
              let startsWithCondition =false;
              let includesCondition = false;
              if(item.NAME &&item.TYPE ){
                startsWithCondition = item.NAME.toLowerCase().startsWith(value.toLowerCase()) ||
                item.TYPE.toLowerCase().startsWith(value.toLowerCase());  
                includesCondition = item.TYPE.toLowerCase().includes(value.toLowerCase())|| 
                item.NAME.toLowerCase().includes(value.toLowerCase());
              }
  
              if (startsWithCondition) {
                return startsWithCondition
              } else if (!startsWithCondition && includesCondition) {
                return includesCondition
              } else return null
            })
          return { ...state, data }
        } else {
          data = state.data
          return { ...state, data }
        }

      case CASINO_TYPES:
      return {...state,types : action.data }
      case CASINO_TYPE:
      return {...state,settype : action.data }
      case CASINO_SETPROVIDER :
        return {...state,setprovider : action.setprovider}
      case CASINO_PROVIDER :
        if(state.setprovider.length > 0){
          return {...state,providerData : action.data,moredata : action.moredata}
        }else{
          return {...state,providerData : action.data,moredata : action.moredata,setprovider : action.data}
        }
      default:
        return state
    }
  }
  
  export default DataListReducer
  