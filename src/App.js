import React from 'react';
import './App.css';

import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'raect-firebase-hooks/auth';
import { useCollectionData } from 'raect-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA6og4aGbQpuloGA348KA38v-SaADuuwY0",
  authDomain: "piktocache.firebaseapp.com",
  projectId: "piktocache",
  storageBucket: "piktocache.appspot.com",
  messagingSenderId: "33975560860",
  appId: "1:33975560860:web:926f8ddcd20a42ab7adb59",
  measurementId: "G-YL3PX4YMRM"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>

      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

   return (
     <button onClick={signInWithGoogle}> Sign in with Google </button>
   )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}> Sign Out </button>
  )
}

function DrawingRoom(){

  const dummer = useRef()

  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');

    dummy.current.scrollIntoView({behavior: 'smooth'});

  }

  return (
    <>
      
      <main>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} />)}
        <div ref = {dummy}></div>

      </main>

      <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
          <button type = "submit">💬</button>
      
      </form>
    </>
  )
}

function Drawing (props){

  const { text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return(
    <div className={'message ${messageClass}'}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}


export default App;
