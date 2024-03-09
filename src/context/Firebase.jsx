import { initializeApp } from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {createContext,useEffect,useState} from "react"
import {getStorage,uploadBytes,ref} from 'firebase/storage'
import {getFirestore,addDoc,collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDOw8a_Bf5aNXo02xSBrttXHRRT6OOeax8",
    authDomain: "book-store-41263.firebaseapp.com",
    projectId: "book-store-41263",
    storageBucket: "book-store-41263.appspot.com",
    messagingSenderId: "247846381707",
    appId: "1:247846381707:web:ec5dd18ad954c18484cc8e"
};

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)
const firestore = getFirestore(firebaseApp)

export const firebaseContext = createContext(null)

const Firebase = (props)=>{

    const [user,setUser] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user){
                setUser(user)
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

    const createListing =async (name,isbn,price,coverpic)=>{
        const imageRef = ref(firebaseStorage,`book/images/${Date.now()}-${coverpic.name}`)
        const result = await uploadBytes(imageRef,coverpic)
        await addDoc(collection(firestore,'books'),{
            name,
            ISBN:isbn,
            price,
            imageURL:result.ref.fullPath,
            userID:user.uid,
            userEmail:user.email,
        }).then().catch((error)=>{console.log(error.message)})
    }

    return (
        <firebaseContext.Provider value={{signUpUser,signInUser,isLoggedin,createListing}}>
            {props.children}
        </firebaseContext.Provider>
    )
}

export default Firebase