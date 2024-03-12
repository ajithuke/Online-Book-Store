import React, { useEffect, useState ,useContext} from "react";
import BookCard from '../components/Card'
import CardGroup from 'react-bootstrap/CardGroup';

import { firebaseContext } from "../context/Firebase";

const Home = ()=>{

    const [books,setBooks] = useState([])
    const context = useContext(firebaseContext)

    useEffect(()=>{
        context.listAllDocs().then((books)=>{setBooks(books.docs)})
    },[context])

    return (
        <div>
            <CardGroup>
                {books.map((book)=>(
                    <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}></BookCard>
                ))}
            </CardGroup>
        </div>
    )
}

export default Home