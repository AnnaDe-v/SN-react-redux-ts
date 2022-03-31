import {v1} from "uuid";
import {photosType} from "../components/Profile/ProfileContainer";
import {setIsFetching, setTotalItemsCount, setUsersAC, thunkType} from "./usersReducer";
import {profileApi} from "../api/profileApi";
import {usersAPI} from "../api/usersApi";

export type PostType = {
    id: string
    message: string
    likesCount: number
}

type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export type profileType = {
    aboutMe: string | null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: photosType
} | null

export type profileStateType = typeof initState

const initState = {
    posts: [
        {id: v1(), message: 'Hi man', likesCount: 50},
        {id: v1(), message: 'How are you', likesCount: 150}
    ] as Array<PostType>,
    newPostMessage: '',
    currentProfile: null as profileType,
    status: ''
}

const profileReducer = (state = initState, action: profileActionsTypes): profileStateType => {
    switch (action.type) {

        case ADD_POST:
            return state.newPostMessage.trim()
                ? {
                    ...state,
                    posts: [
                        ...state.posts,
                        {id: v1(), message: state.newPostMessage, likesCount: 0}
                    ],
                    newPostMessage: '',
                }
                : {...state, newPostMessage: ''}

        case ON_POST_CHANGE:
            return {...state, newPostMessage: action.newValue}
        case SET_PROFILE:
            return {
                ...state,
                currentProfile: action.currentProfile
            }
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const ADD_POST = 'ADD_POST';
export const ON_POST_CHANGE = "ON_POST_CHANGE";
export const SET_PROFILE = "SET_PROFILE";
export const SET_STATUS = 'SET_STATUS'

export type profileActionsTypes =
    AddPostActionType
    | OnPostChangeActionType
    | setProfileActionType
    | setStatusToStateActionType

export type AddPostActionType = ReturnType<typeof addPostAC>
export type OnPostChangeActionType = ReturnType<typeof onPostChangeAC>
export type setProfileActionType = ReturnType<typeof setProfileAC>
type setStatusToStateActionType = ReturnType<typeof setStatusToStateAC>

export const addPostAC = () => ({type: ADD_POST} as const)
export const onPostChangeAC = (newValue: string) => ({type: ON_POST_CHANGE, newValue} as const)
export const setProfileAC = (currentProfile: profileType) => ({type: SET_PROFILE, currentProfile} as const)
export const setStatusToStateAC = (status: string) => ({type: SET_STATUS, status} as const)





export const initProfileTC = (userId: string): thunkType => (dispatch) => {
    const pr1 = profileApi.getProfile(userId)
    const pr2 = profileApi.getStatus(userId)

    Promise.all([pr1, pr2]).then(res => {
        const [profile, status] = res
        profile
        && dispatch(setProfileAC(profile))

        status
        && dispatch(setStatusToStateAC(status))
    })
}


export const setStatusTC = (status: string): thunkType => async dispatch => {
    const res = await profileApi.setStatus(status)
    res && dispatch(setStatusToStateAC(status))
}

export default profileReducer
