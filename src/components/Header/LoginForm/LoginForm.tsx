import React, {Dispatch, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {thunkType} from "../../../redux/usersReducer";
import {authStateType, initUserDataTC} from "../../../redux/authReducer";
import {NavLink} from "react-router-dom";

export const LoginForm = () => {
    const {id, login, email, isAuth} = useSelector<AppStateType, authStateType>(state => state.auth)
    const dispatch = useDispatch<Dispatch<thunkType>>()
    useEffect(() => {
        dispatch(initUserDataTC())
    }, [])

    return (
        <div>
            {
                isAuth
                    ? login
                    : <NavLink to={`/login`}>Login</NavLink>
            }
        </div>
    )
}