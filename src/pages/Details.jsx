import React, { useEffect,useContext,useState } from "react"
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { firebaseContext } from "../context/Firebase"

const Details = ()=>{

    const param  = useParams()
    const context = useContext(firebaseContext)
    const [data,setData] = useState(null)
    const [url,setURL] = useState(null)

    const [qty,setQty] = useState(1)
    const [address,setAddress] = useState('')

    useEffect(()=>{
        context.getBookById(param.bookId).then((book)=>{setData(book.data())})
    },[])

    useEffect(()=>{
        if(data){
            context.getImageURL(data.imageURL).then((url)=>{setURL(url)})
        }
    },[])

    const placeOrder = async ()=>{
        const result = await context.makeMyOrder(param.bookId,qty,address)
    }

    if(!data)
        return <h1>Loading</h1>

    return (
        <div className="detail-container" style={{marginLeft:'400px',width:'300px'}}>
            <h1 >{data.name}</h1>
            <div style={{marginTop:'20px'}}><img src={url}/></div>
            <h1>Details</h1>
            <p>Price: {data.price}</p>
            <p>ISBN Number: {data.ISBN}</p>
            <h1>Author Details</h1>
            <p>Email : {data.userEmail}</p>

            <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" 
                    placeholder="Enter Quantity"
                    value={qty}
                    onChange={(e)=>{setQty(e.target.value)}}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                />
            </Form.Group>

            <Button onClick={placeOrder} variant="primary">
                Buy Now
            </Button>
        </div>
    )
}

export default Details