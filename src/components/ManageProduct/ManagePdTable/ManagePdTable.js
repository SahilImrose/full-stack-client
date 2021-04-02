import { DeleteTwoTone } from '@material-ui/icons';
import React from 'react';
import './Manage.css';

const ManagePdTable = (props) => {
    const handleDelete = id => {
        fetch(`http://localhost:8080/deleteProduct/${id}`,{
            method:'DELETE',
        })
        .then(res =>res.json())
        .then(result => { console.log(result)})
    }
    const { productName, price, wight, _id } = props.product;
    return (
        <div className="manage">
            <p style={{marginLeft: '150px' }}>{productName}</p>
            <p style={{marginLeft: '150px' }}>Wight: {wight}</p>
            <p style={{marginLeft: '150px' }}>Price: {price}</p>
            <button onClick={() => handleDelete(`${_id}`)} style={{marginLeft: '150px', cursor: 'pointer' }}><DeleteTwoTone /></button>
        </div>
    );
};

export default ManagePdTable;