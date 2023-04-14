const initialState = {
  BonusData : null,
}

const promstions = (state = initialState, action) => {
  switch (action.type) {
    case "PROMOTIONS_BONUS_DATA":
      return {...state, BonusData: action.payload}
    default:
      return state
  }
}
  
export default promstions