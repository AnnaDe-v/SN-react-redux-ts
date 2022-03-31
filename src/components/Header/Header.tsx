import React from "react";
import s from "./Header.module.css"
import {LoginForm} from "./LoginForm/LoginForm";


function Header() {
    return (
        <header className={s.header}>
            <img src="https://w7.pngwing.com/pngs/392/885/png-transparent-computer-icons-king-monarch-king-miscellaneous-king-silhouette.png" alt=""/>
            <LoginForm/>
        </header>
    )
}

export default Header;