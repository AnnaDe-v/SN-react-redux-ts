import React from "react";
import s from "./Header.module.css"
import {LoginForm} from "./LoginForm/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authStateType, logOutTC} from "../../redux/authReducer";

function Header() {
    const dispatch = useDispatch()
    const {isAuth} = useSelector<AppStateType, authStateType>(state => state.auth)

    const logOutHandler = () => {
        dispatch(logOutTC())
    }


    return (
        <header className={s.header}>
            <img src="https://w7.pngwing.com/pngs/392/885/png-transparent-computer-icons-king-monarch-king-miscellaneous-king-silhouette.png" alt=""/>
            <LoginForm/>
            {isAuth && <button onClick={logOutHandler}>LogOut</button>}
        </header>
    )
}

export default Header;