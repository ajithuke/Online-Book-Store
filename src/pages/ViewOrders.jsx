import React, { useEffect,useContext,useState } from "react"
import { firebaseContext } from "../context/Firebase"
import BookCard from '../components/Card'

const OrdersPage = ()=>{
    const context = useContext(firebaseContext)
    const [books,setBooks] = useState([])

    useEffect(()=>{
        if(context.isLoggedin){
            context.fetchMyBooks(context.user.uid).then((result)=>{setBooks(result.docs)})
        }
    },[context])

    if(!context.isLoggedin){
        return <h1>Please do Log in</h1>
    }

    return (
        <div>
            {books.map((book)=>(
                <BookCard
                    link={'/book/orders/${book.id}'}
                    key={book.id}
                    id={book.id}
                    name={book._document.data.value.mapValue.fields.name.stringValue}
                    ISBN={book._document.data.value.mapValue.fields.ISBN.stringValue}
                    price={book._document.data.value.mapValue.fields.price.stringValue}
                />
            ))}
        </div>
    )
}

export default OrdersPage