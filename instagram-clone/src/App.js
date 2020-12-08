
import './App.css';
import Post from './Post'
import React, { useState, useEffect } from "react"
import { auth, db } from "./Firebase"
import Modal from "@material-ui/core/Modal"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './IUpload'
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles()
  const [post, setPost] = useState([])
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [openSignIn, setOpenSignIn] = useState(false)


  useEffect(
    () => {
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot
        (snapshot => {
          setPost
            (snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data()
            })
            )
            );
        }
        )
    }
    , [])


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        setUser(authUser)
      }
      else {
        //user logged out
        setUser(null)
      }
    })
    return () => {
      //cleanup actions
      unsubscribe()
    }
  }, [user, username])

  const signUp = (event) => {
    event.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false)
  }


  const signIn = (event) => {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }
  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {<div style={modalStyle} className={classes.paper}>

          <form className="app-signup">
            <center>
              <img
                className="app-modal-image"
                src="https://image.flaticon.com/icons/png/512/87/87390.png"
                alt="insta"
              />
            </center>

            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />


            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>

          </form>

        </div>}
      </Modal>


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        {<div style={modalStyle} className={classes.paper}>

          <form className="app-signup">
            <center>
              <img
                className="app-modal-image"
                src="https://image.flaticon.com/icons/png/512/87/87390.png"
                alt="insta"
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>

          </form>

        </div>}
      </Modal>

      <div className="app-header">


        <img
          className="app-header-image"
          src="data:image/png;base64,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"
          alt="photo instagram logo"
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
            <div className="app-logincontainer">
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            </div>


          )}
      </div>

      {/*header*/}



      <div className="app-posts">

        {
          post.map(({ id, post }) =>
            (<Post key={id} user={user} postId={id} username={post.username} caption={post.caption}
              Imageurl={post.Imageurl} />)
          )
        }




      </div>
      {
        user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) :
          <h4>Login to Upload</h4>
      }
    </div >
  );
}

export default App;
