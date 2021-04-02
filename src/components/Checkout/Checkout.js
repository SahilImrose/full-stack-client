import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();


    const { _id } = useParams();
    const [product, setProduct] = useState([])
    console.log(product)
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        fetch('https://peaceful-sierra-22355.herokuapp.com/product/' + _id)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [_id])
    const onSubmit = data => {
        const orderDetail = {...product[0],...loggedInUser,
            quantity, date: new Date()
        }
        fetch('https://peaceful-sierra-22355.herokuapp.com/orderEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetail)
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    alert('order placed')
                }
            })
    };
    return (
        <div className="container text-center">
            {
                product.map(product => <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        <div style={{ borderTop: '1px solid gray', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <h4>Name</h4>
                            <h4>Quantity</h4>
                            <h4>Price</h4>
                        </div>
                        <div style={{ borderTop: '1px solid gray', borderBottom: '1px solid gray', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <h5>{product.name}</h5>
                            <h5>{quantity}<p className="btn" style={{ border: '0px', height: '0px' }} onClick={() => setQuantity(quantity + 1)}>+</p>
                                {quantity === 1 ? <p className="btn d-none" style={{ border: '0px', height: '0px', outline: '0px' }} onClick={() => setQuantity(quantity - 1)} id="minus">-</p>
                                    :
                                    <p className="btn" style={{ border: '0px', height: '0px', outline: '0px' }} onClick={() => setQuantity(quantity - 1)} id="minus"
                                    >-</p>}</h5>
                            <h5>{product.price}</h5>
                        </div>
                        <div style={{ borderBottom: '1px solid gray', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <h3>Total</h3>
                            <h4></h4>
                            <h4>{quantity * product.price}</h4>
                        </div>
                        <input type="submit" style={{ float: 'right', marginTop: '5px' }} value="Check Out" />
                    </form>
                </div>

                )
            }
        </div>
    );
};

export default Checkout;