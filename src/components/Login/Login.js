import React from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}




function Login() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
const history = useHistory();
const location = useLocation();
let { from } = location.state || {from: {pathname: "/"}}
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleClickGoogle = () => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user2 = result.user
        const { displayName, photoURL, email } = user2;
        const singInGoogle = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setLoggedInUser(singInGoogle)
        history.replace(from)
        setUser(singInGoogle)
      }).catch(err => {
            console.log(err);
            console.log(err.massage);
          })
  }
  const handleClickFb = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        const { displayName, photoURL, email } = user;
        const singInFb = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setLoggedInUser(singInFb)
        history.replace(from)
        setUser(singInFb)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  }
  const handleClickGoogle2 = () => {
    firebase.auth().signOut().then((res) => {
      const signOut = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        Congratulations: ''
      }
        
      setUser(signOut)
    }).catch(err => {
          console.log(err);
          console.log(err.massage);
        });
  }
  return (
    <div className="App">
      {user.isSignIn ? <button onClick={handleClickGoogle2}>Sign Out</button> : <button onClick={handleClickGoogle}>Google</button>}<br />
      <button onClick={handleClickFb}>Facebook</button><br/>
      <br /><br /><br />
      <p style={{ color: 'red', fontSize: '5vmin' }}>{user.error}</p>
    </div>
  );
}

export default Login;
