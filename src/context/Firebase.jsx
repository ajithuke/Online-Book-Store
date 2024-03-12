import { initializeApp } from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import {createContext,useEffect,useState} from "react"
import {getStorage,uploadBytes,ref,getDownloadURL} from 'firebase/storage'
import {getFirestore,addDoc,collection,getDoc,getDocs,doc,query,where} from 'firebase/firestore'

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

    const listAllDocs = ()=>{
        return getDocs(collection(firestore,"books"))
    }

    const getBookById = async (Id)=>{
        const docRef = doc(firestore,"books",Id)
        const result = await getDoc(docRef)
        return result
    }

    const makeMyOrder =async (Id,qty,address)=>{
        const collectionRef = collection(firestore,"books",Id,"orders")
        const result = await addDoc(collectionRef,{
            Email:user.email,
            Address:address,
            Quantity:qty
        })

        return result
    }

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

    const fetchMyBooks =(Id)=>{
        const collectionRef = collection(firestore,"books")
        const q = query(collectionRef,where("userID","==",Id))
        const result = getDocs(q)
        return result
    }

    const getOrderDetails = (Id)=>{
        const collectionRef = collection(firestore,"books",Id,"orders")
        const result = getDocs(collectionRef)
        return result
    }

    const getImageURL =async (path)=>{
        return await getDownloadURL(ref(firebaseStorage,path))
    }

    return (
        <firebaseContext.Provider value={{user,isLoggedin,getOrderDetails,fetchMyBooks,makeMyOrder,getBookById,signUpUser,signInUser,createListing,listAllDocs,getImageURL}}>
            {props.children}
        </firebaseContext.Provider>
    )
}

export default Firebase