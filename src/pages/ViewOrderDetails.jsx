import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { firebaseContext } from "../context/Firebase"

const ViewOrderDetails = ()=>{
    const params = useParams()
    const context = useContext(firebaseContext)

    const [orders,setOrders] = useState([])
    useEffect(()=>{
        context.getOrderDetails(params.bookId).then((orders)=>{setOrders(orders.docs)})
    },[params.bookId,context])

    return (
        <div>
            <h1>Orders For Your Book</h1>
            {orders.map((order)=>{
                const data = order.data()
                return (
                    <div className="mt-5" style={{border:'1px solid black'}}>
                        <h5>Order By:{data.Email}</h5>
                        <h6>Quantity:{data.qty}</h6>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewOrderDetails