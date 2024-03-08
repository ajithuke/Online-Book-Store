import { initializeApp } from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {createContext,useEffect,useState} from "react"

const firebaseConfig = {
    apiKey: "AIzaSyDOw8a_Bf5aNXo02xSBrttXHRRT6OOeax8",
    authDomain: "book-store-41263.firebaseapp.com",
    projectId: "book-store-41263",
    storageBucket: "book-store-41263.appspot.com",
    messagingSenderId: "247846381707",
    appId: "1:247846381707:web:ec5dd18ad954c18484cc8e"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export const firebaseContext = createContext(null)

const Firebase = (props)=>{

    const [user,setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user){
                setUser(user)
                console.log(user)
            }
            else{
                setUser(null)
            }
        })
    },[])

    const isLoggedin = user?true:false

    const signUpUser = (email,password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    }

    const signInUser = (email,password)=>{
        signInWithEmailAndPassword(firebaseAuth,email,password).then(()=>{console.log('Login succcessful')}).catch((error)=>{console.log(error.message)})
    }

    return (
        <firebaseContext.Provider value={{signUpUser,signInUser,isLoggedin}}>
            {props.children}
        </firebaseContext.Provider>
    )
}

export default Firebase