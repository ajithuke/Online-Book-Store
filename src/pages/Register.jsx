import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext,useState,useEffect } from "react";
import { firebaseContext } from '../context/Firebase.jsx'
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const firebase = useContext(firebaseContext)
    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(()=>{
        if(firebase.isLoggedin){
            navigate("/")
        }
    },[firebase,navigate])

    const handleSubmit =async (e)=>{
        e.preventDefault()
        await firebase.signUpUser(email,password)
    }

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit}>
                <h2 className="heading">Signup Page</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </Form.Group>
                
                <Button className="b1" variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    )
}

export default Register