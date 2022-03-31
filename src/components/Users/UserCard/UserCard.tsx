import {UserType} from "../../../redux/usersReducer";
import s from './UserCard.module.css'
import React from "react";
import {NavLink} from "react-router-dom";

type UserPropsType = UserType & {
    callBack: () => void
    isBtnDisabled: boolean
}
const userDefaultImg = "https://saleread.com/images/upload_small/IMG191220202209521.png"

export const UserCard = React.memo(({
                                        id,
                                        name,
                                        photos,
                                        status,
                                        followed,
                                        callBack,
                                        isBtnDisabled,
                                    }: UserPropsType) => {

    const buttonTitle = followed ? 'UnFollow' : 'Follow'
    const userImg = photos.small ? photos.small : photos.large ? photos.large : userDefaultImg

    return (
        <div className={s.userCard}>
            <div className={s.leftPart}>
                <NavLink to={'profile/' + id}>
                    <img
                        src={userImg}
                        alt=""/>
                </NavLink>
                <button disabled={isBtnDisabled} onClick={callBack}>{buttonTitle}</button>
            </div>
            <div className={s.rightPart}>
                <div className={s.name}>{name}</div>
                <div className={s.status}>status: {status}</div>
            </div>
        </div>
    )
})