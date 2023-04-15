import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import IMAGES from '../../images'
import { useDispatch } from 'react-redux'
import { addComment } from '../../store/slices/posts/postsSlice'
import { withShowComments } from '../../hoc/withShowComments'

function Post({id, img, name, comments, likesCount, postText, timeAgo, isShow, openComments}) {

    const dispatch = useDispatch()
    const formRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(addComment({
            postId: id,
            username: 'test-name',
            body: formRef.current[0].value   

        }))

        formRef.current.reset()

    }

  return (
    <div className="post">
        <div className="info">
            <NavLink style={{textDecoration: 'none'}} to={`${id}/uniq`} className="user">
                  <div className="profile-pic"><img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`} alt="" /></div>
                <p className="username">{name}</p>
            </NavLink>
            <img src={IMAGES.option} className="options" alt=""/>
        </div>
        <img src={img} className="post-image" alt=""/>
        <div className="post-content">
            <div className="reaction-wrapper">
                <img src={IMAGES.like} className="icon" alt=""/>
                <img src={IMAGES.comment} className="icon" alt=""/>
                <img src={IMAGES.send} className="icon" alt=""/>
                <img src={IMAGES.save} className="save icon" alt=""/>
            </div>
            <p className="likes">{likesCount}</p>
            {postText && <p className="description"><span>{name} </span> {postText}</p>}
            <p className="post-time">{timeAgo}</p>
            {
                !!comments.length &&
                <>
                {
                    isShow ?
                        comments.map(comment => (
                            <p key={comment.id} className="description"><span>{comment.username} </span> {comment.body}</p>
                        )) : <h1 onClick={openComments} style={{cursor: 'pointer'}}>show all comments</h1>
                }
                </>
            }
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="comment-wrapper">
                <img src={IMAGES.smile} className="icon" alt=""/>
                <input onFocus={openComments} type="text" className="comment-box" placeholder="Add a comment"/>
                <button className="comment-btn">post</button>
            </div>
        </form>
    </div>
  )
}

export default withShowComments(Post) 