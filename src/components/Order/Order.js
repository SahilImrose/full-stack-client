import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Order = () => {
    const [order, setOrder] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:8080/orders?email='+ loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrder(data))
    },[])
    return (
        <div className="container">
            <div>
            {
                order.map(order => <div><h5 style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',textAlign: 'center'}}><h5>Customer:   {order.name}</h5><h5>Product Name: 
                      {order.productName}</h5><h5>Price:   {order.quantity * order.price}</h5><h5>{(new Date(order.date).toDateString('MM/dd/yyyy'))}</h5></h5></div>)
            }
        </div>
        </div>
    );
};

export default Order;