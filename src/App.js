import React, { useRef, useState,useEffect } from 'react';
import './App.css';
import axios from "axios";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import Drawer from './components/Drawer'
import Signout from './components/Signout'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA6og4aGbQpuloGA348KA38v-SaADuuwY0",
  authDomain: "piktocache.firebaseapp.com",
  databaseURL: "https://piktocache-default-rtdb.firebaseio.com",
  projectId: "piktocache",
  storageBucket: "piktocache.appspot.com",
  messagingSenderId: "33975560860",
  appId: "1:33975560860:web:926f8ddcd20a42ab7adb59",
  measurementId: "G-YL3PX4YMRM"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



let userIp =''


function App() {

useEffect(() => {
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    userIp = res.data.ip;
    userIp = userIp.substring(0,userIp.lastIndexOf("."))
    };
    getData()
},[])


  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState();
  const [color, setColor] = useState("#000000");

  return (
    <div className="App">
      <header>
        <h1>
          <svg width="82" height="73" viewBox="0 0 82 73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M79.4012 7.07227H2.59919C2.29686 7.07227 2.05176 7.31981 2.05176 7.62516V54.4398C2.05176 54.7451 2.29686 54.9927 2.59919 54.9927H58.7995C58.9582 54.9927 59.1083 55.0625 59.213 55.1824L72.6204 70.7342C72.981 71.1519 73.658 70.8345 73.5749 70.2871L71.3592 55.6284C71.3085 55.2936 71.5654 54.9916 71.9002 54.9916H79.4012C79.7036 54.9916 79.9487 54.744 79.9487 54.4387V7.62516C79.9487 7.31981 79.7036 7.07227 79.4012 7.07227Z" fill="white"/>
          <path d="M73.024 73C72.293 73 71.5814 72.6848 71.0718 72.0949L58.1147 57.0643H2.59898C1.16614 57.0643 0 55.8866 0 54.4395V7.62486C0 6.17775 1.16614 5 2.59898 5H79.401C80.8339 5 82 6.17775 82 7.62486V54.4395C82 55.8866 80.8339 57.0643 79.401 57.0643H73.6502L75.6014 69.9749C75.7774 71.1407 75.1846 72.2574 74.1243 72.7525C73.7679 72.9193 73.3933 73 73.0229 73H73.024ZM4.10308 52.9204H58.7993C59.5508 52.9204 60.2656 53.2486 60.759 53.8222L70.763 65.4264L69.3291 55.9422C69.2146 55.1843 69.4327 54.4166 69.9272 53.8353C70.4218 53.2541 71.1398 52.9204 71.8989 52.9204H77.8969V9.14395H4.10308V52.9204Z" fill="#231F20"/>
          <path d="M32.5181 48.1931C29.051 48.1931 26.3776 46.782 25.0074 45.8638C24.2612 45.3643 24.0582 44.3501 24.5517 43.5966C25.0462 42.8431 26.0504 42.638 26.7965 43.1364C27.9842 43.9314 30.4461 45.2127 33.5914 44.8605C35.116 44.6893 36.6212 44.1397 37.9439 43.2705C38.6933 42.7776 39.6964 42.9925 40.1844 43.7493C40.6725 44.5061 40.4598 45.5192 39.7104 46.0121C37.9655 47.1593 35.9734 47.8845 33.9477 48.1113C33.4575 48.1659 32.9803 48.1909 32.5181 48.1909V48.1931Z" fill="#231F20"/>
          <path d="M16.7902 37.904C18.281 37.904 19.4896 36.2205 19.4896 34.1439C19.4896 32.0672 18.281 30.3838 16.7902 30.3838C15.2994 30.3838 14.0908 32.0672 14.0908 34.1439C14.0908 36.2205 15.2994 37.904 16.7902 37.904Z" fill="#231F20"/>
          <path d="M49.6662 37.904C51.157 37.904 52.3656 36.2205 52.3656 34.1439C52.3656 32.0672 51.157 30.3838 49.6662 30.3838C48.1754 30.3838 46.9668 32.0672 46.9668 34.1439C46.9668 36.2205 48.1754 37.904 49.6662 37.904Z" fill="#231F20"/>
          </svg>

        </h1>
        <Signout auth={auth}/>
      </header>
      
      <div className={isOpen ? "drawer open" : "drawer hide"} 
          onClick = {() => {
            setIsOpen(false);
          }}
          style={{position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.75)', width: '100%', height: '100%', zIndex: 99}}>    
      </div>
      <div className={isOpen ? "drawer open" : "drawer hide"}>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>        

      <section>
        {user ? <ChatRoom userIp={userIp} isOpen={isOpen} setIsOpen={setIsOpen}/> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}


function ChatRoom({isOpen, setIsOpen}) {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  //console.log('userIp ',userIp)
  
  const query = messagesRef
  //.where('userIp', '==', userIp) // Filter messages with the same userIp
  .orderBy('createdAt');
  //console.log('query ',query)
  
  const [data] = useCollectionData(query,{idField:'id'});
  if (data) {
  const documentsWithUserIp = data.filter((doc) => doc.hasOwnProperty('userIp'));
  
  documentsWithUserIp.forEach((doc) => {
      // Access and use doc.userIp here if it exists
      if (doc.userIp) {
        console.log('User IP:', doc.userIp);
      } else {
        console.log('User IP does not exist in this document.');
      }
    });
  }

  const [messages] = useCollectionData(query, { idField: 'id' });
  let ipMessages = [];
  
  if (messages != undefined){
    messages.forEach(message =>{
      if (message.userIp != undefined && message.userIp == userIp){
        ipMessages.push(message);
      }
    })
  }
  console.log('ip msg: ',ipMessages)
  
  

  const [words] = useCollectionData(query, { idField: 'text' });
  console.log('messages ',messages)
  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    if (formValue.trim().length > 0){
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        userIp
      })

      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });      
    }

  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Write a message" />
      
      <button id="openDrawing" onClick={() => {
        setIsOpen(true);
      }}>Draw</button>
      <button type="submit" disabled={!formValue}>💬</button>
    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;