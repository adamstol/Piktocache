import React, { useRef, useState } from 'react';
import Pikto from './components/Pikto'
import './App.css';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

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


function App() {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState();

  return (
    <>
      <div className="App">
        <header>
          <h1>🎨</h1>
          <SignOut />
        </header>

        <section>
          {user ? <ChatRoom isOpen={isOpen} setIsOpen={setIsOpen}/> : <SignIn />}
        </section>

        </div>
        <div className={isOpen ? "drawer open" : "hide"} style={{zIndex: 1}}>
          <div className="drawer-contents" style={{width: 800, height: 500, backgroundColor: 'white', zIndex: 99}}>
            <Pikto
              width={800}
              height={500}
              penColor={color}
              setColor={setColor}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
    </>

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

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom({isOpen, setIsOpen}) {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Draw a message" />

      <button onClick={() => {
        setIsOpen(true);
      }} type="submit">✏️</button>
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