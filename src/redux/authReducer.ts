import {thunkType} from "./usersReducer";
import {authAPI} from "../api/authApi";
import {loginValuesType} from "../components/Login/Login";

export type authStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const initState: authStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}


const authReducer = (state = initState, action: authActionTypes): authStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }

        case "LOGOUT":
            return {
                ...state,
                isAuth: false
            }
        default:
            return state

    }
}


export type setUserDataActionType = ReturnType<typeof setUserDataAC>
export type logOutActionType = ReturnType<typeof logOutAC>


export const setUserDataAC = (payload: authStateType) => ({
    type: 'SET_USER_DATA',
    payload
} as const)
export const logOutAC = () => ({
    type: 'LOGOUT'
} as const)

export const initUserDataTC = (): thunkType => (dispatch) => {
    authAPI.me()
        .then(data => {
            data
            && dispatch(setUserDataAC({...data, isAuth: true}))
        })
}

export const makeLoginTC = (loginData: loginValuesType): thunkType => dispatch => {
    authAPI.login(loginData)
        .then(res => {
            const {failMessage, isSuccess, userId} = res
            isSuccess && dispatch(initUserDataTC())
        })
}
export const logOutTC = (): thunkType => dispatch => {
    authAPI.logOut()
        .then(res => {
            dispatch(logOutAC())
        })
}

export default authReducer


export type authActionTypes = setUserDataActionType | logOutActionType