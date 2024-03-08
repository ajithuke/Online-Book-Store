import React,{useState} from "react";
import Form from 'react-bootstrap/Form';

const List = ()=>{

    const [name,setName] = useState('')
    const [isbn,setIsbn] = useState('')
    const [price,setPrice] = useState('')
    const [coverpic,setCoverpic] = useState('')

    return (
        <div className="list-container">
            <Form>
                <h2 className="heading">List the Book</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter book name" 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control type="password" 
                    placeholder="Enter ISBN number"
                    value={isbn}
                    onChange={(e)=>{setIsbn(e.target.value)}}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter price"
                    value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control type="file" 
                    placeholder="Select image"
                    onChange={(e)=>{setCoverpic(e.target.files[0])}}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default List