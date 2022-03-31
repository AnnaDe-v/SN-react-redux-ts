import React from "react";
import s from "./Post.module.css"
import {PostType} from "../../../../redux/profileReducer";


function Post (props:PostType) {
    return (
        <div className={s.postItem}>
            <div className={s.postContent}>
                <img src="https://thispersondoesnotexist.com/image" alt=""/>
                <div className={s.postMessage}>{props.message}</div>
            </div>
            <div className={s.likesCount}>
                Likes: {props.likesCount}
            </div>
        </div>
    )
}

export default Post;