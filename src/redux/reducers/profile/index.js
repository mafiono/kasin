import { combineReducers } from "redux"
import { document } from "./document"
import { limit } from "./limit"
import { notification } from "./notification"
import { sattas } from "./sattas"
const profileReducers = combineReducers({
    document,
    limit,
    notification,
    sattas
})

export default profileReducers
