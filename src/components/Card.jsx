import React from "react";
import { useEffect ,useState,useContext} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { firebaseContext } from "../context/Firebase";

const BookCard =(props)=>{

    const context = useContext(firebaseContext)

    const [url,setUrl] = useState(null)

    console.log(props.imageURL)
    
    useEffect(()=>{
        context.getImageURL(props.imageURL).then((url)=>{setUrl(url)})
    },[])

    return (
        <div>
            <Card style={{ height:'400px', width:'300px', margin:'20px'}}>
            <Card.Img style={{height:'400px'}} variant="top" src={url} />
                <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book is written by Mr. Author, Price of this book is {props.price}
                    <div>ISBN Number:-{props.ISBN}</div>
                </Card.Text>
                <Button variant="primary">
                    Get Details
                </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BookCard