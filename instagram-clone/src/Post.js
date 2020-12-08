import React, { useEffect, useState } from 'react'
import Avatar from "@material-ui/core/Avatar"
import "./Post.css"
import { db } from './Firebase'
import firebase from "firebase"
function Post({ user, postId, username, Imageurl, caption }) {
     const [comments, setComments] = useState([])
     const [comment, setComment] = useState('')


     useEffect(() => {
          let unsubscribe
          if (postId) {
               unsubscribe = db
                    .collection('posts')
                    .doc(postId)
                    .collection('comments')
                    .orderBy('timestamp', 'desc')
                    .onSnapshot((snapshot) => {
                         setComments(snapshot.docs.map((doc) => doc.data()))
                    })
          }
          return () => {
               unsubscribe()
          }
     }, [postId])

     const postComment = (event) => {
          event.preventDefault()
          db.collection('posts').doc(postId).collection('comments').add({
               text: comment,
               username: user.displayName,
               timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          setComment('')
     }

     return (
          <div className="post">

               <div className="post-header">
                    <Avatar className="post-avatar " alt={username} src="/static/images/avatar/1.jpg" />

                    <h3>{username}</h3>
               </div>

               {/*header=>username+avatar*/}

               <img className="post-image" src={Imageurl} alt="jag" />
               {/* image */}

               <h4 className="post-text"><strong>{username}:</strong>  {caption}</h4>
               {/*username+captions*/}




               <div className="post-comments">
                    {
                         comments.map((comment) => (
                              <p>
                                   <strong><i>By</i> {comment.username} </strong>{comment.text}
                              </p>
                         ))
                    }
               </div>

               {user && (<form className="post-commentbox">
                    <input className="post-input"
                         type="text"
                         placeholder="Add a comment"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                         className="post-button"
                         type="submit"
                         disabled={!comment}
                         onClick={postComment} >Post</button>
               </form>)}



          </div>
     )
}

export default Post
